import React, { Component } from "react";
// import API from "../API";
// import LinkStore from "../stores/LinkStore";
import PropTypes from "prop-types";
import Relay from "react-relay/classic";
import Link from "./Link";
import CreateLinkMutation from '../Mutations/CreateLinkMutation'

// let _getAppState = () => {
//   return { links: LinkStore.getAllLinks() };
// };

class Main extends Component {
  // state = _getAppState();
  state = {
    form_title: "",
    form_url: ""
  };
  // static defaultProps = {
  //   limit: 3
  // };

  // static propTypes = {
  //   limit: PropTypes.number.isRequired
  // };

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
  onSelectChanged = e => {
    let newlimit = Number(e.target.value);
    console.log(newlimit);
    this.props.relay.setVariables({ limit: newlimit });
  };

  handleSubmit = e => {
    e.preventDefault();
    Relay.Store.commitUpdate(
      new CreateLinkMutation({
        title:this.refs.newTitle.value,
        url:this.refs.newUrl.value,
        store:this.props.store
      })
    );
    
    this.refs.newTitle.value="";
    this.refs.newUrl.value="";
  };

  render() {
    console.log(this.props);

    let content = this.props.store.linkConnection.edges
      // .slice(0, this.props.limit)
      .map((edge, index) => {
        return <Link key={index} link={edge.node} />;
      });
    return (
      <div>
        <h3>links</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="title" ref="newTitle" />
          <input type="text" placeholder="url" ref="newUrl" />
          <button type="submit">Add</button>
        </form>
        <select onChange={this.onSelectChanged} defaultValue="4">
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
        <ul>{content}</ul>
      </div>
    );
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    limit:40
  },
  fragments: {
    store: () => Relay.QL`
  fragment on Store{
    id,
    linkConnection(first:$limit){
      edges{
        node{
          id,
          ${Link.getFragment("link")}    
        }
      }
    }
  }
  `
  }
});

export default Main;
