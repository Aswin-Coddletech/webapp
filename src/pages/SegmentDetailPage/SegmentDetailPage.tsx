import * as React from "react";
import { Fragment } from "react";
import {
  Spin,
  Button,
  message,
  Modal,
  Descriptions,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import { RouteComponentProps } from "react-router-dom";
import ss from "./SegmentDetailPage.module.scss";
import { UserCard } from "../../components/UserCard/UserCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

const { Option } = Select;

export interface ISegmentDetailPageData {
  loading: boolean;
  userAccount: IUserAccount;
}

export interface ISegmentDetailPageHocData {}

export interface ISegmentDetailPageCallbacks {
  getUser(userId: any): any;
}

export interface ISegmentDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
  showIdentityModal: boolean;
  showPaymentModal: boolean;
}

export interface ISegmentDetailPageProps
  extends ISegmentDetailPageData,
    ISegmentDetailPageHocData,
    ISegmentDetailPageCallbacks,
    ISegmentDetailPageHocCallbacks,
    RouteComponentProps {}

export class SegmentDetailPage extends React.Component<
  ISegmentDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationState: {},
      showIdentityModal: false,
      showPaymentModal: false,
    };
  }

  componentDidMount() {
    console.log("this.props user Details", this.props.location.state);
    if (this.props.location.state != null) {
      this.setState({ locationState: this.props.location.state }, () => {
        this.props.getUser(this.state.locationState.id);
      });
    } else {
      this.setState({ locationState: this.props.location.state }, () => {
        //this.props.getUser("b4203855-c25a-491f-9959-e81346a573b9");
        this.props.getUser("2c8544de-9cb1-4842-b5ea-c6ef68be2e47");
      });
    }
  }

  updateSegmentPayment = (values) => {
    console.log(values);
    try {
      window.analytics.track("payment", {
        amountPaid: values.amountPaid,
        ccy: values.ccy,
        loanNumber: values.loanNumber,
        isLoanFullyRepaid: values.isLoanFullyRepaid,
        app_name: "Back Office",
        app_version: "1.0.0",
        utc_date_time: values.paymentDate || " ",
      });
      message.success("Segment Payment Track successfully updated");
      this.setState({ showPaymentModal: false });
    } catch (error) {
      message.error(error);
    }
  };

  updateSegmentIdentity = (userAccount) => {
    try {
      window.analytics.identify(userAccount.userId, {
        customer_account_number: userAccount.customerAccountNumber,
        city: userAccount.address.city,
        zip_code: userAccount.address.zipCode,
        telephone: userAccount.phoneNumber,
        monthly_income: userAccount.monthlyIncome,
        income_periodicity: userAccount.incomePeriodicity,
        family_size: userAccount.familySize,
        occupation: userAccount.occupation,
        kyc_status: userAccount.kycStatus,
        request_number: userAccount.loansRequestedCount,
        loans_active: userAccount.loansActiveCount,
        accepted_number: userAccount.loansSignedAndAcceptedCount,
        email: userAccount.emailId,
        CLTV: 0,
        last_payment: "",
        people_referred: 0,
        referral_link: "",
        status: false,
        unpaid_time: 0,
        app_name: "Back Office",
        app_version: "1.0.0",
      });
      message.success("Segment Identity successfully updated");
      this.setState({ showIdentityModal: false });
    } catch (error) {
      message.error(error);
    }
  };

  onFinish = (values) => {
    console.log(values);
    this.updateSegmentPayment(values);
  };

  render() {
    const IUserCardHocData = {
      loading: this.props.loading,
      userAccount: this.props.userAccount,
    };
    const IUserCardHocCallback = {
      //onInit: this.props.onInit,
    };
    const { userAccount } = this.props;
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <div style={{ marginBottom: "10px" }}>
              <Button
                type="primary"
                style={{ marginBottom: "10px" }}
                onClick={() => this.setState({ showIdentityModal: true })}
              >
                Update Segment Identity
              </Button>
              <Button
                type="primary"
                style={{ marginBottom: "10px", marginLeft: "10px" }}
                onClick={() => this.setState({ showPaymentModal: true })}
              >
                Update Payment Segment Track
              </Button>
            </div>
            <Modal
              title="Update Identity"
              centered
              visible={this.state.showIdentityModal}
              okText="Submit"
              onOk={() => this.updateSegmentIdentity(userAccount)}
              onCancel={() => this.setState({ showIdentityModal: false })}
            >
              <Descriptions column={1}>
                <Descriptions.Item label="Email">
                  <span>{userAccount.emailId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="customerAccountNumber">
                  <span>{userAccount.customerAccountNumber}</span>
                </Descriptions.Item>
                {userAccount.address !== undefined && (
                  <Descriptions.Item label="city">
                    <span>{userAccount.address.city}</span>
                  </Descriptions.Item>
                )}
                {userAccount.address !== undefined && (
                  <Descriptions.Item label="zipCode">
                    <span>{userAccount.address.zipCode}</span>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Telephone">
                  <span>{userAccount.phoneNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="monthlyIncome">
                  <span>{userAccount.monthlyIncome}</span>
                </Descriptions.Item>
                <Descriptions.Item label="income Periodicity">
                  <span>{userAccount.incomePeriodicity}</span>
                </Descriptions.Item>
                <Descriptions.Item label="familySize">
                  <span>{userAccount.familySize}</span>
                </Descriptions.Item>
                <Descriptions.Item label="occupation">
                  <span>{userAccount.occupation}</span>
                </Descriptions.Item>
                <Descriptions.Item label="kycStatus">
                  <span>{userAccount.kycStatus}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Active Loan Count">
                  <span>{userAccount.loansActiveCount}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Requested Loan Count">
                  <span>{userAccount.loansRequestedCount}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Signed And Accepted Loan Count">
                  <span>{userAccount.loansSignedAndAcceptedCount}</span>
                </Descriptions.Item>
              </Descriptions>
            </Modal>
            <Modal
              title="Update Payment"
              centered
              visible={this.state.showPaymentModal}
              okText="Submit"
              footer={null}
              onOk={() => this.updateSegmentPayment}
              onCancel={() => this.setState({ showPaymentModal: false })}
            >
              <Form
                name="nest-messages"
                layout="vertical"
                initialValues={{
                  remember: true,
                  ccy: "MXN",
                }}
                onFinish={this.updateSegmentPayment}
              >
                <Form.Item
                  name="loanNumber"
                  label="Loan Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Loan Number",
                    },
                  ]}
                >
                  <Input
                    className={ss.inputField}
                    style={{ width: 400 }}
                    placeholder="Please enter Loan Number"
                  />
                </Form.Item>
                <Form.Item
                  name="ccy"
                  label="CCY"
                  rules={[
                    {
                      required: true,
                      message: "Select the Payment Currency",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Payment Currency"
                    //defaultValue={this.state.filterStatus}
                    style={{ width: 400, marginBottom: "10px" }}
                    //onChange={this.handleChange}
                  >
                    <Option value="MXN">MXN</Option>
                    <Option value="EURO">EURO</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amountPaid"
                  label="Payment Amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Payment Amount",
                    },
                  ]}
                >
                  <InputNumber
                    min={10}
                    style={{ width: 400 }}
                    className={ss.inputField}
                    placeholder="Please enter Payment Amount"
                  />
                </Form.Item>
                <Form.Item
                  name="paymentDate"
                  label="Payment Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Payment Date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: 400 }}
                    showTime
                    placeholder="Please select Payment Date"
                  />
                </Form.Item>
                <Form.Item
                  name="isLoanFullyRepaid"
                  label="Loan is fully repaid"
                  rules={[
                    {
                      required: true,
                      message: "Select Loan fully repaid",
                    },
                  ]}
                >
                  <Select style={{ width: 400, marginBottom: "10px" }}>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginBottom: "10px" }}
                >
                  Submit
                </Button>
              </Form>
            </Modal>
            <UserCard {...IUserCardHocData} {...IUserCardHocCallback} />
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
