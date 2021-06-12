import { combineReducers } from "redux";

import counter from "./counter";
import transaction from "./transaction";

export default combineReducers({
  counter,
  transaction,
});
