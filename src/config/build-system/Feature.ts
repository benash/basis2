import { PartialJsConfigFile, Literal, RegExpLiteral } from '../PartialJsConfigFile'
import { WebpackConfig } from '../ConfigStore';
import { PlainRequire, Require, CamelizedRequire } from '../Require'

export abstract class Feature {
  isEnabled: boolean
  devDependencies: string[]
  partialFileContents: PartialJsConfigFile

  static allFeatures(config: WebpackConfig): Feature[]  {
    return [
      WebpackBaseFeature,
      WebpackCssFeature,
      WebpackImagesFeature,
      WebpackFontsFeature,
      WebpackCsvFeature,
      WebpackXmlFeature,
      WebpackCleanFeature,
      WebpackHtmlFeature,
    ].map(F => new F(config))
  }
}

class WebpackBaseFeature implements Feature {
  constructor(private config: WebpackConfig) { }

  isEnabled = true

  devDependencies = ['webpack', 'webpack-cli']

  get partialFileContents() {
    return new PartialJsConfigFile({
      requires: [new PlainRequire('path')],
      configObj: {
        entry: this.config.entry,
        output: {
          filename: this.config.outputFilename,
          path: new Literal(`path.resolve(__dirname, '${this.config.outputPath}')`)
        }
      }
    })
  }
}

abstract class WebpackRuleFeature implements Feature {
  test: RegExpLiteral
  use: string[]
  isEnabled: boolean
  devDependencies: string[]

  get partialFileContents() {
    return new PartialJsConfigFile({
      requires: [],
      configObj: {
        module: {
          rules: [
            {
              test: this.test,
              use: this.use
            }
          ]
        }
      }
    })
  }
}

class WebpackCssFeature extends WebpackRuleFeature {
  constructor(private webpackConfig: WebpackConfig) { super() }

  get isEnabled() { return this.webpackConfig.loadCss }

  devDependencies = ['style-loader', 'css-loader']
  test = new RegExpLiteral(/\.css$/)
  use = ['style-loader', 'css-loader']
}

class WebpackImagesFeature extends WebpackRuleFeature {
  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadImages }

  devDependencies = ['file-loader']
  test = new RegExpLiteral(/\.(png|svg|jpg|gif)$/)
  use = ['file-loader']
}

class WebpackFontsFeature extends WebpackRuleFeature {
  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadFonts }

  devDependencies = ['file-loader']
  test = new RegExpLiteral(/\.(woff|woff2|eot|ttf|otf)$/)
  use = ['file-loader']
}

class WebpackCsvFeature extends WebpackRuleFeature {
  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadCsv }

  devDependencies = ['csv-loader']
  test = new RegExpLiteral(/\.(csv|tsv)$/)
  use = ['csv-loader']
}

class WebpackXmlFeature extends WebpackRuleFeature {
  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadXml }

  devDependencies = [ 'xml-loader' ]
  test = new RegExpLiteral(/\.xml$/)
  use = ['xml-loader']
}

abstract class WebpackPluginFeature implements Feature {
  abstract isEnabled: boolean
  abstract devDependencies: string[]
  abstract requires: Require[]
  abstract plugin: string

  get partialFileContents() {
    return new PartialJsConfigFile({
      requires: this.requires,
      configObj: {
        plugins: [ this.plugin ]
      }
    })
  }
}

class WebpackHtmlFeature extends WebpackPluginFeature {
  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.useHtmlPlugin }

  requires = [ new CamelizedRequire('html-webpack-plugin') ]
  devDependencies = [ 'html-webpack-plugin' ]
  plugin = `new HtmlWebpackPlugin({ title: 'My First App' })`
}

class WebpackCleanFeature extends WebpackPluginFeature {
  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.useCleanPlugin }

  requires = [ new CamelizedRequire('clean-webpack-plugin') ]
  devDependencies = [ 'clean-webpack-plugin' ]
  plugin = `new CleanWebpackPlugin('${this.config.outputPath}')`
}
