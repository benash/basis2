import React from 'react'

import SourceContents from './Section'

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
    <SourceContents filename='package.json' language='json'>
      {JSON.stringify(object, null, 2)}
    </SourceContents>
    <SourceContents filename='.babelrc' language='json'>
      {JSON.stringify(babelConfig, null, 2)}
    </SourceContents>
    <SourceContents filename='.gitignore' language='plaintext'>
      {plaintext}
    </SourceContents>
  </div>
}
