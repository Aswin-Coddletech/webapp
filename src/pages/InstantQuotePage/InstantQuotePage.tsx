/* eslint-disable */
import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Row, Col, Steps, Button, Alert } from "antd";
import {
  IModel,
  IBrand,
  IInclusion,
  IPickupTimeSlot
} from "../../interfaces/InstantQuote.interface";
import CategoryList from "../../components/CategoryList";
import BrandList from "../../components/BrandList";
import ss from "./InstantQuotePage.module.scss";
import { ModelList } from "../../components/ModelList/ModelList";
import ItemCondition from "../../components/ItemCondition";
import LoanOptions from "../../components/LoanOptions";
import { LoanPickup } from "../../components/LoanPickup/LoanPickup";
import moment, { Moment } from "moment";
import LoanPickupAddress from "../../components/LoanPickupAddress";
import { ROUTES } from "src/constants/routes";
import { CheckCircleTwoTone } from "@ant-design/icons";

const { Step } = Steps;

const steps = [
  {
    title: "Category",
    content: "First-content"
  },
  {
    title: "Brand",
    content: "Second-content"
  },
  {
    title: "Model",
    content: "Fourth-content"
  },
  {
    title: "Condition",
    content: "Fifth-content"
  },
  {
    title: "Loan Option",
    content: "Sixth-content"
  }
];

const pickupSteps = [
  {
    title: "Pickup Schedule ",
    content: "First-content"
  },
  {
    title: "Pickup Address",
    content: "Second-content"
  },
  {
    title: "Done",
    content: "Third-content"
  }
];

export interface IInstantQuotePageData {
  loading: boolean;
  catList: any[];
  brandList: IBrand[];
  modelList: IModel[];
  inclusionList: IInclusion[];
  //pickupDate: Moment;
  pickupTimeSlot: IPickupTimeSlot[];
  userId: string;
}

export interface IInstantQuotePageCallbacks {
  onInit(): any;
  getBrands(category: string): any;
  getModels(category: string, brand: string): any;
  getPrice(): any;
  onQuoteSubmit(): any;
  onNewQuoteInit(): any;
  getInclusion(category: string): any;
  getpickupTimeSlot(): any;
}

export interface IInstantQuotePageProps
  extends IInstantQuotePageData,
    IInstantQuotePageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  screenOption: number;
  currentStep: number;
  selectedCategory: string;
  selectedBrandId: string;
  nextButtonStatus: boolean;
  selectedModel: string;
  maxLoanAmount: number;
  maxLoanDays: number;
  selectedCondition: string;
  selectedLoanAmount: number;
  selectedLoanDays: number;
  modelCurrentPrice: number;
  interestRate: number;
  interestAmount: number;
  totalLoanAmount: number;
  selectedModelDesc: string;
  pickupState: boolean;
  pickupStep: number;
  selectedTimeSlot: string;
  selectedPickupDate: Moment;
}

export class InstantQuotePage extends Component<
  IInstantQuotePageProps,
  ILocalState
