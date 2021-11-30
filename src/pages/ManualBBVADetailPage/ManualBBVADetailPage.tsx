import * as React from "react";
import { Fragment } from "react";
import {
  Spin,
  Row,
  Col,
  Button,
  Form,
  Select,
  Alert,
  Input,
  DatePicker
} from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IDisbursal } from "src/interfaces/Loans.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

import ss from "./ManualBBVADetailPage.module.scss";
import { DisbursalCard } from "../../components/DisbursalCard/DisbursalCard";
import moment from "moment";

const { Option } = Select;

export interface IManualBBVADetailPageData {
  loading: boolean;
  disbursal: IDisbursal;
  userAccount: IUserAccount;
  saveBBVASuccess: string;
  disbursadUser: any;
}

export interface IManualBBVADetailPageHocData {}

export interface IManualBBVADetailPageCallbacks {
  saveManualBBVATransaction(
    disbursalId: any,
    bbvaTransactinId: any,
    bbvaTransactinSubmittedAt: any,
    bbvaTransactinCompletedAt: any,
    status: any
  ): any;
  getDisbursal(disbursalId: any): any;
}

export interface IManualBBVADetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
  confirmSave: boolean;
}

export interface IManualBBVADetailPageProps
  extends IManualBBVADetailPageData,
    IManualBBVADetailPageHocData,
    IManualBBVADetailPageCallbacks,
    IManualBBVADetailPageHocCallbacks,
    RouteComponentProps {}

