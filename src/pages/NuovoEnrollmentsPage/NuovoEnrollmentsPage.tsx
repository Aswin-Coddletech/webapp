/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Table, Select, Spin, Modal } from "antd";
import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import ss from "./NuovoEnrollmentsPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IInventory } from "src/interfaces/Inventory.interface";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";

const { Option } = Select;
let status: string = "NOT-REGISTERED";
let page = 1;

export interface INuovoEnrollmentsPageData {
  loading: boolean;
  list: IInventory[];
  //list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValue: string;
  currentPage: number;
}

export interface INuovoEnrollmentsPageCallbacks {
  onInit(status: string): any;
  getUserItemsList(status: any): any;
  getUser(userId: any): any;
  onFilterChange(filter: any): any;
  onPagenatationChange(page: number): any;
}

export interface INuovoEnrollmentsPageProps
  extends INuovoEnrollmentsPageData,
    INuovoEnrollmentsPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showPopup: boolean;
}

export class NuovoEnrollmentsPage extends Component<
  INuovoEnrollmentsPageProps,
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
    this.props.getUserItemsList(status);
    this.props.onFilterChange(status);
    this.onPageChange(1);
    this.setState({ filterStatus: status });
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
      pathname: ROUTES.NUOVO_ENROLLMENTS_DETAIL,
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

      // {
      //   title: "Status",
      //   dataIndex: "status",
      // },
      {
        title: "Item Created at",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.inspectedAt).unix() - moment(b.inspectedAt).unix()
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
                <h2>Device Search</h2>
              </Col>
              <Col>
                <Select
                  defaultValue={this.state.filterStatus}
                  style={{ width: 200, float: "right" }}
                  onChange={this.handleChange}
                >
                  <Option value="NOT-REGISTERED">NOT-REGISTERED</Option>
                  <Option value="REGISTERED">REGISTERED</Option>
                  <Option value="ENROLLED">ENROLLED</Option>
                  <Option value="ENROLLED-AND-NOT-LOCKED">
                    ENROLLED-AND-NOT-LOCKED
                  </Option>
                  <Option value="LOCKED">LOCKED</Option>
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
