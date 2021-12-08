import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Table, Collapse, Button } from "antd";
//import { ClockCircleOutlined } from "@ant-design/icons";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { ILoan } from "src/interfaces/Loans.interface";
import ss from "./LoanCard.module.scss";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

import { LinkOutlined } from "@ant-design/icons";
//import { Useraccount } from "src/api/useraccount";

const { Column } = Table;
const { Panel } = Collapse;

export interface ILoanCardData {}

export interface ILoanCardHocData {
  loading: boolean;
  loan: ILoan;
  userAccount: IUserAccount;
  disbursedUser: any;
}

export interface ILoanCardCallbacks {}

export interface ILocalState {
  screenOption: number;
}

export interface ILoanCardProps
  extends ILoanCardData,
    ILoanCardHocData,
    ILoanCardCallbacks {}

export class LoanCard extends React.Component<ILoanCardProps, ILocalState> {
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

  renderTitle = loanId => {
    // eslint-disable-next-line
    let t = loanId != undefined ? "Loan#:" + "\xa0" + loanId : "";
    return t;
  };

  renderloanStatus = status => {
    let val = "Loan Status : ";
    return val + status;
  };

  renderrepaymentStatus = repaymentStatus => {
    let r = "Repayment Status : ";
    return r + repaymentStatus;
  };

