import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Row, Col, Table, Timeline, Collapse } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IQuote } from "src/interfaces/InstantQuote.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

import ss from "./QuoteDetailCard.module.scss";

const { Column } = Table;
const { Panel } = Collapse;
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

export interface IQuoteDetailCardData {}

export interface IQuoteDetailCardHocData {
  loading: boolean;
  quote: IQuote;
  userAccount: IUserAccount;
}

export interface IQuoteDetailCardCallbacks {
  inspectedUserAccountDetail: (userId: string) => any;
  approvedUserAccountDetail: (userId: string) => any;
}

export interface ILocalState {
  screenOption: number;
}

export interface IQuoteDetailCardProps
  extends IQuoteDetailCardData,
    IQuoteDetailCardCallbacks,
    IQuoteDetailCardHocData {}

export class QuoteDetailCard extends React.Component<
  IQuoteDetailCardProps,
  ILocalState
> {
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

  renderTitle = quoteId => {
    // eslint-disable-next-line
    let t = quoteId != undefined ? "Quote#:" + "\xa0" + quoteId : "";
    return t;
  };

  getInspectedUser = () => {
    console.log("inspect user");
  };

  renderQuoteStatus = status => {
    let val = "Quote Status: ";
    return val + status;
  };

  renderOtherQuoteData = (quote, userAccount) => {
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3", "11"]}>
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
          <Panel header={"User Information"} key="2">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="User Name">
                <span>{userAccount.fullName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <span>{userAccount.emailId}</span>
              </Descriptions.Item>
              <Descriptions.Item label="KYC status">
                <span>{userAccount.kycStatus}</span>
              </Descriptions.Item>
              <Descriptions.Item label="KYC Document Type">
                <span>{userAccount.kycDocumentType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="User Id">
                <span>{quote.userId}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header="Collateral Items" key="3">
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
          <Panel header={"Collateral Collection"} key="4">
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
          <Panel header={"Collateral Custody"} key="5">
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
          <Collapse onChange={this.getInspectedUser}>
            <Panel header={"Collateral Inspection"} key="6">
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
                  {/* <span>{quote.inspectionObservation}</span> */}
                  <span>All Good</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
          <Panel header={"Contract Signature"} key="7">
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
          <Panel header={"Collateral Return"} key="8">
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
          <Panel header={"Loan Creation"} key="9">
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
          <Panel header={"Loan Disbursal"} key="10">
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
            <Panel header={"Inspection Information"} key="11">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Inspected At">
                  <span>{quote.inspectedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Inspected By">
                  <span>{quote.inspectedBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Observation">
                  <span></span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {quote.approvedAt && (
            <Panel header={"Approval Information"} key="12">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Approved At">
                  <span>{quote.approvedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Approved By">
                  <span>{quote.approvedBy}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {quote.rejecedAt && (
            <Panel header={"Rejected Information"} key="13">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Rejected At">
                  <span>{quote.rejecedAt}</span>
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
            <Panel header={"Signature Document"} key="14">
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
            <Panel header={"Signature Events"} key="15">
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
    const { quote, loading, userAccount } = this.props;
    console.log("user account", userAccount);

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
          <div> {this.renderOtherQuoteData(quote, userAccount)} </div>
        </Card>
      );
    }
  };

  render() {
    console.log("detail props", this.props);
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
