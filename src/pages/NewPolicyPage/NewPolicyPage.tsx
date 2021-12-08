/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Table,
  Descriptions,
  Checkbox,
  Radio,
  Slider,
  Steps,
  Spin
} from "antd";
import { Redirect } from "react-router-dom";

import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import ss from "./NewPolicyPage.module.scss";
import { IPolicy } from "src/interfaces/Insurance.interface";
import { IOrder } from "src/interfaces/Payment.interface";
import { IInventory } from "src/interfaces/Inventory.interface";
import InsurancePolicyCard from "src/components/InsurancePolicyCard";
import StripeButton from "src/components/StripeButton";
import { ROUTES } from "src/constants/routes";
import { colorMelloonPrimary } from "src/constants/colors";
import {
  CheckSquareOutlined,
  RightOutlined,
  HomeOutlined
} from "@ant-design/icons";

const { Column } = Table;
const Step = Steps.Step;

const steps = [
  {
    title: "Select Policy Options",
    content: "First-content"
  },
  {
    title: "Premium Payment",
    content: "Second-content"
  },
  {
    title: "Done",
    content: "Third-content"
  }
];

function dayformatter(value) {
  return `${value}days`;
}

function yearformatter(value) {
  return `${value}years`;
}

export interface INewPolicyPageData {
  loading: boolean;
  policy: IPolicy;
  order: IOrder;
  item: IInventory;
  userId: string;
  orgId: string;
  apitoken: string;
  userEmail: string;
  submitSuccess: string;
}

export interface INewPolicyPageCallbacks {
  onInit(): any;
  onSubmit(data: {}): any;
  onNewPolicyInit(): any;
}

export interface INewPolicyPageProps
  extends INewPolicyPageData,
    INewPolicyPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  screenOption: number;
  option: string;
  policyType: string;
  radiovalue: number;
  frequency: number;
  term: number;
  amount: number;
  current: number;
  paymentError: string;
  paymentMessage: string;
  paymentSuccess: string;
  tokenLoading: boolean;
}

export class NewPolicyPage extends Component<INewPolicyPageProps, ILocalState> {
  constructor(props) {
    super(props);

    //set default option
    this.state = {
      screenOption: 1,
      option: "home",
      policyType: "default",
      radiovalue: 1,
      frequency: 1,
      term: 1,
      amount: 0,
      current: 0,
      paymentError: "",
      paymentSuccess: "",
      paymentMessage: "",
      tokenLoading: false
    };

    //set state based on input properties
    if (
      this.props.location.state &&
      this.props.location.state["option"] === "item"
    ) {
      this.state = {
        screenOption: 3,
        option: "item",
        policyType: "equipment",
        radiovalue: 1,
        frequency: 1,
        term: 1,
        amount: 0,
        current: 0,
        paymentError: "",
        paymentSuccess: "",
        paymentMessage: "",
        tokenLoading: false
      };
    }
  }

  componentDidMount() {
    this.props.onInit();
    this.props.onNewPolicyInit();
  }

  renderDate = (input_date: string) => moment(input_date).format("DD.MM.YYYY");

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  next() {
    if (this.state.current === 0) {
      //submit policy & create new order
      this.props.onSubmit({
        option: "item",
        policyType: "equipment",
        insurerId: "Munich Re",
        insurerName: "Munich Re",
        termType: "REGULAR", // Regular or On-Demand
        frequency: this.state.frequency === 1 ? "MONTHLY" : "QUARTERLY",
        term: this.state.term * 12, //year to month conversion
        premiumAmount:
          (this.props.item.buyAmount || 0) / 12 < 1
            ? 1
            : currency((this.props.item.buyAmount || 0) / 12).value,
        franchiseAmount:
          (this.props.item.buyAmount || 0) / 10 < 1
            ? 1
            : currency((this.props.item.buyAmount || 0) / 10).value,
        coverAmount: currency(this.props.item.buyAmount || 0).value,
        coverCcy: "EUR",
        warranties: [
          {
            warrantyType: 1,
            description: "Liquid Damage",
            amount: currency(this.props.item.buyAmount || 0).value
          },
          {
            warrantyType: 2,
            description: "Accidental Damage",
            amount: currency(this.props.item.buyAmount || 0).value
          },
          {
            warrantyType: 3,
            description: "Robbery with violence",
            amount: currency(this.props.item.buyAmount || 0).value
          }
        ],
        warrantedItems: [{ itemId: this.props.item.itemId }],
        status: "pending",
        policy: { policyId: "newpolicyId", policyNumber: "newpolicyNumber" },
        order: {
          orderId: "neworderId",
          orderNumber: "neworderNumber",
          txnType: "newpolicy"
        }
      });
    }

    const current = this.state.current + 1;
    this.setState({ current });

    if (current === 1) {
      this.setState({
        paymentError: "",
        paymentSuccess: "",
        paymentMessage: "",
        amount:
          (this.props.item.buyAmount || 0) / 12 < 1
            ? 1
            : (this.props.item.buyAmount || 0) / 12
      });
    }
  }

