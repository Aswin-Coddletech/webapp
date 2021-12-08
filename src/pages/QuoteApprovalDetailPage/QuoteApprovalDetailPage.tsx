import * as React from "react";
import { Fragment } from "react";
import {
  Card,
  Descriptions,
  Button,
  Spin,
  Row,
  Col,
  Form,
  Alert,
  Modal,
  Input,
  Checkbox,
  Radio,
  InputNumber
} from "antd";
import { RouteComponentProps } from "react-router-dom";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IQuote } from "src/interfaces/InstantQuote.interface";
import ss from "./QuoteApprovalDetailPage.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

const { TextArea } = Input;

export interface IQuoteApprovalDetailPageData {
  loading: boolean;
  quote: IQuote;
  submitSuccess: string;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IQuoteApprovalDetailPageHocData {}

export interface IQuoteApprovalDetailPageCallbacks {
  refreshQuote(quoteId?: string): void;
  getQuote(quoteId: any): any;
  approveQuote(quoteId: any, status: any): any;
  rejectedQuote(
    quoteId: any,
    status: any,
    rejectedReason: string,
    rejectionType: string
  ): any;
}

export interface IQuoteApprovalDetailPageHocCallbacks {
  //changeSelectedQuote(quote: IQuote): any;
}

export interface ILocalState {
  locationState: any;
  rejectedModal: boolean;
  rejectionReason: string;
  errorMsg: string;
  editAmountVisible: boolean;
  successMsg: string;
  quotePrincipalAmount: number;
  quoteInterestAmount: number;
  quoteTotalAmount: number;
  kycNotApprovedPopup: boolean;
  visible: boolean;
  checkboxValue: any;
  checkboxString: string;
  checkToString: string;
}

export interface IQuoteApprovalDetailPageProps
  extends IQuoteApprovalDetailPageData,
    IQuoteApprovalDetailPageHocData,
    IQuoteApprovalDetailPageCallbacks,
    IQuoteApprovalDetailPageHocCallbacks,
    RouteComponentProps {}

export class QuoteApprovalDetailPage extends React.Component<
  IQuoteApprovalDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationState: {},
      rejectedModal: false,
      rejectionReason: "",
      errorMsg: "",
      editAmountVisible: false,
      successMsg: "",
      quotePrincipalAmount: 0,
      quoteInterestAmount: 0,
      quoteTotalAmount: 0,
      kycNotApprovedPopup: false,
      visible: true,
      checkboxValue: [],
      checkboxString: "",
      checkToString: ""
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

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderTitle = quoteId => {
    // eslint-disable-next-line
    let t = !this.props.loading ? "Quote#:" + "\xa0" + quoteId : "";
    return t;
  };

  onFinish = rejectionValues => {
    const checkarray = this.state.checkboxValue;
    console.log("onFinish", rejectionValues);
    console.log("quoteId", this.props.quote.quoteId);
    const { quote } = this.props;
    this.setState({
      checkToString: checkarray.join()
    });
    const rejectionReason = checkarray.join() + "," + rejectionValues.rejection;
    console.log("combined", rejectionReason);
    console.log("checkboxToString", this.state.checkToString);
    this.setState({
      rejectedModal: false,
      successMsg: "Quote Successfully Rejected"
    });
    this.props.rejectedQuote(
      quote.quoteId,
      "REJECTED",
      rejectionReason,
      rejectionValues.rejectionType
    );
  };

  kycNotApproved = () => {
    this.setState({
      kycNotApprovedPopup: true
    });
  };

  kycNotApprovedHandleOk = e => {
    console.log(e);
    this.setState({
      kycNotApprovedPopup: false
    });
  };

  kycNotApprovedHandleCancel = e => {
    console.log(e);
    this.setState({
      kycNotApprovedPopup: false
    });
  };

  quoteApproved = (quoteId, status) => {
    this.setState({ successMsg: "Quote Successfully Approved" });
    this.props.approveQuote(quoteId, status);
  };

  setRejetedModal(rejectedModal) {
    this.setState({ rejectedModal, errorMsg: "" });
  }

  rejectedPopup = (quoteId, status) => {
    this.setState({ rejectedModal: true });
  };

