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
import currency, { Any } from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IInstallment } from "src/interfaces/Loans.interface";
import moment from "moment";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import ss from "./OverduesPage.module.scss";
import { colorMelloonPrimary } from "src/constants/colors";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
import { FormInstance } from "antd/lib/form/util";

const { Column } = Table;

const { Option } = Select;

let filterData = {
  key: "status",
  value: "OVERDUE"
};
let inputData = "";
let serachOptionChosen = "allOverdues";
let page = 1;

export interface IOverduesPageData {
  loading: boolean;
  list: IInstallment[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValues: any;
  currentPage: number;
}

export interface IOverduesPageCallbacks {
  onInit(filter: string, status: string): any;
  getInstallmentsList(filter: string, status: string): any;
  getUserOverdueList(userId: string): any;
  getLoanOverdueList(loanId: string): any;
  onSearchFilterChange(filter: any): any;
  getUser(userId: any): any;
  onPagenatationChange(page: number): any;
}

export interface IOverduesPageProps
  extends IOverduesPageData,
    IOverduesPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  //columnValues: any[];
  serachOption: string;
  showSearch: boolean;
  showPopup: boolean;
  filterStatus: string;
  inputValue: string;
}

export class OverduesPage extends Component<IOverduesPageProps, ILocalState> {
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
      //columnValues: columns,
      //serachOption: "allOverdues",
      showSearch: serachOptionChosen == "allOverdues" ? false : true,
      showPopup: false,
      filterStatus: serachOptionChosen,
      serachOption: serachOptionChosen,
      inputValue: inputData
    };
  }

  componentDidMount() {
    this.props.onSearchFilterChange(filterData);
    this.props.onInit("status", "OVERDUE");
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  componentWillUnmount() {
    filterData = {
      key: "status",
      value: "OVERDUE"
    };
    inputData = "";
    serachOptionChosen = "allOverdues";
  }

  handleChange = (filter: any) => {
    this.formRef.current!.setFieldsValue({
      serachOption: filter,
      searchText: ""
    });
    filterData = {
      key: "status",
      value: filter
    };
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    if (filter == "allOverdues") {
      this.setState({ showSearch: false, inputValue: "" });
      this.props.getInstallmentsList("status", "OVERDUE");
    } else {
      this.setState({ showSearch: true });
    }
    this.setState({ serachOption: filter });
  };

  onSelectedValues = Loan => {
    this.props.history.push({
      pathname: ROUTES.ORDER_DETAIL,
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

  onFinish = values => {
    filterData = {
      key: values.serachOption,
      value: values.searchText
    };
    this.setState({ inputValue: filterData.value });
    this.props.onSearchFilterChange(filterData);
    this.onPageChange(1);
    console.log("searchOption", values.serachOption);
    if (values.serachOption == "loanId") {
      this.props.getLoanOverdueList(values.searchText);
    } else {
      this.props.getUserOverdueList(values.searchText);
    }
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Loan Number",
        dataIndex: "loanNumber",
        render: text => <span>{text}</span>,
        onCell: (record, rowIndex) => {
          return {
            onClick: e => {
              console.log("onClick");
              e.stopPropagation();
            }
          };
        }
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
        title: "Installment Number",
        dataIndex: "installmentNumber",
        render: text => <span>{text}</span>
      },
      {
        title: "Installment Due Date",
        dataIndex: "installmentDueDate",
        defaultSortOrder: "descend",
        sorter: (a, b) =>
          moment(a.installmentDueDate).unix() -
          moment(b.installmentDueDate).unix()
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
        title: "Repaid Amount",
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
        title: "Repaid At",
        dataIndex: "repaidAt",
        sorter: (a, b) => moment(a.repaidAt).unix() - moment(b.repaidAt).unix()
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
        title: "Amount Not Repaid",
        dataIndex: "amountNotRepaid",
        sorter: {
          compare: (a, b) => a.amountNotRepaid - b.amountNotRepaid
        },
        render: (text, item) => (
          <span>
            {item.installmentCcy} {item.installmentAmount - item.repaidAmount}
          </span>
        )
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
                  <h2>Overdues</h2>
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
                          onChange={this.handleChange}
                        >
                          <Option value="allOverdues">All Overdues</Option>
                          <Option value="loanId">Loan ID</Option>
                          <Option value="userId">User ID</Option>
                          {/*<Option value="emailId">Email ID</Option>*/}
                        </Select>
                      </Form.Item>
                    </Col>
                    {this.state.showSearch == true && (
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
