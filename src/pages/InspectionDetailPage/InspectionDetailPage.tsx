/* eslint-disable no-mixed-operators */
import * as React from "react";
import { Fragment } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Alert,
  Spin,
  Modal,
  Table,
  Collapse,
  Descriptions
} from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IQuote } from "src/interfaces/Quotes.interface";
import ss from "./InspectionDetailPage.module.scss";
//import { TableList } from "src/components/TableList/TableList";
// import QuoteDetailCard from "src/components/QuoteDetailCard";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { ProgressBarLine } from "react-progressbar-line";
import moment from "moment";
import { TableList } from "src/components/TableList/TableList";

const { Panel } = Collapse;
let page = 1;

//const { Column } = Table;
const InspectionErrorColumns = [
  {
    title: "Inspection Type",
    dataIndex: "inspectionType",
    render: text => <span>{text}</span>
  },
  {
    title: "Inpection Error Code",
    dataIndex: "inpectionErrorCode",
    render: text => <span>{text}</span>
  },
  {
    title: "Inspection Error Description",
    dataIndex: "inspectionErrorDescription",
    render: text => <span>{text}</span>
  }
];

export interface IInspectionDetailPageData {
  loading: boolean;
  quote: IQuote;
  submitSuccess: string;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
  installmentList: any;
  loansList: any;
  deviceList: any;
  currentPage: number;
}

export interface IInspectionDetailPageHocData {}

export interface IInspectionDetailPageCallbacks {
  inspectionComplete(quoteId: string, observation: string): any;
  getInspection(quoteId: any): any;
  observationInfo(data: {}): any;
  getInstallmentsList(filter: string, status: string): any;
  getLoansList(filter: any, search: any): any;
  getdeviceLockList(status: any, search: any): any;
  onPagenatationChange(page: number): any;
}

export interface IInspectionDetailPageHocCallbacks {
  //changeSelectedQuote(quote: IQuote): any;
}

export interface ILocalState {
  locationStateInspection: any;
  observation: string;
  completeModalVisible: boolean;
  showPopup: boolean;
}

export interface IInspectionDetailPageProps
  extends IInspectionDetailPageData,
    IInspectionDetailPageHocData,
    IInspectionDetailPageCallbacks,
    IInspectionDetailPageHocCallbacks,
    RouteComponentProps {}

