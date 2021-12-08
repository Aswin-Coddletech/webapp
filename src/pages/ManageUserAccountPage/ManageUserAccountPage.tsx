import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import ManageUserAccount from "src/components/ManageUserAccount";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IManageUserAccountPageData {
  loading: boolean;
  userInfo: IUserAccount;
  isPolicyChanged: boolean;
}
export interface IManageUserAccountPageCallbacks {
  onInit(): any;
  onMatiExit(): any;
  onMatiFinished(): any;
}
export interface IManageUserAccountPageProps
  extends IManageUserAccountPageData,
    IManageUserAccountPageCallbacks,
    RouteComponentProps {}

export class ManageUserAccountPage extends React.Component<
  IManageUserAccountPageProps
> {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    const IManageUserAccountHocData = {
      userInfo: this.props.userInfo
    };
    const IManageUserAccountHocCallback = {
      onMatiExit: this.props.onMatiExit,
      onMatiFinished: this.props.onMatiFinished
    };
    return (
      <Row justify="center" align="top" style={{ width: "100%" }}>
        <Col xs={24} style={{ textAlign: "center" }}>
          <ManageUserAccount
            {...IManageUserAccountHocData}
            {...IManageUserAccountHocCallback}
          />
        </Col>
      </Row>
    );
  }
}
