/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Table,
  Checkbox,
  Radio,
  Steps,
  Spin,
  DatePicker
} from "antd";
import { Redirect } from "react-router-dom";

import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import ss from "./NewLoanPage.module.scss";
import { ILoan } from "src/interfaces/Loans.interface";
import { IInventory } from "src/interfaces/Inventory.interface";
import { ROUTES } from "src/constants/routes";
import { colorMelloonPrimary } from "src/constants/colors";
import { RightOutlined, HomeOutlined } from "@ant-design/icons";

const { Column } = Table;
const Step = Steps.Step;

const steps = [
  {
    title: "Select Loan Options",
    content: "First-content"
  },
  {
    title: "Schedule Pickup Time",
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

export interface INewLoanPageData {
  loading: boolean;
  loan: ILoan;
  item: IInventory;
  userId: string;
  orgId: string;
  apitoken: string;
  userEmail: string;
  submitSuccess: string;
}

export interface INewLoanPageCallbacks {
  onInit(): any;
  onSubmit(data: {}): any;
  onNewLoanInit(): any;
}

export interface INewLoanPageProps
  extends INewLoanPageData,
    INewLoanPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  screenOption: number;
  option: string;
  loanType: string;
  radiovalue: number;
  frequency: number;
  term: number;
  amount: number;
  current: number;
  tokenLoading: boolean;
  interestRate: number; // 6% per month
  pickupDate: string;
  pickupTimeSlot: number;
}

export class NewLoanPage extends Component<INewLoanPageProps, ILocalState> {
  constructor(props) {
    super(props);

    const today = new Date();
    const defaultPickupDate = moment(today).format("YYYY-MM-DD");
    //set default option
    this.state = {
      screenOption: 1,
      option: "consumer",
      loanType: "default",
      radiovalue: 1,
      frequency: 1,
      term: 3, // months
      amount: 0,
      current: 0,
      tokenLoading: false,
      interestRate: 6, // 6% per month
      pickupDate: defaultPickupDate,
      pickupTimeSlot: 1 // MORNING,
    };

    //set state based on input properties
    if (
      this.props.location.state &&
      this.props.location.state["option"] === "item"
    ) {
      this.state = {
        screenOption: 3,
        option: "item",
        loanType: "equipment-pawn",
        radiovalue: 1,
        frequency: 1,
        term: 3,
        amount: 0,
        current: 0,
        tokenLoading: false,
        interestRate: 6, // 6% per month
        pickupDate: defaultPickupDate,
        pickupTimeSlot: 1 // MORNING,
      };
    }
  }

  componentDidMount() {
    this.props.onInit();
    this.props.onNewLoanInit();
  }

  renderDate = (input_date: string) => moment(input_date).format("DD.MM.YYYY");

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    if (current >= 0) {
      this.setState({ current });
    }
  }

  onSubmitNewLaon() {
    const current = this.state.current + 1;
    this.setState({ current });

    //submit new loan
    this.props.onSubmit({
      option: "item",
      loanType: "equipment-pawn",
      loanCategory: "Consumer",
      loanPurpose: "Undisclosed",
      lenderId: "Melloon",
      lenderName: "Melloon Financial Services",
      term: this.state.term, // 3 Months
      termType: "SHORT-TERM", // short or long term
      repaymentType: "ONETIME",
      repaymentFrequency: this.state.frequency === 1 ? "END-OF-TERM" : "EMI",

      loanCcy: "EUR",
      interestRate: this.state.interestRate,
      interestRatePerMonth: this.state.interestRate,
      principalAmount: currency(100 || this.props.item.buyAmount).value,
      interestPerMonthAmount: currency(
        ((100 || this.props.item.buyAmount) * this.state.interestRate) / 100
      ).value,
      interestTotalAmount: currency(
        ((100 || this.props.item.buyAmount) *
          this.state.term *
          this.state.interestRate) /
          100
      ).value,
      repaymentTotalAmount: currency(
        (100 || this.props.item.buyAmount) +
          ((100 || this.props.item.buyAmount) *
            this.state.term *
            this.state.interestRate) /
            100
      ).value,
      repaymentInstallmentAmount: currency(
        (100 || this.props.item.buyAmount) +
          ((100 || this.props.item.buyAmount) *
            this.state.term *
            this.state.interestRate) /
            100
      ).value,
      repaymentInstallmentsCount: 1, //Only 1 END-OF-TERM repayment is supported currently
      emiAmount: 0, // equated monthly installments with repaymentFrequency = MONTHLY
      collateralItemsTotalValueAmount: currency(
        100 || this.props.item.buyAmount
      ).value,
      collateralItemsCount: 1, // 1 item is supported currently
      collateralItemId: this.props.item.itemId,
      collateralItemValueAmount: currency(100 || this.props.item.buyAmount)
        .value,
      collateralItems: [
        {
          itemId: this.props.item.itemId,
          itemValueAmount: currency(100 || this.props.item.buyAmount).value
        }
      ],
      collateralPickupSchedule: {
        pickupDate: this.state.pickupDate,
        pickupTimeSlot: this.state.pickupTimeSlot, //MORNING (8AM-11PM), AFTERNOON(1PM-4PM), EVENING(5PM-8PM)
        pickupAddress: "USER-ADDRESS",
        deliveryAddress: "MELLOON-WAREHOUSE-ADDRESS",
        pickupStatus: "pending"
      },
      status: "pending" // pending, active, inactive etc.
    });
  }

  onPickupTimeRadioChange = e => {
    this.setState({
      pickupTimeSlot: e.target.value
    });
  };

  onRadioChange = e => {
    this.setState({
      radiovalue: e.target.value
    });
  };

  onFrequencyChange = e => {
    this.setState({
      frequency: e.target.value
    });
  };

  onTermChange = value => {
    this.setState({
      term: value
    });
  };

  onChangePickupDate = (date, dateString) => {
    this.setState({
      pickupDate: dateString
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
            disabled={this.state.option !== "item"}
          >
            Cancel
          </Button>
          <Button
            className={ss.actionbutton}
            type="primary"
            onClick={() => this.next()}
            disabled={this.state.option !== "item"}
          >
            Save and Proceed <RightOutlined />
          </Button>
        </Fragment>
      )}
      {current === steps.length - 2 && (
        <Fragment>
          <Button
            className={ss.actionbutton}
            type="primary"
            onClick={() => this.redirectToProductList()}
            disabled={this.state.option !== "item"}
          >
            Cancel
          </Button>
          <Button
            className={ss.actionbutton}
            type="primary"
            onClick={() => this.onSubmitNewLaon()}
            disabled={this.state.option !== "item"}
          >
            Submit <RightOutlined />
          </Button>
        </Fragment>
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

  renderNewItemLoan = current => {
    switch (current) {
      case 0:
        //console.log("current step 0");
        return this.renderNewItemLoanStepOne();
      case 1:
        //console.log("current step 1");
        return this.renderNewItemLoanPickupSchedule();
      case 2:
        //console.log("current step LAST");
        return this.renderNewItemLoanLastStep();
      default:
        break;
    }
  };

  renderNewItemLoanPickupSchedule = () => {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      verticalAlign: "top"
    };

    const today = new Date();
    const dateFormat = "YYYY-MM-DD";
    const defaultPickupDate = moment(today).format("YYYY-MM-DD");

    return (
      <Fragment>
        <Row justify="space-between" gutter={16} style={{ width: "100%" }}>
          <Col>
            <div style={{ paddingBottom: "10px" }}>
              <h4>Pickup Date:</h4>
              <DatePicker
                defaultValue={moment(defaultPickupDate, dateFormat)}
                onChange={this.onChangePickupDate}
              />
            </div>
          </Col>
        </Row>

        <Row justify="space-between" gutter={16} style={{ width: "100%" }}>
          <Col>
            <div style={{ paddingBottom: "10px" }}>
              <h4>Pickup Time:</h4>
              <Radio.Group
                onChange={this.onPickupTimeRadioChange}
                value={this.state.pickupTimeSlot}
              >
                <Radio style={radioStyle} value={1}>
                  Morning 8:00AM-12:00PM
                </Radio>
                <Radio style={radioStyle} value={2}>
                  Afternoon 12:00PM-4:00PM
                </Radio>
                <Radio style={radioStyle} value={3}>
                  Evening 4:00PM-7:00PM
                </Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>

        <Row justify="space-between" gutter={16} style={{ width: "100%" }}>
          <Col>
            <div style={{ paddingBottom: "5px" }}>
              <h4 className={ss.blueText}>
                Your item will be picked up from your Profile Address at above
                date and time.
              </h4>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderNewItemLoanLastStep = () => {
    return (
      <Fragment>
        <Spin
          spinning={this.props.loading || this.state.tokenLoading}
          style={{ marginTop: "40px" }}
        >
          <Row>
            {this.props.submitSuccess === "YES" && (
              <Col className={ss.successMessage} style={{ color: "green" }}>
                New Loan Created Successfully!
                <h4> Loan Number: &nbsp; {this.props.loan.quoteNumber}</h4>
                <h4>
                  {" "}
                  Principal Amount: &nbsp;{" "}
                  {this.renderAmount(this.props.loan.principalAmount)}
                </h4>
                <br />
                <h4 className={ss.blueText}>
                  You will soon receive your Melloon Card topped with the amount
                  equivalent to the Principal Amount of your new loan.
                </h4>
              </Col>
            )}
            {this.props.submitSuccess === "NO" && (
              <Col className={ss.successMessage} style={{ color: "red" }}>
                New Loan Creation Failed!
              </Col>
            )}
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

  renderNewItemLoanStepOne = () => {
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
            <div>{this.renderAmount(100 || item.buyAmount)}</div>
          </Col>
        </Row>
        <Row justify="space-between" gutter={16} style={{ width: "100%" }}>
          <Col>
            <div style={{ paddingBottom: "10px" }}>
              <h4>Loan Type:</h4>
              <Radio.Group
                onChange={this.onRadioChange}
                value={this.state.radiovalue}
              >
                <Radio style={radioStyle} value={1}>
                  Short Term (3 Months)
                </Radio>
              </Radio.Group>
            </div>
          </Col>
          <Col>
            <div style={{ paddingBottom: "10px" }}>
              <h4> Repayment Type: </h4>
              <Radio.Group
                onChange={this.onFrequencyChange}
                value={this.state.frequency}
              >
                <Radio style={radioStyle} value={1}>
                  Fixed: At the End of Loan Term (3 Months)
                </Radio>
                <Radio
                  className={ss.radioStyleHideForMobile}
                  disabled
                  value={2}
                >
                  Equated Monthly Installaments
                </Radio>
              </Radio.Group>
            </div>
          </Col>
          <Col>
            <div
              className={ss.hideMeForMobile}
              style={{ paddingBottom: "10px" }}
            >
              Term: 3 Months
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            className={ss.hideMeForDesktop}
            style={{
              textAlign: "left",
              paddingRight: "20px",
              paddingBottom: "20px",
              width: "100%"
            }}
          >
            <Row style={{ marginBottom: "5px" }}>
              <Col xs={12}> Interest Rate: </Col>
              <Col xs={12}>
                {" "}
                {this.state.interestRate}
                {`% Per Month`}
              </Col>
            </Row>

            <Row style={{ marginBottom: "5px" }}>
              <Col xs={12}> Principal Amount: </Col>
              <Col xs={12}> {this.renderAmount(100 || item.buyAmount)}</Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col xs={12}> Interest for 3 Months: </Col>
              <Col xs={12}>
                {" "}
                {this.renderAmount(
                  ((100 || item.buyAmount) *
                    this.state.term *
                    this.state.interestRate) /
                    100
                )}
              </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col xs={12} style={{ fontWeight: "bold" }}>
                {" "}
                Total Repayment Amount:{" "}
              </Col>
              <Col xs={12} style={{ fontWeight: "bold" }}>
                {" "}
                {this.renderAmount(
                  (100 || item.buyAmount) +
                    ((100 || item.buyAmount) *
                      this.state.term *
                      this.state.interestRate) /
                      100
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            className={ss.hideMeForMobile}
            style={{
              textAlign: "left",
              paddingRight: "20px",
              paddingBottom: "20px",
              width: "100%"
            }}
          >
            <Row style={{ marginBottom: "5px" }}>
              <Col xs={8}> Interest Rate: </Col>
              <Col xs={16}>
                {" "}
                {this.state.interestRate}
                {`% Per Month`}
              </Col>
            </Row>

            <Row style={{ marginBottom: "5px" }}>
              <Col xs={8}> Principal Amount: </Col>
              <Col xs={16}> {this.renderAmount(100 || item.buyAmount)}</Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col xs={8}> Interest for 3 Months: </Col>
              <Col xs={16}>
                {" "}
                {this.renderAmount(
                  ((100 || item.buyAmount) *
                    this.state.term *
                    this.state.interestRate) /
                    100
                )}
              </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col xs={8} style={{ fontWeight: "bold" }}>
                {" "}
                Total Repayment Amount:{" "}
              </Col>
              <Col xs={16} style={{ fontWeight: "bold" }}>
                {" "}
                {this.renderAmount(
                  (100 || item.buyAmount) +
                    ((100 || item.buyAmount) *
                      this.state.term *
                      this.state.interestRate) /
                      100
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderNewDefaultLoan = current => {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px"
        }}
      >
        <p>Business Loans: Coming soon...!</p>
        <p>
          For Collaterized Item Loan, select an Item from:
          <Link to={ROUTES.DI_LIST}>
            <HomeOutlined style={{ paddingLeft: "20px" }} /> Product List
          </Link>
        </p>
      </div>
    );
  };

  renderLoanOptions = () => {
    return (
      <Fragment>
        <Checkbox disabled checked={this.state.option === "consumer"}>
          {" "}
          Collaterized Consumer Loans{" "}
        </Checkbox>
        <Checkbox disabled checked={this.state.option === "business"}>
          {" "}
          Collaterized Business Loans{" "}
        </Checkbox>
      </Fragment>
    );
  };

  renderScreen = () => {
    switch (this.state.screenOption) {
      case 1:
        //console.log("current option 1");
        return this.renderNewDefaultLoan(this.state.current);
      case 2:
        //console.log("current option 2");
        return this.renderNewDefaultLoan(this.state.current);
      case 3:
        //console.log("current option 3");
        return this.renderNewItemLoan(this.state.current);
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
          {this.state.option === "item" && (
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
                  New Loan
                </h3>
              </Col>
            </Row>
          )}

          {this.state.option !== "item" && (
            <Row justify="center">
              <Col style={{ paddingBottom: "16px" }}>
                <h3 style={{ color: colorMelloonPrimary, fontWeight: "bold" }}>
                  Melloon Financial Services{" "}
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
              {this.renderLoanOptions()}
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
