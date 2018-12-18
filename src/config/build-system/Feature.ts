import { PartialJsConfigFile, Literal, RegExpLiteral } from '../PartialJsConfigFile'
import { WebpackConfig } from '../ConfigStore'
import { PlainRequire, Require, CamelizedRequire } from '../Require'

export abstract class Feature {
  abstract isEnabled: boolean
  abstract devDependencies: string[]
  abstract partialFileContents: PartialJsConfigFile

}

export class WebpackBaseFeature implements Feature {
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

  isEnabled = true
  devDependencies = ['webpack', 'webpack-cli']

  constructor(private config: WebpackConfig) { }

  get partialFileContents() {
    return new PartialJsConfigFile(
      [ new PlainRequire('path') ],
      {
        entry: this.config.entry,
        output: {
          filename: this.config.outputFilename,
          path: new Literal(`path.resolve(__dirname, '${this.config.outputPath}')`),
        },
      },
    )
  }
}

abstract class WebpackRuleFeature implements Feature {
  abstract test: RegExpLiteral
  abstract use: string[]
  abstract isEnabled: boolean
  abstract devDependencies: string[]

  get partialFileContents() {
    return new PartialJsConfigFile(
      [],
      {
        module: {
          rules: [
            {
              test: this.test,
              use: this.use,
            },
          ],
        },
      },
    )
  }
}

class WebpackCssFeature extends WebpackRuleFeature {
  devDependencies = [ 'style-loader', 'css-loader' ]
  test = new RegExpLiteral(/\.css$/)
  use = ['style-loader', 'css-loader']

  constructor(private webpackConfig: WebpackConfig) { super() }

  get isEnabled() { return this.webpackConfig.loadCss }
}

class WebpackImagesFeature extends WebpackRuleFeature {
  devDependencies = ['file-loader']
  test = new RegExpLiteral(/\.(png|svg|jpg|gif)$/)
  use = ['file-loader']

  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadImages }
}

class WebpackFontsFeature extends WebpackRuleFeature {
  devDependencies = ['file-loader']
  test = new RegExpLiteral(/\.(woff|woff2|eot|ttf|otf)$/)
  use = ['file-loader']

  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadFonts }
}

class WebpackCsvFeature extends WebpackRuleFeature {
  devDependencies = ['csv-loader']
  test = new RegExpLiteral(/\.(csv|tsv)$/)
  use = ['csv-loader']

  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadCsv }
}

class WebpackXmlFeature extends WebpackRuleFeature {
  devDependencies = [ 'xml-loader' ]
  test = new RegExpLiteral(/\.xml$/)
  use = ['xml-loader']

  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.loadXml }
}

abstract class WebpackPluginFeature implements Feature {
  abstract isEnabled: boolean
  abstract devDependencies: string[]
  abstract requires: Require[]
  abstract plugin: string

  get partialFileContents() {
    return new PartialJsConfigFile(
      this.requires,
      {
        plugins: [ this.plugin ],
      },
    )
  }
}

class WebpackHtmlFeature extends WebpackPluginFeature {
  requires = [ new CamelizedRequire('html-webpack-plugin') ]
  devDependencies = [ 'html-webpack-plugin' ]
  plugin = "new HtmlWebpackPlugin({ title: 'My First App' })"

  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.useHtmlPlugin }
}

class WebpackCleanFeature extends WebpackPluginFeature {
  requires = [ new CamelizedRequire('clean-webpack-plugin') ]
  devDependencies = [ 'clean-webpack-plugin' ]
  plugin = `new CleanWebpackPlugin('${this.config.outputPath}')`

  constructor(private config: WebpackConfig) { super() }

  get isEnabled() { return this.config.useCleanPlugin }
}
