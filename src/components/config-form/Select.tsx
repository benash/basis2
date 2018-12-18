import React from 'react'
import { observer } from 'mobx-react'

interface SelectProps {
  name: string,
  container: { [key: string]: any },
  children: React.ReactNode,
}

@observer
class Select extends React.Component<SelectProps> {
  changeVal(e: React.FormEvent<HTMLSelectElement>) {
    this.props.container[name] = e.currentTarget.value
  }

  render() {
    const { name, container, children } = this.props
    return (
      <select
        name={name}
        value={container[name]}
        onChange={(e) => container[name] = e.currentTarget.value}
      >
        {children}
      </select>
    )
  }
}

export default Select