export class InspectionDetailPage extends React.Component<
  IInspectionDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateInspection: {},
      completeModalVisible: false,
      observation: "",
      showPopup: false
    };
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState(
        { locationStateInspection: this.props.location.state },
        () => {
          this.props.getInspection(this.state.locationStateInspection.quoteId);
          this.props.getInstallmentsList(
            "userId",
            this.state.locationStateInspection.userId
          );
          this.props.getLoansList(
            "userId",
            this.state.locationStateInspection.userId
          );
          this.props.getdeviceLockList(
            "userId",
            this.state.locationStateInspection.userId
          );
        }
      );
    }
  }

  onFinish = values => {
    console.log(values);
    this.setState({ observation: values.observation }, () => {
      this.setState({ completeModalVisible: true });
    });
    //this.props.observationInfo(values);
  };

  submitInspection = (id, completeModalVisible) => {
    this.setState({ completeModalVisible });
    this.props.inspectionComplete(id, this.state.observation);
  };

  renderStrokeColor = score => {
    return score > 600 ? `rgba(220, 20, 60, ${score / 100})` : `#0E86D4`;
  };

  completeModal(completeModalVisible) {
    this.setState({ completeModalVisible });
  }
  onPageChange = item => {
    this.props.onPagenatationChange(item);
    page = item;
  };

  onChange = key => {
    console.log(key);
  };

  tabClick = () => {
    this.onPageChange(1);
  };

  onClickRow = item => {};

  validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

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

    /*loansList = loansList.filter(item => {
      return item.loanId !== locationStateInspection.quoteId;
    });*/
    //loansList.reverse().slice(0,5);
    // eslint-disable-next-line array-callback-return
    loansList.map((item, index) => {
      let creationDiff;
      console.log("length", loansList.length);
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

    //console.log(">>>>>",loansList);
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
      currentPage: page
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
        //render: text => <span>{text ? text : "-"}</span>
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
      currentPage: page
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
      currentPage: page
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
        <div>
          {quote.inspectionPreliminaryObservation && (
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={24}>
                <h2 style={{ fontWeight: "bold" }}>
                  {" "}
                  Inspection Preliminary Observation{" "}
                </h2>
              </Col>
              {quote.inspectionErrorCount && (
                <Col>
                  <label>Inspection Error Count : </label>
                  <span>{quote.inspectionErrorCount}</span>
                </Col>
              )}
              {quote.inspectionDetailsCompletedAt && (
                <Col>
                  <label>Inspection Details Completed At : </label>
                  <span>{quote.inspectionDetailsCompletedAt}</span>
                </Col>
              )}
              {quote.inspectedAt && (
                <Col>
                  <label>Inspectd At : </label>
                  <span>{quote.inspectedAt}</span>
                </Col>
              )}
              {quote.inspectionPreliminaryObservation && (
                <Col span={24}>
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid #CCC",
                      marginTop: "20px",
                      padding: "10px",
                      alignItems: "flex-end",
                      backgroundColor: "#dcdcdc"
                    }}
                  >
                    <span style={{ marginLeft: "10px" }}>
                      {quote.inspectionPreliminaryObservation}
                    </span>
                  </div>
                </Col>
              )}
            </Row>
          )}
          {quote.inspectionErrors && (
            <Row>
              <Col span={24}>
                <h2 style={{ fontWeight: "bold" }}>Inspection Errors</h2>
              </Col>
              <Col>
                <Table
                  style={{ paddingBottom: "20px" }}
                  columns={InspectionErrorColumns}
                  dataSource={quote.inspectionErrors}
                  pagination={false}
                  rowKey="inpectionErrorCode"
                />
              </Col>
            </Row>
          )}
          {quote.inspectionDetails && (
            <Collapse defaultActiveKey={["1"]}>
              <Panel header={"Inspection Highlights"} key="1">
                <Descriptions
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                  {quote.inspectionDetails &&
                    Object.keys(quote.inspectionDetails).map((keyName, i) => (
                      <Descriptions.Item key={i} label={keyName}>
                        <span>{quote.inspectionDetails[keyName]}</span>
                      </Descriptions.Item>
                    ))}
                </Descriptions>
              </Panel>
            </Collapse>
          )}
          {this.props.quote.isCollateralInspectionComplete !== true && (
            <Row>
              <Col span={24}>
                <h2 style={{ fontWeight: "bold" }}> Add Observation </h2>
              </Col>
              <Col span={24}>
                <Form name="submit-observation" onFinish={this.onFinish}>
                  <Row gutter={24}>
                    <Col md={10} xs={24}>
                      <Form.Item
                        name="observation"
                        rules={[
                          {
                            required: true,
                            message: "Please add the observation!"
                          }
                        ]}
                      >
                        <Input.TextArea rows={5} placeholder="Observation" />
                      </Form.Item>
                    </Col>
                    <Col md={14} xs={24}>
                      <p>
                        Check the Nuovo console and confirm that the device is
                        indeed enrolled properly. If everything looks good, type
                        all-ok in this field. In future, you will be able to
                        trigger remote-diagnostics or log-collection on the
                        enrolled mobile-device from this screen.
                      </p>
                      {this.props.quote.collateralInspectionMethod ===
                        "INHOUSE-INSPECTION" && (
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Save
                          </Button>
                        </Form.Item>
                      )}
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className={ss.buttonStyle}
                          // onClick={(e) =>
                          //   this.submitInspection(locationStateInspection.quoteId)
                          // }
                          //onClick={() => this.completeModal(true)}
                        >
                          Complete Inspection!
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
          <Modal
            title="Complete Inspection"
            centered
            visible={this.state.completeModalVisible}
            onOk={() =>
              this.submitInspection(locationStateInspection.quoteId, false)
            }
            onCancel={() => this.completeModal(false)}
          >
            <p>Do you really want to complete the inspection?</p>
          </Modal>
          <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
            {userAccount.eaResults && (
              <Panel header={"EmailAge Details"} key="1">
                <div>
                  <Row>
                    <Col>
                      <div>
                        <span>
                          <strong>Email: </strong>
                          {userAccount.emailId}
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <Row className={ss.chartContainer}>
                    <Col>
                      <div className={ss.circularProgress}>
                        <ChangingProgressProvider
                          values={[0, userAccount.eaScore]}
                        >
                          {percentage => (
                            <CircularProgressbarWithChildren
                              strokeWidth={5}
                              value={userAccount.eaScore}
                              minValue={0}
                              maxValue={999}
                              styles={{
                                root: {},
                                path: {
                                  stroke: this.renderStrokeColor(
                                    userAccount.eaScore
                                  ),
                                  strokeLinecap: "butt",
                                  transition: "stroke-dashoffset 0.8s ease 0s"
                                },
                                trail: {
                                  stroke: "#d6d6d6",
                                  strokeLinecap: "butt"
                                },
                                text: {
                                  fill: this.renderStrokeColor(
                                    userAccount.eaScore
                                  ),
                                  fontSize: "13px"
                                },
                                background: {
                                  fill: "#3e98c7"
                                }
                              }}
                            >
                              <span
                                className={ss.displayScore}
                                style={{
                                  color: this.renderStrokeColor(
                                    userAccount.eaScore
                                  )
                                }}
                              >
                                <strong>{userAccount.eaScore}</strong>
                              </span>
                              <div
                                style={{
                                  color: this.renderStrokeColor(
                                    userAccount.eaScore
                                  )
                                }}
                                className={ss.riskDesc}
                              >
                                <span>{userAccount.eaAdvice}</span>
                              </div>
                            </CircularProgressbarWithChildren>
                          )}
                        </ChangingProgressProvider>
                      </div>
                    </Col>
                    <Col>
                      <Row>
                        <span className={ss.riskBandTitle}>
                          <strong>Risk Band:</strong>
                        </span>
                        <div className={ss.riskBandLineBar}>
                          <ProgressBarLine
                            text={userAccount.eaResults.EARiskBandID}
                            value={userAccount.eaResults.EARiskBandID}
                            min={0}
                            max={6}
                            strokeWidth={5}
                            trailWidth={4}
                            styles={{
                              path: {
                                stroke: this.renderStrokeColor(
                                  userAccount.eaScore
                                )
                              },
                              trail: {
                                stroke: "#dcdcdc"
                              },
                              text: {
                                fill: "#404040",
                                textAlign: "center",
                                fontSize: "32px"
                              }
                            }}
                          />
                        </div>
                      </Row>
                      <Row>
                        <div>
                          <span>
                            <strong>Risk Band Description: </strong>
                            {userAccount.eaResults.EARiskBand}
                          </span>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  <div>
                    <span
                      className={ss.riskBandTitle}
                      style={{ marginTop: 50 }}
                    >
                      <strong>Risk Indicators:</strong>
                    </span>
                  </div>
                  <div className={ss.tableMainContainer}>
                    <Row>
                      <Col>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Fraud Scrore:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaScore}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Fraud Scrore Created at:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {moment(
                                userAccount.eaResults.eaScoreCreatedAt
                              ).format("DD.MM.YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Fraud Advice:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.EAAdvice}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Risk Reason:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaReason}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Fraud Risk:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.fraudRisk}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Relevant Info:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.domainrelevantinfo}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Hits:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.totalhits}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Unique Hits:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.uniquehits}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Exisits?:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domainExists}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Corporate:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domaincorporate}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Risk Level:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domainrisklevel}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Corporate:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domaincorporate}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Name:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domainname}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Corporate:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domaincorporate}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email Exisits?:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.emailExists}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Risk Country:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.domainriskcountry}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>First Verification Date:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {moment(
                                userAccount.eaResults.firstVerificationDate
                              ).format("DD.MM.YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Last Verification Date:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {moment(
                                userAccount.eaResults.lastVerificationDate
                              ).format("DD.MM.YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Age:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domainAge}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Last Verification Date:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {moment(
                                userAccount.eaResults.lastVerificationDate
                              ).format("DD.MM.YYYY")}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Source Industry:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.source_industry}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>EA Advice ID:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.EAAdviceID}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>EA Reason ID:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.EAReasonID}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone Owner:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.phoneowner}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone Carrier Type:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.phonecarriertype}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Image url:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.imageurl}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>phoneToBillAddressConfidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .phoneToBillAddressConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>phone To FullName Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.phoneToFullNameConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone To LastName Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.phoneToLastNameConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone To Ship Address Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .phoneToShipAddressConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone Carrier Name:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.phonecarriername}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone Carrier Network Code:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.phonecarriernetworkcode}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Created (days):</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.domain_creation_days}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Bill Address Name Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .billAddressToFullNameConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email To Ip Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.emailToIpConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email To Phone Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.emailToPhoneConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email Ship Address Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .emailToShipAddressConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email Creation Days (days):</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.email_creation_days}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>First Seen Days:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.first_seen_days}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Fraud Type:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.fraud_type}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email Bill Address Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .emailToBillAddressConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email Full Name Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.emailToFullNameConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>IP To Bill Address Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.ipToBillAddressConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>IP To FullName Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.ipToFullNameConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Overall Digital Identity Score:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .overallDigitalIdentityScore
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone Status:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.phone_status}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Ship Forward:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.shipforward}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Userdefined Record Id:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.userdefinedrecordid}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>DIS Description:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.disDescription}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Domain Relevant infoID:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.domainrelevantinfoID}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Name Match:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.namematch}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Email Last Name Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.emailToLastNameConfidence}
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Location:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.location}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>EA RiskBand ID:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.EARiskBandID}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>EA Status ID:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.EAStatusID}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>
                                Bill Address Last Name Confidence:
                              </strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .billAddressToLastNameConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>SM Friends:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.smfriends}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Phone Carrier Name:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.phonecarriername}
                            </span>
                          </div>
                        </div>

                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Ship Forward:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.shipforward}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Ship To Bill Address Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .shipAddressToBillAddressConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Ship To Full Name Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .shipAddressToFullNameConfidence
                              }
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Ship To Last Name Confidence:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {
                                userAccount.eaResults
                                  .shipAddressToLastNameConfidence
                              }
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <span
                      className={ss.riskBandTitle}
                      style={{ marginTop: 50 }}
                    >
                      <strong>Supporting Data:</strong>
                    </span>
                  </div>
                  <div className={ss.tableMainContainer}>
                    <Row>
                      <Col>
                        <div className={ss.supportDataSubColumns}>
                          <span>
                            <strong>Personal</strong>
                          </span>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Location:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.location}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Title:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.title}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Company Title:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.company}</span>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className={ss.supportDataSubColumns}>
                          <span>
                            <strong>Domain: </strong>
                            {userAccount.eaResults.domainname}
                          </span>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Country:</strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {userAccount.eaResults.domaincountryname}
                            </span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Company:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domaincompany}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Corporate:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domaincorporate}</span>
                          </div>
                        </div>
                        <div className={ss.evenItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Category:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domaincategory}</span>
                          </div>
                        </div>
                        <div className={ss.oddItem}>
                          <div className={ss.tableContainer}>
                            <span>
                              <strong>Risk Level:</strong>
                            </span>
                          </div>
                          <div>
                            <span>{userAccount.eaResults.domainrisklevel}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {userAccount.eaResults.smlinks.length > 0 && (
                    <div>
                      <span
                        className={ss.riskBandTitle}
                        style={{ marginTop: 50, marginBottom: 20 }}
                      >
                        <strong>SM Links Info:</strong>
                      </span>
                      {userAccount.eaResults.smlinks.map((links, index) => {
                        if (index % 2 === 0) {
                          return (
                            <div className={ss.oddItem} key={index}>
                              <div className={ss.tableContainer}>
                                <span>
                                  <strong>{links.source}:</strong>
                                </span>
                              </div>
                              <div>
                                <span>
                                  {this.validURL(links.link) ? (
                                    <a
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href={links.link}
                                    >
                                      {links.link}
                                    </a>
                                  ) : (
                                    links.link
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className={ss.evenItem} key={index}>
                              <div className={ss.tableContainer}>
                                <span>
                                  <strong>{links.source}:</strong>
                                </span>
                              </div>
                              <div>
                                <span>
                                  {this.validURL(links.link) ? (
                                    <a
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href={links.link}
                                    >
                                      {links.link}
                                    </a>
                                  ) : (
                                    links.link
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </Panel>
            )}
            {loansList.length > 0 && (
              <Panel header={"Loan History"} key="3">
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
              <Panel header={"All User Devices"} key="4">
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
        </div>
      </div>
    );
  };

  render() {
    const {
      quote,
      loading,
      userAccount,
      installmentList,
      loansList,
      deviceList
    } = this.props;
    const IQuoteCardHocData = {
      quote: this.props.quote,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const IQuoteCardHocCallback = {
      //onInit: this.props.onInit,
    };

    return (
      <>
        <div className={ss.successMsg}>
          {!loading && this.props.submitSuccess === "YES" && (
            <Alert message="Quote Inspected Successfully" type="success" />
          )}
          {!loading && this.props.submitSuccess === "NO" && (
            <Alert message="Quote Inspection Failed" type="error" />
          )}
        </div>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <div>
            {" "}
            {Object.keys(quote).length !== 0 &&
              this.renderObservationAction(
                quote,
                userAccount,
                installmentList,
                loansList,
                deviceList
              )}{" "}
          </div>
          <Fragment>
            <QuoteCard {...IQuoteCardHocData} {...IQuoteCardHocCallback} />
            {/* <QuoteDetailCard /> */}
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
