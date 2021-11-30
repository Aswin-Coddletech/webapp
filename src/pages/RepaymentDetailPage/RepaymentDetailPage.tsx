import * as React from "react";
//import { Fragment } from "react";
import { Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
//import { IQuote } from "src/interfaces/Quotes.interface";
//import ss from "./RepaymentDetailPage.module.scss";
import { PaymentCard } from "../../components/PaymentCard/PaymentCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { Fragment } from "react";
import { IPayment } from "src/interfaces/Payment.interface";
//import { ILoan } from "src/interfaces/Loans.interface";

export interface IRepaymentDetailPageData {
  loading: boolean;
  userAccount: IUserAccount;
  paymentDetail: IPayment;
}

export interface IRepaymentDetailPageHocData {}

export interface IRepaymentDetailPageCallbacks {
  getPaymentDetail(paymentId: any): any;
}

export interface IRepaymentDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
}

export interface IRepaymentDetailPageProps
  extends IRepaymentDetailPageData,
    IRepaymentDetailPageHocData,
    IRepaymentDetailPageCallbacks,
    IRepaymentDetailPageHocCallbacks,
    RouteComponentProps {}

export class RepaymentDetailPage extends React.Component<
  IRepaymentDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateInspection: {}
    };
  }
  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState(
        { locationStateInspection: this.props.location.state },
        () => {
          this.props.getPaymentDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }

  render() {
    const IPaymentCardHocData = {
      //loan: this.props.loan,
      payment: this.props.paymentDetail,
      loading: this.props.loading,
      userAccount: this.props.userAccount
    };
    const IPaymentCardHocCallback = {
      //onInit: this.props.onInit,
    };
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <PaymentCard
              {...IPaymentCardHocData}
              {...IPaymentCardHocCallback}
            />
          </Fragment>
        </Spin>
      </>
    );
  }
}
