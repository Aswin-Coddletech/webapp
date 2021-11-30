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

import ss from "./ManualSTPMEXDetailPage.module.scss";
import { DisbursalCard } from "../../components/DisbursalCard/DisbursalCard";
import moment from "moment";

const { Option } = Select;

export interface IManualSTPMEXDetailPageData {
  loading: boolean;
  disbursal: IDisbursal;
  userAccount: IUserAccount;
  disbursalCreatedUserAccount: IUserAccount;
  saveSTPMEXSuccess: string;
  disbursadUser: any;
}

export interface IManualSTPMEXDetailPageHocData {}

export interface IManualSTPMEXDetailPageCallbacks {
  saveManualSTPMEXTransaction(
    disbursalId: any,
    stpmexRegistraOrdenId: any,
    stpmexPayorderSubmittedAt: any,
    stpmexPayorderCompletedAt: any,
    status: any
  ): any;
  getDisbursal(disbursalId: any): any;
}

export interface IManualSTPMEXDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
}

export interface IManualSTPMEXDetailPageProps
  extends IManualSTPMEXDetailPageData,
    IManualSTPMEXDetailPageHocData,
    IManualSTPMEXDetailPageCallbacks,
    IManualSTPMEXDetailPageHocCallbacks,
    RouteComponentProps {}

export class ManualSTPMEXDetailPage extends React.Component<
  IManualSTPMEXDetailPageProps,
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
        this.props.getDisbursal(this.state.locationState.id);
      });
    }
  }

  submitPayOrder = disbursalId => {
    //this.setState({ successMsg: "Quote Successfully Approved" });
    //this.props.submitPayOrder(disbursalId);
  };

  onFinish = values => {
    console.log(values);
    this.props.saveManualSTPMEXTransaction(
      this.state.locationState.id,
      values.stpmexRegistraOrdenId,
      values.stpmexPayorderSubmittedAt,
      values.stpmexPayorderCompletedAt,
      values.status
    );
  };

  render() {
    const { loading, disbursal } = this.props;
    console.log("props", this.props);

    const IDisbursalCardHocData = {
      disbursal: this.props.disbursal,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      disbursadUser: this.props.disbursadUser
    };
    const IDisbursalCardHocCallback = {
      //onInit: this.props.onInit,
    };
    let stpmexDetails = {
      stpmexRegistraOrdenId: "",
      stpmexPayorderSubmittedAt: moment(new Date(), ["MM.DD.YYYY"]),
      status: ""
    };
    if (this.props.disbursal.stpmexDetails !== undefined) {
      if (Object.keys(this.props.disbursal.stpmexDetails).length > 0) {
        stpmexDetails = {
          stpmexRegistraOrdenId: this.props.disbursal.stpmexDetails
            .bbvaTransactinId,
          stpmexPayorderSubmittedAt: this.props.disbursal.stpmexDetails
            .stpmexPayorderSubmittedAt
            ? moment(
                this.props.disbursal.stpmexDetails.stpmexPayorderSubmittedAt
              )
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
            <Row>
              <Col>
                {disbursal.status !== "PAYORDER-FULFILLED" &&
                  this.props.userAccount.rfcNumber && (
                    <Form
                      name="nest-messages"
                      initialValues={{
                        remember: true,
                        stpmexRegistraOrdenId:
                          stpmexDetails.stpmexRegistraOrdenId,
                        stpmexPayorderSubmittedAt:
                          stpmexDetails.stpmexPayorderSubmittedAt,
                        status: stpmexDetails.status
                      }}
                      onFinish={this.onFinish}
                    >
                      <Form.Item
                        name="stpmexRegistraOrdenId"
                        rules={[
                          {
                            required: true,
                            message: "Please enter stpmexRegistraOrdenId "
                          }
                        ]}
                      >
                        <Input
                          className={ss.inputField}
                          placeholder="Please enter stpmexRegistraOrdenId"
                        />
                      </Form.Item>
                      <Form.Item
                        name="stpmexPayorderSubmittedAt"
                        rules={[
                          {
                            required: true,
                            message: "Please enter stpmexPayorderSubmittedAt "
                          }
                        ]}
                      >
                        <DatePicker
                          style={{ width: 400 }}
                          showTime
                          placeholder="Please select stpmexPayorderSubmittedAt"
                        />
                      </Form.Item>
                      <Form.Item
                        name="stpmexPayorderCompletedAt"
                        rules={[
                          {
                            required: false,
                            message: "Please enter stpmexPayorderCompletedAt "
                          }
                        ]}
                      >
                        <DatePicker
                          style={{ width: 400 }}
                          showTime
                          placeholder="Please select stpmexPayorderCompletedAt"
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
                  )}
              </Col>
            </Row>
            <div className={ss.successMsg}>
              {!loading && this.props.saveSTPMEXSuccess === "OK" && (
                <Alert
                  message={`STPMEX Transactions details are successfully saved`}
                  type="success"
                />
              )}
              {!loading && this.props.saveSTPMEXSuccess === "ERROR" && (
                <Alert
                  message={`STPMEX Transactions details save is failed`}
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
