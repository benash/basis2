import React from 'react'

export const Section: React.SFC<{ className?: string, title: string }> = (props) => (
  <section className={props.className}>
    <h3>{props.title}</h3>
    <form>
      {props.children}
    </form>
  </section>
)
