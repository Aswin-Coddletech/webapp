/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Table, Select, Form, Input, Spin } from "antd";
import {
  SearchOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import ss from "./QuotesSearchPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { ILoan } from "src/interfaces/Loans.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form/util";

const { Option } = Select;
const { Search } = Input;
let filterData = {
  key: "status",
  value: "PENDING-REGISTRATION"
};
let inputData = "";
let serachOptionChosen = "emailId";
let page = 1;

export interface IQuotesSearchPageData {
  loading: boolean;
  list: ILoan[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface IQuotesSearchPageCallbacks {
  onInit(status: string): any;
  getQuotesFilterList(status: any, search: any): any;
  getUser(userId: any): any;
  onSearchFilterChange(filter: any): any;
  onPagenatationChange(page: number): any;
}

export interface IQuotesSearchPageProps
  extends IQuotesSearchPageData,
    IQuotesSearchPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  serachOption: string;
  showStatusFilter: boolean;
  showPopup: boolean;
  locationState: any;
  inputValue: string;
}

export class QuotesSearchPage extends Component<
  IQuotesSearchPageProps,
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
      filterStatus: serachOptionChosen,
      serachOption: serachOptionChosen,
      showStatusFilter: serachOptionChosen == "status" ? true : false,
      showPopup: false,
      locationState: {},
      inputValue: inputData
    };
  }

  componentDidMount() {
    this.props.onSearchFilterChange(filterData);
    this.props.getQuotesFilterList(filterData.key, filterData.value);
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

  handleChange = (status: any) => {
    filterData = {
      key: "status",
      value: status
    };
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getQuotesFilterList("status", status);
    this.setState({ filterStatus: status });
  };

  handleFilter = (filter: any) => {
    this.formRef.current!.setFieldsValue({
      serachOption: filter,
      searchText: ""
    });
    if (filter == "status") {
      inputData = "";
      this.setState({
        showStatusFilter: true,
        inputValue: ""
      });
    } else {
      this.setState({
        showStatusFilter: false,
        inputValue: ""
      });
    }
  };

  onFinish = values => {
    filterData = {
      key: values.serachOption,
      value: values.searchText
    };
    this.setState({ inputValue: filterData.value });
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getQuotesFilterList(values.serachOption, values.searchText);
  };

  onSelectedValues = quote => {
    this.props.history.push({
      pathname: ROUTES.QUOTES_DETAIL,
      state: {
        id: quote.quoteId
      }
    });
  };

  userIdClick = quote => {
    this.setState({ showPopup: true });
    this.props.getUser(quote.userId);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Quote Id",
        dataIndex: "quoteId"
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
        title: "Registration Step",
        dataIndex: "isCollateralCollectionComplete",
        render: (text, item) => (
          <span>
            {item.isCollateralCollectionComplete ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: " Bank Account Step",
        dataIndex: "isBankAccountNumberValid",
        render: (text, item) => (
          <span>
            {null
              ? "InComplete"
              : item.isBankAccountNumberValid
              ? "Done"
              : "InComplete"}
          </span>
        )
      },
      {
        title: "BankId Step",
        dataIndex: "isBankIdValid",
        render: (text, item) => (
          <span>
            {null ? "InComplete" : item.isBankIdValid ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "KYC Step",
        dataIndex: "isKycVerified",
        render: (text, item) => (
          <span>
            {null ? "InComplete" : item.isKycVerified ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "CDC Step",
        dataIndex: "isCdcAuthorized",
        render: (text, item) => (
          <span>
            {null ? "InComplete" : item.isCdcAuthorized ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "Enrollment Step",
        dataIndex: "isCollateralAcquisitionComplete",
        render: (text, item) => (
          <span>
            {item.isCollateralAcquisitionComplete ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "Inspection Step",
        dataIndex: "isCollateralInspectionComplete",
        render: (text, item) => (
          <span>
            {item.isCollateralInspectionComplete ? "Done" : "InComplete"}
          </span>
        )
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
        title: "Created At",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.createdAt).unix() - moment(b.createdAt).unix()
      }
    ];

    const { list, loading, userAccount } = this.props;
    const { userAccountLoading } = this.props;
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
      userAccount,
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
                <h2>Quotes Search/Cancel</h2>
              </Col>
            </Row>
          </div>

          <Row style={{ width: "100%" }} justify="start">
            <Col span={24}>
              <Form
                name="device-search"
                initialValues={{
                  serachOption: this.state.serachOption
                }}
                onFinish={this.onFinish}
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
                        <Option value="userId">User Id</Option>
                        <Option value="emailId">Email Id</Option>
                        <Option value="customerAccountNumber">
                          Customer Account Number
                        </Option>
                        <Option value="quoteId">Quote Id</Option>
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
                        <Option value="PENDING-REGISTRATION">
                          PENDING REGISTRATION
                        </Option>
                        <Option value="REGISTERED">REGISTERED</Option>
                        <Option value="PENDING-ENROLLMENT">
                          PENDING ENROLLMENT
                        </Option>
                        <Option value="ENROLLED">ENROLLED</Option>
                        <Option value="PENDING-INSPECTION">
                          PENDING INSPECTION
                        </Option>
                        <Option value="INSPECTED">INSPECTED</Option>
                        <Option value="PENDING-APPROVAL">
                          PENDING APPROVAL
                        </Option>
                        <Option value="APPROVED">APPROVED</Option>
                        <Option value="REJECTED">REJECTED</Option>
                        <Option value="PENDING-SIGNATURE">
                          PENDING SIGNATURE
                        </Option>
                        <Option value="SIGNED-AND-ACCEPTED">
                          SIGNED AND ACCEPTED
                        </Option>
                        <Option value="SIGNATURE-DECLINED">DECLINED</Option>
                        <Option value="EXPIRED">EXPIRED</Option>
                        <Option value="CANCELLED">CANCELLED</Option>
                      </Select>
                    </Col>
                  )}
                  {this.state.showStatusFilter == false && (
                    <Col span={8} className={ss.searchBar}>
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
                          defaultValue={this.state.inputValue || undefined}
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
