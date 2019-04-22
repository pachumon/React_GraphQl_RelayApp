import { getJSON } from "jquery";
import serverActions from "../ActionCreators/LinksActionCreator";

let API = {
  fetchLinks() {
    console.log('1.in api');
    getJSON("/data/links").done(resp => {      
      serverActions.receiveLinks(resp);
    });
  }
};

export default API;