  prev() {
    const current = this.state.current - 1;
    if (current >= 0) {
      this.setState({ current });
    }
  }

  togglePolicyCard = (policy: IPolicy) => {
    //console.log('in toggle policy card');

    //this.props.changeSelectedPolicy(policy);

    this.setState({
      screenOption: 2
    });
  };

  toggleList = () => {
    //console.log('in toggle list');
    this.setState({
      screenOption: 1
    });
  };

  onRadioChange = e => {
    //console.log('radio checked', e.target.value);
    this.setState({
      radiovalue: e.target.value
    });
  };

  onFrequencyChange = e => {
    //console.log('frequency radio checked', e.target.value);
    this.setState({
      frequency: e.target.value
    });
  };

  onTermChange = value => {
    //console.log('term changed', value);
    this.setState({
      term: value
    });
  };

  onPaymentToken = () => {
    this.setState({
      current: 2,
      paymentSuccess: "",
      paymentMessage: "",
      tokenLoading: true
    });
  };

  onPaymentSuccess = () => {
    //console.log('HOC pay success');
    this.setState({
      current: 2,
      paymentSuccess: "First Premium Paid Successfully.",
      paymentMessage: "Your new Insurance Policy has been activated!",
      tokenLoading: false
    });
  };

  onPaymentFailure = () => {
    //console.log('HOC pay fail');
    this.setState({
      current: 2,
      paymentError: "Payment Failed!",
      paymentMessage:
        "Pay the first premium anytime to activate your New Insurance Policy",
      tokenLoading: false
    });
  };

  redirectToProductList = () => {
    this.setState({
      screenOption: 5
    });
  };

