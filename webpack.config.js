const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const environment = env.production ? 'production' : 'development'
  return {
    mode: environment,
    entry: path.resolve(__dirname, './src/assets/js/main.js'),
    output: {
      filename: './assets/js/[name].[hash].js',
      path: path.resolve(__dirname, './dist/')
    },
    devtool: 'source-map',
    plugins: [
      // HTML
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        inject: 'body'
      }),
      // CSS Extract
      new MiniCssExtractPlugin({
        filename: './assets/css/[name].[hash].css'
      })
    ],
    module: {
      rules: [
        // CSS Loader
        {
          test: /\.scss$/i,
          use: [
            env.production
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 8000,
      hot: true,
      static: {
        directory: path.join(__dirname, 'src')
      }
    }
  }
}
