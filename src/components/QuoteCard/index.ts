import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteCard } from "./QuoteCard";

export default connect(selector, actions)(QuoteCard);
