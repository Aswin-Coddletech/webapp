import { connect } from "react-redux";

import actions from './actions'
import selector from './selectors'

import { SellerPage } from './SellerPage'

export default connect(selector,actions)(SellerPage)