export class ManualBBVADetailPage extends React.Component<
  IManualBBVADetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationState: {},
      confirmSave: false
    };
  }

  componentDidMount() {
    console.log("this.props Quote Details", this.props.location.state);
    if (this.props.location.state != null) {
      this.setState({ locationState: this.props.location.state }, () => {
        this.props.getDisbursal(this.state.locationState.id);
      });
    }
  }

  submitPayOrder = disbursalId => {
    //this.setState({ successMsg: "Quote Successfully Approved" });
    //this.props.submitPayOrder(disbursalId);
  };

  onFinish = values => {
    this.props.saveManualBBVATransaction(
      this.state.locationState.id,
      values.bbvaTransactinId,
      values.bbvaTransactinSubmittedAt,
      values.bbvaTransactinCompletedAt,
      values.status
    );
    // if (values.status === "PAYORDER-FULFILLED") {
    //   // this;
    // } else {
    //   this.props.saveManualBBVATransaction(
    //     this.state.locationState.id,
    //     values.bbvaTransactinId,
    //     values.bbvaTransactinSubmittedAt,
    //     values.bbvaTransactinCompletedAt,
    //     values.status
    //   );
    // }
  };

  // ConfirmSaveModal = (quoteId) => {
  //   return (
  //     <Modal
  //       title="Do you really want to Reject the Quote?"
  //       centered
  //       visible={this.state.confirmSave}
  //       onOk={() => this.rejectionQuote(quoteId, "REJECTED")}
  //       onCancel={() => this.setRejetedModal(false)}
  //     >
  //       <h4>Rejection Reason:</h4>
  //       <Input.TextArea onChange={this.updateInput} />
  //       <p style={{ color: "red", fontSize: "12px" }}>{this.state.errorMsg}</p>
  //       {/* </Form.Item> */}
  //     </Modal>
  //   );
  // };

  render() {
    const { loading, disbursal } = this.props;

    const IDisbursalCardHocData = {
      disbursal: this.props.disbursal,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      disbursadUser: this.props.disbursadUser
    };
    const IDisbursalCardHocCallback = {
      //onInit: this.props.onInit,
    };
    let bbvaDetails = {
      bbvaTransactinId: "",
      bbvaTransactinSubmittedAt: moment(new Date(), ["MM.DD.YYYY"]),
      status: ""
    };

    if (this.props.disbursal.bbvaDetails !== undefined) {
      if (Object.keys(this.props.disbursal.bbvaDetails).length > 0) {
        bbvaDetails = {
          bbvaTransactinId: this.props.disbursal.bbvaDetails.bbvaTransactinId,
          bbvaTransactinSubmittedAt: this.props.disbursal.bbvaDetails
            .bbvaTransactinSubmittedAt
            ? moment(this.props.disbursal.bbvaDetails.bbvaTransactinSubmittedAt)
            : moment(new Date(), ["MM.DD.YYYY"]),
          status: this.props.disbursal.status ? this.props.disbursal.status : ""
        };
      }
    }

    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
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
            {disbursal.status !== "PAYORDER-FULFILLED" &&
              this.props.userAccount.rfcNumber && (
                <Row>
                  <Col>
                    <Form
                      name="update-bbva-details"
                      initialValues={{
                        remember: true,
                        bbvaTransactinId: bbvaDetails.bbvaTransactinId,
                        bbvaTransactinSubmittedAt:
                          bbvaDetails.bbvaTransactinSubmittedAt,
                        status: bbvaDetails.status
                      }}
                      onFinish={this.onFinish}
                    >
                      <Form.Item
                        name="bbvaTransactinId"
                        rules={[
                          {
                            required: true,
                            message: "Please enter bbvaTransactionId "
                          }
                        ]}
                      >
                        <Input
                          className={ss.inputField}
                          placeholder="Please enter BBVA Transaction Id"
                        />
                      </Form.Item>
                      <Form.Item
                        name="bbvaTransactinSubmittedAt"
                        rules={[
                          {
                            required: true,
                            message: "Please enter BBVA TransactinSubmitted At "
                          }
                        ]}
                      >
                        <DatePicker
                          style={{ width: 400 }}
                          showTime
                          placeholder="Please select BBVA TransactinSubmitted At"
                        />
                      </Form.Item>
                      <Form.Item
                        name="bbvaTransactinCompletedAt"
                        rules={[
                          {
                            required: false,
                            message:
                              "Please enter BBVA Transaction Completed At "
                          }
                        ]}
                      >
                        <DatePicker
                          style={{ width: 400 }}
                          showTime
                          placeholder="Please select BBVA Transaction Completed At"
                        />
                      </Form.Item>
                      <Form.Item
                        name="status"
                        rules={[
                          {
                            required: true,
                            message: "Select the Pay Order Status"
                          }
                        ]}
                      >
                        <Select
                          placeholder="Select a Pay Order Status"
                          //defaultValue={this.state.filterStatus}
                          style={{ width: 400, marginBottom: "10px" }}
                          //onChange={this.handleChange}
                        >
                          <Option value="PAYORDER-IN-ERROR">
                            PAYORDER-IN-ERROR
                          </Option>
                          <Option value="PAYORDER-WAITING-IN-POOL">
                            PAYORDER-WAITING-IN-POOL
                          </Option>
                          <Option value="PAYORDER-FULFILLED">
                            PAYORDER-FULFILLED
                          </Option>
                          <Option value="PAYORDER-FULFILLMENT-ERROR">
                            PAYORDER-FULFILLMENT-ERROR
                          </Option>
                          <Option value="PAYORDER-CANCELLED-BY-SERVICE-PROVIDER">
                            PAYORDER-CANCELLED-BY-SERVICE-PROVIDER
                          </Option>
                        </Select>
                      </Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginBottom: "10px" }}
                        //onClick={() => this.submitPayOrder(disbursal.disbursalId)}
                      >
                        Save
                      </Button>
                    </Form>
                  </Col>
                </Row>
              )}
            <div className={ss.successMsg}>
              {!loading && this.props.saveBBVASuccess === "OK" && (
                <Alert
                  message={`BBVA Transactions details are successfully saved`}
                  type="success"
                />
              )}
              {!loading && this.props.saveBBVASuccess === "ERROR" && (
                <Alert
                  message={`BBVA Transactions details save is failed`}
                  type="error"
                />
              )}
            </div>
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
