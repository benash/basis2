import React from 'react'
import { observer } from 'mobx-react';

export default observer(
  ({ name, store, children }) => <select
    name={name}
    value={store[name]}
    onChange={(e) => { store[name] = e.target.value }}>
    {children}
  </select>
)
