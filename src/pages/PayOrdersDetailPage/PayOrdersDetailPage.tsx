import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IDisbursal } from "src/interfaces/Loans.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

//import ss from "./PayOrdersDetailPage.module.scss";
import { DisbursalCard } from "../../components/DisbursalCard/DisbursalCard";

export interface IPayOrdersDetailPageData {
  loading: boolean;
  payOrder: IDisbursal;
  userAccount: IUserAccount;
  disbursadUser: any;
}

export interface IPayOrdersDetailPageHocData {}

export interface IPayOrdersDetailPageCallbacks {
  getPayOrder(disbursalId: any): any;
}

export interface IPayOrdersDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
}

export interface IPayOrdersDetailPageProps
  extends IPayOrdersDetailPageData,
    IPayOrdersDetailPageHocData,
    IPayOrdersDetailPageCallbacks,
    IPayOrdersDetailPageHocCallbacks,
    RouteComponentProps {}

export class PayOrdersDetailPage extends React.Component<
  IPayOrdersDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationState: {}
    };
  }

  componentDidMount() {
    console.log("this.props Quote Details", this.props.location.state);
    if (this.props.location.state != null) {
      this.setState({ locationState: this.props.location.state }, () => {
        this.props.getPayOrder(this.state.locationState.id);
      });
    }
  }

  submitPayOrder = disbursalId => {
    //this.setState({ successMsg: "Quote Successfully Approved" });
    //this.props.submitPayOrder(disbursalId);
  };

  render() {
    const { loading } = this.props;

    const IDisbursalCardHocData = {
      disbursal: this.props.payOrder,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      disbursadUser: this.props.disbursadUser
    };
    const IDisbursalCardHocCallback = {
      //onInit: this.props.onInit,
    };
    return (
      <>
        <Spin spinning={loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <div style={{ marginBottom: "10px" }}>
              <Row>
                <Col>
                  <DisbursalCard
                    {...IDisbursalCardHocData}
                    {...IDisbursalCardHocCallback}
                  />
                </Col>
              </Row>
            </div>
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
