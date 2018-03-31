const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.png', '.gif'],
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: { progressive: true },
            gifsicle: { interlaced: false },
            optipng: { optimizationLevel: 4 },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      hash: true,
      template: './src/index.html',
      title: 'Project Title',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    inline: true,
    open: true,
  },
  devtool: 'cheap-module-eval-source-map',
};

module.exports = config;
