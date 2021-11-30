import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button, Form, Select, Alert } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { ILoan } from "src/interfaces/Loans.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

import ss from "./DisbursalDetailPage.module.scss";
import { LoanCard } from "../../components/LoanCard/LoanCard";

const { Option } = Select;

export interface IDisbursalDetailPageData {
  loading: boolean;
  loan: ILoan;
  userAccount: IUserAccount;
  createPayOrderSuccess: string;
  disbursedUser: any;
}

export interface IDisbursalDetailPageHocData {}

export interface IDisbursalDetailPageCallbacks {
  submitPayOrder(loanId: any, processType: any): any;
  getLoan(loanId: any): any;
}

export interface IDisbursalDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
}

export interface IDisbursalDetailPageProps
  extends IDisbursalDetailPageData,
    IDisbursalDetailPageHocData,
    IDisbursalDetailPageCallbacks,
    IDisbursalDetailPageHocCallbacks,
    RouteComponentProps {}

export class DisbursalDetailPage extends React.Component<
  IDisbursalDetailPageProps,
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

  submitPayOrder = loanId => {
    //this.setState({ successMsg: "Quote Successfully Approved" });
    //this.props.submitPayOrder(loanId);
  };

  onFinish = values => {
    console.log(values);
    this.props.submitPayOrder(this.state.locationState.id, values.filterStatus);
  };

  render() {
    const { loading } = this.props;

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
        <div className={ss.successMsg}>
          {!loading && this.props.createPayOrderSuccess === "OK" && (
            <Alert
              message={`Pay Order is successfully created`}
              type="success"
            />
          )}
          {!loading && this.props.createPayOrderSuccess === "ERROR" && (
            <Alert message={`Pay Order creation is failed`} type="error" />
          )}
        </div>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <div style={{ marginBottom: "10px" }}>
              {this.props.userAccount.rfcNumber ? (
                <Form
                  name="nest-messages"
                  onFinish={this.onFinish}
                  className={ss.formRight}
                >
                  <Form.Item
                    name="filterStatus"
                    rules={[
                      {
                        required: true,
                        message: "Select a Disbursal Process Type"
                      }
                    ]}
                  >
                    <Select
                      placeholder="Select a Disbursal Process Type"
                      //defaultValue={this.state.filterStatus}
                      style={{ width: 400, marginBottom: "10px" }}
                      //onChange={this.handleChange}
                    >
                      <Option value="AUTOMATED-MONEY-TRANSFER-FROM-STPMEX-TO-CUSTOMER">
                        AUTOMATED-MONEY-TRANSFER-FROM-STPMEX-TO-CUSTOMER
                      </Option>
                      <Option value="MANUAL-MONEY-TRANSFER-FROM-STPMEX-TO-CUSTOMER">
                        MANUAL-MONEY-TRANSFER-FROM-STPMEX-TO-CUSTOMER
                      </Option>
                      <Option value="MANUAL-MONEY-TRANSFER-FROM-BBVA-TO-CUSTOMER">
                        MANUAL-MONEY-TRANSFER-FROM-BBVA-TO-CUSTOMER
                      </Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginBottom: "10px" }}
                    //onClick={() => this.submitPayOrder(loan.loanId)}
                  >
                    Create Pay Order
                  </Button>
                </Form>
              ) : (
                <Alert
                  message="User rfcNumber is missing. Cannot create Pay order"
                  type="warning"
                  showIcon
                />
              )}
            </div>
            <Row>
              <Col>
                <LoanCard {...ILoanCardHocData} {...ILoanCardHocCallback} />
              </Col>
            </Row>
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
