const path = require('path')
const webpack = require('webpack') //访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/, use: ['url-loader?limit=8192&name=assets/images/[name][hash].[ext]']
      },
      // { test: /\.(png|svg|jpg|gif)$/, use: ['url-loader?limit=1024&name=assets/images/[name].[ext]'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        // test: /\.(css|less)$/, 
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp3)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: './routes.html',
      template: './src/index.html',
      favicon: ''
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}