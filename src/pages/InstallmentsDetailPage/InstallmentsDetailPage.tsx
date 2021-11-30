/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Table, Select, Spin, Tabs } from "antd";
import { IInstallment } from "src/interfaces/Loans.interface";
import { IInstallmentPayment } from "src/interfaces/Payment.interface";
import moment from "moment";

import ss from "./InstallmentsDetailPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";

const { Column } = Table;

const { Option } = Select;

const { TabPane } = Tabs;

const columns = [
  {
    title: "Loan Number",
    dataIndex: "loanNumber",
    render: text => <span>{text}</span>
  },
  {
    title: "user Id",
    dataIndex: "userId",
    render: text => <span>{text}</span>
  },
  {
    title: "Installment Number",
    dataIndex: "installmentNumber",
    render: text => <span>{text}</span>
  },
  {
    title: "Installment Due Date",
    dataIndex: "installmentDueDate",
    sorter: (a, b) =>
      moment(a.installmentDueDate).unix() - moment(b.installmentDueDate).unix()
  },
  {
    title: "Installment Amount",
    dataIndex: "installmentAmount",
    sorter: {
      compare: (a, b) => a.installmentAmount - b.installmentAmount
    },
    render: (text, item) => (
      <span>
        {item.installmentCcy} {text}
      </span>
    )
  },
  {
    title: "Repaid Amount",
    dataIndex: "repaidAmount",
    sorter: {
      compare: (a, b) => a.repaidAmount - b.repaidAmount
    },
    render: (text, item) => (
      <span>
        {item.installmentCcy} {text}
      </span>
    )
  },
  {
    title: "Repaid At",
    dataIndex: "repaidAt",
    sorter: (a, b) => moment(a.repaidAt).unix() - moment(b.repaidAt).unix()
  },
  {
    title: "Amount Not Repaid",
    dataIndex: "AmountNotRepaid",
    sorter: {
      compare: (a, b) => a.AmountNotRepaid - b.AmountNotRepaid
    },
    render: (text, item) => (
      <span>
        {item.installmentCcy}
        {item.installmentAmount - item.repaidAmount}
      </span>
    )
  },
  {
    title: "Status",
    dataIndex: "status"
  }
];
const paymentColumns = [
  {
    title: "Payment Id",
    dataIndex: "paymentId",
    render: text => <span>{text}</span>
  },
  {
    title: "Installment Number",
    dataIndex: "installmentNumber",
    render: text => <span>{text}</span>
  },
  {
    title: "Installment Payment Id",
    dataIndex: "installmentPaymentId",
    render: text => <span>{text}</span>
  },
  {
    title: "Payment Amount",
    dataIndex: "paymentAmount",
    sorter: {
      compare: (a, b) => a.paymentAmount - b.paymentAmount
    },
    render: (text, item) => (
      <span>
        {item.paymentCcy} {text}
      </span>
    )
  },
  {
    title: "Payment At",
    dataIndex: "paymentAt",
    sorter: (a, b) => moment(a.paymentAt).unix() - moment(b.paymentAt).unix()
  },
  {
    title: "Status",
    dataIndex: "status"
  }
];

export interface IInstallmentsDetailPageData {
  loading: boolean;
  installmentData: IInstallment[];
  installmentPaymentData: IInstallmentPayment[];
}

export interface IInstallmentsDetailPageCallbacks {
  onInit(status: string): any;
  getInstallmentData(loanId: any): any;
  getInstallmentPaymentData(loanId: any): any;
}

export interface IInstallmentsDetailPageProps
  extends IInstallmentsDetailPageData,
    IInstallmentsDetailPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  columnValues: any[];
  filterStatus: string;
  locationState: any;
}

export class InstallmentsDetailPage extends Component<
  IInstallmentsDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      filterStatus: "PAY-ORDER-NOT-CREATED",
      columnValues: columns,
      locationState: {}
    };
  }

  componentDidMount() {
    console.log("this.props Quote Details", this.props.location.state);
    if (this.props.location.state != null) {
      this.setState({ locationState: this.props.location.state }, () => {
        this.props.getInstallmentData(this.state.locationState.id);
        this.props.getInstallmentPaymentData(this.state.locationState.id);
      });
    }
  }

  handleChange = (status: any) => {
    //this.props.getPayOrderNotCreatedList(status);
    this.setState({ filterStatus: status });
  };

  onPaymentSelectedValues = Loan => {};
  onPageChange = item => {};

  render() {
    console.log("loan list", this.props.installmentPaymentData);
    const IInstallmentTableListHocData = {
      list: this.props.installmentData,
      loading: this.props.loading,
      columns: this.state.columnValues,
      rowKey: "loanId",
      currentPage: 1
    };
    const IInstallmentTableListHocCallbacks = {
      onSelectedValues: this.onPaymentSelectedValues,
      onPageChange: this.onPageChange
    };

    const IInstallmentPaymentTableListHocData = {
      list: this.props.installmentPaymentData,
      loading: this.props.loading,
      columns: paymentColumns,
      rowKey: "paymentId",
      currentPage: 1
    };
    const IInstallmentPaymentTableListHocCallbacks = {
      onSelectedValues: this.onPaymentSelectedValues,
      onPageChange: this.onPageChange
    };

    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <div className={ss.root}>
            <div>
              <Row justify="space-between" className={ss.titleBar}>
                <Col>
                  <h2>Installment Details - #{this.state.locationState.id}</h2>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <div className="card-container">
                  <Tabs type="card">
                    <TabPane tab="Installments" key="1">
                      <Row>
                        <Col>
                          <TableList
                            {...IInstallmentTableListHocData}
                            {...IInstallmentTableListHocCallbacks}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab="Installment Payments" key="2">
                      <TableList
                        {...IInstallmentPaymentTableListHocData}
                        {...IInstallmentPaymentTableListHocCallbacks}
                      />
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        </Spin>
      </>
    );
  }
}
