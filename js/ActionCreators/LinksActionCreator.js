import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/ActionTypes";

let serverActions = {
  receiveLinks(links) {
    console.log("2.in server actions");

    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_LINKS,
      data: links
    });
  }
};

export default serverActions;
