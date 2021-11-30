/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Table, Select, Spin, Form, Input, Button } from "antd";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import moment from "moment";

import ss from "./KycStatusPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { FormInstance } from "antd/lib/form/util";

const { Column } = Table;

const { Option } = Select;

let filterData = {};
let inputData = "";
let searchOptionChosen = "emailId";
let page = 1;
const columns = [
  {
    title: "Customer Account Number",
    dataIndex: "customerAccountNumber"
  },
  {
    title: "User Id",
    dataIndex: "userId"
  },
  {
    title: "Email Id",
    dataIndex: "emailId"
  },
  {
    title: "Full Name",
    dataIndex: "fullName"
  },
  {
    title: "KYC Status",
    dataIndex: "kycStatus"
  },
  {
    title: "User Created at",
    dataIndex: "createdAt",
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
  }
];

export interface IKycStatusPageData {
  loading: boolean;
  list: IUserAccount[];
  filterValue: any;
  currentPage: number;
}

export interface IKycStatusPageCallbacks {
  onInit(status: string): any;
  getUserList(filter: any, search: any): any;
  onSearchFilterChange(filter: any): any;
  clearUserList(): any;
  onPagenatationChange(page: number): any;
}

export interface IKycStatusPageProps
  extends IKycStatusPageData,
    IKycStatusPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  columnValues: any[];
  serachOption: string;
  showKYCStatusFilter: boolean;
  showCDCStatusFilter: boolean;
  searchInput: string;
}

export class KycStatusPage extends Component<IKycStatusPageProps, ILocalState> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    if (Object.keys(props.filterValue).length > 0) {
      const { key, value } = props.filterValue;
      filterData = {
        key,
        value
      };
      inputData = value;
      searchOptionChosen = key;
    }
    this.state = {
      filterStatus: searchOptionChosen,
      columnValues: columns,
      serachOption: searchOptionChosen,
      showKYCStatusFilter: false,
      showCDCStatusFilter: false,
      searchInput: inputData
    };
  }

  componentDidMount() {
    //this.props.onInit("Not-Started");
    if (this.state.searchInput) {
      this.props.getUserList(this.state.filterStatus, this.state.searchInput);
    }
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = {};
    inputData = "";
    searchOptionChosen = "emailId";
    this.props.clearUserList();
  }

  handleKycChange = (status: any) => {
    filterData = {
      key: "kycStatus",
      value: status
    };
    this.setState({ searchInput: status });
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getUserList("kycStatus", status);
    this.setState({ filterStatus: status });
  };

  handleCdcChange = (status: any) => {
    filterData = {
      key: "cdcStatus",
      value: status
    };
    this.setState({ searchInput: status });
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getUserList("cdcStatus", status);
    this.setState({ filterStatus: status });
  };

  onSelectedValues = User => {
    this.props.history.push({
      pathname: ROUTES.USERS_DETAIL,
      state: {
        id: User.userId
      }
    });
  };

  handleFilter = (filter: any) => {
    inputData = "";
    this.formRef.current!.setFieldsValue({
      filterStatus: filter,
      searchText: ""
    });
    this.setState({ searchInput: "" });
    if (filter == "kycStatus") {
      this.setState({ showKYCStatusFilter: true });
      this.setState({ showCDCStatusFilter: false });
    } else if (filter == "cdcStatus") {
      this.setState({ showCDCStatusFilter: true });
      this.setState({ showKYCStatusFilter: false });
    } else {
      this.setState({ showCDCStatusFilter: false });
      this.setState({ showKYCStatusFilter: false });
    }
  };

  onFinish = values => {
    console.log("submit");
    console.log(values);
    filterData = {
      key: values.serachOption,
      value: values.searchText
    };
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getUserList(values.serachOption, values.searchText);
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  render() {
    const { list, loading } = this.props;
    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: this.state.columnValues,
      rowKey: "userId",
      currentPage: page
    };
    const ITableListHocCallbacks = {
      onSelectedValues: this.onSelectedValues,
      onPageChange: this.onPageChange
    };

    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <div className={ss.root}>
            <div>
              <Row justify="center">
                <Col style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: colorMelloonPrimary,
                      fontWeight: "bold",
                      paddingBottom: "8px"
                    }}
                  >
                    Users KYC/CDC Status
                  </h3>
                </Col>
              </Row>
            </div>
            <Row style={{ width: "100%" }} justify="start">
              <Col span={24}>
                <Form
                  name="kyc-search"
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
                          <Option value="emailId">Email Id</Option>
                          <Option value="userId">User Id</Option>
                          <Option value="customerAccountNumber">
                            Customer Account Number
                          </Option>
                          <Option value="kycStatus">KYC Status</Option>
                          <Option value="cdcStatus">CDC Status</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {this.state.showKYCStatusFilter == true && (
                      <Col span={12}>
                        <Select
                          style={{ width: 250, float: "left" }}
                          onChange={this.handleKycChange}
                          defaultValue={this.state.searchInput || undefined}
                          placeholder="Select a KYC status"
                        >
                          {/* <Option value="all">All</Option> */}
                          <Option value="Not-Started">Not Started</Option>
                          <Option value="Inputs-Not-Completed">
                            Inputs Not Completed
                          </Option>
                          <Option value="Review-In-Progress">
                            Review-In-Progress
                          </Option>
                          <Option value="Verified">Verified</Option>
                          <Option value="Rejected">Rejected</Option>
                          <Option value="Rejected-And-Blocked">
                            Rejected And Blocked
                          </Option>
                        </Select>
                      </Col>
                    )}
                    {this.state.showCDCStatusFilter == true && (
                      <Col span={12}>
                        <Select
                          defaultValue={this.state.searchInput || undefined}
                          style={{ width: 250, float: "left" }}
                          onChange={this.handleCdcChange}
                          placeholder="Select a CDC status"
                        >
                          {/* <Option value="all">All</Option> */}
                          <Option value="CDC-AUTHORIZED">CDC-AUTHORIZED</Option>
                          <Option value="CDC-NOT-AUTHORIZED">
                            CDC-NOT-AUTHORIZED
                          </Option>
                        </Select>
                      </Col>
                    )}
                    {this.state.showKYCStatusFilter == false &&
                      this.state.showCDCStatusFilter == false && (
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
                              defaultValue={this.state.searchInput}
                              className={ss.inputField}
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
