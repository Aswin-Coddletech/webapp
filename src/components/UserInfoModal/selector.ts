import { createStructuredSelector } from "reselect";

import {} from "../../redux/home-page/selectors";

import { IRootState } from "../../redux/reducer";

import { IUserInfoData } from "./UserInfoModal";

export default createStructuredSelector<IRootState, IUserInfoData>({});
