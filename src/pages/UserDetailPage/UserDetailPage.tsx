import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button, Alert, Collapse } from "antd";
import { RouteComponentProps } from "react-router-dom";
import ss from "./UserDetailPage.module.scss";
import { UserCard } from "../../components/UserCard/UserCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { IQuote } from "src/interfaces/Quotes.interface";
import moment from "moment";
import { TableList } from "src/components/TableList/TableList";
const { Panel } = Collapse;

export interface IUserDetailPageData {
  loading: boolean;
  userAccount: IUserAccount;
  kycSubmitSuccess: string;
  quote: IQuote;
  inspectedUser: any;
  approvedUser: any;
  installmentList: any;
  loansList: any;
  deviceList: any;
}

export interface IUserDetailPageHocData {}

export interface IUserDetailPageCallbacks {
  getUser(userId: any): any;
  resetKyc(userId: any): any;
  verifyKyc(userId: any): any;
  clearResetKyc(): any;
  clearVerifyKyc(): any;
  getInstallmentsList(filter: string, status: string): any;
  getLoansList(filter: any, search: any): any;
  getdeviceLockList(status: any, search: any): any;
}

export interface IUserDetailPageHocCallbacks {}

export interface ILocalState {
  locationState: any;
  successMsg: string;
  errorMsg: string;
  buttonClicked: string;
  locationStateInspection: any;
  editPhoneNumbermodal: boolean;
}

export interface IUserDetailPageProps
  extends IUserDetailPageData,
    IUserDetailPageHocData,
    IUserDetailPageCallbacks,
    IUserDetailPageHocCallbacks,
    RouteComponentProps {}

