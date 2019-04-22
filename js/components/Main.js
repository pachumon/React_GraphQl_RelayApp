import React, { Component } from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { links: LinkStore.getAllLinks() };
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }

  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }

  onChange() {
    console.log("4.in view");

    this.setState(_getAppState());
  }

  render() {
    let content = this.state.links.map((link, index) => {
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
