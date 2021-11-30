import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse, Button } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IDisbursal } from "src/interfaces/Loans.interface";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

// import ss from "./DisbursalCard.module.scss";

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

export interface IDisbursalCardData {}

export interface IDisbursalCardHocData {
  loading: boolean;
  disbursal: IDisbursal;
  userAccount: IUserAccount;
  disbursadUser: any;
}

export interface IDisbursalCardCallbacks {}

export interface ILocalState {
  screenOption: number;
}

export interface IDisbursalCardProps
  extends IDisbursalCardData,
    IDisbursalCardHocData,
    IDisbursalCardCallbacks {}

export class DisbursalCard extends React.Component<
  IDisbursalCardProps,
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

  renderTitle = disbursalId => {
    // eslint-disable-next-line
    let t = disbursalId !== undefined ? "Disbursal#: \xa0" + disbursalId : "";
    return t;
  };

  renderDisbursalStatus = status => {
    let val = "Disbursal Status: ";
    return val + status;
  };

  renderOtherDisbursalData = (disbursal, userAccount, disbursadBy) => {
    const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          {disbursadBy && (
            <Panel
              header={this.renderDisbursalStatus(disbursal.status)}
              key="1"
            >
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Disbursal Id">
                  <span>{disbursal.disbursalId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Type">
                  <span>{disbursal.disbursalType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Process Type">
                  <span>{disbursal.disbursalProcessType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Reason">
                  <span>{disbursal.disbursalReason}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                  <span>{disbursal.createdAt}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Created User Id">
                  <span>{disbursal.createdBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Created By">
                  <span>{disbursadBy}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Disbursal Amount">
                  <span>{this.renderAmount(disbursal.disbursalAmount)}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Customer Id">
                  <span>{disbursal.customerId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Transaction Type">
                  <span>{disbursal.txnType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Id">
                  <span>{disbursal.loanId}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
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
                <span style={{ fontSize: 14 }}>{disbursal.userId}</span>
                <Button
                  href={`${REACT_APP_INTERCOM_LINK}user=${disbursal.userId}`}
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
          {disbursal.disbursalReference && (
            <Panel header={"Loan Details"} key="4">
              <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Loan Id">
                  <span>{disbursal.disbursalReference.loanId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Number">
                  <span>{disbursal.disbursalReference.loanNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Loan Type">
                  <span>{disbursal.disbursalReference.loanType}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Order Id">
                  <span>{disbursal.disbursalReference.orderId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Order Number">
                  <span>{disbursal.disbursalReference.orderNumber}</span>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )}
          <Panel header={"From Account Details"} key="5">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Account Type">
                <span>{disbursal.fromAccountType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Account Type Description">
                <span>{disbursal.fromAccountTypeDescription}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Name">
                <span>{disbursal.fromBankName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Account Number">
                <span>{disbursal.fromBankAccountNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Account Owner Name">
                <span>{disbursal.fromBankAccountOwnerName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Id">
                <span>{disbursal.fromBankId}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Company Name">
                <span>{disbursal.fromCompanyName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Rfc Number">
                <span>{disbursal.fromRfcNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Curp Number">
                <span>{disbursal.fromCurpNumber}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"To Account Details"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Account Type">
                <span>{disbursal.toAccountType}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Account Type Description">
                <span>{disbursal.toAccountTypeDescription}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Name">
                <span>{disbursal.toBankName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Account Number">
                <span>{disbursal.toBankAccountNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Account Owner Name">
                <span>{disbursal.toBankAccountOwnerName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Bank Id">
                <span>{disbursal.toBankId}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Rfc Number">
                <span>{disbursal.toRfcNumber}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Curp Number">
                <span>{disbursal.toCurpNumber}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          {disbursal.stpmexDetails &&
            Object.getOwnPropertyNames(disbursal.stpmexDetails).length > 0 && (
              <Panel header={"Stpmex Details"} key="7">
                <Descriptions
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item label="Stpmex Payorder Description">
                    <span>
                      {
                        disbursal.stpmexDetails
                          .stpmexPayorderDescriptionMax40Chars
                      }
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Payorder RefNumber">
                    <span>
                      {
                        disbursal.stpmexDetails
                          .stpmexPayorderRefNumberMax7Digits
                      }
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Payorder Tracking Code">
                    <span>
                      {
                        disbursal.stpmexDetails
                          .stpmexPayorderTrackingCodeMax30Chars
                      }
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Tipo Pago PaymentType">
                    <span>
                      {disbursal.stpmexDetails.stpmexTipoPagoPaymentType}
                    </span>
                  </Descriptions.Item>

                  <Descriptions.Item label="Stpmex Registra Order Id">
                    <span>{disbursal.stpmexDetails.stpmexRegistraOrdenId}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Payorder Submitted At">
                    <span>
                      {disbursal.stpmexDetails.stpmexPayorderSubmittedAt}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Payorder Submitted By">
                    <span>
                      {disbursal.stpmexDetails.stpmexPayorderSubmittedBy}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Payorder Completed At">
                    <span>
                      {disbursal.stpmexDetails.stpmexPayorderCompletedAt}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Payorder Clave Rastreo">
                    <span>
                      {disbursal.stpmexDetails.stpmexPayorderClaveRastreo}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stpmex Tipo Pago Payment Type Description">
                    <span>
                      {
                        disbursal.stpmexDetails
                          .stpmexTipoPagoPaymentTypeDescription
                      }
                    </span>
                  </Descriptions.Item>
                </Descriptions>
              </Panel>
            )}
          {disbursal.bbvaDetails &&
            Object.getOwnPropertyNames(disbursal.bbvaDetails).length > 0 && (
              <Panel header={"Bbva Details"} key="8">
                <Descriptions
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item label="BBVA Transaction Id">
                    <span>{disbursal.bbvaDetails.bbvaTransactinId}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="BBVA Transaction Submitted At">
                    <span>
                      {disbursal.bbvaDetails.bbvaTransactinSubmittedAt}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="BBVA Transaction Completed At">
                    <span>
                      {disbursal.bbvaDetails.bbvaTransactinCompletedAt}
                    </span>
                  </Descriptions.Item>
                </Descriptions>
              </Panel>
            )}
        </Collapse>
      </>
    );
  };

  renderCard = () => {
    const { disbursal, loading, userAccount, disbursadUser } = this.props;
    let disbursadBy = "-";
    if (Object.keys(disbursadUser).length > 0) {
      disbursadBy = disbursadUser.emailId;
    }
    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(disbursal.disbursalNumber)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div>
          {" "}
          {this.renderOtherDisbursalData(
            disbursal,
            userAccount,
            disbursadBy
          )}{" "}
        </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
