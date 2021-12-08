/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Table, Select, Spin, Modal, Button } from "antd";
import moment from "moment";
import { IQuote } from "src/interfaces/Quotes.interface";
import ss from "./QuoteApprovalPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import UserInfoModal from "src/components/UserInfoModal";

const { Option } = Select;
let status: string = "PENDING-APPROVAL";
let page = 1;

export interface IQuoteApprovalPageData {
  loading: boolean;
  list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValue: string;
  currentPage: number;
}

export interface IQuoteApprovalPageCallbacks {
  onInit(status: string): any;
  getQuotesList(status: any): any;
  approveQuote(quoteId: string, status: string): any;
  getUser(userId: any): any;
  onFilterChange(filterStatus: string): any;
  onPagenatationChange(page: number): any;
}

export interface IQuoteApprovalPageProps
  extends IQuoteApprovalPageData,
    IQuoteApprovalPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showPopup: boolean;
}

export class QuoteApprovalPage extends Component<
  IQuoteApprovalPageProps,
  ILocalState
> {
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
    this.props.onFilterChange(this.state.filterStatus);
    this.props.onInit(this.state.filterStatus);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  handleChange = (status: any) => {
    this.props.getQuotesList(status);
    this.props.onFilterChange(status);
    this.onPageChange(1);
    this.setState({ filterStatus: status });
  };

  submitApproveQuote = (id, status) => {
    this.props.approveQuote(id, status);
  };

  userIdClick = quote => {
    console.log("clicked on userId", quote);
    this.setState({ showPopup: true });
    this.props.getUser(quote.userId);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onSelectedValues = quote => {
    this.props.history.push({
      pathname: ROUTES.QUOTES_APPROVAL_DETAIL,
      state: {
        id: quote.quoteId,
        filterStatus: this.state.filterStatus
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Quote Number",
        dataIndex: "quoteNumber",
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
        title: "Quote Inspected at",
        dataIndex: "inspectedAt",
        sorter: (a, b) =>
          moment(a.inspectedAt).unix() - moment(b.inspectedAt).unix()
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
        title: "Status",
        dataIndex: "status"
      },
      {
        title: "Approved/Rejected at",
        render: (text, row) => (
          <span> {row.approvedAt ? row.approvedAt : row.rejecedAt} </span>
        ),
        sorter: (a, b) =>
          moment(a.approvedAt ? a.approvedAt : a.rejecedAt).unix() -
          moment(b.approvedAt ? b.approvedAt : b.rejecedAt).unix()
      }
    ];
    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "quoteId",
      currentPage: page
    };
    const ITableListHocCallbacks = {
      onSelectedValues: this.onSelectedValues,
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
          style={{ marginTop: "40px" }}
        >
          <div className={ss.root}>
            <div>
              <Row justify="space-between" className={ss.titleBar}>
                <Col>
                  <h2>Manage Quotes</h2>
                </Col>
                <Col>
                  <Select
                    value={this.state.filterStatus}
                    style={{ width: 200, float: "right" }}
                    onChange={this.handleChange}
                  >
                    {/* <Option value="all">All</Option> */}
                    <Option value="PENDING-APPROVAL">Pending-Approval</Option>
                    <Option value="APPROVED">Approved</Option>
                    <Option value="REJECTED">Rejected</Option>
                  </Select>
                </Col>
              </Row>
            </div>

            <Row style={{ width: "100%" }} justify="start">
              <Col lg={4} />
              <Col lg={15} />
              <Col lg={4}></Col>
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
                <TableList {...ITableListHocData} {...ITableListHocCallbacks} />
              </Col>
            </Row>
          </div>
        </Spin>
      </>
    );
  }
}
