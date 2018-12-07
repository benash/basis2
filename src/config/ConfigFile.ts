export interface ConfigFile {
  name: string
  contents: string
  language: string
}

export class JsonConfigFile implements ConfigFile {
  contents: string
  constructor(public name: string, public language: string, obj: object) {
    this.contents = JSON.stringify(obj, null, 2)
  }
}

export class JsConfigFile {
  language: string = 'js'

  constructor(public name: string, public contents: string) {}
}
