import React, { Component } from "react";
import Relay from "react-relay/classic";
import moment from "moment";

class Link extends Component {
  dateStyle = () => ({
    color: "#888",
    fontSize: "0.7em",
    marginRight: "0.5em"
  });

  dateLabel = () => {
    let { link, relay } = this.props;
    if(relay.hasOptimisticUpdate(link)){
      return 'Saving...';
    }
    return moment(link.createdAt).format("L");
  };

  render() {
    let { link } = this.props;

    return (
      <li>
        <span style={this.dateStyle()}>{this.dateLabel()}</span>
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
        url,
        createdAt    
    }
    `
  }
});

export default Link;
