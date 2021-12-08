import * as React from "react";
import { Fragment } from "react";
import {
  Card,
  Descriptions,
  Row,
  Col,
  Table,
  Timeline,
  Collapse,
  Button
} from "antd";
import { ClockCircleOutlined, LinkOutlined } from "@ant-design/icons";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IQuote } from "src/interfaces/InstantQuote.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import ss from "./QuoteCard.module.scss";

const { Column } = Table;
const { Panel } = Collapse;

// let percentage = 0;
// const events = [
//   {
//     eventName: "Email Delivered -",
//     date: "09/04/2020 11:57:38 (UTC)",
//   },
//   {
//     eventName: "Document opened -",
//     date: "09/04/2020 12:41:49 (UTC)",
//   },
//   {
//     eventName: "Terms & Conditions accepted -",
//     date: "09/04/2020 12:42:15 (UTC)",
//   },
//   {
//     eventName: "Document signed -",
//     date: "09/04/2020 12:42:16 (UTC)",
//   },
// ];

export interface IQuoteCardData {}

export interface IQuoteCardHocData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IQuoteCardCallbacks {}

export interface ILocalState {
  screenOption: number;
  percentage: number;
}

export interface IQuoteCardProps
  extends IQuoteCardData,
    IQuoteCardCallbacks,
    IQuoteCardHocData {}

