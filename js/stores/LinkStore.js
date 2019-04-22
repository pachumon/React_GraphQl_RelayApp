import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/ActionTypes";
import { EventEmitter } from "events";

let _links = [];
class LinkStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          console.log("3. in store");
          _links = action.data;
          this.emit("change");
          break;

        default:
        //do nothing
      }
    });
  }

  getAllLinks(){
      return _links;
  }
}

export default new LinkStore();
