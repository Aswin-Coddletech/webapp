import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteDetailCard } from "./QuoteDetailCard";

export default connect(selector, actions)(QuoteDetailCard);
