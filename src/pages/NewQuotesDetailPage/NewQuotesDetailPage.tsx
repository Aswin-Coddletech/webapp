import * as React from "react";
import { Fragment } from "react";
import { Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IQuote } from "src/interfaces/Quotes.interface";
//import ss from "./NewQuotesDetailPage.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface INewQuotesDetailPageData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface INewQuotesDetailPageHocData {}

export interface INewQuotesDetailPageCallbacks {
  getQuoteDetail(quoteId: any): any;
}

export interface INewQuotesDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface INewQuotesDetailPageProps
  extends INewQuotesDetailPageData,
    INewQuotesDetailPageHocData,
    INewQuotesDetailPageCallbacks,
    INewQuotesDetailPageHocCallbacks,
    RouteComponentProps {}

export class NewQuotesDetailPage extends React.Component<
  INewQuotesDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateInspection: {},
      completeModalVisible: false
    };
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState(
        { locationStateInspection: this.props.location.state },
        () => {
          this.props.getQuoteDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }
  render() {
    //const { quote, loading } = this.props;
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
    console.log("this.props", this.props);
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
