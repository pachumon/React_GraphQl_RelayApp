import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import Relay from "react-relay/classic";

class HomeRoute extends Relay.Route {
  static routeName = "Home";
  static queries = {
    store: component =>
      Relay.QL`
    query MainQuery{
      store{
        ${component.getFragment("store")}
      }
    }`
  };
}

ReactDOM.render(
  <Relay.RootContainer Component={Main} route={new HomeRoute()} />,
  document.getElementById("root")
);

// console.log(
//   Relay.QL`
//   query test{
//     store{
//       links{
//           title,
//           url
//       }
//     }
//   }
//   `
// );
