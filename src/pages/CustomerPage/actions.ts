import { getCustomerList } from "src/redux/customer/actions";
//import { userAccountDetail } from "src/redux/user-account/actions";
import { onSearchFilterChange, onPagenatationChange } from "src/redux/utils/actions";

export default {
    //getUser: userAccountDetail,
    getCustomerList,
    //onInit: getCustomerList,
    onSearchFilterChange,
    onPagenatationChange
}