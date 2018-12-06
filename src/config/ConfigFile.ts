export interface ConfigFile {
  name: string;
  contents: string;
  language: string;
}

export class JsonConfigFile implements ConfigFile {
  public contents
  constructor(public name: string, public language: string, obj: object) {
    this.contents = JSON.stringify(obj, null, 2);
  }
}
