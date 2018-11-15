import React from 'react'
import styled from 'styled-components'

const ConfigForm = styled.div`
  form {
    display: inline-block;
  }
`

export default (props) => {
  return <ConfigForm>
    <h3>{props.title}</h3>
    <form>
      {props.children}
    </form>
  </ConfigForm>
}
