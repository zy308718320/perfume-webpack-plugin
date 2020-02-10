import * as fs from 'fs'
import * as path from 'path'

export function resolve(dir: string) {
  return path.join(__dirname, dir)
}

export function loadFile(file: string) {
  return fs.readFileSync(resolve(file), {encoding: 'utf8'})
}


