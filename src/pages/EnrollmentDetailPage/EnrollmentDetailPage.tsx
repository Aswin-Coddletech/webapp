import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button, Alert } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IQuote } from "src/interfaces/Quotes.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import ss from "./EnrollmentDetailPage.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";

export interface IEnrollmentDetailPageData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
  frEnrollSuccess: string;
  inspectedUser: any;
  approvedUser: any;
}

export interface IEnrollmentDetailPageHocData {}

export interface IEnrollmentDetailPageCallbacks {
  //inspectionComplete(quoteId: string): any;
  getQuote(quoteId: any): any;
  frEnrollment(quoteId: any): any;
  //observationInfo(data: {}): any;
}

export interface IEnrollmentDetailPageHocCallbacks {
  //changeSelectedQuote(quote: IQuote): any;
}

export interface ILocalState {
  locationStateEnroll: any;
  completeModalVisible: boolean;
}

export interface IEnrollmentDetailPageProps
  extends IEnrollmentDetailPageData,
    IEnrollmentDetailPageHocData,
    IEnrollmentDetailPageCallbacks,
    IEnrollmentDetailPageHocCallbacks,
    RouteComponentProps {}

export class EnrollmentDetailPage extends React.Component<
  IEnrollmentDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateEnroll: {},
      completeModalVisible: false
    };
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState({ locationStateEnroll: this.props.location.state }, () => {
        this.props.getQuote(this.state.locationStateEnroll.quoteId);
      });
    }
  }

  onFinish = values => {
    console.log(values);
    //this.props.observationInfo(values);
  };

  submitInspection = (id, completeModalVisible) => {
    this.setState({ completeModalVisible });
    //this.props.inspectionComplete(id);
  };

  completeModal(completeModalVisible) {
    this.setState({ completeModalVisible });
  }

  renderFrEnrollmentAction = quote => {
    return (
      <div style={{ marginTop: "10px" }}>
        {quote.loanType === "ABL-SINGLE-ANDROID-FR" &&
          quote.isCollateralAcquisitionComplete === false && (
            <div>
              <Row>
                <Col lg={10}>
                  <Button
                    type="primary"
                    className={ss.buttonStyle}
                    onClick={() => this.props.frEnrollment(quote.quoteId)}
                  >
                    Android FR Enrollment to Testing
                  </Button>
                </Col>
              </Row>
            </div>
          )}
      </div>
    );
  };

  render() {
    const { loading } = this.props;
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
        <div className={ss.successMsg}>
          {!loading && this.props.frEnrollSuccess === "YES" && (
            <Alert message="Device FR Enrolled Successfully" type="success" />
          )}
          {!loading && this.props.frEnrollSuccess === "NO" && (
            <Alert message="Device FR Enrollment Failed" type="error" />
          )}
        </div>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <div style={{ marginBottom: "40px" }}>
            {" "}
            {/* {Object.keys(quote).length !== 0 &&
              this.renderFrEnrollmentAction(quote)}{" "} */}
          </div>
          <Fragment>
            <QuoteCard {...IQuoteCardHocData} {...IQuoteCardHocCallback} />
          </Fragment>
        </Spin>
      </>
    );
  }
}
