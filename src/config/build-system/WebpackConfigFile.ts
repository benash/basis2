import { WebpackConfig } from './WebpackConfig'
import { PartialJsConfigFile } from '../PartialJsConfigFile'

export class WebpackConfigFile {
  name: string = 'webpack.config.js'
  language: string = 'js'
  contents: string

  constructor(private config: WebpackConfig) {
    this.contents = this.baseConfig.merge(this.cssConfig).serialize()
  }

  private get baseConfig() {
    return new PartialJsConfigFile({
      requires: ['path'],
      configObj: {
        entry: this.config.entry,
        output: {
          filename: this.config.outputFilename,
          path: `path.resolve(__dirname, ${this.config.outputPath})`
        }
      }
    })
  }

  private get cssConfig() {
    if (this.config.loadCss) {
      return this.loadCssConfig
    }
    return PartialJsConfigFile.empty()
  }

  private get loadCssConfig() {
    return new PartialJsConfigFile({
      requires: [],
      configObj: {
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader',
              ]
            }
          ]
        }
      }
    })
  }
}