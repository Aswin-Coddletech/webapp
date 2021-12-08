import * as React from "react";
import { Fragment } from "react";
import { Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { ILoan } from "src/interfaces/Loans.interface";

//import ss from "./LoanDetailPage.module.scss";
import { LoanCard } from "../../components/LoanCard/LoanCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface ILoanDetailPageData {
  loading: boolean;
  loan: ILoan;
  userAccount: IUserAccount;
  disbursedUser: any;
}

export interface ILoanDetailPageHocData {}

export interface ILoanDetailPageCallbacks {
  getLoan(loanId: any): any;
}

export interface ILoanDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
}

export interface ILoanDetailPageProps
  extends ILoanDetailPageData,
    ILoanDetailPageHocData,
    ILoanDetailPageCallbacks,
    ILoanDetailPageHocCallbacks,
    RouteComponentProps {}

export class LoanDetailPage extends React.Component<
  ILoanDetailPageProps,
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
        this.props.getLoan(this.state.locationState.id);
      });
    }
  }

  render() {
    const ILoanCardHocData = {
      loan: this.props.loan,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      disbursedUser: this.props.disbursedUser
    };
    const ILoanCardHocCallback = {
      //onInit: this.props.onInit,
    };
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <LoanCard {...ILoanCardHocData} {...ILoanCardHocCallback} />
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
