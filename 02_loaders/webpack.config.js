/*
 * @Author: wy
 * @Date: 2023-11-23 10:08:05
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 11:22:08
 * @FilePath: /笔记/webpack-theory/02_loaders/webpack.config.js
 * @Description:
 */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: './loaders/style-loader.js',
      },
      {
        test: /\.(png)|(jpg)$/,
        use: [
          {
            loader: './loaders/img-loader.js',
            options: {
              limit: 100,
              fileName: `[name]_[contenthash:5].[ext]`,
            },
          },
        ],
      },
    ],
  },
};
