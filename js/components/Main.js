import React, { Component } from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";
import PropTypes from "prop-types";

let _getAppState = () => {
  return { links: LinkStore.getAllLinks() };
};

class Main extends Component {  

  state = _getAppState();

  static defaultProps = {
    limit: 2
  };

  static propTypes = {
    limit: PropTypes.number.isRequired
  };

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }

  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }

  onChange = () => {
    console.log("4.in view");
    this.setState(_getAppState());
  };

  render() {
    let content = this.state.links
      .slice(0, this.props.limit)
      .map((link, index) => {
        return (
          <li key={index}>
            <a href="{link.url}">{link.title}</a>
          </li>
        );
      });
    return (
      <div>
        <h3>links</h3>
        <ul>{content}</ul>
      </div>
    );
  }
}


export default Main;