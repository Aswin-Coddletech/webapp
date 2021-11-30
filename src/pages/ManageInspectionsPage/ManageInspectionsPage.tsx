/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Table,
  Select,
  Form,
  Input,
  Spin,
  Modal
} from "antd";
import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { ILoan } from "src/interfaces/Loans.interface";
import ss from "./ManageInspectionsPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IQuote } from "src/interfaces/Quotes.interface";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { StripeButton } from "src/components/StripeButton/StripeButton";
import { any } from "prop-types";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";

const { Option } = Select;
let status: string = "PENDING-INSPECTION";
let page = 1;

export interface IManageInspectionsPageData {
  loading: boolean;
  list: ILoan[];
  //list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValue: string;
  currentPage: number;
}

export interface IManageInspectionsPageCallbacks {
  onInit(status: string): any;
  getQuotesList(status: any): any;
  inspectionComplete(quoteId: string): any;
  getUser(userId: any): any;
  onFilterChange(filterStatus: string): any;
  onPagenatationChange(page: number): any;
}

export interface IManageInspectionsPageProps
  extends IManageInspectionsPageData,
    IManageInspectionsPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showStatusFilter: boolean;
  showPopup: boolean;
}

export class ManageInspectionsPage extends Component<
  IManageInspectionsPageProps,
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
      showStatusFilter: true,
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

  submitInspection = id => {
    this.props.inspectionComplete(id);
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
      pathname: ROUTES.INSPECTION_DETAIL,
      state: {
        quoteId: quote.quoteId,
        userId: quote.userId
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
        dataIndex: "quoteNumber"
      },
      {
        title: "User Id",
        dataIndex: "userId",
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
        title: "Quote Created at",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.createdAt).unix() - moment(b.createdAt).unix()
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
        title: "Quote Inspected at",
        dataIndex: "inspectedAt",
        sorter: (a, b) =>
          moment(a.inspectedAt).unix() - moment(b.inspectedAt).unix()
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
                <h2>Manage Inspections</h2>
              </Col>

              <Col span={12}>
                <Select
                  style={{ width: 250, float: "right" }}
                  onChange={this.handleChange}
                  placeholder="Select a status"
                  defaultValue={this.state.filterStatus}
                >
                  {/* <Option value="all">All</Option> */}
                  <Option value="PENDING-INSPECTION">PENDING-INSPECTION</Option>
                  <Option value="PENDING-INSPECTION-DETAILS">
                    PENDING-INSPECTION-DETAILS
                  </Option>
                  <Option value="INSPECTED">INSPECTED</Option>
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
