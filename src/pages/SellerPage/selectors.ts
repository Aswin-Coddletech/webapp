import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import { sellerListSelector,
    loadingSelector } from "src/redux/seller/selectors";   

    import {
        userAccountSelector,
        userAccountLoadingSelector
    } from 'src/redux/user-account/selectors'
    
    import {
        onSearchFilterChangeSelector,
        onPaginationChangeSelector
    } from 'src/redux/utils/selectors'
    
    import { ISellerPageData } from "./SellerPage";
    
    export default createStructuredSelector<IRootState, ISellerPageData> ({
        list: sellerListSelector,
        loading:loadingSelector,
        userAccount: userAccountSelector,
        userAccountLoading: userAccountLoadingSelector,
        filterValue:onSearchFilterChangeSelector,
        currentPage: onPaginationChangeSelector
    })