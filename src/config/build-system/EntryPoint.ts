import { JsConfigFile } from '../ConfigFile'

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <p>Welcome to my app</p>
  </body>
</html>
`

export class EntryPoint {
  constructor(private jsName: string, private htmlName: string) {}
  configs() {
    return [
      new JsConfigFile(this.jsName, "console.log('Hello, world!')\n"),
      { name: this.htmlName, language: 'html', contents: html },
    ]
  }
}
