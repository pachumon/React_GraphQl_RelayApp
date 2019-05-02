import { post } from "jquery";
import serverActions from "../ActionCreators/LinksActionCreator";

let API = {
  fetchLinks() {
    console.log("1.in api");
    post("/graphql", { query: `{store{links{_id,title,url}}}` }).done(resp => {
      serverActions.receiveLinks(resp.data.store.links);
    });
  }
};

export default API;
