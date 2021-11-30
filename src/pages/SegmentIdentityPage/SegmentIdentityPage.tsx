/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Table, Select, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import ss from "./SegmentIdentityPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { FormInstance } from "antd/lib/form/util";

const { Option } = Select;
const { Search } = Input;

let page = 1;
let filterData = {};
let inputData = "";
let searchOptionChosen = "emailId";

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

export interface ISegmentIdentityPageData {
  loading: boolean;
  list: IUserAccount[];
  //list: IQuote[];
  segmentFilter: any;
  currentPage: number;
}

export interface ISegmentIdentityPageCallbacks {
  onInit(status: string): any;
  getUserList(status: any, search: any): any;
  onSearchFilterChange(filter: any): any;
  clearUserList(): any;
  onPagenatationChange(page: number): any;
}

export interface ISegmentIdentityPageProps
  extends ISegmentIdentityPageData,
    ISegmentIdentityPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  columnValues: any[];
  searchInput: string;
}

export class SegmentIdentityPage extends Component<
  ISegmentIdentityPageProps,
  ILocalState
> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    if (Object.keys(props.segmentFilter).length > 0) {
      const { key, value } = props.segmentFilter;
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
      searchInput: inputData
    };
  }

  componentDidMount() {
    //this.props.onInit("userId");
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

  handleChange = (status: any) => {
    //this.props.getUserItemsList(status);
    this.formRef.current!.setFieldsValue({
      filterStatus: status,
      searchText: ""
    });
    this.setState({ filterStatus: status });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  onFinish = values => {
    console.log("submit");
    console.log(values);
    filterData = {
      key: values.filterStatus,
      value: values.searchText
    };
    this.setState({ searchInput: values.searchText });
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getUserList(values.filterStatus, values.searchText);
  };

  onSelectedValues = User => {
    this.props.history.push({
      pathname: ROUTES.USERS_SEGMENT_IDENTITY_DETAIL,
      state: {
        id: User.userId
      }
    });
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
      <div className={ss.root}>
        <div>
          <Row justify="space-between" className={ss.titleBar}>
            <Col>
              <h2>Segment Identity</h2>
            </Col>
          </Row>
        </div>

        <Row style={{ width: "100%" }} justify="start">
          <Col span={24}>
            <Form
              name="user-search"
              initialValues={{
                filterStatus: this.state.filterStatus
              }}
              onFinish={this.onFinish}
              ref={this.formRef}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="filterStatus">
                    <Select
                      defaultValue={this.state.filterStatus}
                      style={{ width: 200, float: "right" }}
                      onChange={this.handleChange}
                    >
                      <Option value="emailId">Email Id</Option>
                      <Option value="userId">User Id</Option>
                    </Select>
                  </Form.Item>
                </Col>
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
                      defaultValue={this.state.searchInput || undefined}
                      className={ss.inputField}
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
    );
  }
}
