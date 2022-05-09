import fs from 'fs'
import path from 'path'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from '@babel/core'

export const Parser = {
  getAst: _path => {
    const content = fs.readFileSync(_path, 'utf-8')
    console.log(content)
    return parser.parse(content, {
      sourceType: 'module'
    })
  },

  getDependecies: (ast, filename) => {
    const dependecies = {}
    traverse.default(ast, {
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        const filepath = path.join(dirname, node.source.value)
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },
  getCode: ast => {
    return transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
  }
}

// const ast = Parser.getAst('/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/src/files/a.js')

// const dependecies = Parser.getDependecies(ast, 'a.js')
// console.log(dependecies)

// const code = Parser.getCode(ast)
// console.log(code)