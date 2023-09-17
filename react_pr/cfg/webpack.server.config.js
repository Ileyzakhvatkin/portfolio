const path = require('path')
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals')
const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global\.css$/;


module.exports = {
  target:'node',
  mode: NODE_ENV ? NODE_ENV :'development',
  entry:path.resolve(__dirname, '../src/server/server.js'),
  output:{
    path:path.resolve(__dirname, '../dist/server'),
    filename:'server.js'
  },
  externals:[nodeExternals()],
  module:{
    rules:[
      {
        test:/\.[tj]sx?$/,
        use:['ts-loader']
      },
      {
        test:/\.css$/,
        use: [
          {
            loader:'css-loader',
            options:{
              modules:{
                mode:'local',
                localIdentName:'[name]__[local]--[hash:base64:5]',
              },
              onlyLocals:true
            }
          },
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader?name=./img/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader?name=./fonts/[name].[ext]',
          },
        ],
      },
    ]
  },
  resolve:{
    extensions:['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimization: {
    minimize: false
  },
  plugins: [ new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`}) ],
}

