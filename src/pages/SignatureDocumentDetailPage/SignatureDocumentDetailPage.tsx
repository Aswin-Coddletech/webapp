import * as React from "react";
import { Fragment } from "react";
import { Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IQuote } from "src/interfaces/InstantQuote.interface";

//import ss from "./SignatureDocumentDetailPage.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface ISignatureDocumentDetailPageData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface ISignatureDocumentDetailPageHocData {}

export interface ISignatureDocumentDetailPageCallbacks {
  getQuote(quoteId: any): any;
  getSignatureEvents(): any;
}

export interface ISignatureDocumentDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
}

export interface ISignatureDocumentDetailPageProps
  extends ISignatureDocumentDetailPageData,
    ISignatureDocumentDetailPageHocData,
    ISignatureDocumentDetailPageCallbacks,
    ISignatureDocumentDetailPageHocCallbacks,
    RouteComponentProps {}

export class SignatureDocumentDetailPage extends React.Component<
  ISignatureDocumentDetailPageProps,
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
        this.props.getQuote(this.state.locationState.id);
      });
    }
  }

  render() {
    const IQuoteCardHocData = {
      quote: this.props.quote,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const IQuoteCardHocCallback = {
      //onInit: this.props.onInit,
    };
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <QuoteCard {...IQuoteCardHocData} {...IQuoteCardHocCallback} />
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
