import { IPerfumeOptions } from 'perfume.js'
import { Compiler } from 'webpack'
import { loadFile } from './lib/file'
import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
import * as escodegen from 'escodegen'
import { pick } from 'lodash'
import optionsFactory from './factory/options'

interface IOptions extends IPerfumeOptions{
  entry: any
  keywords: string
  reportUrl: string
  ignoreResource: object
}

const DEFAULT_OPTIONS = {
  entry: /app\.js$/,
  keywords: 'options',
  // Metrics
  dataConsumption: false,
  resourceTiming: false,
  // Analytics
  reportUrl: '',
  ignoreResource: [],
  analyticsTracker: null,
  // Logging
  logPrefix: 'Perfume.js:',
  logging: true,
  maxMeasureTime: 15000,
}

class PerfumeWebpackPlugin {
  private readonly options: {} & IOptions

  constructor(options: any) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  }

  /**
   * 监听webpack事件钩子
   * @param compiler
   */
  public apply(compiler: Compiler): void {
    if (compiler.hooks) {
      compiler.hooks.emit.tap('PerfumeWebpackPlugin', (compilation) => {
        this.handle(compilation)
        return Promise.resolve()
      })
    } else {
      compiler.plugin('emit', (compilation, cb) => {
        this.handle(compilation)
        return cb()
      })
    }
  }

  /**
   * 处理项目文件生成和文件注入
   * @param compilation
   */
  private handle(compilation: any): void {
    const options = this.options
    const { keywords } = options
    const mainText = loadFile('../assets/perfume-main.js')
    const workerText = loadFile('../assets/perfume-worker.js')
    const mainOptions = pick(options, [
      'reportUrl',
      'ignoreResource',
      'dataConsumption',
      'resourceTiming',
      'analyticsTracker',
      'logPrefix',
      'logging',
      'maxMeasureTime',
    ])
    const workerOptions = pick(options, [
      'dataConsumption',
      'resourceTiming',
      'analyticsTracker',
      'logPrefix',
      'logging',
      'maxMeasureTime',
    ])

    const mainOptionsText = optionsFactory(mainOptions)
    const workerOptionsText = optionsFactory(workerOptions)

    const workerCode = PerfumeWebpackPlugin.mergeCode(workerText, workerOptionsText, keywords)
    const mainCode = PerfumeWebpackPlugin.mergeCode(mainText, mainOptionsText, keywords)

    this.resolve(compilation, 'perfume-worker.js', workerCode)
    this.inject(compilation, mainCode)
  }

  /**
   * 生成一个新的资源文件添加到项目产物中
   * @param compilation
   * @param asset
   * @param source
   */
  private resolve(compilation: any, asset: string, source: string): void {
    compilation.assets[asset] = {
      source() {
        return source
      },
      size() {
        return source.length
      }
    }
  }

  /**
   * 根据entry配置，在entry文件中注入代码
   * @param compilation
   * @param source
   */
  private inject(compilation: any, source: string): void {
    const options = this.options
    const entry = Array.isArray(options.entry) ? options.entry : [options.entry]
    const assets = compilation.assets

    Object.keys(assets).forEach((asset) => {
      if (entry.length) {
        const isMatched = entry.some(en => en.test(asset))
        if (!isMatched) return
      }
      if (!/\.js$/.test(asset)) return
      let originSource = assets[asset].source()
      originSource += source
      compilation.assets[asset].source = () => originSource
      compilation.assets[asset].size = () => originSource.length
    })
  }

  /**
   * 代码文本合并(将选项代码注入到源代码中)
   * @param source
   * @param added
   * @param keywords
   */
  private static mergeCode(source: string, added: string, keywords: string): string {
    const sourceAst = acorn.parse(source)
    const addedAstProperties = this.getAstProperties(added, keywords)
    // @ts-ignore
    walk.simple(sourceAst, {
      VariableDeclarator(node: any) {
        if(node.id && node.id.name && node.id.name === keywords) {
          node.init.properties = addedAstProperties
        }
      }
    })
    return escodegen.generate(sourceAst)
  }

  /**
   * 从选项的AST树中获取所有属性
   * @param source
   * @param keywords
   */
  private static getAstProperties(source: string, keywords: string): object {
    const addedAst = acorn.parse(source)
    let properties: any[] = []
    // @ts-ignore
    walk.simple(addedAst, {
      VariableDeclarator(node: any) {
        if(node.id && node.id.name && node.id.name === keywords) {
          properties = node.init?.properties
        }
      }
    })
    return properties
  }
}

export default PerfumeWebpackPlugin
