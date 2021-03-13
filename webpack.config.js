const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopmentMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDevelopmentMode ? 'development' : 'production',
  devtool: isDevelopmentMode ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
    isDevelopmentMode && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopmentMode && require.resolve('react-refresh/babel'),
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
}