import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import Relay from 'react-relay'

ReactDOM.render(<Main/>, document.getElementById("root"));

console.log(
  Relay.QL`
  query test{
      links{
          title,
          url
      }
  }
  `
);