export class QuoteCard extends React.Component<IQuoteCardProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
      percentage: 0
    };
  }

  componentDidMount() {
    //nothing
  }

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderTitle = quoteId => {
    // eslint-disable-next-line
    let t = quoteId != undefined ? "Quote#:" + "\xa0" + quoteId : "";
    return t;
  };

  renderStrokeColor = score => {
    return score > 600 ? `rgba(220, 20, 60, ${score / 100})` : `#0E86D4`;
  };

  renderQuoteStatus = status => {
    let val = "Quote Status: ";
    return val + status;
  };

  renderOtherQuoteData = (quote, userAccount, inspectedBy, approvedBy) => {
    // if (Object.keys(userAccount).length > 0) {
    //   percentage = userAccount.eaScore;
    // }
    const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel header={this.renderQuoteStatus(quote.status)} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Loan Type">
                <span>{quote.loanType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Rate(Periodic)">
                <span>{quote.interestRatePercent}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Rate Per Month">
                <span>{quote.interestRatePerMonthPercent}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Rate Per Annum">
                <span>{quote.interestRatePerAnnumPercent}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Term">
                <span>{quote.repaymentDurationInDays} Days</span>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                <span>{quote.createdAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Principal Amount">
                <span>{this.renderAmount(quote.principalAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Amount">
                <span>{this.renderAmount(quote.interestAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                <span>{this.renderAmount(quote.repaymentTotalAmount)}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {userAccount.userId && (
            <Panel header={"User Information"} key="2">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="User Name">
                  <span>{userAccount.fullName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="KYC status">
                  <span>{userAccount.kycStatus}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <span style={{ fontSize: 14 }}>{userAccount.emailId}</span>
                  <Button
                    href={`${REACT_APP_INTERCOM_LINK}email=${userAccount.emailId}`}
                    target="_blank"
                    type="link"
                    icon={<LinkOutlined style={{ alignItems: "center" }} />}
                    size={"small"}
                  >
                    <span style={{ fontSize: 14 }}>
                      visit intercom user-email
                    </span>
                  </Button>
                </Descriptions.Item>

                <Descriptions.Item label="KYC Document Type">
                  <span>{userAccount.kycDocumentType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="User Id">
                  <span style={{ fontSize: 14 }}>{quote.userId}</span>
                  <Button
                    href={`${REACT_APP_INTERCOM_LINK}user=${quote.userId}`}
                    target="_blank"
                    type="link"
                    icon={<LinkOutlined style={{ alignItems: "center" }} />}
                    size={"small"}
                  >
                    <span style={{ fontSize: 14 }}>
                      visit intercom user-user-id
                    </span>
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {/* {userAccount.eaResults && (
            <Panel header={"Emailage"} key="3">
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
                    <ChangingProgressProvider values={[0, userAccount.eaScore]}>
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
                              fill: this.renderStrokeColor(userAccount.eaScore),
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
                              color: this.renderStrokeColor(userAccount.eaScore)
                            }}
                          >
                            <strong>{userAccount.eaScore}</strong>
                          </span>
                          <div
                            style={{
                              color: this.renderStrokeColor(userAccount.eaScore)
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
                            stroke: this.renderStrokeColor(userAccount.eaScore)
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
                <span className={ss.riskBandTitle} style={{ marginTop: 50 }}>
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
                        <span>{userAccount.eaResults.domainrelevantinfo}</span>
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
                        <span>{userAccount.eaResults.domainriskcountry}</span>
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
                        <span>{userAccount.eaResults.emailToIpConfidence}</span>
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
                          {userAccount.eaResults.emailToShipAddressConfidence}
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
                        <span>{userAccount.eaResults.email_creation_days}</span>
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
                          {userAccount.eaResults.emailToBillAddressConfidence}
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
                          {userAccount.eaResults.overallDigitalIdentityScore}
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
                        <span>{userAccount.eaResults.userdefinedrecordid}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <span className={ss.riskBandTitle} style={{ marginTop: 50 }}>
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
                        <span>{userAccount.eaResults.domaincountryname}</span>
                      </div>
                    </div>
                    <div className={ss.evenItem}>
                      <div className={ss.tableContainer}>
                        <span>
                          <strong>Comapny:</strong>
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
            </Panel>
          )} */}
          <Panel header="Collateral Items" key="4">
            <Row>
              <Col>
                <Table
                  dataSource={quote.collateralItems}
                  rowKey="itemId"
                  className={ss.table}
                  pagination={false}
                  size={"small"}
                  bordered={false}
                >
                  <Column dataIndex="itemId" title="User Item Id" />
                  <Column dataIndex="categoryId" title="Category Id" />
                  <Column dataIndex="brandId" title="Brand" />
                  <Column dataIndex="title" title="Product Model" />
                  <Column dataIndex="condition" title="Item Condition" />
                  <Column
                    dataIndex="totalValue"
                    title="Collateral Value"
                    render={this.renderAmount}
                  />
                </Table>
              </Col>
            </Row>
          </Panel>
          <Panel header={"Collateral Collection"} key="5">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.collateralCollectionMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required?">
                <span>
                  {quote.isCollateralCollectionRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>
                  {quote.isCollateralCollectionComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Completed at">
                <span>{quote.collateralCollectionCompletedAt}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Collateral Custody"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.collateralAcquisitionMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required?">
                <span>
                  {quote.isCollateralAcquisitionRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>
                  {quote.isCollateralAcquisitionComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Completed at">
                <span>{quote.collateralAcquisitionCompletedAt}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Collateral Inspection"} key="7">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.collateralInspectionMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required?">
                <span>
                  {quote.isCollateralInspectionRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>
                  {quote.isCollateralInspectionComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Inspected at">
                <span>{quote.inspectedAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Inspection observation">
                <span>{quote.observation}</span>
                {/* <span>All Good</span> */}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Contract Signature"} key="8">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.contractSignatureMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required?">
                <span>{quote.isContractSignatureRequired ? "Yes" : "No"}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>{quote.isContractSignatureComplete ? "Yes" : "No"}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Collateral Return"} key="9">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.collateralReturnMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required?">
                <span>{quote.isCollateralReturnRequired ? "Yes" : "No"}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>{quote.isCollateralReturnComplete ? "Yes" : "No"}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Loan Creation"} key="10">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.loanCreationMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required?">
                <span>{quote.isLoanCreationRequired ? "Yes" : "No"}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>{quote.isLoanCreationComplete ? "Yes" : "No"}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Loan Disbursal"} key="11">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{quote.loanDisbursalMethod}</span>
              </Descriptions.Item>

              <Descriptions.Item label="Required?">
                <span>{quote.isLoanDisbursalRequired ? "Yes" : "No"}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete?">
                <span>{quote.isLoanDisbursalComplete ? "Yes" : "No"}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Request method">
                <span>{quote.loanDisbursalRequestMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Request required?">
                <span>
                  {quote.isLoanDisbursalRequestRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Request complete?">
                <span>
                  {quote.isLoanDisbursalRequestComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {quote.inspectedAt && (
            <Panel header={"Inspection Information"} key="12">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Inspected At">
                  <span>{quote.inspectedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Inspected By">
                  <span>{inspectedBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Observation">
                  <span>{quote.observation}</span>
                </Descriptions.Item>
                {quote.inspectionPreliminaryObservation && (
                  <Descriptions.Item label="Inspection Preliminary Observation">
                    <span>{quote.inspectionPreliminaryObservation}</span>
                  </Descriptions.Item>
                )}
                {quote.inspectionDetailsCompletedAt && (
                  <Descriptions.Item label="inspectionDetailsCompletedAt">
                    <span>{quote.inspectionDetailsCompletedAt}</span>
                  </Descriptions.Item>
                )}
                {quote.inspectionDetails && (
                  <>
                    <Descriptions.Item label="Active Loan Count">
                      <span>{quote.inspectionDetails.activeLoanCount}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaAdvice">
                      <span>{quote.inspectionDetails.eaAdvice}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaFirstSeenDays">
                      <span>{quote.inspectionDetails.eaFirstSeenDays}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaFraudType">
                      <span>{quote.inspectionDetails.eaFraudType}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaReason">
                      <span>{quote.inspectionDetails.eaReason}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaRiskBand">
                      <span>{quote.inspectionDetails.eaRiskBand}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaScore">
                      <span>{quote.inspectionDetails.eaScore}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="eaSourceIndustry">
                      <span>{quote.inspectionDetails.eaSourceIndustry}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="User Device Count">
                      <span>{quote.inspectionDetails.userDevieCount}</span>
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
              {quote.inspectionErrors && (
                <Descriptions>
                  <Descriptions.Item label="Inspection Error List">
                    <Table
                      style={{ paddingBottom: "20px" }}
                      // columns={InspectionErrorColumns}
                      dataSource={quote.inspectionErrors}
                      pagination={false}
                      rowKey="inpectionErrorCode"
                    >
                      <Column
                        dataIndex="inspectionType"
                        title="Inspection Type"
                      />
                      <Column
                        dataIndex="inpectionErrorCode"
                        title="Inpection Error Code"
                      />
                      <Column
                        dataIndex="inspectionErrorDescription"
                        title="Inspection Error Description"
                      />
                    </Table>
                  </Descriptions.Item>
                </Descriptions>
              )}
            </Panel>
          )}
          {quote.approvedAt && (
            <Panel header={"Approval Information"} key="13">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Approved At">
                  <span>{quote.approvedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Approved By">
                  <span>{approvedBy}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {quote.rejectedAt && (
            <Panel header={"Rejected Information"} key="14">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Rejected At">
                  <span>{quote.rejectedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Rejected By">
                  <span>{quote.rejectedBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Rejection Reason">
                  <span>{quote.rejectionReason}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {(quote.status === "PENDING-SIGNATURE" ||
            quote.status === "SIGNED-AND-ACCEPTED") && (
            <Panel header={"Signature Document"} key="15">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Document Status">
                  <span>{quote.status}</span>
                </Descriptions.Item>

                <Descriptions.Item label="Signature Method">
                  <span>{quote.contractSignatureMethod}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Signed Accepted at">
                  <span>{quote.contractSignedAndAcceptedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Signed Document">
                  <span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    >
                      Signature Acceptance
                    </a>
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Audit Trail Document">
                  <span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    >
                      Audit Dcoument
                    </a>
                  </span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {quote.status === "SIGNED-AND-ACCEPTED" && (
            <Panel header={"Signature Events"} key="16">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Timeline mode="alternate" style={{ paddingLeft: "10px" }}>
                  <Timeline.Item
                    dot={<ClockCircleOutlined style={{ fontSize: "15px" }} />}
                    color="green"
                  >
                    Email Sent - 09/04/2020 11:57:36 (UTC)
                  </Timeline.Item>
                  {/* {events.map((item, i) => (
                                      <Timeline.Item>
                                        {item.eventName} {item.date}
                                      </Timeline.Item>
                                    ))} */}
                  <Timeline.Item
                    dot={<ClockCircleOutlined style={{ fontSize: "15px" }} />}
                    color="green"
                  >
                    Document Submitted - 09/04/2020 12:42:20 (UTC)
                  </Timeline.Item>
                </Timeline>
              </Descriptions>
            </Panel>
          )}
        </Collapse>
        <div style={{ marginTop: "10px" }}>
          {/* user Information */}

          {/* Pickup Details */}
          {/* <Descriptions
            title={"Pickup Details"}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Scheduled Date">
              <span>
                {quote.collateralPickupSchedule !== undefined
                  ? quote.collateralPickupSchedule.pickupDate
                  : ""}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Scheduled Time">
              <span>
                {quote.collateralPickupSchedule !== undefined
                  ? quote.collateralPickupSchedule.pickupTimeSlot
                  : ""}
              </span>
            </Descriptions.Item>
          </Descriptions> */}

          {/* <Descriptions
            title={"Collateral Inclusion"}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Collateral inclusion count">
              <span>{quote.collateralInclusionsCount}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Collateral inclusion total market price">
              <span>{quote.collateralInclusionsTotalMarketPrice}</span>
            </Descriptions.Item>
          </Descriptions> */}
        </div>
      </>
    );
  };

  renderCard = () => {
    const {
      quote,
      loading,
      userAccount,
      inspectedUser,
      approvedUser
    } = this.props;
    let inspectedBy = "-";
    let approvedBy = "-";
    if (Object.keys(inspectedUser).length > 0) {
      inspectedBy = inspectedUser.emailId;
    }
    if (Object.keys(approvedUser).length > 0) {
      approvedBy = approvedUser.emailId;
    }
    if (quote) {
      return (
        <Card
          //hoverable
          loading={loading}
          headStyle={{ textAlign: "center", fontWeight: "bold" }}
          bodyStyle={{ textAlign: "left" }}
          title={this.renderTitle(quote.quoteNumber)}
        >
          <Card.Meta description={" "}></Card.Meta>
          <div>
            {" "}
            {this.renderOtherQuoteData(
              quote,
              userAccount,
              inspectedBy,
              approvedBy
            )}{" "}
          </div>
        </Card>
      );
    }
  };

  render() {
    console.log("props", this.props);
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
