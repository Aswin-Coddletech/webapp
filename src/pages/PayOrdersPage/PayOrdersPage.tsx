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
import { IDisbursal } from "src/interfaces/Loans.interface";
import moment from "moment";

import ss from "./PayOrdersPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form/util";

const { Column } = Table;

const { Option } = Select;
let filterData = {};
let inputData = "";
let serachOptionChosen = "loanId";
let page = 1;

export interface IPayOrdersPageData {
  loading: boolean;
  list: IDisbursal[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface IPayOrdersPageCallbacks {
  onInit(status: string): any;
  getPayOrdersList(filter: any, search: any): any;
  onSearchFilterChange(filter: any): any;
  getUser(userId: any): any;
  onPagenatationChange(page: number): any;
}

export interface IPayOrdersPageProps
  extends IPayOrdersPageData,
    IPayOrdersPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  serachOption: string;
  showStatusFilter: boolean;
  showPopup: boolean;
  inputValue: string;
}

export class PayOrdersPage extends Component<IPayOrdersPageProps, ILocalState> {
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
    //this.props.onSearchFilterChange(filterData);
    //this.props.getPayOrdersList("status", "NEW");
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }
  componentWillUnmount() {
    filterData = {
      key: "status",
      value: "PAYORDER-FULFILLED"
    };
    inputData = "";
    serachOptionChosen = "loanId";
  }

  handleChange = (status: any) => {
    filterData = {
      key: "status",
      value: status
    };
    this.props.onSearchFilterChange(filterData);
    this.props.getPayOrdersList("status", status);
    this.setState({ filterStatus: status });
  };

  onSelectedValues = disbursal => {
    this.props.history.push({
      pathname: ROUTES.LOANS_PAYORDERS_DETAIL,
      state: {
        id: disbursal.disbursalId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
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

  userIdClick = quote => {
    console.log("clicked on userId", quote);
    this.setState({ showPopup: true });
    this.props.getUser(quote.userId);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onFinish = values => {
    console.log("submit");
    console.log(values);
    filterData = {
      key: values.serachOption,
      value: values.searchText
    };
    this.setState({ inputValue: values.searchText });
    this.props.onSearchFilterChange(filterData);
    this.props.getPayOrdersList(values.serachOption, values.searchText);
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Disbursal Number",
        dataIndex: "disbursalNumber",
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
          style={{ marginTop: "60px" }}
        >
          <div className={ss.root}>
            <div>
              <Row justify="space-between" className={ss.titleBar}>
                <Col>
                  <h2>Pay Orders</h2>
                </Col>
              </Row>
            </div>
            <Row style={{ width: "100%" }} justify="start">
              <Col span={24}>
                <Form
                  name="payorder-search"
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
                          <Option value="NEW">New</Option>
                          <Option value="PAYORDER-IN-ERROR">
                            PayOrder In Error
                          </Option>
                          <Option value="PAYORDER-WAITING-IN-POOL">
                            PayOrder Waiting In Pool
                          </Option>
                          <Option value="PAYORDER-FULFILLED">
                            PayOrder Fulfilled
                          </Option>
                          <Option value="PAYORDER-FULFILLMENT-ERROR">
                            PayOrder Fullfillment Error
                          </Option>
                          <Option value="PAYORDER-CANCELLED-BY-SERVICE-PROVIDER">
                            PayOrder Cancelled By Service Provider
                          </Option>
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
