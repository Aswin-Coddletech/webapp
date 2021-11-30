/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Table, Select, Spin, Tabs, Modal, Button } from "antd";
import { ILoan, IDisbursal } from "src/interfaces/Loans.interface";
import {
  SearchOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import moment from "moment";

import ss from "./DisbursalPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";

const { Column } = Table;

const { Option } = Select;

const { TabPane } = Tabs;
let status: string = "PAY-ORDER-NOT-CREATED";
let page = 1;

export interface IDisbursalPageData {
  loading: boolean;
  payOrderNotCreatedList: ILoan[];
  manulSTPMEXList: IDisbursal[];
  manualBBVAList: IDisbursal[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValue: string;
  currentPage: number;
}

export interface IDisbursalPageCallbacks {
  onInit(status: string): any;
  getPayOrderNotCreatedList(filter: any, search: any): any;
  getManulSTPMEXList(status: any): any;
  getManualBBVAList(status: any): any;
  onFilterChange(filterStatus: string): any;
  getUser(userId: any): any;
  onPagenatationChange(page: number): any;
}

export interface IDisbursalPageProps
  extends IDisbursalPageData,
    IDisbursalPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  //columnValues: any[];
  filterStatus: string;
  showPopup: boolean;
}

export class DisbursalPage extends Component<IDisbursalPageProps, ILocalState> {
  constructor(props) {
    super(props);
    if (typeof props.filterValue === "string") {
      status = props.filterValue;
    }
    this.state = {
      filterStatus: status,
      //columnValues: columns,
      showPopup: false
    };
  }

  componentDidMount() {
    this.props.getPayOrderNotCreatedList("status", "PAY-ORDER-NOT-CREATED");
    this.props.getManulSTPMEXList(
      "MANUAL-MONEY-TRANSFER-FROM-STPMEX-TO-CUSTOMER"
    );
    this.props.getManualBBVAList("MANUAL-MONEY-TRANSFER-FROM-BBVA-TO-CUSTOMER");
    this.props.onFilterChange(this.state.filterStatus);
  }

  handleChange = (status: any) => {
    this.props.onFilterChange(status);
    this.props.getPayOrderNotCreatedList("status", status);
    this.setState({ filterStatus: status });
  };

  userIdClick = quote => {
    console.log("clicked on userId", quote);
    this.setState({ showPopup: true });
    this.props.getUser(quote.userId);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onDisbursalSelectedValues = Loan => {
    this.props.history.push({
      pathname: ROUTES.LOANS_DISBURSALS_DETAIL,
      state: {
        id: Loan.loanId,
        filterStatus: this.state.filterStatus
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  onSTPMEXSelectedValues = disbursal => {
    this.props.history.push({
      pathname: ROUTES.MANUAL_STPMEX_DETAIL,
      state: {
        id: disbursal.disbursalId,
        filterStatus: this.state.filterStatus
      }
    });
  };

  tabClick = () => {
    this.onPageChange(1);
  };

  onBBVASelectedValues = disbursal => {
    this.props.history.push({
      pathname: ROUTES.MANUAL_BBVA_DETAIL,
      state: {
        id: disbursal.disbursalId,
        filterStatus: this.state.filterStatus
      }
    });
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Loan Number",
        dataIndex: "loanNumber",
        render: text => (
          <span>
            {text}
            <InfoCircleOutlined style={{ float: "right" }} />
          </span>
        ),
        onCell: (record, rowIndex) => {
          return {
            onClick: e => {
              this.userIdClick(record);
              e.stopPropagation();
            }
          };
        }
      },
      {
        title: "Total Amount",
        dataIndex: "repaymentTotalAmount",
        sorter: {
          compare: (a, b) => a.repaymentTotalAmount - b.repaymentTotalAmount
        }
      },
      {
        title: "Loan Created at",
        dataIndex: "inspectedAt",
        sorter: (a, b) =>
          moment(a.inspectedAt).unix() - moment(b.inspectedAt).unix()
      },
      {
        title: "Status",
        dataIndex: "status"
      },
      {
        title: "Intercom User",
        dataIndex: "intercom",
        render: (text, item) => (
          <span style={{ alignItems: "center" }}>
            <Button
              href={`${REACT_APP_INTERCOM_LINK}user=${item.userId}`}
              target="_blank"
              type="primary"
              icon={<UserOutlined style={{ alignItems: "center" }} />}
              size={"small"}
            >
              <span style={{ fontSize: 14 }}>{"Visit"}</span>
            </Button>
          </span>
        ),
        onCell: (record, rowIndex) => {
          return {
            onClick: e => {
              e.stopPropagation();
            }
          };
        }
      },
      {
        title: "Loan Approved/Rejected at",
        render: (text, row) => (
          <span> {row.approvedAt ? row.approvedAt : row.rejecedAt} </span>
        ),
        sorter: (a, b) =>
          moment(a.approvedAt ? a.approvedAt : a.rejecedAt).unix() -
          moment(b.approvedAt ? b.approvedAt : b.rejecedAt).unix()
      }
    ];

    const disbursalColumns = [
      {
        title: "Disbursal Number",
        dataIndex: "disbursalNumber",
        render: text => <span>{text}</span>
      },
      {
        title: "Disbursal Type",
        dataIndex: "disbursalType",
        render: text => <span>{text}</span>
      },
      {
        title: "Disbursal Amount",
        dataIndex: "disbursalAmount",
        sorter: {
          compare: (a, b) => a.disbursalAmount - b.disbursalAmount
        }
      },
      {
        title: "Disbursal Created at",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.createdAt).unix() - moment(b.createdAt).unix()
      },
      {
        title: "Status",
        dataIndex: "status"
      }
    ];

    const IPayOrderNotCreatedTableListHocData = {
      list: this.props.payOrderNotCreatedList,
      loading: this.props.loading,
      columns: columns,
      rowKey: "loanId",
      currentPage: page
    };
    const IPayOrderNotCreatedTableListHocCallbacks = {
      onSelectedValues: this.onDisbursalSelectedValues,
      onPageChange: this.onPageChange
    };
    const IManualSTPMEXTableListHocData = {
      list: this.props.manulSTPMEXList,
      loading: this.props.loading,
      columns: disbursalColumns,
      rowKey: "loanId",
      currentPage: page
    };
    const IManualSTPMEXTableListHocCallbacks = {
      onSelectedValues: this.onSTPMEXSelectedValues,
      onPageChange: this.onPageChange
    };

    const IManualBBVATableListHocData = {
      list: this.props.manualBBVAList,
      loading: this.props.loading,
      columns: disbursalColumns,
      rowKey: "loanId",
      currentPage: page
    };
    const IManualBBVATableListHocCallbacks = {
      onSelectedValues: this.onBBVASelectedValues,
      onPageChange: this.onPageChange
    };

    const IUserInfoDataHocData = {
      userAccount: this.props.userAccount,
      visible: this.state.showPopup
    };

    const IUserInfoDataHocCallbacks = {
      handleCancel: this.handleCancel
    };

    return (
      <>
        <Spin
          spinning={this.props.userAccountLoading}
          style={{ marginTop: "60px" }}
        >
          <div className={ss.root}>
            <div>
              <Row justify="space-between" className={ss.titleBar}>
                <Col>
                  <h2>Loans Pending Disbursals</h2>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <div className="card-container">
                  <Tabs type="card" onChange={this.tabClick}>
                    <TabPane tab="Create Disbursal Payorder" key="1">
                      <Row style={{ width: "100%" }} justify="end">
                        <Select
                          defaultValue={this.state.filterStatus}
                          style={{ width: 200, marginBottom: "10px" }}
                          onChange={this.handleChange}
                        >
                          {/* <Option value="all">All</Option> */}
                          <Option value="PAY-ORDER-NOT-CREATED">
                            PAY-ORDER-NOT-CREATED
                          </Option>
                          <Option value="MORE-PAY-ORDERS-MAY-BE-REQUIRED">
                            MORE-PAY-ORDERS-MAY-BE-REQUIRED
                          </Option>
                        </Select>
                      </Row>
                      {this.state.showPopup == true &&
                        this.props.userAccount.emailId !== undefined && (
                          <UserInfoModal
                            {...IUserInfoDataHocData}
                            {...IUserInfoDataHocCallbacks}
                          />
                        )}
                      <Row>
                        <Col>
                          <TableList
                            {...IPayOrderNotCreatedTableListHocData}
                            {...IPayOrderNotCreatedTableListHocCallbacks}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tab="Manual Update of STPMEX Transaction Details"
                      key="2"
                    >
                      <TableList
                        {...IManualSTPMEXTableListHocData}
                        {...IManualSTPMEXTableListHocCallbacks}
                      />
                    </TabPane>
                    <TabPane
                      tab="Manual update of BBVA Transaction Details"
                      key="3"
                    >
                      <TableList
                        {...IManualBBVATableListHocData}
                        {...IManualBBVATableListHocCallbacks}
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
