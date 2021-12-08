import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse } from "antd";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { IPayment } from "src/interfaces/Payment.interface";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import currency from "currency.js";

//const { Column } = Table;
const { Panel } = Collapse;

export interface IPaymentCardData {}

export interface IPaymentCardHocData {
  loading: boolean;
  userAccount: IUserAccount;
  payment: IPayment;
}

export interface IPaymentCardCallbacks {}

export interface ILocalState {
  screenOption: number;
}

export interface IPaymentCardProps
  extends IPaymentCardData,
    IPaymentCardHocData,
    IPaymentCardCallbacks {}

export class PaymentCard extends React.Component<
  IPaymentCardProps,
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
  renderPaymentStatus = status => {
    console.log("status", status);
    let val = "Payment Status : ";
    return val + status;
  };

  renderTitle = paymentId => {
    // eslint-disable-next-line
    let t = paymentId != undefined ? "Payment#:" + "\xa0" + paymentId : "";
    return t;
  };

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderOtherPaymentData = (loading, userAccount, payment) => {
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8"]}>
          <Panel header={this.renderPaymentStatus(payment.status)} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Amount">
                <span>{this.renderAmount(payment.amount)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                <span>{payment.createdAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Created By">
                <span>{payment.createdBy}</span>
              </Descriptions.Item>
              <Descriptions.Item label="CCY">
                <span>{payment.ccy}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Charge Amount In Cents">
                <span>{this.renderAmount(payment.chargeAmountInCents)}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Charge Type">
                <span>{payment.chargeType}</span>
              </Descriptions.Item>
              {payment.creationProcessedAt && (
                <Descriptions.Item label="Creation Processed At">
                  <span>{payment.creationProcessedAt}</span>
                </Descriptions.Item>
              )}
              {payment.creationProcessedBy && (
                <Descriptions.Item label="Creation Processed By">
                  <span>{payment.creationProcessedBy}</span>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Loan Id">
                <span>{payment.loanId}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Modified At">
                <span>{payment.modifiedAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Modified By">
                <span>{payment.modifiedBy}</span>
              </Descriptions.Item>
              {payment.paymentDescription && (
                <Descriptions.Item label="Payment Description">
                  <span>{payment.paymentDescription}</span>
                </Descriptions.Item>
              )}
              {payment.paymentSubType && (
                <Descriptions.Item label="Payment SubType">
                  <span>{payment.paymentSubType}</span>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="PaymentType">
                <span>{payment.paymentType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <span>{payment.status}</span>
              </Descriptions.Item>
              {payment.referenceNumber && (
                <Descriptions.Item label="Reference Number">
                  <span>{payment.referenceNumber}</span>
                </Descriptions.Item>
              )}
              {payment.trackingCode && (
                <Descriptions.Item label="Tracking Code">
                  <span>{payment.trackingCode}</span>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Transaction Type">
                <span>{payment.txnType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Loan Type">
                <span>{payment.loanType}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {/* <Panel header={"User Information"} key="2"></Panel> */}
          {payment.paymentRequest && (
            <Panel header={"Payment Request"} key="2">
              <Descriptions>
                <Descriptions.Item label="Payment Number">
                  <span>{payment.paymentNumber}</span>
                </Descriptions.Item>
                {payment.paymentRequest.paymentFileName && (
                  <Descriptions.Item label="Payment FileName">
                    <span>{payment.paymentRequest.paymentFileName}</span>
                  </Descriptions.Item>
                )}
                {payment.currency && (
                  <Descriptions.Item label="Currency">
                    <span>{payment.currency}</span>
                  </Descriptions.Item>
                )}
                {payment.source && (
                  <Descriptions.Item label="Source">
                    <span>{payment.source}</span>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Panel>
          )}
          {payment.paymentResponse && (
            <Panel header={"Payment Response"} key="3">
              <Descriptions>
                {payment.paymentResponse.amount && (
                  <Descriptions.Item label=" Amount">
                    <span>
                      {this.renderAmount(payment.paymentResponse.amount)}
                    </span>
                  </Descriptions.Item>
                )}
                {payment.paymentResponse.amount_captured && (
                  <Descriptions.Item label="Amount Captured">
                    <span>
                      {this.renderAmount(
                        payment.paymentResponse.amount_captured
                      )}
                    </span>
                  </Descriptions.Item>
                )}
                {payment.paymentResponse.amount_refunded && (
                  <Descriptions.Item label="Amount Refunded">
                    <span>
                      {this.renderAmount(
                        payment.paymentResponse.amount_refunded
                      )}
                    </span>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Paid">
                  <span>{payment.paymentResponse.paid ? "Yes" : "No"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Captured">
                  <span>{payment.paymentResponse.captured ? "Yes" : "No"}</span>
                </Descriptions.Item>
                {payment.paymentResponse.calculated_statement_descriptor && (
                  <Descriptions.Item label="Calculated Statement Descriptor">
                    <span>
                      {payment.paymentResponse.calculated_statement_descriptor}
                    </span>
                  </Descriptions.Item>
                )}
                {payment.paymentResponse.balance_transaction && (
                  <Descriptions.Item label="Balance Transaction">
                    <span>{payment.paymentResponse.balance_transaction}</span>
                  </Descriptions.Item>
                )}
                {payment.paymentResponse.created && (
                  <Descriptions.Item label="Created">
                    <span>{payment.paymentResponse.created}</span>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Disputed">
                  <span>{payment.paymentResponse.disputed ? "Yes" : "No"}</span>
                </Descriptions.Item>
                {payment.paymentSubType && (
                  <Descriptions.Item label="Payment SubType">
                    <span>{payment.paymentSubType}</span>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Panel>
          )}
          {payment.stripeParams && (
            <Panel header={"Stripe Parameters"} key="4">
              <Descriptions>
                <Descriptions.Item label="Stripe Id">
                  <span>{payment.stripeParams.token.id}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Brand">
                  <span>{payment.stripeParams.token.card.brand}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Expiry month">
                  <span>{payment.stripeParams.token.card.expMonth}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Expiry year">
                  <span>{payment.stripeParams.token.card.expYear}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Funding">
                  <span>{payment.stripeParams.token.card.funding}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Last 4 Digits">
                  <span>{payment.stripeParams.token.card.last4}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Country">
                  <span>{payment.stripeParams.token.card.country}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Created">
                  <span>{payment.stripeParams.token.created}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  <span>{payment.stripeParams.token.type}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Used">
                  <span>{payment.stripeParams.token.used ? "Yes" : "No"}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {payment.paymentType === "STPMEX-CLABE" && (
            <Panel header={"From Bank Account Details"} key="5">
              <Descriptions>
                <Descriptions.Item label="Bank Account Number">
                  <span>{payment.fromBankAccountNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bank Account OwnerName">
                  <span>{payment.fromBankAccountOwnerName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                  <span>{payment.fromAccountType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bank Id">
                  <span>{payment.fromBankId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bank Name">
                  <span>{payment.fromBankName}</span>
                </Descriptions.Item>
                {payment.fromRfcOrCurpNumber && (
                  <Descriptions.Item label="RFC Number">
                    <span>{payment.fromRfcOrCurpNumber}</span>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Account Type Description">
                  <span>{payment.fromAccountTypeDescription}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {payment.paymentType === "STPMEX-CLABE" && (
            <Panel header={"To Bank Account Details"} key="6">
              <Descriptions>
                <Descriptions.Item label="Bank Account Number">
                  <span>{payment.toBankAccountNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bank Account OwnerName">
                  <span>{payment.toBankAccountOwnerName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                  <span>{payment.toAccountType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bank Id">
                  <span>{payment.toBankId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Bank Name">
                  <span>{payment.toBankName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="RFC Number">
                  <span>{payment.toRfcCurpNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Type Description">
                  <span>{payment.toAccountTypeDescription}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {payment.paymentType === "STPMEX-CLABE" && (
            <Panel header={"STPMEX Collection"} key="7">
              <Descriptions>
                <Descriptions.Item label="STPMEX Captured At">
                  <span>{payment.stpmexCollectionCapturedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="STPMEX Captured At Utc">
                  <span>{payment.stpmexCollectionCapturedAtUtc}</span>
                </Descriptions.Item>
                <Descriptions.Item label="STPMEX Confirmed At">
                  <span>{payment.stpmexCollectionConfirmedAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="STPMEX Confirmed At Utc">
                  <span>{payment.stpmexCollectionConfirmedAtUtc}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          {payment.status === "PENDING" && (
            <Panel header={"Payment Error"} key="8">
              <Descriptions>
                <Descriptions.Item label="Payment Error Code">
                  <span>{payment.paymentErrorCode}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Payment Error Decline Code">
                  <span>{payment.paymentErrorDeclineCode}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Payment Error Message">
                  <span>{payment.paymentErrorMessage}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
        </Collapse>
      </>
    );
  };
  renderCard = () => {
    const { loading, userAccount, payment } = this.props;
    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(payment.paymentId)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div>
          {" "}
          {this.renderOtherPaymentData(loading, userAccount, payment)}{" "}
        </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
