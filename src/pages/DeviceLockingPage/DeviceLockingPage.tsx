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
import {
  SearchOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import ss from "./DeviceLockingPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IInventory } from "src/interfaces/Inventory.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { Inventory } from "src/api/inventory";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form/util";

const { Option } = Select;
const { Search } = Input;
let filterData = {};
let inputData = "";
let searchOptionChosen = "userId";
let page = 1;
export interface IDeviceLockingPageData {
  loading: boolean;
  list: IInventory[];
  //list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  deviceFilter: any;
  currentPage: number;
}

export interface IDeviceLockingPageCallbacks {
  onInit(status: string): any;
  getdeviceLockList(status: any, search: any): any;
  getUser(userId: any): any;
  onSearchFilterChange(filter: any): any;
  clearDeviceLockList(): any;
  onPagenatationChange(page: number): any;
}

export interface IDeviceLockingPageProps
  extends IDeviceLockingPageData,
    IDeviceLockingPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showPopup: boolean;
  searchInput: string;
}

export class DeviceLockingPage extends Component<
  IDeviceLockingPageProps,
  ILocalState
> {
  formRef = React.createRef<FormInstance>();
  constructor(props) {
    super(props);
    if (Object.keys(props.deviceFilter).length > 0) {
      const { key, value } = props.deviceFilter;
      filterData = {
        key,
        value
      };
      inputData = value;
      searchOptionChosen = key;
    }
    this.state = {
      filterStatus: searchOptionChosen,
      //columnValues: columns
      showPopup: false,
      searchInput: inputData
    };
  }

  componentDidMount() {
    //this.props.onInit("userId");
    if (this.state.searchInput) {
      this.props.getdeviceLockList(
        this.state.filterStatus,
        this.state.searchInput
      );
    }
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = {};
    inputData = "";
    searchOptionChosen = "userId";
    this.props.clearDeviceLockList();
  }

  handleChange = (status: any) => {
    //this.props.getUserItemsList(status);
    this.formRef.current!.setFieldsValue({
      filterStatus: status,
      searchText: ""
    });
    this.setState({ filterStatus: status });
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
    this.props.getdeviceLockList(values.filterStatus, values.searchText);
  };

  userIdClick = quote => {
    console.log("clicked on userId", quote);
    this.setState({ showPopup: true });
    this.props.getUser(quote.userId);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onSelectedValues = item => {
    this.props.history.push({
      pathname: ROUTES.DEVICE_LOCKING_DETAIL,
      state: {
        itemId: item.itemId
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
        title: "Item ID",
        dataIndex: "itemId",
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
        title: "Title",
        dataIndex: "title"
      },
      {
        title: "Product",
        dataIndex: "product"
      },
      {
        title: "Model",
        dataIndex: "model"
      },
      {
        title: "Locked",
        dataIndex: "isLocked",
        render: (text, row) => <span> {row.isLocked ? "Yes" : "No"} </span>
      },
      {
        title: "Price",
        dataIndex: "price",
        render: text => <span>{text}</span>
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
        title: "Item Created at",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.inspectedAt).unix() - moment(b.inspectedAt).unix()
      }
    ];
    const { userAccount, list, loading } = this.props;
    console.log("props", this.props);

    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "itemId",
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
                <h2>Device Locking</h2>
              </Col>
            </Row>
          </div>

          <Row style={{ width: "100%" }} justify="start">
            <Col span={24}>
              <Form
                name="device-search"
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
                        <Option value="userId">User ID</Option>
                        <Option value="itemId">Item ID</Option>
                        <Option value="IMEI">IMEI Numnber</Option>
                        <Option value="DEVICE_ID">Device ID</Option>
                        <Option value="ANDROID_ID">Android Id</Option>
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
