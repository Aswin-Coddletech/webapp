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
import { IProduct } from "src/interfaces/Product.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import ss from "./ProductCard.module.scss";

const { Column } = Table;
const { Panel } = Collapse;

export interface IProductCardData {}

export interface IProductCardHocData {
  loading: boolean;
  product: IProduct;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IProductCardCallbacks {}

export interface ILocalState {
  screenOption: number;
  percentage: number;
}

export interface IProductCardProps
  extends IProductCardData,
    IProductCardCallbacks,
    IProductCardHocData {}

export class ProductCard extends React.Component<IProductCardProps, ILocalState> {
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

//   renderAmount = (amount?: number) => {
//     const temp = amount || 0;
//     const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
//     return `${amountFormatted}`;
//   };

  renderTitle = id => {
    // eslint-disable-next-line
    let t = id != undefined ? "Quote#:" + "\xa0" + id : "";
    return t;
  };

//   renderStrokeColor = score => {
//     return score > 600 ? `rgba(220, 20, 60, ${score / 100})` : `#0E86D4`;
//   };

  renderQuoteStatus = product_status => {
    let val = "Product Status: ";
    return val + product_status;
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