  onChangeValues = event => {
    console.log("checkbox", event.target.checked, event.target.value);
    const checkboxarr = this.state.checkboxValue;
    let index;
    if (event.target.checked) {
      checkboxarr.push(event.target.value);
    } else {
      index = checkboxarr.indexOf(event.target.value);
      checkboxarr.splice(index, 1);
    }
    this.setState({ checkboxValue: checkboxarr });

    console.log("checkbox array", this.state.checkboxValue);
    this.setState({ checkboxString: checkboxarr.join() });
    console.log("joined", checkboxarr.join());
    //var newArray = this.state.checkboxValue.join();
  };
  /*textHandleChange(){
    const checked = this.state.checkboxValue;
    var str = "";
  for(var i=0; i< checked.length; i++){
   str += checked[i];  
    if(i < (checked.length-1) ){
      str += ',';  
   }
  }
  console.log(str);
  }*/
  editAmountChange = (quote, value) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      let quoteInterestAmount =
        value * (quote.interestRate / 100) * (quote.term / 30);

      let quoteTotalAmount = Number(value) + quoteInterestAmount;
      this.setState({
        quoteTotalAmount,
        quoteInterestAmount,
        quotePrincipalAmount: value
      });
    }
  };

  rejectedModalPopup = quoteId => {
    // const {getFieldDecorator, getFieldValue} = this.props.form
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Modal
            title="Do you really want to reject the Quote?"
            centered={true}
            visible={this.state.rejectedModal}
            closable={false}
            width={650}
            footer={[
              <Button
                className={ss.buttonStyle}
                form="myForm"
                key="back"
                onClick={() => this.setRejetedModal(false)}
              >
                Cancel
              </Button>,
              <Button
                className={ss.buttonStyle}
                type="primary"
                form="myForm"
                key="submit"
                htmlType="submit"
              >
                Submit
              </Button>
            ]}
          >
            <Form
              name="myForm"
              //onChange={this.onChange}
              onFinish={this.onFinish}
            >
              <Row>
                <Form.Item
                  className={"ant-col-24"}
                  label="Rejection Type"
                  name="rejectionType"
                  rules={[
                    {
                      required: true,
                      message: "Please select any"
                    }
                  ]}
                >
                  <Radio.Group>
                    <Radio value="NO-MORE-LOANS" style={{ lineHeight: "32px" }}>
                      Reject, unEnroll collateral item, and no more loans in
                      future
                    </Radio>
                    <Radio value="SINGLE-LOAN" style={{ lineHeight: "32px" }}>
                      Reject and unEnroll collateral item
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Row>
              <Form.Item
                className={"ant-col-24"}
                label="Rejection Reasons"
                name="rejectionReason"
                rules={[
                  {
                    required: true,
                    message: "Please select any"
                  }
                ]}
              >
                <Checkbox.Group>
                  <Col>
                    <Checkbox
                      id="checkbox"
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="too_young_email"
                    >
                      Too young email
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="ea_score_high"
                    >
                      Email age score high
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="ea_high_fraud_risk"
                    >
                      Email age high fraud risk
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="ea_fraud_history"
                    >
                      Email age has marked the user as a fraud in the past
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="ea_score_not_found"
                    >
                      Email age score not found
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="cdc_high_debt"
                    >
                      CDC high debt
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="cdc_high_overdues"
                    >
                      CDC high overdues
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="cdc_score_not_found"
                    >
                      CDC score not found
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="cdc_profile_bad"
                    >
                      CDC profile is bad
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="kyc_rejected"
                    >
                      KYC rejected
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="multiple_devices"
                    >
                      Multiple devices
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      style={{ lineHeight: "32px" }}
                      onChange={this.onChangeValues}
                      ref="check_me"
                      value="other"
                    >
                      Other
                    </Checkbox>
                  </Col>
                </Checkbox.Group>
              </Form.Item>
              <div style={{ marginBottom: "20px" }}>
                <TextArea value={this.state.checkboxString} />
              </div>
              <Form.Item
                className={"ant-col-24"}
                label="Rejection Reason"
                name="rejection"
                rules={[
                  {
                    required: true,
                    message: "Enter the reasons"
                  }
                ]}
              >
                <TextArea rows={4} id="textarea" value="This is textarea" />
              </Form.Item>
            </Form>
          </Modal>
        </Spin>
      </>
    );
  };

  setEditAmountModal(editAmountVisible) {
    this.setState({
      editAmountVisible
    });
  }

  editAmountModal = () => {
    const { quote } = this.props;
    return (
      <>
        <Modal
          title="Edit Amount"
          visible={this.state.editAmountVisible}
          onOk={() => this.setEditAmountModal(false)}
          onCancel={() => this.setEditAmountModal(false)}
        >
          <Form
            //{...layout}
            name="edit_amount_form"
            initialValues={{
              remember: false,
              principalAmount: quote.principalAmount
            }}
          >
            <h4>Edit Principal Amount:</h4>
            <Form.Item
              name="principalAmount"
              rules={[
                {
                  required: true,
                  message: "Please enter new Principal Amount!"
                }
              ]}
            >
              <InputNumber
                onChange={value => this.editAmountChange(quote, value)}
                placeholder="Enter New Amount"
              />
            </Form.Item>
            <Descriptions style={{ marginTop: "10px" }}>
              <Descriptions.Item label="Term">
                <span>{quote.term} Days</span>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Interest Rate">
                <span>{quote.interestRatePerMonth}% Per Month</span>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Interest Amount">
                <span>
                  {this.state.quoteInterestAmount !== 0
                    ? this.renderAmount(this.state.quoteInterestAmount)
                    : this.renderAmount(quote.interestAmount)}
                </span>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Total Amount">
                <span>
                  <strong>
                    {this.state.quoteTotalAmount !== 0
                      ? this.renderAmount(this.state.quoteTotalAmount)
                      : this.renderAmount(quote.repaymentTotalAmount)}
                  </strong>
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Form>
        </Modal>
      </>
    );
  };

  renderActionData = quote => {
    return (
      <div style={{ marginTop: "10px" }}>
        {quote.status === "NEW" && (
          <Row>
            <Col>
              <Button
                type="primary"
                style={{ marginBottom: "10px" }}
                onClick={() => this.setEditAmountModal(true)}
              >
                Edit Amount
              </Button>
            </Col>

            <Col lg={7}>
              <Form name="nest-messages" onFinish={this.onFinish}>
                <Form.Item>
                  {/* <Button
                    type="primary"
                    onClick={(e) => this.kycNotApproved()}
                    danger
                  >
                    Approve!
                  </Button>

                  <Modal
                    title="KYC Verification"
                    visible={this.state.kycNotApprovedPopup}
                    centered
                    onOk={this.kycNotApprovedHandleOk}
                    onCancel={this.kycNotApprovedHandleCancel}
                    footer={null}
                  >
                    <p>
                      User KYC is not verified, approval can be done after KYC
                      verification.{" "}
                    </p>
                  </Modal> */}

                  <Button
                    type="primary"
                    onClick={e => this.quoteApproved(quote.quoteId, "APPROVED")}
                  >
                    Approve!
                  </Button>
                  <Button
                    type="primary"
                    className={ss.buttonStyle}
                    onClick={e => this.rejectedPopup(quote.quoteId, "REJECTED")}
                    danger
                  >
                    Reject!
                  </Button>

                  {this.rejectedModalPopup(quote.quoteId)}

                  {/* <Button
                    type="primary"
                    style={{ backgroundColor: "orange", borderColor: "orange" }}
                    className={ss.buttonStyle}
                  >
                    Hold!
                  </Button> */}

                  {this.editAmountModal()}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
        {/*})}*/}
      </div>
    );
  };

  renderCard = () => {
    const { quote, loading } = this.props;
    return (
      <>
        <Card
          //hoverable
          loading={loading}
          headStyle={{ textAlign: "center", fontWeight: "bold" }}
          bodyStyle={{ textAlign: "left" }}
          title={this.renderTitle(quote.quoteNumber)}
        >
          <Card.Meta description={" "}></Card.Meta>
          {/* <div> {this.renderOtherQuoteData(quote)} </div> */}
        </Card>
      </>
    );
  };

  render() {
    const { quote, loading } = this.props;
    const { successMsg } = this.state;
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
        <div className={ss.successMsg}>
          {!loading && this.props.submitSuccess === "YES" && (
            <Alert
              message={successMsg}
              type={
                successMsg === "Quote Successfully Rejected"
                  ? "error"
                  : "success"
              }
            />
          )}
          {!loading && this.props.submitSuccess === "NO" && (
            <Alert message="Quote Failed" type="error" />
          )}
        </div>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <QuoteCard {...IQuoteCardHocData} {...IQuoteCardHocCallback} />
          </Fragment>
          <div> {this.renderActionData(quote)} </div>
        </Spin>{" "}
      </>
    );
  }
}
