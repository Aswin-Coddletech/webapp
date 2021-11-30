import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Select, Spin, Button } from "antd";
import { ILoan } from "src/interfaces/Loans.interface";
import ss from "./NewQuotesPage.module.scss";
import { TableList } from "src/components/TableList/TableList";
import { ROUTES } from "src/constants/routes";
import moment from "moment";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import UserInfoModal from "src/components/UserInfoModal";
//import { itemsNotInPolicySelector } from "src/redux/insurance-policy/selectors";

const { Option } = Select;
let status = "CDC-STEP-NOT-DONE";
let page = 1;

export interface INewQuotesPageData {
  loading: boolean;
  list: ILoan[];
  userAccount: IUserAccount;
  userAccountLoading: boolean;
  newQuotesFilter: any;
  currentPage: number;
}

export interface INewQuotesPageCallbacks {
  onInit(status: string): any;
  getQuotesFilterList(status: any, search: any): any;
  getUser(userId: any): any;
  onFilterChange(status: string): any;
  onPagenatationChange(page: number): any;
}

export interface INewQuotesPageProps
  extends INewQuotesPageData,
    INewQuotesPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  filterStatus: string;
  //columnValues: any[];
  showPopup: boolean;
}

export class NewQuotesPage extends Component<INewQuotesPageProps, ILocalState> {
  constructor(props) {
    super(props);
    if (typeof props.newQuotesFilter === "string") {
      status = props.newQuotesFilter;
    }
    this.state = {
      filterStatus: status,
      //columnValues: columns,
      showPopup: false
    };
  }
  componentDidMount() {
    this.props.onFilterChange(this.state.filterStatus);
    this.props.getQuotesFilterList("stepFilter", this.state.filterStatus);
    if (typeof this.props.currentPage === "number") {
      page = this.props.currentPage;
    }
  }

  handleChange = (status: any) => {
    this.props.onFilterChange(status);
    this.onPageChange(1);
    this.props.getQuotesFilterList("stepFilter", status);
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
      pathname: ROUTES.NEW_QUOTES_DETAIL_PAGE,
      state: {
        id: quote.quoteId
      }
    });
  };

  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  render() {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    //const { list, loading } = this.props;
    const columns = [
      {
        title: "Quote Id",
        dataIndex: "quoteId"
      },
      {
        title: "User Id ",
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
        title: "Registration step",
        dataIndex: "isCollateralCollectionComplete",
        render: (text, item) => (
          <span>
            {item.isCollateralCollectionComplete ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: " Bank Account Step",
        dataIndex: "isBankAccountNumberValid",
        //render: (text,item) => <span>{item.isBankAccountNumberValid ? "Yes" : "No"}</span>
        render: (text, item) => (
          <span>
            {null
              ? "InComplete"
              : item.isBankAccountNumberValid
              ? "Done"
              : "InComplete"}
          </span>
        )
      },
      {
        title: "BankId Step",
        dataIndex: "isBankIdValid",
        render: (text, item) => (
          <span>
            {null ? "InComplete" : item.isBankIdValid ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "KYC Step",
        dataIndex: "isKycVerified",
        render: (text, item) => (
          <span>
            {null ? "InComplete" : item.isKycVerified ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "CDC Step",
        dataIndex: "isCdcAuthorized",
        render: (text, item) => (
          <span>
            {null ? "InComplete" : item.isCdcAuthorized ? "Done" : "InComplete"}
          </span>
        )
      },

      {
        title: "Enrollment step",
        dataIndex: "isCollateralAcquisitionComplete",
        render: (text, item) => (
          <span>
            {item.isCollateralAcquisitionComplete ? "Done" : "InComplete"}
          </span>
        )
      },
      {
        title: "Inspection step",
        dataIndex: "isCollateralInspectionComplete",
        render: (text, item) => (
          <span>
            {item.isCollateralInspectionComplete ? "Done" : "InComplete"}
          </span>
        )
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
        title: "Created At",
        dataIndex: "createdAt",
        sorter: (a, b) =>
          moment(a.createdAt).unix() - moment(b.createdAt).unix()
      }
    ];
    const ITableListHocData = {
      list: this.props.list,
      loading: this.props.loading,
      columns: columns,
      rowKey: "quoteId",
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
                <h2>All New Quotes</h2>
              </Col>
              <Col>
                <Select
                  defaultValue={this.state.filterStatus}
                  style={{ width: 200, float: "right" }}
                  onChange={this.handleChange}
                >
                  <Option value="UPTO-BANK-STEP-DONE">
                    Upto Bank Step Done
                  </Option>
                  <Option value="UPTO-BANKID-STEP-DONE">
                    Upto Bank ID Step Done
                  </Option>
                  <Option value="UPTO-KYC-STEP-DONE">Upto KYC Step Done</Option>
                  <Option value="UPTO-CDC-STEP-DONE">Upto CDC Step Done</Option>
                  <Option value="BANK-STEP-NOT-DONE">Bank Step Not Done</Option>
                  <Option value="BANKID-STEP-NOT-DONE">
                    Bank ID Step Not Done
                  </Option>
                  <Option value="KYC-STEP-NOT-DONE">KYC Step Not Done</Option>
                  <Option value="CDC-STEP-NOT-DONE">CDC Step Not Done</Option>
                </Select>
              </Col>
            </Row>
          </div>
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
