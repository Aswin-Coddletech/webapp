import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Row, Col, Spin, Select, Input, Button, Form } from "antd";
import ss from "./CustomerPage.module.scss";
import { SearchOutlined } from "@ant-design/icons";

import { ROUTES } from "src/constants/routes";
import { TableList } from "src/components/TableList/TableList";
import { ICustomer } from "src/interfaces/Customer.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form";

const { Option } = Select;
//const { Search } = Input
let page = 1;
let status = "CDC-STEP_NOT_DONE";
let filterData = "";
let searchOptionChosen = "emailId";

export interface ICustomerPageData {
  loading: boolean;
  list: ICustomer[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface ICustomerPageCallbacks {
  onInit(status: string): any;
  getCustomerList(search: any): any;
  onPagenatationChange(page: number): any;
  onFilterChange(): any;
  onSearchFilterChange(filter: any): any;
}

export interface ILocalState {
  filterStatus: string;
  showPopup: boolean;
  showStatusFilter: boolean;
  searchOption: string;
}

export interface ICustomerPageProps
  extends ICustomerPageData,
    ICustomerPageCallbacks,
    RouteComponentProps {}

export class CustomerPage extends Component<ICustomerPageProps, ILocalState> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    // if (typeof props.newCustomers==='string'){
    //     status = props.newCustomers
    // }
    if (Object.keys(props.filterValues).length > 0) {
      filterData = "";
    }
    this.state = {
      filterStatus: status,
      showPopup: false,
      showStatusFilter: searchOptionChosen === "status" ? true : false,
      searchOption: "emailId"
    };
  }

  componentDidMount() {
    this.props.onSearchFilterChange(filterData);
    this.props.getCustomerList(filterData);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = "";
  }

  handleChange = (address: any) => {
    filterData = address;
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getCustomerList(filterData);
    this.setState({ filterStatus: status });
  };

  handleFilter = (filter: any) => {
    this.formRef.current!.setFieldsValue({
      searchOption: filter,
      searchText: ""
    });
    this.props.getCustomerList("");
    if (filter === "address") {
      this.setState({
        showStatusFilter: true
      });
    } else {
      this.setState({
        showStatusFilter: false
      });
    }
  };

  onFinish = values => {
    filterData = values.searchText;
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getCustomerList(values.searchText);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onSelectedValues = customer => {
    this.props.history.push({
      pathname: ROUTES.CUSTOMER_DETAIL,
      state: {
        id: customer.userId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  render() {
    const { loading, list } = this.props;
    console.log("****List : ", loading, list);
    const columns = [
      {
        title: "User Id",
        dataIndex: "id"
      },
      {
        title: "Name",
        dataIndex: "customerName"
      },
      {
        title: "Address",
        dataIndex: "address"
      },
      {
        title: "Email Id",
        dataIndex: "emailId"
      },
      {
        title: "Phone No",
        dataIndex: "phoneNumber"
      }
    ];

    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "userId",
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
                <h2>Customer List</h2>
              </Col>
            </Row>
          </div>

          <Row style={{ width: "100%" }} justify="start">
            <Col span={24}>
              <Form
                name="device-search"
                initialValues={{ searchOption: this.state.searchOption }}
                onFinish={this.onFinish}
                ref={this.formRef}
              >
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="searchOption">
                      <Select
                        defaultValue={this.state.searchOption}
                        style={{ width: 200, float: "right" }}
                        onChange={this.handleFilter}
                      >
                        <Option value="emailId">Email Id</Option>
                        <Option value="address">Location</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {this.state.showStatusFilter === true && (
                    <Col span={8}>
                      <Select
                        defaultValue={"" || undefined}
                        style={{ width: 200, float: "left" }}
                        onChange={this.handleChange}
                        placeholder="Select a location"
                      >
                        <Option value="Kerala">Kerala</Option>
                        <Option value="Karnataka">Karnataka</Option>
                        <Option value="Tamil Nadu">Tamil Nadu</Option>
                        <Option value="Hyderabad">Hyderabad</Option>
                      </Select>
                    </Col>
                  )}
                  {this.state.showStatusFilter === false && (
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
                          defaultValue={"" || undefined}
                          placeholder="Please enter value to search"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SearchOutlined />}
                          style={{ float: "right" }}
                        />
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
    );
  }
}
