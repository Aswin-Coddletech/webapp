import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Form, Input, Spin } from "antd";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { FormInstance } from "antd/lib/form/util";
import ss from "./Product.module.scss";
import UserInfoModal from "src/components/UserInfoModal";
import { IProduct } from "src/interfaces/Product.interface";

import { SearchOutlined } from "@ant-design/icons";

let filterData = "";
let page = 1;

export interface IProductPageData {
  loading: boolean;
  list: IProduct[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValue: any;
  currentPage: number;
}

export interface IProductPageCallbacks {
  getProductList(value: string): any;
  onPagenatationChange(page: number): any;
  onSearchFilterChange(filter: any): any;
}

export interface IProductPageProps
  extends IProductPageData,
    IProductPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  showPopup: boolean;
}

export class ProductPage extends Component<IProductPageProps, ILocalState> {
  formRef = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
  }

  componentDidMount() {
    this.props.onSearchFilterChange(filterData);
    this.props.getProductList(filterData);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  handleChange = shopName => {
    filterData = shopName;
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getProductList(filterData);
  };

  handleCancel = () => {
    this.setState({ showPopup: false });
  };

  onFinish = value => {
    filterData = value.searchText;
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    this.props.getProductList(filterData);
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  onSelectedValues = product => {
    console.log("ProductDetailPage is called with Id : ", product.id);
    this.props.history.push({
      pathname: ROUTES.PRODUCT_DETAIL,
      state: {
        id: product.id
      }
    });
  };

  render() {
    const columns = [
      {
        title: "Product Id",
        dataIndex: "id"
      },
      {
        title: "Title",
        dataIndex: "title"
      },
      {
        title: "Sub Title",
        dataIndex: "sub_title"
      },
      {
        title: "Description",
        dataIndex: "description"
      },
      {
        title: "Cost Price",
        dataIndex: "cost_price"
      },
      {
        title: "Product Status",
        dataIndex: "product_status"
      }
    ];

    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "id",
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
                <h2>Product List</h2>
              </Col>
            </Row>
          </div>
          <Row style={{ width: "100%" }} justify="space-between">
            <Col span={12} className={ss.searchBar}>
              <Form
                name="device-search"
                onFinish={this.onFinish}
                ref={this.formRef}
              >
                <Form.Item
                  name="searchText"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Shop Name to search "
                    }
                  ]}
                >
                  <Input
                    className={ss.inputField}
                    defaultValue={"" || undefined}
                    placeholder="Please enter Shop Name"
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
