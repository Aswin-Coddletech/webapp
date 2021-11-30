/* eslint-disable */
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Tabs, Row, Col, Select, Spin, Modal, Button } from "antd";
import ss from "./SignatureDocumentPage.module.scss";
import { colorMelloonPrimary } from "../../constants/colors";
import { TableList } from "../../components/TableList/TableList";
import { IQuote } from "../../interfaces/Quotes.interface";
import moment from "moment";
import { ROUTES } from "../../constants/routes";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import UserInfoModal from "src/components/UserInfoModal";

const { TabPane } = Tabs;
const { Option } = Select;
let status: string = "PENDING-SIGNATURE";
let page = 1;

export interface ISignatureDocumentPageData {
  loading: boolean;
  list: IQuote[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  filterValue: any;
  currentPage: number;
}

export interface ISignatureDocumentPageCallbacks {
  onInit(status: string): any;
  getQuotesList(status: any): any;
  getUser(userId: any): any;
  onFilterChange(status: string): any;
  onPagenatationChange(page: number): any;
}

export interface ISignatureDocumentPageProps
  extends ISignatureDocumentPageData,
    ISignatureDocumentPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  showPopup: boolean;
}

export class SignatureDocumentPage extends Component<
  ISignatureDocumentPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    if (typeof props.filterValue === "string") {
      status = props.filterValue;
    }
    this.state = {
      filterStatus: status,
      showPopup: false
    };
  }

  componentDidMount() {
    this.props.onInit(this.state.filterStatus);
    this.props.onFilterChange(this.state.filterStatus);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  handleChange = (status: any) => {
    console.log("status", status);
    this.props.onFilterChange(status);
    this.props.getQuotesList(status);
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

  onSelectedValues = quote => {
    this.props.history.push({
      pathname: ROUTES.QUOTES_SIGNATURE_DOCUMENT_DETAIL,
      state: {
        id: quote.quoteId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  tabCallback(key) {
    console.log(key);
  }

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    const columns = [
      {
        title: "Quote Number",
        dataIndex: "quoteNumber",
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
        title: "Total Amount",
        dataIndex: "repaymentTotalAmount",
        sorter: {
          compare: (a, b) => a.repaymentTotalAmount - b.repaymentTotalAmount
        }
      },
      {
        title: "Quote Inspected at",
        dataIndex: "inspectedAt",
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
      },
      {
        title: "Status",
        dataIndex: "status"
      },
      {
        title: "Approved/Rejected at",
        render: (text, row) => (
          <span> {row.approvedAt ? row.approvedAt : row.rejecedAt} </span>
        ),
        sorter: (a, b) =>
          moment(a.approvedAt ? a.approvedAt : a.rejecedAt).unix() -
          moment(b.approvedAt ? b.approvedAt : b.rejecedAt).unix()
      }
    ];
    console.log("list", this.props.list);
    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "quoteId",
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
        <>
          <div>
            <div>
              <Row justify="space-between" className={ss.titleBar}>
                <Col>
                  <h2>Signature Documents</h2>
                </Col>
              </Row>
            </div>

            <div className={ss.cardContainer}>
              <Tabs
                defaultActiveKey="1"
                onChange={this.tabCallback}
                type="card"
              >
                <TabPane tab="Quotes" key="1">
                  <Row justify="end">
                    <h5
                      style={{
                        fontWeight: "bold",
                        paddingRight: "10px",
                        marginTop: "10px"
                      }}
                    >
                      Quote Status:
                    </h5>
                    <Select
                      defaultValue={this.state.filterStatus}
                      style={{ width: 200, marginBottom: "16px" }}
                      onChange={this.handleChange}
                    >
                      <Option value="PENDING-SIGNATURE">
                        Pending-Signature
                      </Option>
                      <Option value="SIGNED-AND-ACCEPTED">
                        Signed and Accepted
                      </Option>
                      <Option value="SIGNATURE-DECLINED">Declined</Option>
                      <Option value="CANCELLED">Cancelled</Option>
                      <Option value="EXPIRED">Expired</Option>
                    </Select>
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
                      <TableList
                        {...ITableListHocData}
                        {...ITableListHocCallbacks}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="Documents" key="2">
                  <Row style={{ width: "100%" }} justify="start">
                    <h5
                      style={{
                        fontWeight: "bold",
                        paddingRight: "10px",
                        marginTop: "10px"
                      }}
                    >
                      Document Status:
                    </h5>
                    <Select
                      defaultValue={this.state.filterStatus}
                      style={{ width: 200, marginBottom: "10px" }}
                      //onChange={this.handleChange}
                    >
                      <Option value="PENDING-SIGNATURE">
                        Pending-Signature
                      </Option>
                      <Option value="SIGNED-AND-ACCEPTED">
                        Signed and Accepted
                      </Option>
                      <Option value="SIGNATURE-DECLINED">Declined</Option>
                      <Option value="CANCELLED">Cancelled</Option>
                      <Option value="EXPIRED">Expired</Option>
                    </Select>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </>
      </Spin>
    );
  }
}
