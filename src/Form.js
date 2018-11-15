import React from 'react'

export default (props) => {
  return <div>
    <h3>Webpack Options</h3>
    <form className="webpack-options">
      <label>
        Entry file: <input value="./src/index.js" readOnly></input>
      </label>
      <label>
        Output path: <input value="dist" readOnly></input>
      </label>
      <label>
        Output filename: <input value="bundle.js" readOnly></input>
      </label>
    </form>

    <h3>Loaders</h3>
    <form className="loaders">
      <label><input type="checkbox"></input>ES6+</label>
      <label><input type="checkbox"></input>React with JSX</label>
    </form>
  </div>
}
