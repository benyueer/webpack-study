
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
        require('/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/src/files/a.js')
      }
    )({"/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/src/files/a.js":{"code":"\"use strict\";\n\nvar _b = require(\"./b.js\");\n\n(0, _b.bFun)();\ndocument.body.innerText = _b.name;\nconsole.log(_b.name);","dependecies":{"./b.js":"/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/src/files/b.js"}},"/Users/mac/Desktop/pro/webpack-study/packages/esay-webpack/src/files/b.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.bFun = bFun;\nexports.name = void 0;\nvar name = 'b';\nexports.name = name;\n\nfunction bFun() {\n  console.log('b');\n}","dependecies":{}}})
    