> {
  [x: string]: any;
  constructor(props) {
    super(props);

    //set default option
    this.state = {
      screenOption: 1,
      currentStep: 0,
      selectedCategory: "",
      nextButtonStatus: true,
      selectedBrandId: "",
      selectedModel: "",
      maxLoanAmount: 0,
      maxLoanDays: 180,
      selectedCondition: "",
      selectedLoanAmount: 0,
      selectedLoanDays: 0,
      modelCurrentPrice: 2500,
      interestRate: 8,
      interestAmount: 0,
      totalLoanAmount: 0,
      selectedModelDesc: "",
      pickupState: false,
      pickupStep: 0,
      selectedTimeSlot: "",
      selectedPickupDate: moment(new Date(), ["MM.DD.YYYY"])
    };
  }

  componentDidMount() {
    this.props.onInit();
  }

  next() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep, nextButtonStatus: true }, () => {
      this.renderCallBacks();
    });
  }

  prev() {
    const currentStep = this.state.currentStep - 1;
    const pickupStep =
      this.state.pickupStep > 0 ? this.state.pickupStep - 1 : 0;
    const pickupState = pickupStep >= 1 ? true : false;
    this.setState(
      { currentStep, pickupStep, nextButtonStatus: false, pickupState },
      () => {
        //this.renderCallBacks();
      }
    );
  }

  calculateMaxLoanAmount = amount => {
    let maxLoanAmount = (amount + 5) * 0.8;
    let selectedLoanAmount = maxLoanAmount * 0.5;
    this.setState(
      {
        maxLoanAmount: maxLoanAmount,
        modelCurrentPrice: amount + 5,
        selectedLoanAmount: selectedLoanAmount,
        selectedLoanDays: 30
      },
      () => {
        this.calculateLoanAmount();
      }
    );
  };

  schedulePickup = () => {
    const currentStep = this.state.currentStep + 1;
    const pickupStep = this.state.pickupStep + 1;
    this.setState(
      { currentStep, pickupStep, pickupState: true, nextButtonStatus: true },
      () => {
        this.renderPickupCallBacks();
      }
    );
  };

  onCategorySelect = category => {
    this.setState({ selectedCategory: category, nextButtonStatus: false });
  };

  onBrandSelect = brand => {
    this.setState({ selectedBrandId: brand, nextButtonStatus: false });
  };

  onModelSelect = model => {
    if (model != "") {
      const result = this.props.modelList.find(item => item.title === model);
      if (result != null) {
        this.setState({ selectedModelDesc: result.title });
        this.setState({
          selectedModel: result.productId,
          nextButtonStatus: false
        });
      }
    }
  };

  onConditionSelect = condition => {
    this.setState({ selectedCondition: condition, nextButtonStatus: false });
  };

  onSelectedTimeSelect = timeSlot => {
    this.setState({ selectedTimeSlot: timeSlot, nextButtonStatus: false });
  };

  onSelectedPickupDate = pickupDate => {
    this.setState({ selectedPickupDate: pickupDate });
  };

  pickupAddressSubmit = () => {
    this.props.onQuoteSubmit();
    const pickupStep = this.state.pickupStep + 1;
    this.setState({ pickupStep, pickupState: true }, () => {
      this.renderPickupCallBacks();
    });
  };

  formatNumber = number => {
    return Math.round(number * 100 + Number.EPSILON) / 100;
  };

  calculateLoanAmount = () => {
    if (this.state.selectedLoanAmount > 0 && this.state.selectedLoanDays > 0) {
      let interestAmount =
        this.state.selectedLoanAmount *
        (this.state.interestRate / 100) *
        (this.state.selectedLoanDays / 365);
      let totalLoanAmount = this.state.selectedLoanAmount + interestAmount;
      this.setState({
        interestAmount: this.formatNumber(interestAmount),
        totalLoanAmount: this.formatNumber(totalLoanAmount)
      });
    } else {
      this.setState({
        interestAmount: 0,
        totalLoanAmount: 0
      });
    }
  };

  onLoanAmountSelect = selectedLoanAmount => {
    this.setState({ selectedLoanAmount }, () => {
      this.calculateLoanAmount();
    });
  };

  onLoanDaySelect = selectedLoanDays => {
    let interestRate = selectedLoanDays > 90 ? 9 : 8;
    this.setState({ interestRate, selectedLoanDays }, () => {
      this.calculateLoanAmount();
    });
  };

  redirectToHome = () => {
    if (this.props.userId === null) {
      return <div>{this.props.history.push(ROUTES.LANDING_PAGE)};</div>;
    } else {
      return <div>{this.props.history.push(ROUTES.HOME)};</div>;
    }
  };

  renderCallBacks = () => {
    switch (this.state.currentStep) {
      case 0: // Category
        break;
      case 1: // Brand
        this.setState({ selectedBrandId: "" });
        this.props.getBrands(this.state.selectedCategory);
        break;
      case 2: // Models
        this.setState({ selectedModel: "" });
        this.props.getModels(
          this.state.selectedCategory,
          this.state.selectedBrandId
        );
        break;
      case 3: // Condition
        this.setState({ selectedCondition: "" });
        this.props.getInclusion(this.state.selectedCategory);
        return true;
        break;
      case 4: // Loan Option
        this.calculateMaxLoanAmount(this.state.modelCurrentPrice);
        console.log("currentStep option 5");
        break;
      //return this.renderNewItemLoan(this.state.currentStep);
      default:
        break;
    }
  };

  renderPickupCallBacks = () => {
    switch (this.state.pickupStep) {
      case 1: // Pickup
        this.setState({
          selectedTimeSlot: "",
          selectedPickupDate: moment(new Date(), ["MM.DD.YYYY"])
        });
        this.props.getpickupTimeSlot();
        break;
      case 2:
        return true;
        break;
      default:
        break;
    }
  };

  renderDoneScreen = () => {
    return (
      <Row style={{ width: "100%" }}>
        <Col lg={4} />
        <Col lg={16}>
          <div className={ss.loanCard}>
            <div className={ss.loanCardTitle}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: 40 }}
              />
              <h4 className={ss.loanCreatedText}>
                Congratulations! <br /> Your loan is successfully created.
              </h4>
              <h5 className={ss.loanLabel}>
                Loan Number : <strong>ML8459638</strong>
              </h5>
            </div>
            <div className={ss.loan_stat}>
              <Row gutter={16}>
                <Col span={24}>
                  <Alert
                    message="We have created a finnu account for you. Please check your inbox for a confirmation email. Click the link in the email to confirm your email address."
                    type="info"
                    showIcon
                  />
                </Col>
              </Row>
              <Row
                style={{
                  width: "100%",
                  marginTop: 30,
                  textAlign: "center"
                }}
                gutter={16}
              >
                <Col lg={12} className={ss.borderRight}>
                  <div className={ss.loanstat_texts}>
                    <h5 className={ss.loanLabelKycTxt}>
                      Please note that, pickup will not happen until KYC
                      verification is done
                    </h5>
                    <h5 className={ss.loanLabelTxt}>
                      <Button type="primary" href="/user-account/manage">
                        Proceed to KYC Process
                      </Button>
                    </h5>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className={ss.loanstat_texts}>
                    <h5 className={ss.loanLabelTxt}>
                      Please go to the home page to explore more of Finnu
                    </h5>
                    <h5 className={ss.loanLabelTxt}>
                      <Button type="primary" href="/home">
                        Go to Homepage
                      </Button>
                    </h5>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col lg={4} />
      </Row>
    );
  };

  render() {
    const { currentStep, pickupStep } = this.state;
    let scheduleSteps = pickupStep - 1;
    const ICategoryListHocData = {
      loading: this.props.loading,
      catList: this.props.catList,
      selectedCategory: this.state.selectedCategory
    };
    const ICategoryListHocCallback = {
      onInit: this.props.onInit,
      onCategorySelect: this.onCategorySelect
    };
    const IBrandListHocData = {
      loading: this.props.loading,
      brandList: this.props.brandList,
      selectedBrandId: this.state.selectedBrandId
    };
    const IBrandListHocCallback = {
      onInit: this.props.onInit,
      onBrandSelect: this.onBrandSelect
    };
    const IModelListHocData = {
      loading: this.props.loading,
      modelList: this.props.modelList,
      selectedModel: this.state.selectedModel,
      selectedModelDesc: this.state.selectedModelDesc
    };
    const IModelListHocCallback = {
      onInit: this.props.onInit,
      onModelSelect: this.onModelSelect
    };
    const IItemConditionHocData = {
      loading: this.props.loading,
      inclusionList: this.props.inclusionList,
      selectedCondition: this.state.selectedCondition
    };
    const IItemConditionHocCallback = {
      onInit: this.props.onInit,
      onConditionSelect: this.onConditionSelect
    };
    const ILoanOptionsHocData = {
      loading: this.props.loading,
      maxLoanAmount: this.state.maxLoanAmount,
      maxLoanDays: this.state.maxLoanDays,
      selectedLoanAmount: this.state.selectedLoanAmount,
      selectedLoanDays: this.state.selectedLoanDays,
      modelCurrentPrice: this.state.modelCurrentPrice,
      interestRate: this.state.interestRate,
      interestAmount: this.state.interestAmount,
      totalLoanAmount: this.state.totalLoanAmount
    };
    const ILoanOptionsHocCallbacks = {
      onInit: this.props.onInit,
      onLoanAmountSelect: this.onLoanAmountSelect,
      onLoanDaySelect: this.onLoanDaySelect
    };

    const IPickupTimeSlotHocData = {
      loading: this.props.loading,
      pickupTimeSlot: this.props.pickupTimeSlot,
      selectedTimeSlot: this.state.selectedTimeSlot,
      selectedPickupDate: this.state.selectedPickupDate
    };
    const IPickupTimeSlotHocCallback = {
      onInit: this.props.onInit,
      onSelectedTimeSelect: this.onSelectedTimeSelect,
      onSelectedPickupDate: this.onSelectedPickupDate
    };

    const IPickupAddressHocData = {
      loading: this.props.loading,
      userId: this.props.userId
    };
    const IPickupAddressHocCallback = {
      onInit: this.props.onInit,
      onQuoteSubmit: this.onQuoteSubmit
    };

    return (
      <Row style={{ width: "100%", paddingLeft: 15, paddingRight: 15 }}>
        <Col lg={4} />
        <Col lg={16}>
          {this.state.pickupState && (
            <>
              <Steps className={ss.stepCustom} current={scheduleSteps}>
                {pickupSteps.map(item => (
                  <Step
                    className={ss.textHiddenMobile}
                    key={item.title}
                    title={item.title}
                  />
                ))}
              </Steps>
              <div className="steps-content">
                {pickupStep == 1 && (
                  <LoanPickup
                    {...IPickupTimeSlotHocData}
                    {...IPickupTimeSlotHocCallback}
                  />
                )}
                {pickupStep == 2 && (
                  <LoanPickupAddress
                    {...IPickupAddressHocData}
                    {...IPickupAddressHocCallback}
                  />
                )}
                {pickupStep == 3 && <div>{this.renderDoneScreen()}</div>}
              </div>
            </>
          )}
          {!this.state.pickupState && (
            <>
              <Steps className={ss.stepCustom} current={currentStep}>
                {steps.map(item => (
                  <Step
                    className={ss.textHiddenMobile}
                    key={item.title}
                    title={item.title}
                  />
                ))}
              </Steps>
              <div className="steps-content">
                {currentStep == 0 && (
                  <CategoryList
                    {...ICategoryListHocData}
                    {...ICategoryListHocCallback}
                  />
                )}
                {currentStep == 1 && (
                  <BrandList
                    {...IBrandListHocData}
                    {...IBrandListHocCallback}
                  />
                )}
                {currentStep == 2 && (
                  <ModelList
                    {...IModelListHocData}
                    {...IModelListHocCallback}
                  />
                )}
                {currentStep == 3 && (
                  <ItemCondition
                    {...IItemConditionHocData}
                    {...IItemConditionHocCallback}
                  />
                )}
                {currentStep == 4 && (
                  <LoanOptions
                    {...ILoanOptionsHocData}
                    {...ILoanOptionsHocCallbacks}
                  />
                )}
              </div>
            </>
          )}

          <div className="steps-action">
            {currentStep > 0 && pickupStep < 3 && (
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => this.redirectToHome()}
              >
                Cancel
              </Button>
            )}
            {currentStep > 0 && pickupStep < 3 && (
              <Button
                style={{ marginLeft: 8 }}
                type="primary"
                onClick={() => this.prev()}
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                style={{ marginLeft: 8 }}
                type="primary"
                onClick={() => this.next()}
                disabled={this.state.nextButtonStatus ? true : false}
              >
                Next
              </Button>
            )}
            {(currentStep === steps.length - 1 ||
              (pickupStep > 0 && pickupStep < 2)) && (
              <Button
                style={{ marginLeft: 8 }}
                type="primary"
                onClick={() => this.schedulePickup()}
                // disabled={
                //   pickupStep === 0
                //     ? false
                //     : this.state.nextButtonStatus
                //     ? true
                //     : false
                // }
              >
                {pickupStep === 0 ? "Schedule a Pickup" : "Next"}
              </Button>
            )}

            {pickupStep === 2 && (
              <Button
                className={ss.submitButton}
                type="primary"
                onClick={() => this.pickupAddressSubmit()}
              >
                Submit
              </Button>
            )}
          </div>
        </Col>
        <Col lg={4} />
      </Row>
    );
  }
}
