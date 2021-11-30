import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse, Timeline, Row, Col, Button } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import ss from "./UserCard.module.scss";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { ProgressBarLine } from "react-progressbar-line";
import moment from "moment";

const { Panel } = Collapse;

export interface IUserCardData {}

export interface IUserCardHocData {
  loading: boolean;
  userAccount: IUserAccount;
}

export interface IUserCardCallbacks {}

export interface ILocalState {
  screenOption: number;
}

export interface IUserCardProps
  extends IUserCardData,
    IUserCardHocData,
    IUserCardCallbacks {}

export class UserCard extends React.Component<IUserCardProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
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

  renderStrokeColor = score => {
    return score > 600 ? `rgba(220, 20, 60, ${score / 100})` : `#0E86D4`;
  };

  renderTitle = userId => {
    // eslint-disable-next-line
    let t = userId != undefined ? "User#:" + "\xa0" + userId : "";
    return t;
  };

  renderKycStatus = status => {
    let val = "KYC Status: ";
    return val + status;
  };

  renderCdcStatus = status => {
    let val = "CDC Status: ";
    return val + status;
  };

  renderUserData = userAccount => {
    const { REACT_APP_INTERCOM_LINK } = process.env;

    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel header={"User Information"} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 2, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="User Id">
                <span style={{ fontSize: 14 }}>{userAccount.userId}</span>
                <Button
                  href={`${REACT_APP_INTERCOM_LINK}user=${userAccount.userId}`}
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
              <Descriptions.Item label="Customer Account Number">
                <span>{userAccount.customerAccountNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Customer Serial Number">
                <span>{userAccount.customerSerialNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Full Name">
                <span>{userAccount.fullName}</span>
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
                    visit intercom user-user-id
                  </span>
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                <span>{userAccount.phoneNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Occupation">
                <span>{userAccount.occupation}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Date Of Birth">
                <span>{userAccount.dateOfBirth}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Birth Country">
                <span>{userAccount.birthCountry}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Family Size">
                <span>{userAccount.familySize}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Monthly Income">
                <span>{userAccount.monthlyIncome}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Income Periodicity">
                <span>{userAccount.incomePeriodicity}</span>
              </Descriptions.Item>
              <Descriptions.Item label="RFC Number">
                <span>{userAccount.rfcNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="CURP Number">
                <span>{userAccount.curpNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="OCR Number">
                <span>{userAccount.ocrNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="CEP Status">
                <span>{userAccount.cepStatus}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                <span>{userAccount.createdAt}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Loan Details"} key="2">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Active Count">
                <span>{userAccount.loansActiveCount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Fully Repaid Count">
                <span>{userAccount.loansFullyRepaidCount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Requested Count">
                <span>{userAccount.loansRequestedCount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Signed And Accepted Count">
                <span>{userAccount.loansSignedAndAcceptedCount}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {userAccount.eaResults && (
            <Panel header={"EmailAge Details"} key="3">
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
                          <span>{userAccount.eaResults.phonecarriertype}</span>
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
                            {userAccount.eaResults.phoneToBillAddressConfidence}
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
                            {userAccount.eaResults.phoneToShipAddressConfidence}
                          </span>
                        </div>
                      </div>

                      <div className={ss.oddItem}>
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
                            <strong>Bill Address Last Name Confidence:</strong>
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
                          <span>{userAccount.eaResults.phonecarriername}</span>
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
                      <div className={ss.evenItem}>
                        <div className={ss.tableContainer}>
                          <span>
                            <strong>SMLink:</strong>
                          </span>
                        </div>
                        <div>
                          <span>{}</span>
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
              </div>
            </Panel>
          )}
          <Panel header={this.renderKycStatus(userAccount.kycStatus)} key="4">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="status">
                <span>{userAccount.kycStatus}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Number of Attempts">
                <span>{userAccount.kycAttempts}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Document Type">
                <span>{userAccount.kycDocumentType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Document Country Id">
                <span>{userAccount.kycDocumentCountryId}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Document Expiration Date">
                <span>{userAccount.kycDocumentExpirationDate}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Document Number">
                <span>{userAccount.kycDocumentNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Verification Started At">
                <span>{userAccount.kycMatiVerificationStartedAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Verification Inputs Completed At">
                <span>{userAccount.kycMatiVerificationInputsCompletedAt}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {userAccount.cdcStatus === "CDC-AUTHORIZED" && (
            <Panel header={this.renderCdcStatus(userAccount.cdcStatus)} key="5">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="status">
                  <span>{userAccount.cdcStatus}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Auth Code">
                  <span>{userAccount.cdcAuthCode}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Auth Code Created At">
                  <span>{userAccount.cdcAuthCodeCreatedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Auth Code Email Sent At">
                  <span>{userAccount.cdcAuthCodeEmailSentAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Consultation Authorized At">
                  <span>{userAccount.cdcConsultationAuthorizedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Terms And Conditions Accepted At">
                  <span>{userAccount.cdcTcAcceptedAt}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          <Panel header={"KYC Events"} key="6">
            <Timeline>
              {userAccount.kycEvents &&
                Object.keys(userAccount.kycEvents).map((keyName, i) => (
                  <Timeline.Item key={i}>
                    <span>
                      {userAccount.kycEvents[keyName].eventName} -{" "}
                      {userAccount.kycEvents[keyName].createdAt}
                    </span>
                  </Timeline.Item>
                ))}
            </Timeline>
          </Panel>
          <Panel header={"Bank Account Details"} key="7">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Account Number">
                <span>{userAccount.bankAccountNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Account Owner Name">
                <span>{userAccount.bankAccountOwnerName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Id">
                <span>{userAccount.bankId}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Name">
                <span>{userAccount.bankName}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {userAccount.address !== undefined && (
            <Panel header={"Address Details"} key="8">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Address Line1">
                  <span>{userAccount.address.addressLine1}</span>
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  <span>{userAccount.address.city}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Zip Code">
                  <span>{userAccount.address.zipCode}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
        </Collapse>
      </>
    );
  };

  renderCard = () => {
    const { userAccount, loading } = this.props;

    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(userAccount.userId)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div> {this.renderUserData(userAccount)} </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
