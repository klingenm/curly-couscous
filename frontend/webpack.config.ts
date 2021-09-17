import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },  
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'klingenm api',
      template: path.resolve(__dirname, './src/index.ejs'),
    }),
  ],
};
