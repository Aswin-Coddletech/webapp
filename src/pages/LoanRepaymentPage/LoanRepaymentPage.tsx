import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Select, Form, Spin, Input } from "antd";
import {
  SearchOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import ss from "./LoanRepaymentPage.module.scss";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IPayment } from "src/interfaces/Payment.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";

const { Option } = Select;
let filterData = {
  key: "status",
  value: "STRIPE-PAID"
};
let inputData = "";
let serachOptionChosen = "emailId";
let page = 1;

export interface ILoanRepaymentPageData {
  loading: boolean;
  list: IPayment[];
  //list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface ILoanRepaymentPageCallbacks {
  onInit(status: string): any;
  getPaymentList(filter: any, search: any): any;
  onSearchFilterChange(filter: any): any;
  getUser(userId: any): any;
  onPagenatationChange(page: number): any;
}

export interface ILoanRepaymentPageProps
  extends ILoanRepaymentPageData,
    ILoanRepaymentPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showStatusFilter: boolean;
  searchOption: string;
  showPopup: boolean;
  inputValue: string;
}

export class LoanRepaymentPage extends Component<
  ILoanRepaymentPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    if (Object.keys(props.filterValues).length > 0) {
      const { key, value } = props.filterValues;
      filterData = {
        key,
        value
      };
      inputData = value;
      serachOptionChosen = key;
    }
    this.state = {
      //filterStatus: "loanId",
      //columnValues: columns,
      //showStatusFilter: false,
      //searchOption: "emailId",
      showPopup: false,
      showStatusFilter: serachOptionChosen === "status" ? true : false,
      filterStatus: serachOptionChosen,
      searchOption: serachOptionChosen,
      inputValue: inputData
    };
  }

  componentDidMount() {
    this.props.onSearchFilterChange(filterData);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = {
      key: "status",
      value: "PENDING-REGISTRATION"
    };
    inputData = "";
    serachOptionChosen = "emailId";
  }

  onSelectedValues = payment => {
    this.props.history.push({
      pathname: ROUTES.LOANS_REPAYMENT_DETAIL,
      state: {
        id: payment.paymentId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  handleChange = (status: any) => {
    //console.log("status", status);
    //console.log("this.props", this.props);
    filterData = {
      key: "status",
      value: status
    };
    this.props.onSearchFilterChange(filterData);
    this.props.getPaymentList("status", status);
    this.onPageChange(1);
    this.setState({ filterStatus: status });
  };

  handleFilter = (filter: any) => {
    console.log("<<<<<", this.state);
    if (filter === "status") {
      this.setState({ showStatusFilter: true, inputValue: "" });
    } else {
      this.setState({ showStatusFilter: false, inputValue: "" }, () =>
        console.log(">>>", this.state)
      );
    }
  };

  onFinish = values => {
    console.log("submit");
    console.log(values);
    filterData = {
      key: values.serachOption,
      value: values.searchText
    };
    this.setState({ inputValue: filterData.value });
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getPaymentList(values.serachOption, values.searchText);
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
        title: "User ID",
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
        title: "Payment ID",
        dataIndex: "paymentId"
      },
      {
        title: "Loan ID",
        dataIndex: "loanId"
      },
      {
        title: "Payment Type",
        dataIndex: "paymentType"
      },
      {
        title: "Amount",
        dataIndex: "amount"
      },
      {
        title: "Created At",
        dataIndex: "createdAt"
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
      }
    ];

    //const { list, loading } = this.props;
    console.log("loading", this.props.loading);
    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "paymentId",
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
          style={{ marginTop: "60px" }}
        >
          <div className={ss.root}>
            <div>
              <Row justify="space-between" className={ss.titleBar}>
                <Col>
                  <h2>Manage Payments</h2>
                </Col>
              </Row>
            </div>

            <Row style={{ width: "100%" }} justify="start">
              <Col span={24}>
                <Form
                  name="Loan-Repayment"
                  initialValues={{
                    serachOption: this.state.searchOption
                  }}
                  onFinish={this.onFinish}
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item name="serachOption">
                        <Select
                          defaultValue={this.state.searchOption}
                          style={{ width: 200, float: "right" }}
                          onChange={this.handleFilter}
                        >
                          <Option value="emailId">Email Id</Option>
                          <Option value="userId">User Id</Option>

                          <Option value="loanId">Loan Id</Option>
                          <Option value="status">Status</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {this.state.showStatusFilter === true && (
                      <Col span={12}>
                        <Select
                          style={{ width: 250, float: "left" }}
                          onChange={this.handleChange}
                          placeholder="Select a status"
                        >
                          {/* <Option value="all">All</Option> */}
                          <Option value="STRIPE-PAID"> STRIPE PAID</Option>
                          <Option value="STRIPE-FAILED">STRIPE FAILED</Option>
                          <Option value="STPMEX-PAID">STPMEX PAID</Option>
                          <Option value="STPMEX-FAILED">STPMEX FAILED</Option>
                        </Select>
                      </Col>
                    )}
                    {this.state.showStatusFilter === false && (
                      <Col span={12} className={ss.searchBar}>
                        <Form.Item
                          name="searchText"
                          rules={[
                            {
                              required: true,
                              message: "Please enter value to search "
                            }
                          ]}
                        >
                          <Input
                            className={ss.inputField}
                            defaultValue={this.state.inputValue}
                            placeholder="Please enter value to search"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            // onClick={(e) =>
                            //   this.deviceLockSearch(quote.quoteId, "APPROVED")
                            // }
                            icon={<SearchOutlined />}
                          />
                          {/* <Search className={ss.inputField} placeholder="Search" enterButton /> */}
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                </Form>
              </Col>
            </Row>
            {this.state.showPopup === true &&
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
