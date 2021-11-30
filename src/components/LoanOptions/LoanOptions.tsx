import React from "react";
import { Spin, Slider, Row, Col } from "antd";

import ss from "./LoanOptions.module.scss";

export interface ILoanOptionsData {}

export interface ILoanOptionsHocData {
  loading: boolean;
  maxLoanAmount: number;
  maxLoanDays: number;
  selectedLoanAmount: number;
  selectedLoanDays: number;
  modelCurrentPrice: number;
  interestRate: number;
  interestAmount: number;
  totalLoanAmount: number;
}

export interface ILoanOptionsCallbacks {}

export interface ILoanOptionsHocCallbacks {
  onInit(): any;
  onLoanAmountSelect(data: number): any;
  onLoanDaySelect(data: number): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ILoanOptionsProps
  extends ILoanOptionsData,
    ILoanOptionsHocData,
    ILoanOptionsHocCallbacks,
    ILoanOptionsCallbacks {}

export class LoanOptions extends React.Component<
  ILoanOptionsProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {}

  amountFormatter = value => {
    return `$ ${value}`;
  };

  formatNumber = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  daysFormatter = value => {
    return `${value} days`;
  };
  onLoanAmountSelect = amount => {
    this.props.onLoanAmountSelect(amount);
  };

  onLoanDaySelect = days => {
    this.props.onLoanDaySelect(days);
  };

  render() {
    return (
      <>
        <Row style={{ width: "100%" }}>
          <Col lg={4} />
          <Col lg={16}>
            <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
              {this.props.loading === false && (
                <div>
                  <h4 className={ss.sectionTitle}>Select Your Loan Options </h4>
                  <div className={ss.loan_stat}>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabel}>
                        Current Price of Item + Inclusions ($5) :{" "}
                      </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {" $ "}
                          {this.formatNumber(this.props.modelCurrentPrice)}
                        </strong>
                      </h5>
                    </div>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabel}>
                        Maximum Cash Available :{" "}
                      </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {" $ "}
                          {this.formatNumber(this.props.maxLoanAmount)}
                        </strong>
                      </h5>
                    </div>
                  </div>
                  <div className={ss.loan_stat}>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabelSlider}>
                        <strong>How much money do you need?</strong>
                      </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {" $ "}
                          {this.formatNumber(this.props.selectedLoanAmount)}
                        </strong>
                      </h5>
                    </div>
                    <Slider
                      min={0}
                      tipFormatter={this.amountFormatter}
                      max={this.props.maxLoanAmount}
                      value={this.props.selectedLoanAmount}
                      onChange={this.onLoanAmountSelect}
                    />
                    <div
                      className={ss.loanstat_inner}
                      style={{ marginTop: 40 }}
                    >
                      <h5 className={ss.loanLabelSlider}>
                        <strong>
                          How many days do you want to return it?{" "}
                        </strong>
                      </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {this.props.selectedLoanDays} {" days"}
                        </strong>
                      </h5>
                    </div>
                    <Slider
                      min={0}
                      tipFormatter={this.daysFormatter}
                      max={this.props.maxLoanDays}
                      value={this.props.selectedLoanDays}
                      onChange={this.onLoanDaySelect}
                    />
                  </div>
                  <div className={ss.loan_stat}>
                    <h5 className={ss.sectionSubTitle}>Your Loan Summary </h5>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabel}>Loan Duration: </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {this.props.selectedLoanDays} {" days"}
                        </strong>
                      </h5>
                    </div>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabel}>Interest Rate: </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {this.props.interestRate} {" %"}
                        </strong>
                      </h5>
                    </div>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabel}>Requested Cash: </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {"$ "}{" "}
                          {this.formatNumber(this.props.selectedLoanAmount)}
                        </strong>
                      </h5>
                    </div>
                    <div className={ss.loanstat_inner}>
                      <h5 className={ss.loanLabel}>Interest Amount: </h5>
                      <h5 className={ss.loanLabel}>
                        <strong>
                          {"$ "} {this.formatNumber(this.props.interestAmount)}
                        </strong>
                      </h5>
                    </div>
                    <div
                      className={ss.loanstat_inner}
                      style={{ marginTop: 20 }}
                    >
                      <h5 className={ss.loanLabel}>
                        <strong>Total Loan Amount: </strong>
                      </h5>
                      <h5 className={ss.loanLabel}>
                        <strong style={{ fontSize: 20 }}>
                          {"$ "} {this.formatNumber(this.props.totalLoanAmount)}
                        </strong>
                      </h5>
                    </div>
                  </div>
                </div>
              )}
            </Spin>
          </Col>
          <Col lg={4} />
        </Row>
      </>
    );
  }
}
