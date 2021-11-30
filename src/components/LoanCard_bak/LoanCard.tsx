import * as React from "react";
import { Fragment } from "react";
import { Table, Row, Col, Card, Descriptions } from "antd";

import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import { ILoan } from "src/interfaces/Loans.interface";

import ss from "./LoanCard.module.scss";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Column } = Table;

export interface ILoanCardData {
  loading: boolean;
  loan: ILoan;
  total: number;
  page: number;
  pageSize: number;
}

export interface ILoanCardHocData {}

export interface ILoanCardCallbacks {
  changePagination: any;
  changePageSize: any;
  refreshLoan(loanId?: string): void;
}

export interface ILocalState {
  screenOption: number;
}

export interface ILoanCardProps
  extends ILoanCardData,
    ILoanCardHocData,
    ILoanCardCallbacks {}

export class LoanCard extends React.Component<ILoanCardProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
    };
  }

  componentDidMount() {
    //nothing
  }

  renderDate = (input_date: string) => {
    if (
      typeof input_date === "undefined" ||
      input_date === "undefined" ||
      input_date === null
    ) {
      return "";
    } else {
      return moment(input_date).format("DD.MM.YYYY");
    }
  };

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderTitle = (loanId) => {
    // eslint-disable-next-line
    let t = "Loan#:" + "\xa0" + loanId || "";
    return t;
  };

  renderActions = (rowItem) => (
    <span className={ss.actions}>
      <PlusCircleOutlined
        className={ss.action}
        twoToneColor="green"
        onClick={() => {}}
      />
    </span>
  );

  renderLoanStatus = (status) => {
    let val = "Loan Status: ";
    return val + status;
  };

  renderPickupTimeSlot = (timeSlot) => {
    switch (timeSlot) {
      case 1:
        return "Morning 8:00AM-12:00PM";
      case 2:
        return "Afternoon 12:00PM-4:00PM";
      case 3:
        return "Evening 4:00PM-7:00PM";
      default:
        break;
    }
  };

  renderOtherLoanData = (loan) => {
    return (
      <div style={{ marginTop: "10px" }}>
        <Descriptions
          title={this.renderLoanStatus(loan.status)}
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Loan Type">
            <span>Short Term (3 Months)</span>
          </Descriptions.Item>
          <Descriptions.Item label="Interest Rate">
            <span>{loan.interestRate}% Per Month</span>
          </Descriptions.Item>
          <Descriptions.Item label="Principal Amount">
            <span>{this.renderAmount(loan.principalAmount)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Interest Amount">
            <span>{this.renderAmount(loan.interestTotalAmount)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            <span>{this.renderAmount(loan.repaymentTotalAmount)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            <span>{this.renderDate(loan.loanStartDate)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            <span>{this.renderDate(loan.loanEndDate)}</span>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          title={"Pickup Details"}
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Scheduled Date">
            <span>{loan.collateralPickupSchedule.pickupDate}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Scheduled Time">
            <span>
              {this.renderPickupTimeSlot(
                loan.collateralPickupSchedule.pickupTimeSlot
              )}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Pickup Status">
            <span>
              {typeof loan.collateralPickupSchedule["pickupStatus"] ===
              "undefined"
                ? "PENDING"
                : loan.collateralPickupSchedule.pickupStatus}
            </span>
          </Descriptions.Item>
        </Descriptions>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {" "}
            <br />
            <h3 style={{ fontWeight: "bold" }}> Pawned Items </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              dataSource={loan.collateralItems}
              rowKey="itemId"
              className={ss.table}
              pagination={false}
              size={"small"}
              bordered={false}
              scroll={{ x: 300 }}
            >
              <Column dataIndex="oem" title="OEM" />
              <Column dataIndex="oemProductModel" title="Product Model" />
              <Column
                dataIndex="itemValueAmount"
                title="Collateral Value"
                render={this.renderAmount}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  };

  renderCard = () => {
    const { loan, loading } = this.props;

    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(loan.quoteNumber)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div> {this.renderOtherLoanData(loan)} </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
