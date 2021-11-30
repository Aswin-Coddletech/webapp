import * as React from "react";
import { Fragment } from "react";
import { Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IInventory } from "src/interfaces/Inventory.interface";
//import ss from "./RegistrationDetailPage.module.scss";
import { UserItemCard } from "../../components/UserItemCard/UserItemCard";

export interface INuovoEnrollmentsDetailPageData {
  loading: boolean;
  userItem: IInventory;
}

export interface INuovoEnrollmentsDetailPageHocData {}

export interface INuovoEnrollmentsDetailPageCallbacks {
  getUserItem(itemId: any): any;
}

export interface INuovoEnrollmentsDetailPageHocCallbacks {
  //changeSelectedQuote(quote: IQuote): any;
}

export interface ILocalState {
  locationStateEnroll: any;
  completeModalVisible: boolean;
}

export interface INuovoEnrollmentsDetailPageProps
  extends INuovoEnrollmentsDetailPageData,
    INuovoEnrollmentsDetailPageHocData,
    INuovoEnrollmentsDetailPageCallbacks,
    INuovoEnrollmentsDetailPageHocCallbacks,
    RouteComponentProps {}

export class NuovoEnrollmentsDetailPage extends React.Component<
  INuovoEnrollmentsDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateEnroll: {},
      completeModalVisible: false,
    };
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState({ locationStateEnroll: this.props.location.state }, () => {
        this.props.getUserItem(this.state.locationStateEnroll.itemId);
      });
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
    const IUserItemCardHocData = {
      userItem: this.props.userItem,
      loading: this.props.loading,
    };
    const IUserItemCardHocCallback = {
      //onInit: this.props.onInit,
    };
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
            <UserItemCard
              {...IUserItemCardHocData}
              {...IUserItemCardHocCallback}
            />
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
