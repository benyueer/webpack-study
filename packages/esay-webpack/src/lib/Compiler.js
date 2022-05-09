import fs from 'fs'
import path from 'path'
import { Parser } from './Parser.js'

export class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }
  run() {
    const info = this.build(this.entry)
    this.modules.push(info)
    for (let i = 0 ; i < this.modules.length ; i++) {
      const {dependecies} = this.modules[i]
      if (!dependecies) continue
      for (let dependency in dependecies) {
        const filepath = dependecies[dependency]
        this.modules.push(this.build(filepath))
      }
    }

    const dependencyGraph = this.modules.reduce((pre, cur) => ({
      ...pre,
      [cur.filename]: {
        code : cur.code,
        dependecies: cur.dependecies
      }
    }), {})

    this.generate(dependencyGraph)
  }
  build(filename) {
    const {getAst, getDependecies, getCode} = Parser
    const ast = getAst(filename)
    const dependecies = getDependecies(ast, filename)
    const code = getCode(ast).code
    return {
      dependecies,
      code,
      filename
    }
  }

  generate(code) {
    const filepath = path.join(this.output.path, this.output.filename)
    const bundle = `
    (
      function(graph) {
        function require(moduleId) {
          function localRequire(relativePath) {
            return require(graph[moduleId].dependecies[relativePath])
          }
          var exports = {};
          (function(require, exports, code) {
            eval(code)
          })(localRequire, exports, graph[moduleId].code)
          return exports
        }
        require('${this.entry}')
      }
    )(${JSON.stringify(code)})
    `
    fs.writeFileSync(filepath, bundle, 'utf-8')
  }
}

const c = new Compiler({
  entry: '/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/src/files/a.js',
  output: {
    path: '/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/build',
    filename: 'built.js'
  }
})

c.run()