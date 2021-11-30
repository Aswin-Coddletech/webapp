import { connect } from "react-redux";

import actions from './actions'
import selector from './selectors'

import { OrderPage } from './OrderPage'

export default connect(selector,actions)(OrderPage)