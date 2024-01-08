const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');
  ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProduction = !isDev;

// Основные пути к папкам
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

// Кофиг для лоадеров, при production mode добавить обработку babel
const getModuleConfig = () => {
  const initialConfig = {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  };

  if (isProduction) {
    initialConfig.rules.push({
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {targets: '>0.25%'}],
          ],
        },
      },
    });
  }

  return initialConfig;
};

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[contenthash].${ext}`;

// Конфиг webpack
module.exports = {
  context: PATHS.src,
  mode: process.env.NODE_ENV,
  entry: './index.js',
  output: {
    filename: filename('js'),
    path: PATHS.dist,
    clean: true, // Очистка папки dist при каждой сборке
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': PATHS.src,
      '@core': path.resolve(PATHS.src, 'core'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(PATHS.src, 'static'),
          to: PATHS.dist,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    // eslint-disable-next-line no-undef
    new ESLintPlugin(),
  ],
  module: getModuleConfig(),
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 4200,
    compress: true,
    hot: true,
    open: true,
  },
};