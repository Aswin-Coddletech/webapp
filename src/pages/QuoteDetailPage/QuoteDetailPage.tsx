import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IQuote } from "src/interfaces/Quotes.interface";
import ss from "./QuoteDetailPage.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IQuoteDetailPageData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IQuoteDetailPageHocData {}

export interface IQuoteDetailPageCallbacks {
  getQuoteDetail(quoteId: any): any;
}

export interface IQuoteDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface IQuoteDetailPageProps
  extends IQuoteDetailPageData,
    IQuoteDetailPageHocData,
    IQuoteDetailPageCallbacks,
    IQuoteDetailPageHocCallbacks,
    RouteComponentProps {}

export class QuoteDetailPage extends React.Component<
  IQuoteDetailPageProps,
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
          <div>
            {" "}
            <div style={{ marginTop: "10px" }}>
              <Row>
                <Col lg={7}>
                  <Button type="primary" className={ss.buttonStyle} danger>
                    Cancel!
                  </Button>
                </Col>
              </Row>
            </div>{" "}
          </div>
        </Spin>{" "}
      </>
    );
  }
}