export class UserDetailPage extends React.Component<
  IUserDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationState: {},
      successMsg: "",
      errorMsg: "",
      buttonClicked: "",
      locationStateInspection: {},
      editPhoneNumbermodal: false
    };
  }

  componentDidMount() {
    console.log("this.props user Details", this.props.location.state);
    if (this.props.location.state != null) {
      this.setState({ locationState: this.props.location.state }, () => {
        this.props.getUser(this.state.locationState.id);
        this.props.getInstallmentsList("userId", this.state.locationState.id);
        this.props.getLoansList("userId", this.state.locationState.id);
        this.props.getdeviceLockList("userId", this.state.locationState.id);
      });
    }

    // else {
    //   this.setState({ locationState: this.props.location.state }, () => {
    //     //this.props.getUser("b4203855-c25a-491f-9959-e81346a573b9");
    //     this.props.getUser("b2142073-7d0e-462a-a9af-445ce931d599");
    //   });
    // }
  }
  componentWillUnmount() {
    this.props.clearResetKyc();
    this.props.clearVerifyKyc();
    console.log("in umount");
  }

  kycReset = () => {
    this.setState({
      successMsg: "successfully reset user KYC",
      buttonClicked: "Reset"
    });
    this.props.resetKyc(this.state.locationState.id);
  };

  kycVerify = () => {
    this.setState({
      successMsg: "KYC successfully verified",
      buttonClicked: "Verify"
    });
    this.props.verifyKyc(this.state.locationState.id);
  };

  onChange = key => {
    console.log(key);
  };

  onClickRow = item => {};
  onPageChange = item => {};

  /*editPhoneNumberPopup = () => {
    this.setState({ editPhoneNumbermodal: true });
  };

  seteditPhoneNumberClose = () => {
    this.setState({ editPhoneNumbermodal: false });
  };*/
  overdueDays(installmentDueDate, repaidAt) {
    let overdueDays: any = "-";
    if (repaidAt) {
      repaidAt = repaidAt.split("T")[0];
      overdueDays = moment(repaidAt).diff(moment(installmentDueDate), "days");
      if (overdueDays > 0) {
        overdueDays = `Yes (${overdueDays} ${
          overdueDays > 1 ? "days" : "day"
        } late)`;
      } else {
        if (moment(installmentDueDate).isSame(repaidAt)) {
          overdueDays = "No (Paid on-time)";
        } else {
          overdueDays = `No (${Math.abs(overdueDays)} ${
            Math.abs(overdueDays) > 1 ? "days" : "day"
          } early)`;
        }
      }
    }
    return overdueDays;
  }

  renderObservationAction = (
    quote,
    userAccount,
    installmentList,
    loansList,
    deviceList
  ) => {
    const { locationStateInspection } = this.state;
    loansList = loansList.filter(item => {
      return item.loanId !== locationStateInspection.quoteId;
    });
    console.log("list", installmentList, loansList, deviceList);

    // eslint-disable-next-line array-callback-return
    loansList.map((item, index) => {
      let creationDiff;
      if (loansList.length > index + 1) {
        loansList[index + 1].createdAt = loansList[index + 1].createdAt.split(
          "T"
        )[0];
        loansList[index].createdAt = loansList[index].createdAt.split("T")[0];
        creationDiff = moment(loansList[index + 1].createdAt).diff(
          moment(loansList[index].createdAt),
          "days"
        );
        loansList[index].createdAfter = Math.abs(creationDiff) + " day(s)";
      }
      if (loansList.length > index) {
        let indexValue: any = "-";
        for (let i = index + 1; i < loansList.length; i++) {
          if (loansList[index].loanDisbursalCompletedAt) {
            if (loansList[i].loanDisbursalCompletedAt) {
              indexValue = i;
              break;
            } else {
              continue;
            }
          }
        }
        if (indexValue !== "-") {
          loansList[index].loanDisbursalCompletedAt = loansList[
            index
          ].loanDisbursalCompletedAt.split("T")[0];
          loansList[indexValue].loanDisbursalCompletedAt = loansList[
            indexValue
          ].loanDisbursalCompletedAt.split("T")[0];
          let disbursedDiff: any = moment(
            loansList[indexValue].loanDisbursalCompletedAt
          ).diff(moment(loansList[index].loanDisbursalCompletedAt), "days");
          loansList[index].disbursedAfter = Math.abs(disbursedDiff) + " day(s)";
        }
      }
      if (loansList.length > index) {
        let indexValue: any = "-";
        for (let i = index + 1; i < loansList.length; i++) {
          if (loansList[index].fullyRepaidAt) {
            if (loansList[i].fullyRepaidAt) {
              indexValue = i;
              break;
            } else {
              continue;
            }
          }
        }
        if (indexValue !== "-") {
          loansList[index].fullyRepaidAt = loansList[index].fullyRepaidAt.split(
            "T"
          )[0];
          loansList[indexValue].fullyRepaidAt = loansList[
            indexValue
          ].fullyRepaidAt.split("T")[0];
          let repaidDiff: any = moment(
            loansList[indexValue].fullyRepaidAt
          ).diff(moment(loansList[index].fullyRepaidAt), "days");
          loansList[index].repaidAfter = Math.abs(repaidDiff) + " day(s)";
        }
      }
    });

    const installmentColumn = [
      {
        title: "Loan Number",
        dataIndex: "loanNumber",
        render: text => <span>{text}</span>
      },
      {
        title: "Installment Number",
        dataIndex: "installmentNumber",
        render: text => <span>{text}</span>
      },
      {
        title: "Installment Amount",
        dataIndex: "installmentAmount",
        render: (text, item) => (
          <span>
            {item.installmentCcy} {text}
          </span>
        )
      },
      {
        title: "Installment Due Date",
        dataIndex: "installmentDueDate"
      },
      {
        title: "Repaid At",
        dataIndex: "repaidAt",
        render: text => <span>{text ? text.split("T")[0] : "-"}</span>
      },
      {
        title: "Overdue",
        dataIndex: "overdueDays",
        render: (text, item) => (
          <span>
            {this.overdueDays(item.installmentDueDate, item.repaidAt)}
          </span>
        )
      },
      {
        title: "repaidAmount",
        dataIndex: "repaidAmount",
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
    const InstallmentTableListHocData = {
      list: installmentList,
      loading: this.props.loading,
      columns: installmentColumn,
      rowKey: "loanId",
      currentPage: 1
    };
    const InstallmentTableListHocCallbacks = {
      onSelectedValues: this.onClickRow,
      onPageChange: this.onPageChange
    };

    const loanListColumns = [
      {
        title: "Loan Id",
        dataIndex: "quoteId",
        render: text => <span>{text}</span>
      },
      {
        title: "Total Amount",
        dataIndex: "repaymentTotalAmount"
      },
      {
        title: "Amount Repaid",
        dataIndex: "amountRepaid"
      },
      {
        title: "Amount Not Repaid",
        dataIndex: "amountNotRepaid"
      },
      {
        title: "Repayment Status",
        dataIndex: "repaymentStatus"
      },
      {
        title: "Status",
        dataIndex: "status"
      },
      {
        title: "Rejection Reason",
        dataIndex: "rejectionReason"
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: text => <span>{text ? text.split("T")[0] : "-"}</span>
      },
      {
        title: "Days between loans creation",
        dataIndex: "createdAfter",
        //key :Row.id,
        render: text => <span>{text ? text : "-"}</span>
      },
      {
        title: "Disbursed At",
        dataIndex: "loanDisbursalCompletedAt",
        render: text => <span>{text ? text.split("T")[0] : "-"}</span>
      },
      {
        title: "Days between loans disbursal",
        dataIndex: "disbursedAfter",
        render: text => <span>{text ? text : "-"}</span>
      },
      {
        title: "Fully Repaid At",
        dataIndex: "fullyRepaidAt",
        render: text => <span>{text ? text.split("T")[0] : "-"}</span>
      },
      {
        title: "Days between loans repaid",
        dataIndex: "repaidAfter",
        render: text => <span>{text ? text : "-"}</span>
      }
    ];
    const LoanTableListHocData = {
      list: loansList,
      loading: this.props.loading,
      columns: loanListColumns,
      rowKey: "loanId",
      currentPage: 1
    };
    const LoanTableListHocCallbacks = {
      onSelectedValues: this.onClickRow,
      onPageChange: this.onPageChange
    };

    const deviceListColumn = [
      {
        title: "Item ID",
        dataIndex: "itemId",
        render: text => <span>{text}</span>
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
        title: "Item Created at",
        dataIndex: "createdAt",
        render: text => <span>{text ? text.split("T")[0] : "-"}</span>
      }
    ];

    const DeviceTableListHocData = {
      list: deviceList,
      loading: this.props.loading,
      columns: deviceListColumn,
      rowKey: "itemId",
      currentPage: 1
    };
    const DeviceTableListHocCallbacks = {
      onSelectedValues: this.onClickRow,
      onPageChange: this.onPageChange
    };

    return (
      <div>
        {/* {quote.inspectedAt ? (
          ""
        ) : ( */}
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          {loansList.length > 0 && (
            <Panel header={"Loan History"} key="1">
              <Row>
                <Col>
                  <TableList
                    {...LoanTableListHocData}
                    {...LoanTableListHocCallbacks}
                  />
                </Col>
              </Row>
            </Panel>
          )}
          {installmentList.length > 0 && (
            <Panel header={"Repayment History"} key="2">
              <Row>
                <Col>
                  <TableList
                    {...InstallmentTableListHocData}
                    {...InstallmentTableListHocCallbacks}
                  />
                </Col>
              </Row>
            </Panel>
          )}
          {deviceList.length > 0 && (
            <Panel header={"All User Devices"} key="3">
              <Row>
                <Col>
                  <TableList
                    {...DeviceTableListHocData}
                    {...DeviceTableListHocCallbacks}
                  />
                </Col>
              </Row>
            </Panel>
          )}
        </Collapse>
        {/* <Modal
          title="Edit PhoneNumber"
          visible={this.state.editPhoneNumbermodal}
          width={450}
          //onOk={}
          //onCancel={this.seteditPhoneNumberClose}
          footer={[
            <Button
              className={ss.buttonStyle}
              form="myForm"
              key="back"
              onClick={this.seteditPhoneNumberClose}
            >
              Cancel
            </Button>,
            <Button
              className={ss.buttonStyle}
              type="primary"
              form="myForm"
              key="submit"
              htmlType="submit"
            >
              Save
            </Button>
          ]}
        >
          <Form>
            <Form.Item
              className={"ant-col-24"}
              label="Enter your phone number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter the phone number"
                }
              ]}
            >
              <Input
                className={ss.inputField}
                //defaultValue={this.state.inputValue || undefined}
                placeholder="Please enter the phone Number"
              />
            </Form.Item>
          </Form>
            </Modal>*/}
      </div>
    );
  };

  render() {
    const {
      quote,
      userAccount,
      installmentList,
      loansList,
      deviceList
    } = this.props;
    const { loading } = this.props;
    const { successMsg } = this.state;
    const IUserCardHocData = {
      quote: this.props.quote,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const IUserCardHocCallback = {
      //onInit: this.props.onInit,
    };
    console.log(">>>>>", this.props);
    console.log("loading", this.props.loading);
    return (
      <>
        <div className={ss.successMsg}>
          {this.props.kycSubmitSuccess === "YES" && (
            <Alert message={successMsg} type="success" />
          )}
          {!loading && this.props.kycSubmitSuccess === "NO" && (
            <Alert
              message={`Failed to ${this.state.buttonClicked}`}
              type="error"
            />
          )}
        </div>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <div>
            {" "}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Row>
                <Col>
                  <Button
                    type="primary"
                    className={ss.buttonStyle}
                    onClick={this.kycReset}
                  >
                    Reset KYC(INE DB)
                  </Button>
                  <Button
                    type="primary"
                    className={ss.buttonStyle}
                    onClick={this.kycVerify}
                  >
                    Verify KYC(Missing RFC)
                  </Button>
                </Col>
                {/*} <Col>
                  <Button
                    style={{ float: "right" }}
                    type="primary"
                    className={ss.buttonStyle}
                    onClick={this.editPhoneNumberPopup}
                  >
                    Edit Phone Number
                  </Button>
          </Col>*/}
              </Row>
            </div>{" "}
          </div>
          <div>
            {" "}
            {Object.keys(userAccount).length !== 0 &&
              this.renderObservationAction(
                quote,
                userAccount,
                installmentList,
                loansList,
                deviceList
              )}{" "}
          </div>
          <Fragment>
            <UserCard {...IUserCardHocData} {...IUserCardHocCallback} />
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
