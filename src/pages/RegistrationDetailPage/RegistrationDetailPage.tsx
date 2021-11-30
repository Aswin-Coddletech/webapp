import * as React from "react";
import { Fragment } from "react";
import { Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IQuote } from "src/interfaces/Quotes.interface";
//import ss from "./RegistrationDetailPage.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IRegistartionDetailPageData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
  //submitSuccess: string;
}

export interface IRegistartionDetailPageHocData {}

export interface IRegistartionDetailPageCallbacks {
  //inspectionComplete(quoteId: string): any;
  getInspection(quoteId: any): any;
  //observationInfo(data: {}): any;
}

export interface IRegistartionDetailPageHocCallbacks {
  //changeSelectedQuote(quote: IQuote): any;
}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface IRegistartionDetailPageProps
  extends IRegistartionDetailPageData,
    IRegistartionDetailPageHocData,
    IRegistartionDetailPageCallbacks,
    IRegistartionDetailPageHocCallbacks,
    RouteComponentProps {}

export class RegistartionDetailPage extends React.Component<
  IRegistartionDetailPageProps,
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
          this.props.getInspection(this.state.locationStateInspection.quoteId);
        }
      );
    }
  }

  // onFinish = (values) => {
  //   console.log(values);
  //   this.props.observationInfo(values);
  // };

  // submitInspection = (id, completeModalVisible) => {
  //   this.setState({ completeModalVisible });
  //   this.props.inspectionComplete(id);
  // };

  // completeModal(completeModalVisible) {
  //   this.setState({ completeModalVisible });
  // }

  // renderObservationAction = (quote) => {
  //   const { locationStateInspection } = this.state;
  //   return (
  //     <div style={{ marginTop: "10px" }}>
  //       {quote.inspectedAt ? (
  //         ""
  //       ) : (
  //         <div>
  //           {/* <Row>
  //             <Col>
  //               {" "}
  //               <br />
  //               <h3 style={{ fontWeight: "bold" }}> Add Observation </h3>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col lg={10}>
  //               <Form name="nest-messages" onFinish={this.onFinish}>
  //                 <Form.Item name="observation" label="Observation">
  //                   <Input.TextArea rows={4} />
  //                 </Form.Item>
  //                 {this.props.quote.collateralInspectionMethod ===
  //                   "INHOUSE-INSPECTION" && (
  //                   <Button type="primary" htmlType="submit">
  //                     Save
  //                   </Button>
  //                 )}

  //                 <Button
  //                   type="primary"
  //                   className={ss.buttonStyle}
  //                   // onClick={(e) =>
  //                   //   this.submitInspection(locationStateInspection.quoteId)
  //                   // }
  //                   onClick={() => this.completeModal(true)}
  //                 >
  //                   Complete Inspection!
  //                 </Button>
  //               </Form>
  //             </Col>
  //           </Row> */}

  //           {/* <Modal
  //             title="Complete Inspection"
  //             centered
  //             visible={this.state.completeModalVisible}
  //             onOk={() =>
  //               this.submitInspection(locationStateInspection.quoteId, false)
  //             }
  //             onCancel={() => this.completeModal(false)}
  //           >
  //             <p>Do you really want to complete the inspection?</p>
  //           </Modal> */}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

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
        {/* <div className={ss.successMsg}>
          {!loading && this.props.submitSuccess === "YES" && (
            <Alert message="Quote Inspected Successfully" type="success" />
          )}
          {!loading && this.props.submitSuccess === "NO" && (
            <Alert message="Quote Inspection Failed" type="error" />
          )}
        </div> */}
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <QuoteCard {...IQuoteCardHocData} {...IQuoteCardHocCallback} />
          </Fragment>
          {/* <div>
            {" "}
            {Object.keys(quote).length !== 0 &&
              this.renderObservationAction(quote)}{" "}
          </div> */}
        </Spin>{" "}
      </>
    );
  }
}
