<!--
 * @Author: wy
 * @Date: 2023-11-29 10:48:52
 * @LastEditors: wy
 * @LastEditTime: 2023-11-30 13:54:01
 * @FilePath: /笔记/webpack-theory/05_xing_neng_you_hua/read.md
 * @Description:
-->

## 构建性能优化

### 不解析模块

`module.noParse`匹配不需要解析的模块

### loader 优化

- 限制 loader 的应用范围
  `module.rule.exclude`排除不需要 loader 转化的文件
- 缓存 loader 解析结果
  cache-loader 可以缓存 loader 的结果，缓存也需要耗时，大工程适用
- thread-loader 开启多线程
  - 不能使用 webpack api 生成文件
  - 不能使用自定义 plugin api
  - 无法访问 webpack options

> noParse 不做解析，还是会经过 loader 转换，所以 noParse 可以和 exclude 结合使用

### webpack hot

热更新，dev server 和浏览器之间建立 websocket 连接，每次修改之后，webpack server 将改变之后的内容，主动发送给浏览器，利用 hotModuleReplacementPlugin 执行注入的代码，会覆盖原始的代码，让代码重新运行。

## 传输性能

### 分包

可以减少打包之后的重复代码，尤其是对一公共的模块。

#### 手动分包

1. 单独打包公共模块，暴露变量名

```js
// webpack.dll.config.js
module.exports = {
  mode: 'production',
  entry: {
    jquery: ['jquery'],
    lodash: ['lodash'],
  },
  output: {
    filename: 'dll/[name].js',
    library: '[name]',
  },
};
```

2. 利用`DllPlugin`生成资源清单

```js
// webpack.dll.config.js
module.exports = {
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll', '[name].manifest.json'), //资源清单的保存位置
      name: '[name]', //资源清单中，暴露的变量名
    }),
  ],
};
```

运行后，即可完成公共模块打包

##### 使用公共模块

1. 在页面中手动引入公共模块

```html
<script src="./dll/jquery.js"></script>
<script src="./dll/lodash.js"></script>
```

2. 重新设置`clean-webpack-plugin`

如果使用了插件`clean-webpack-plugin`，为了避免它把公共模块清除，需要做出以下配置

```js
new CleanWebpackPlugin({
  // 要清除的文件或目录
  // 排除掉dll目录本身和它里面的文件
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/*'],
});
```

> 目录和文件的匹配规则使用的是[globbing patterns](https://github.com/sindresorhus/globby#globbing-patterns)

3. 使用`DllReferencePlugin`控制打包结果

```js
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dll/jquery.manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./dll/lodash.manifest.json'),
    }),
  ],
};
```

#### 自动分包

构建速度会降低

```
{
  splitChunks: {
    chunks: 'async', // 默认async，只分包异步的chunk， all分包所有的chunk
    minSize: 20000,  // 体积超过多大分包，如果分包之后的体积太小，就不会被分出来
    minChunks: 1, // 一个模块被多少个chunk使用时，才分包
    minRemainingSize: 0,
    automaticNameDelimiter: '.' // 新chunk的文件链接符号
    // 缓存组
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/, // 当匹配到模块时，让这些模块单独打包
        priority: -19
      },
      default : {
        miniChunk: 2, // 覆盖全局配置，引用数改为2
        priority: -20, // 优先级
        reuseExistingChunk: true // 重用已经被分离出去的chunk
      },
      // 分离css
      styles: {
        test: /\.css$/,
        miniChunks: 2
      }
    }
  }
}
```

缓存组默认配置

```js
cacheGroups: {
  vendors: {
    test: /[\\/]node_modules[\\/]/, // 当匹配到模块时，让这些模块单独打包
    priority: -19
  },
  default : {
    miniChunk: 2, // 覆盖全局配置，引用数改为2
    priority: -20, // 优先级
    reuseExistingChunk: true // 重用已经被分离出去的chunk
  }
}
```

### 代码压缩

减少代码体积，破坏代码可读性，移除模块内部的无效代码

- uglifyJs(只支持 es5 压缩)
- terser（可以支持 es6，webpack 内置，webpack 打包自动执行）
  想更改、添加压缩工具，又或者是想对 Terser 进行配置，使用下面的 webpack 配置即可

```js
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  optimization: {
    // 是否要启用压缩，默认情况下，生产环境会自动开启
    minimize: true,
    minimizer: [
      // 压缩时使用的插件，可以有多个
      new TerserPlugin(), // 只能压缩js
      new OptimizeCSSAssetsPlugin(), // 压缩css
    ],
  },
};
```

### tree shaking

移除模块之间的无用代码，webpack 生产环境自动开启 tree shaking

- es6 代码的特性能很好的支持 tree shaking
  - es6 顶部导出
  - es6 模块名只能是字符串
  - es6 绑定的变量是不可变的
- commonjs 的代码，怎么实现 tree shaking?

  - 使用 es 版本，例如 lodash 有 lodash-es 版本
  - 要利用插件`webpack-deep-scope-plugin`(个人维护)

- 副作用的代码，不能 tree shaking 怎么办？
  利用`package.json`里的 sideEffects 做标记

  - false：当前工程中，所有模块都没有副作用。注意，这种写法会影响到某些 css 文件的导入
  - 数组：设置哪些文件拥有副作用，例如：`["!src/common.js"]`，表示只要不是`src/common.js`的文件，都有副作用

  > 这种方式我们一般不处理，通常是一些第三方库在它们自己的`package.json`中标注

- css tree shaking

  `webpack`无法对`css`完成`tree shaking`，因为`css`跟`es6`没有半毛钱关系
  因此对`css`的`tree shaking`需要其他插件完成
  例如：`purgecss-webpack-plugin`

  > 注意：`purgecss-webpack-plugin`对`css module`无能为力

### 懒加载

```js
const btn = document.querySelector('button');
btn.onclick = async function () {
  //动态加载
  //import 是ES6的草案
  //浏览器会使用JSOP的方式远程去读取一个js模块
  //import()会返回一个promise   （* as obj）
  // 这样写没有tree shaking
  const { chunk } = await import('lodash-es');
  // 实现tree shaking
  // 建立util.js 变相实现tree shaking
  // export { chunk } from "lodash-es";
  // index.js
  // const { chunk } = await import('./util.js');
  const result = chunk([3, 5, 6, 7, 87], 2);
  console.log(result);
};
```

## 其他优化

### eslint 规范

### gzip 压缩

服务器压缩需要时间，浏览器解压需要时间

webpack 可以使用`compression-webpack-plugin`插件来压缩打包文件，省略服务器压缩步骤，但是为了保证服务器的灵活度，会把原文件和 gzip 文件都放入服务器。
