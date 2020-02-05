module.exports = {
  roots: [
    "<rootDir>/src/test" // 测试目录
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest" // 匹配 .ts 或者 .tsx 结尾的文件
  },
  collectCoverage: true, // 统计覆盖率
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/test/",
    "<rootDir>/dist/"
  ]
};
