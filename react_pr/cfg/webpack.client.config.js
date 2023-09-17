const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';
const GLOBAL_CSS_REGEXP = /\.global\.css$/;
const DEV_PLAGIBS = [ new CleanWebpackPlugin(), new HotModuleReplacementPlugin() ];
const COMMON_PLAGIBS = [
  new DefinePlugin({'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`}),

];

function setupDevtool(){
  if(IS_DEV) return 'eval';
  if(IS_PROD) return false;
}
module.exports= {
  mode:NODE_ENV ? NODE_ENV :'development',
  entry:
    [path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
  ],
  output:{
    path:path.resolve(__dirname, '../dist/client'),
    filename:'client.js',
    publicPath: '/static/',
  },
  module:{
    rules:[
      {
        test:/\.[tj]sx?$/,
        use:['ts-loader']
      },
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              modules:{
                mode:'local',
                localIdentName:'[name]__[local]--[hash:base64:5]',

              }
            }
          }
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader']
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
  devtool:setupDevtool(),
  resolve:{
    extensions:['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias:{
      'react-dom':IS_DEV ? '@hot-loader/react-dom':'react-dom'
    }
  },
  plugins:IS_DEV ? DEV_PLAGIBS.concat(COMMON_PLAGIBS) : COMMON_PLAGIBS,
}
