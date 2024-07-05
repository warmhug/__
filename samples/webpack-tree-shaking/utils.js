/**
 * webpack 检测 node_modules 里某个包的 实际路径，并拷贝文件到项目 src 里
 */
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs')
const path = require('path')
const mxgraph = path.resolve(__dirname, 'node_modules/mxgraph')
// console.log('xxx1', mxgraph);
let mxReal
try {
  mxReal = fs.realpathSync(mxgraph)
} catch (error) {
}

// webpack 里 plugin 设置增加 copy 插件
new CopyPlugin(
  // [{ from: mxReal + '/javascript/src/', to: 'dest' }]
  [
    mxReal + '/javascript/src/',
    { from: __dirname + '/src/routes/Designer/Editor/images', to: 'images' },
    { from: __dirname + '/src/routes/Designer/Editor/resources', to: 'resources' }
  ]
);

