/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Select,
  Spin,
  Form,
  Input,
  Button,
  Modal
} from "antd";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { ILoan, ILoanCollateralItem } from "src/interfaces/Loans.interface";
import moment from "moment";
import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import ss from "./ManageLoansPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form/util";

const { Column } = Table;
const { Option } = Select;
let filterData = {
  key: "status",
  value: "PENDING-DISBURSAL"
};
let inputData = "";
let serachOptionChosen = "emailId";
let page = 1;
export interface IManageLoansPageData {
  loading: boolean;
  list: ILoan[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface IManageLoansPageCallbacks {
  onInit(status: string): any;
  getLoansList(filter: any, search: any): any;
  onSearchFilterChange(filter: any): any;
  getUser(userId: any): any;
  onPagenatationChange(page: number): any;
}

export interface IManageLoansPageProps
  extends IManageLoansPageData,
    IManageLoansPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  serachOption: string;
  showStatusFilter: boolean;
  showPopup: boolean;
  inputValue: string;
}

export class ManageLoansPage extends Component<
  IManageLoansPageProps,
  ILocalState
> {
  formRef = React.createRef<FormInstance>();
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
      showStatusFilter: serachOptionChosen == "status" ? true : false,
      showPopup: false,
      filterStatus: serachOptionChosen,
      serachOption: serachOptionChosen,
      inputValue: inputData
    };
  }

  componentDidMount() {
    //this.props.onInit("OPEN");
    this.props.onSearchFilterChange(filterData);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = {
      key: "status",
      value: "PENDING-DISBURSAL"
    };
    inputData = "";
    serachOptionChosen = "emailId";
  }

  handleChange = (status: any) => {
    filterData = {
      key: "status",
      value: status
    };
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getLoansList("status", status);
    this.setState({ filterStatus: status });
  };

  onSelectedValues = Loan => {
    this.props.history.push({
      pathname: ROUTES.LOANS_DETAIL,
      state: {
        id: Loan.loanId
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
  handleFilter = (filter: any) => {
    this.formRef.current!.setFieldsValue({
      serachOption: filter,
      searchText: ""
    });
    if (filter == "status") {
      this.setState({ showStatusFilter: true, inputValue: "" });
    } else {
      this.setState({ showStatusFilter: false, inputValue: "" });
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
    this.props.getLoansList(values.serachOption, values.searchText);
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Loan Number",
        dataIndex: "loanNumber",
        render: text => <span>{text}</span>
      },
      {
        title: "user Id",
        dataIndex: "userId",
        //render: (text) => <span>{text}</span>,
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
        title: "Amount Repaid",
        dataIndex: "amountRepaid",
        sorter: {
          compare: (a, b) => a.amountRepaid - b.amountRepaid
        }
      },
      {
        title: "Amount Not Repaid",
        dataIndex: "amountNotRepaid",
        sorter: {
          compare: (a, b) => a.amountNotRepaid - b.amountNotRepaid
        }
      },
      {
        title: "Repayment Status",
        dataIndex: "repaymentStatus"
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
      }
    ];

    const { list, loading } = this.props;

    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "loanId",
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
                  <h2>Loans Search</h2>
                </Col>
              </Row>
            </div>
            <Row style={{ width: "100%" }} justify="start">
              <Col span={24}>
                <Form
                  name="loan-search"
                  initialValues={{
                    serachOption: this.state.serachOption
                  }}
                  onFinish={this.onFinish}
                  className={ss.filterForm}
                  ref={this.formRef}
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item name="serachOption">
                        <Select
                          defaultValue={this.state.serachOption}
                          style={{ width: 200, float: "right" }}
                          onChange={this.handleFilter}
                        >
                          <Option value="loanId">Loan ID</Option>
                          <Option value="userId">User ID</Option>
                          <Option value="emailId">Email ID</Option>
                          <Option value="customerAccountNumber">
                            Customer Account Number
                          </Option>
                          <Option value="status">Status</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {this.state.showStatusFilter == true && (
                      <Col span={12}>
                        <Select
                          defaultValue={this.state.inputValue || undefined}
                          style={{ width: 250, float: "left" }}
                          onChange={this.handleChange}
                          placeholder="Select a status"
                        >
                          {/* <Option value="all">All</Option> */}
                          <Option value="OPEN">Open</Option>
                          <Option value="PENDING-DISBURSAL">
                            Pending Disbursal
                          </Option>
                          <Option value="DISBURSAL-IN-PROGRESS">
                            Disbursal In Progress
                          </Option>
                          <Option value="ONGOING">Ongoing</Option>
                          <Option value="FULLY-REPAID">Fully Repaid</Option>
                          <Option value="CLOSED">Closed</Option>
                          <Option value="CANCELLED">Cancelled</Option>
                        </Select>
                      </Col>
                    )}
                    {this.state.showStatusFilter == false && (
                      <Col span={12} className={ss.searchBar}>
                        <Form.Item
                          name="searchText"
                          rules={[
                            {
                              required: true,
                              message: "Please enter value to search"
                            }
                          ]}
                        >
                          <Input
                            className={ss.inputField}
                            defaultValue={this.state.inputValue || undefined}
                            placeholder="Please enter value to search"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            search
                          </Button>
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                </Form>
              </Col>
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