  renderPrevNextButtons = current => (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/*(current >= 0 && current < steps.length - 1) && (
        <Button className={ss.actionbutton} type="primary" onClick={() => this.prev()} disabled={current <= 0}>
          Previous
        </Button>
      )*/}
      {current < steps.length - 2 && (
        <Fragment>
          <Button
            className={ss.actionbutton}
            type="primary"
            onClick={() => this.redirectToProductList()}
            disabled={this.state["option"] !== "item"}
          >
            Cancel
          </Button>
          <Button
            className={ss.actionbutton}
            type="primary"
            onClick={() => this.next()}
            disabled={this.state["option"] !== "item"}
          >
            Save and Proceed <RightOutlined />
          </Button>
        </Fragment>
      )}
      {current === steps.length - 2 && (
        <StripeButton
          IStripeButtonHocCallback={{
            paymentSuccess: this.onPaymentSuccess,
            paymentFailure: this.onPaymentFailure,
            paymentToken: this.onPaymentToken
          }}
          IStripeButtonHocData={{
            userId: this.props.userId,
            orgId: this.props.orgId,
            apitoken: this.props.apitoken,

            txnType: "newpolicy",
            orderId: this.props.order.orderId,
            orderNumber: this.props.order.orderNumber || "sample ordderNumber",
            orderReference: {
              policyId: this.props.policy.policyId || "sample policyId",
              policyNumber:
                this.props.policy.policyNumber || "sample policyNumber",
              term: this.state.term || 1
            },

            paymentDescription:
              "Insurance Payment: Policy#" + this.props.policy.policyNumber ||
              "sample policyNumber",
            userEmail:
              process.env.NODE_ENV === "production"
                ? this.props.userEmail || "sample@email.com"
                : "local@melloon.com",
            amount: currency(this.state.amount).value || 0,
            ccy: "EUR",
            buttonDisabled:
              typeof this.props.policy["policyId"] === "undefined" ||
              typeof this.props.order["orderId"] === "undefined",
            buttonLabel: "Pay Insurance Premium"
          }}
        />
      )}
    </div>
  );

  renderItemImages = () => {
    //let prefix = "https://melloon-user-uploads.s3.eu-central-1.amazonaws.com/";
    //let url = prefix + primaryImageSource;

    let publicurl =
      "https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg";
    //let sourceurl = this.props.item.base64imageUrl ? this.props.item.base64imageUrl : publicurl;
    let sourceurl = this.props.item.presignedImageUrl
      ? this.props.item.presignedImageUrl
      : publicurl;

    return (
      <div
        style={{
          verticalAlign: "middle",
          display: "table",
          marginBottom: "10px"
        }}
      >
        <div className={ss.thumbnail}>
          <img
            className={ss.thumbnail}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              objectFit: "contain"
            }}
            src={sourceurl}
            alt={"item"}
          ></img>
        </div>
      </div>
    );
  };

  renderNewItemPolicy = current => {
    switch (current) {
      case 0:
        //console.log("current step 0");
        return this.renderNewItemPolicyStepOne();
      case 1:
        //console.log("current step 1");
        return this.renderNewItemPolicyPayment();
      case 2:
        //console.log("current step LAST");
        return this.renderNewItemPolicyLastStep();
      default:
        break;
    }
  };

  renderNewItemPolicyPayment = () => {
    console.log(
      "in renderNewItemPolicyPayment policy:",
      this.props.policy,
      this.props.policy.policyNumber,
      this.props.policy.premiumAmount
    );
    return (
      <Fragment>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          {this.props.submitSuccess === "YES" && (
            <div>
              <p className={ss.successMessage} style={{ color: "green" }}>
                New Insurance Policy created successfully!
              </p>
              <p
                className={ss.successMessage}
                style={{ paddingTop: "0px", color: colorMelloonPrimary }}
              >
                Pay your first premium to activate the policy:
              </p>
            </div>
          )}
          {this.props.submitSuccess === "NO" && (
            <div className={ss.successMessage}>
              <p> Policy creation failed! </p>
              <p></p>
            </div>
          )}
          <div
            style={{ paddingLeft: "10px", paddingTop: "0px", marginTop: "0px" }}
          >
            <Descriptions
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Policy Number">
                <span>{this.props.policy.policyNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Premium Amount">
                <span>
                  {this.renderAmount(this.props.policy.premiumAmount)}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Spin>
      </Fragment>
    );
  };

  renderNewItemPolicyLastStep = () => {
    return (
      <Fragment>
        <Spin
          spinning={this.props.loading || this.state.tokenLoading}
          style={{ marginTop: "40px" }}
        >
          <Row>
            <Col>
              <div className={ss.successMessage} style={{ color: "green" }}>
                {this.state.paymentSuccess} {this.state.paymentError}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={ss.successMessage} style={{ color: "green" }}>
              {this.state.paymentMessage}
            </Col>
          </Row>
          <Row>
            <Col className={ss.successMessage}>
              <Link to="/di/dilist"> Go to Product List! </Link>
            </Col>
          </Row>
        </Spin>
      </Fragment>
    );
  };

  renderNewItemPolicyStepOne = () => {
    const { item } = this.props;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      verticalAlign: "top"
    };

    return (
      <Fragment>
        <Row justify="start" gutter={16} style={{ width: "100%" }}>
          <Col>{this.renderItemImages()}</Col>
          <Col>
            <div>{item.oem || "--"}</div>
            <div>{item.oemProductModel || "--"}</div>
          </Col>
          <Col>
            <div>Current Value:</div>
            <div>{this.renderAmount(item.buyAmount)}</div>
          </Col>
        </Row>
        <Row justify="space-between" gutter={16} style={{ width: "100%" }}>
          <Col>
            <div style={{ paddingBottom: "10px" }}>
              <h4>Policy Type:</h4>
              <Radio.Group
                onChange={this.onRadioChange}
                value={this.state.radiovalue}
              >
                <Radio style={radioStyle} value={1}>
                  Regular / Long Term
                </Radio>
                <Radio
                  className={ss.radioStyleHideForMobile}
                  value={2}
                  disabled
                >
                  On-Demand / Short Term
                </Radio>
              </Radio.Group>
            </div>
          </Col>
          <Col>
            <div style={{ paddingBottom: "10px" }}>
              <h4> Frequency: </h4>
              {this.state.radiovalue === 1 ? (
                <Radio.Group
                  onChange={this.onFrequencyChange}
                  value={this.state.frequency}
                >
                  <Radio style={radioStyle} value={1}>
                    Monthly
                  </Radio>
                  <Radio className={ss.radioStyleHideForMobile} value={2}>
                    Quarterly
                  </Radio>
                </Radio.Group>
              ) : (
                <Checkbox disabled checked>
                  Daily
                </Checkbox>
              )}
            </div>
          </Col>
          <Col>
            <div
              className={ss.hideMeForMobile}
              style={{ paddingBottom: "10px" }}
            >
              Term:
              {this.state.radiovalue === 1 ? (
                <Slider
                  tooltipVisible
                  tooltipPlacement={"bottom"}
                  tipFormatter={yearformatter}
                  onChange={this.onTermChange}
                  min={0}
                  max={5}
                  defaultValue={1}
                  style={{ width: "200px", paddingBottom: "10px" }}
                ></Slider>
              ) : (
                <Slider
                  tooltipVisible
                  tooltipPlacement={"bottom"}
                  tipFormatter={dayformatter}
                  onChange={this.onTermChange}
                  min={0}
                  max={30}
                  defaultValue={1}
                  style={{ width: "200px", paddingBottom: "10px" }}
                ></Slider>
              )}
            </div>
          </Col>
          <Col>
            <div
              style={{
                justifyContent: "start",
                textAlign: "left",
                paddingRight: "20px",
                paddingBottom: "20px"
              }}
            >
              <h4>
                {" "}
                Premium: &nbsp;
                {this.state.radiovalue === 1
                  ? this.renderAmount(
                      (item.buyAmount || 0) / 12 < 1
                        ? 1
                        : (item.buyAmount || 0) / 12
                    )
                  : this.renderAmount(
                      (item.buyAmount || 0) / 24 < 1
                        ? 1
                        : (item.buyAmount || 0) / 24
                    )}
              </h4>
              <h4>
                {" "}
                Franchise: &nbsp;
                {this.state.radiovalue === 1
                  ? this.renderAmount((item.buyAmount || 0) / 10)
                  : this.renderAmount((item.buyAmount || 0) / 2)}
              </h4>
            </div>
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            {" "}
            <h3 style={{ fontWeight: "bold" }}> Insurance Warranties</h3>
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            {" "}
            <CheckSquareOutlined style={{ paddingRight: "5px" }} /> Liquid
            Damage
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            {" "}
            <CheckSquareOutlined style={{ paddingRight: "5px" }} /> Accidental
            Damage
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            {" "}
            <CheckSquareOutlined style={{ paddingRight: "5px" }} /> Robbery with
            violence
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderNewDefaultPolicy = current => {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px"
        }}
      >
        <p>Home Insurance: Coming soon...!</p>
        <p>
          For Item Insurance, select an Item from:
          <Link to={ROUTES.DI_LIST}>
            <HomeOutlined style={{ paddingLeft: "20px" }} /> Product List
          </Link>
        </p>
      </div>
    );
  };

  renderPolicyOptions = () => {
    return (
      <Fragment>
        <Checkbox disabled checked={this.state["option"] === "home"}>
          {" "}
          Home{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "travel"}>
          {" "}
          Travel{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "travel"}>
          {" "}
          Vehicle{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "item"}>
          {" "}
          Equipment{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "art"}>
          {" "}
          Art{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "jewellery"}>
          {" "}
          Jewellery{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "antique"}>
          {" "}
          Antique{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "collectibles"}>
          {" "}
          Collectibles{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state["option"] === "collectibles"}>
          {" "}
          Commercial{" "}
        </Checkbox>
      </Fragment>
    );
  };

  renderScreen = () => {
    switch (this.state.screenOption) {
      case 1:
        //console.log("current option 1");
        return this.renderNewDefaultPolicy(this.state.current);
      case 2:
        //console.log("current option 2");
        return this.renderNewDefaultPolicy(this.state.current);
      case 3:
        //console.log("current option 3");
        return this.renderNewItemPolicy(this.state.current);
      case 5:
        return <Redirect to={ROUTES.DI_LIST} push={true}></Redirect>;
      default:
        break;
    }
  };

  render() {
    return (
      <Row justify="space-between" align="top" className={ss.root}>
        <Col xs={24} style={{ width: "100%" }}>
          {this.state["option"] === "item" && (
            <Row
              justify="center"
              align="middle"
              style={{ paddingBottom: "16px", width: "100%" }}
            >
              <Col>
                <h3
                  style={{
                    color: colorMelloonPrimary,
                    fontWeight: "bold",
                    margin: "0px 0px"
                  }}
                >
                  New Insurance Policy
                </h3>
              </Col>
            </Row>
          )}

          {this.state["option"] !== "item" && (
            <Row justify="center">
              <Col style={{ paddingBottom: "16px" }}>
                <h3 style={{ color: colorMelloonPrimary, fontWeight: "bold" }}>
                  Melloon Insurance{" "}
                </h3>
              </Col>
            </Row>
          )}

          <Row justify="center">
            <Col
              xs={24}
              style={{ paddingBottom: "20px", textAlign: "center" }}
              className={ss.hideMeForMobile}
            >
              {this.renderPolicyOptions()}
            </Col>
          </Row>

          <Row justify="center" align="middle">
            <Col xs={24}>
              <Steps current={this.state.current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Col>
          </Row>

          <Row>
            <Col xs={24}>{this.renderScreen()}</Col>
          </Row>

          <Row justify="center" align="middle">
            <Col xs={24}>{this.renderPrevNextButtons(this.state.current)}</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