  renderOtherloanData = (loan, userAccount, approvedBy) => {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
          <Panel header={this.renderloanStatus(loan.status)} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="loan Type">
                <span>{loan.loanType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Rate(Periodic)">
                <span>{loan.interestRatePercent}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Rate Per Month">
                <span>{loan.interestRatePerMonthPercent}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Rate Per Annum">
                <span>{loan.interestRatePerAnnumPercent}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Term">
                <span>{loan.repaymentDurationInDays} Days</span>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                <span>{loan.createdAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Principal Amount">
                <span>{this.renderAmount(loan.principalAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interest Amount">
                <span>{this.renderAmount(loan.interestAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                <span>{this.renderAmount(loan.repaymentTotalAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Created With App Version">
                <span>{loan.createdWithAppVersion}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Loan Amount">
                <span>{this.renderAmount(loan.loanAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Loan Creation Method">
                <span>{loan.loanCreationMethod}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"User Information"} key={"2"}>
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="User Name">
                <span>{userAccount.fullName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="KYC status">
                <span>{loan.isKycVerified ? "Yes" : "No"}</span>
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

              <Descriptions.Item label="KYC document Type">
                <span>{userAccount.kycDocumentType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="User Id">
                <span style={{ fontSize: 14 }}>{loan.userId}</span>
                <Button
                  href={`${REACT_APP_INTERCOM_LINK}user=${loan.userId}`}
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
          {userAccount && (
            <Panel header={"Disbursed Details"} key="3">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Loan Disbursal Required">
                  <span>{loan.isLoanDisbursalRequired ? "Yes" : "No"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Disbursal Request Required">
                  <span>
                    {loan.isLoanDisbursalRequestRequired ? "Yes" : "No"}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Disbursal Request Complete">
                  <span>
                    {loan.isLoanDisbursalRequestComplete ? "Yes" : "No"}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Created by">
                  <span>{userAccount.emailId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Disbursal Complete">
                  <span>{loan.isLoanDisbursalComplete ? "Yes" : "No"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Request Method">
                  <span>{loan.loanDisbursalRequestMethod}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Request Completed By">
                  <span>{approvedBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Request Completed At">
                  <span>{loan.loanDisbursalRequestCompletedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Method">
                  <span>{loan.loanDisbursalMethod}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Completed By">
                  <span>{loan.loanDisbursalCompletedBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Completed At">
                  <span>{loan.loanDisbursalCompletedAt}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          <Panel
            header={this.renderrepaymentStatus(loan.repaymentStatus)}
            key="4"
          >
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Amount Repaid">
                <span>{this.renderAmount(loan.amountRepaid)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Amount Not Repaid">
                <span>{this.renderAmount(loan.amountNotRepaid)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Term Type">
                <span>{loan.repaymentTermType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Type">
                <span>{loan.repaymentType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Total Amount">
                <span>{this.renderAmount(loan.repaymentTotalAmount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Frequency">
                <span>{loan.repaymentFrequency}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Duration In Weeks">
                <span>{loan.repaymentDurationInWeeks}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Duration In Days">
                <span>{loan.repaymentDurationInDays} Days</span>
              </Descriptions.Item>
              <Descriptions.Item label="Repayment Installment Amount">
                <span>
                  {this.renderAmount(loan.repaymentInstallmentAmount)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="repayment Number Of Installments">
                <span>{loan.repaymentNumberOfInstallments}</span>
              </Descriptions.Item>
              {loan.lastPaymentAmount && (
                <Descriptions.Item label="Last Payment Amount">
                  <span>{this.renderAmount(loan.lastPaymentAmount)}</span>
                </Descriptions.Item>
              )}
              {loan.lastPaymentAt && (
                <Descriptions.Item label="Last Payment At">
                  <span>{this.renderAmount(loan.lastPaymentAt)}</span>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Panel>
          <Panel header={"Collateral Items"} key="5">
            <Table
              dataSource={loan.collateralItems}
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
          </Panel>
          <Panel header={"Collateral Collection"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{loan.collateralCollectionMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required">
                <span>
                  {loan.isCollateralCollectionRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete">
                <span>
                  {loan.isCollateralCollectionComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Completed at">
                <span>{loan.collateralCollectionCompletedAt}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>

          <Panel header={"Collateral Custody"} key="7">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{loan.collateralAcquisitionMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required">
                <span>
                  {loan.isCollateralAcquisitionRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete">
                <span>
                  {loan.isCollateralAcquisitionComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Completed at">
                <span>{loan.collateralAcquisitionCompletedAt}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Collateral Inspection"} key="8">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Method">
                <span>{loan.collateralInspectionMethod}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Required">
                <span>
                  {loan.isCollateralInspectionRequired ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Complete">
                <span>
                  {loan.isCollateralInspectionComplete ? "Yes" : "No"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Inspected at">
                <span>{loan.inspectedAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Inspection observation">
                {/* <span>{quote.inspectionObservation}</span> */}
                <span>All Good</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {loan.approvedAt && (
            <Panel header={"Approval Information"} key="9">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Approved At">
                  <span>{loan.approvedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Approved By">
                  <span>{loan.approvedBy}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {loan.rejecedAt && (
            <Panel header={"Rejected Information"} key="10">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Rejected At">
                  <span>{loan.rejecedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Rejected By">
                  <span>{loan.rejectedBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Rejection Reason">
                  <span>{loan.rejectionReason}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {(loan.status === "PENDING-SIGNATURE" ||
            loan.status === "SIGNED-AND-ACCEPTED") && (
            <Panel header={"Signature Document"} key="11">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Document Status">
                  <span>{loan.status}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Signature Method">
                  <span>{loan.contractSignatureMethod}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Signed Accepted at">
                  <span>{loan.contractSignedAndAcceptedAt}</span>
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
        </Collapse>
        {/* user Information */}
        {/* <Descriptions
            title={"User Information"}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="User Name">
              <span></span>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <span></span>
            </Descriptions.Item>
            <Descriptions.Item label="KYC status">
              <span></span>
            </Descriptions.Item>
          </Descriptions> */}

        {/* Return Details */}
        {/* <Descriptions
            title={"Return Details"}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Scheduled Date">
              <span>
                {loan.collateralPickupSchedule !== undefined
                  ? loan.collateralPickupSchedule.pickupDate
                  : ""}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Scheduled Time">
              <span>
                {loan.collateralPickupSchedule !== undefined
                  ? loan.collateralPickupSchedule.pickupTimeSlot
                  : ""}
              </span>
            </Descriptions.Item>
                </Descriptions> */}
      </>
    );
  };

  renderCard = () => {
    const { loan, loading, userAccount, disbursedUser } = this.props;
    let approvedBy = "-";
    if (Object.keys(disbursedUser).length > 0) {
      approvedBy = disbursedUser.emailId;
    }
    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(loan.quoteNumber)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div> {this.renderOtherloanData(loan, userAccount, approvedBy)} </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
