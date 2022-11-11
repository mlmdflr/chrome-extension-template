import { readdirSync, statSync } from "fs";
import { resolve, join, extname, basename } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import Components from 'unplugin-vue-components/webpack'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import webpack from 'webpack'
import type { Configuration } from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WebpackHookPlugin from 'webpack-hook-plugin'
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin'

function assetsPath(_path: string) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? './static'
    : 'static'
  return join(assetsSubDirectory, _path)
}

const mode: any = process.env.MODE ?? 'development'

const isDev = mode === 'development'

const config: Configuration = {
  devtool: "source-map",	// 启用sourceMap
  mode,
  entry: {
    'background': resolve('src', 'main/background'),
    'popup': resolve('src', 'main/popup')
  },
  output: {
    path: resolve(__dirname, './chrome'),
    publicPath: './',
    filename: '[name].js'
  },
  resolve: {
    //路徑別名
    alias: {
      '@': resolve(__dirname, 'src'),
      'static': resolve('static'),
    },
    extensions: ['.ts', '.js', '.mjs', '.json'],
  },
  module: {
    rules: [
      //swc 转码
      {
        test: /\.(tsx|jsx|ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                dynamicImport: true
              },
              target: 'es2022'
            }
          }
        }
      },
      //esm 加載
      {
        test: /\.mjs$/i,
        resolve: { byDependency: { esm: { fullySpecified: false } } },
      },
      //vue 加載
      { test: /\.vue$/, loader: 'vue-loader' },

      //靜態文件加載
      {
        test: /\.(png|svg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      //樣式加載
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /\.lazy\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      //樣式懶加載
      {
        test: /\.lazy\.(sa|sc|c)ss$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
          'css-loader',
          'sass-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/main/popup/popup.html',
      inject: 'body',
      chunks: ["popup"],
      minify: { //压缩
        removeComments: true,
        collapseWhitespace: true,
      }
    }),
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__': true,
      '__VUE_PROD_DEVTOOLS__': false
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: resolve(__dirname, 'src/manifest.json'),
        to: './'
      },
      {
        from: resolve(__dirname, 'static/'),
        to: './static/'
      }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: resolve('src', 'components.d.ts'),
    }),
  ],
}

function file(path: string) {
  let files: string[] = [];
  let dirArray = readdirSync(path);
  for (let d of dirArray) {
    let filePath = resolve(path, d);
    let stat = statSync(filePath);
    if (stat.isDirectory()) {
      files = files.concat(file(filePath));
    }
    if (stat.isFile() && extname(filePath) === ".ts") {
      files.push(basename(filePath, '.ts'));
    }
  }
  return files;
}


if (isDev) {
  config.plugins?.push(new WatchExternalFilesPlugin({
    files: [
      './src/manifest.config/**',
    ]
  }))
  config.plugins?.push(new WebpackHookPlugin({
    onBuildEnd: ['npm run build:end'],
    onBuildStart: ['npm run build:start'],
    onCompile: ['npm run build:compile']
  }))
} else delete config.devtool


for (let f of file(resolve("src/main/content"))) config.entry && (config.entry[f] = resolve('src', `main/content/${f}.ts`));

export default config
