import React from 'react'
import Highlight from 'react-highlight.js'

export default (props) => {
  const object = {
    hi: 2,
    there: false,
  }

  const babelConfig = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      'babel-plugin-styled-components',
    ],
  }
  const plaintext = 'node_modules\ndist\n'

  return <div className="generated-code">
    <h3>package.json</h3>
    <Highlight language="json">
      {JSON.stringify(object, null, 2)}
    </Highlight>
    <h3>.babelrc</h3>
    <Highlight language="json">
      {JSON.stringify(babelConfig, null, 2)}
    </Highlight>
    <h3>.gitignore</h3>
    <Highlight language="plaintext">
      {plaintext}
    </Highlight>
  </div>
}
