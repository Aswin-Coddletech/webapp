/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Table, Select, Spin, Modal } from "antd";
import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { ILoan } from "src/interfaces/Loans.interface";
import ss from "./QuoteEnrollmentPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IQuote } from "src/interfaces/Quotes.interface";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";

const { Option } = Select;
let status = "PENDING-ENROLLMENT";
let page = 1;

export interface IQuoteEnrollmentPageData {
  loading: boolean;
  list: ILoan[];
  //list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  enrolmentFilter: any;
  currentPage: number;
}

export interface IQuoteEnrollmentPageCallbacks {
  onInit(status: string): any;
  getQuotesList(status: any): any;
  //inspectionComplete(quoteId: string): any;
  getUser(userId: any): any;
  onFilterChange(filterStatus: string): any;
  onPagenatationChange(page: number): any;
}

export interface IQuoteEnrollmentPageProps
  extends IQuoteEnrollmentPageData,
    IQuoteEnrollmentPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showPopup: boolean;
}

export class QuoteEnrollmentPage extends Component<
  IQuoteEnrollmentPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    if (typeof props.enrolmentFilter === "string") {
      status = props.enrolmentFilter;
    }
    this.state = {
      filterStatus: status,
      //columnValues: columns,
      showPopup: false
    };
  }

  componentDidMount() {
    this.props.onFilterChange(status);
    this.props.onInit(status);
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

  // submitInspection = (id) => {
  //   this.props.inspectionComplete(id);
  // };

  onSelectedValues = quote => {
    this.props.history.push({
      pathname: ROUTES.ENROLLMENT_DETAIL,
      state: {
        quoteId: quote.quoteId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  userIdClick = quote => {
    console.log("clicked on userId", quote);
    this.setState({ showPopup: true });
    this.props.getUser(quote.userId);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
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
        title: "Loan Type",
        dataIndex: "loanType"
      },
      {
        title: "Total Amount",
        dataIndex: "repaymentTotalAmount",
        sorter: {
          compare: (a, b) => a.repaymentTotalAmount - b.repaymentTotalAmount
        }
      },
      {
        title: "Quote Created at",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.createdAt).unix() - moment(b.createdAt).unix()
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
        title: "Collateral Enrolled/Custody Completed At",
        dataIndex: "collateralAcquisitionCompletedAt",
        sorter: (a, b) =>
          moment(a.collateralAcquisitionCompletedAt).unix() -
          moment(b.collateralAcquisitionCompletedAt).unix()
      }
    ];
    const { list, loading } = this.props;

    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "quoteId",
      userAccount: this.props.userAccount,
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
      <Spin
        spinning={this.props.userAccountLoading}
        style={{ marginTop: "60px" }}
      >
        <div className={ss.root}>
          <div>
            <Row justify="space-between" className={ss.titleBar}>
              <Col>
                <h2>Manage Enrollment</h2>
              </Col>
              <Col>
                <Select
                  defaultValue={this.state.filterStatus}
                  style={{ width: 200, float: "right" }}
                  onChange={this.handleChange}
                >
                  <Option value="PENDING-ENROLLMENT">PENDING-ENROLLMENT</Option>
                  <Option value="ENROLLED">ENROLLED</Option>
                </Select>
              </Col>
            </Row>
          </div>
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
    );
  }
}
