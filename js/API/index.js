import { post } from "jquery";
import serverActions from "../ActionCreators/LinksActionCreator";

let API = {
  fetchLinks() {
    console.log("1.in api");
    post("/graphql", { query: `{links{_id,title,url}}` }).done(resp => {
      serverActions.receiveLinks(resp.data.links);
    });
  }
};

export default API;
