import { getUser } from "src/redux/user-account/actions";

export default {
  onInit: getUser,
  onMatiExit: getUser,
  onMatiFinished: getUser
};
