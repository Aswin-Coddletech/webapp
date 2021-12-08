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
import { IInstallment } from "src/interfaces/Loans.interface";
import moment from "moment";

import ss from "./InstallmentsPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { EyeOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { SearchOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form/util";

const { Column } = Table;

const { Option } = Select;

let filterData = {
  key: "status",
  value: "INSTALLMENT-REPAID"
};
let inputData = "";
let serachOptionChosen = "emailId";
let page = 1;

export interface IInstallmentsPageData {
  loading: boolean;
  list: IInstallment[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface IInstallmentsPageCallbacks {
  onInit(filter: string, status: string): any;
  getInstallmentsList(filter: string, status: string): any;
  onSearchFilterChange(filter: any): any;
  getUser(userId: any): any;
  onPagenatationChange(page: number): any;
}

export interface IInstallmentsPageProps
  extends IInstallmentsPageData,
    IInstallmentsPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  serachOption: string;
  hideStatusFilter: boolean;
  showPopup: boolean;
  locationState: any;
  inputValue: string;
}

export class InstallmentsPage extends Component<
  IInstallmentsPageProps,
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
      hideStatusFilter: serachOptionChosen == "status" ? false : true,
      showPopup: false,
      filterStatus: serachOptionChosen,
      serachOption: serachOptionChosen,
      inputValue: inputData,
      locationState: {}
    };
  }

  componentDidMount() {
    //this.props.onInit("status", "INSTALLMENT-REPAID");
    this.props.onSearchFilterChange(filterData);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = {
      key: "status",
      value: "INSTALLMENT-REPAID"
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
    this.props.getInstallmentsList("status", status);
    this.setState({ filterStatus: status });
  };

  handleFilter = (filter: any) => {
    this.formRef.current!.setFieldsValue({
      serachOption: filter,
      searchText: ""
    });
    if (filter == "status") {
      this.setState({ hideStatusFilter: false, inputValue: "" });
    } else {
      this.setState({ hideStatusFilter: true, inputValue: "" });
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

  onSelectedValues = Loan => {
    this.props.history.push({
      pathname: ROUTES.LOANS_INSTALLMENTS_DETAIL,
      state: {
        id: Loan.loanId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
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
    if (values.serachOption == "loanId") {
      this.props.history.push({
        pathname: ROUTES.LOANS_INSTALLMENTS_DETAIL,
        state: {
          id: values.searchText
        }
      });
    } else {
      this.props.getInstallmentsList(values.serachOption, values.searchText);
    }
    //this.props.getdeviceLockList(values.filterStatus, values.searchText);
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Loan Number",
        dataIndex: "loanNumber",
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
        title: "Installment Number",
        dataIndex: "installmentNumber",
        render: text => <span>{text}</span>
      },
      {
        title: "Installment Amount",
        dataIndex: "installmentAmount",
        sorter: {
          compare: (a, b) => a.installmentAmount - b.installmentAmount
        },
        render: (text, item) => (
          <span>
            {item.installmentCcy} {text}
          </span>
        )
      },
      {
        title: "Installment Due Date",
        dataIndex: "installmentDueDate",
        sorter: (a, b) =>
          moment(a.installmentDueDate).unix() -
          moment(b.installmentDueDate).unix()
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
        title: "Repaid At",
        dataIndex: "repaidAt",
        sorter: (a, b) => moment(a.repaidAt).unix() - moment(b.repaidAt).unix()
      },
      {
        title: "repaidAmount",
        dataIndex: "repaidAmount",
        sorter: {
          compare: (a, b) => a.repaidAmount - b.repaidAmount
        },
        render: (text, item) => (
          <span>
            {item.installmentCcy} {text}
          </span>
        )
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
                  <h2>Installments</h2>
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
                    {this.state.hideStatusFilter == false && (
                      <Col span={12}>
                        <Select
                          defaultValue={this.state.inputValue || undefined}
                          style={{ width: 250, float: "left" }}
                          onChange={this.handleChange}
                          placeholder="Select a status"
                        >
                          {/* <Option value="all">All</Option> */}
                          <Option value="INSTALLMENT-REPAID">
                            INSTALLMENT-REPAID
                          </Option>
                          <Option value="INSTALLMENT-PARTIALLY-REPAID">
                            INSTALLMENT-PARTIALLY-REPAID
                          </Option>
                          <Option value="INSTALLMENT-NOT-REPAID">
                            INSTALLMENT-NOT-REPAID
                          </Option>
                        </Select>
                      </Col>
                    )}
                    {this.state.hideStatusFilter == true && (
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
