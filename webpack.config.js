const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const PugPlugin = require('pug-plugin')
const { srcPath, buildPath, templatePath } = require('./project.config')

const entries = {};
const templateFiles = fs.readdirSync(path.resolve(__dirname, templatePath))
const htmlPlugins = templateFiles.map((templateFile, index) => {
  let { name } = path.parse(templateFile)
  entries[name] = `${templatePath}/${templateFile}`
})

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    // NOTE: All source scripts and styles should be used directly in Pug.

    // you can define Pug files manually in webpack entry
    //index: `${templatePath}/index.pug`, // output index.html
    // or generate entries dynamically
    ...entries
  },
  devtool: devMode ? 'source-map' : false,

  output: {
    path: path.resolve(__dirname, buildPath),
    filename: devMode ? 'js/[name].js' : 'js/[name].[fullhash:4].js',
    publicPath: '/',
    clean: true,
  },

  // use aliases in sources instead of relative paths
  resolve: {
    alias: {
      Views: path.join(__dirname, srcPath, 'pages/'),
      Images: path.join(__dirname, srcPath, 'images/'),
      Fonts: path.join(__dirname, srcPath, 'fonts/'),
      Styles: path.join(__dirname, srcPath, 'sass/'),
      Scripts: path.join(__dirname, srcPath, 'js/'),
    },
  },

  // the devServer do same as BrowserSyncPlugin
  devServer: {
    static: path.join(__dirname, buildPath),
    compress: true,
    port: 9000,
    open: true, // open in browser

    // watch files for live reload
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },

  optimization: {
    // the Webpack in production mode optimizes and minimizes JS and CSS
    //minimizer: [new TerserJSPlugin()]
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: PugPlugin.loader,
            options: {
              method: 'render' // fast method to generate static HTML files
            }
          }
        ]
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // enough only these loaders, without additional options
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.svg|eot|otf|ttf|woff|woff2$/,
        //type: 'asset/inline', // font files are too big for inline
        type: 'asset/resource',
        include: /fonts\//, // use fonts from `fonts/` directory only
        generator: {
          // output filename of fonts
          filename: 'fonts/[name][ext][query]',
        },
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|mov|mp4|ico|webmanifest|xml)$/i,
        type: 'asset/resource',
        include: /images\//, // use images from `images/` directory only
        generator: {
          filename: (name) => {
            const path = name.filename.split('/').slice(1, -1).join('/')
            return `${path}/[name].[fullhash:8][ext]`
          }
        }
      }
    ]
  },

  plugins: [
    // enable processing of Pug files from entry
    new PugPlugin({
      verbose: devMode, // output information about the process to console
      pretty: devMode, // formatting of HTML
      modules: [
        // module extracts CSS from source styles used in Pug
        PugPlugin.extractCss({
          // output filename of styles
          filename: devMode ? './css/style.css' : 'css/[name].[contenthash:4].css',
        }),
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
