import React, { Component } from "react";
import Relay from 'react-relay/classic'

class Link extends Component {
  render() {
    let { link } = this.props;
    return (
      <li>
        <a href="{link.url}">{link.title}</a>
      </li>
    );
  }
}

Link = Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL`
    fragment on Link{        
        title,
        url      
    }
    `
  }
});

export default Link;
