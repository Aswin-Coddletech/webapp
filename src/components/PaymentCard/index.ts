import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { PaymentCard } from "./PaymentCard";

export default connect(selector, actions)(PaymentCard);
