import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

export default {
  entry: './src/frontend/LoopInsighT1.js',
  output: {
    filename: 'lt1.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader', 'postcss-loader' ] },
      { test: /\.html$/, use: ['html-loader'] },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@intlify/vue-i18n-loader'
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/frontend/assets/index.htm',
      favicon: './src/frontend/assets/images/favicon.png', 
    }),
	new CopyWebpackPlugin({'patterns': [
        {from:'./src/frontend/assets/images', to:'images'}
    ]}),
	new webpack.optimize.LimitChunkCountPlugin({
	    maxChunks: 1
	  }),
  ],
};
