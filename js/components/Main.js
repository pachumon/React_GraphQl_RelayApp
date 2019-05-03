import React, { Component } from "react";
// import API from "../API";
// import LinkStore from "../stores/LinkStore";
import PropTypes from "prop-types";
import Relay from "react-relay/classic";
import Link from "./Link";

// let _getAppState = () => {
//   return { links: LinkStore.getAllLinks() };
// };

class Main extends Component {
  // state = _getAppState();

  static defaultProps = {
    limit: 3
  };

  static propTypes = {
    limit: PropTypes.number.isRequired
  };

  // componentDidMount() {
  //   API.fetchLinks();
  //   LinkStore.on("change", this.onChange);
  // }

  // componentWillUnmount() {
  //   LinkStore.removeListener("change", this.onChange);
  // }

  // onChange = () => {
  //   console.log("4.in view");
  //   this.setState(_getAppState());
  // };

  render() {
    console.log(this.props);
    
    let content = this.props.store.links
      .slice(0, this.props.limit)
      .map((link, index) => {
        return <Link key={index} link={link} />;
      });
    return (
      <div>
        <h3>links</h3>
        <ul>{content}</ul>
      </div>
    );
  }
}

Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
  fragment on Store{
    links{
      _id,
      ${Link.getFragment('link')}    
    }
  }
  `
  }
});

export default Main;
