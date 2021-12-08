import React from "react";
import { Row, Col, Avatar, Modal, Spin, Card, Button } from "antd";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { KYC_TEXT, POLICIES_AND_TERMS, KYC_NOTES } from "src/constants/kyc";
import { LINKS, BUTTON_TEXT } from "src/constants/legal";
import ss from "./ManageUserAccount.module.scss";
import moment from "moment";

import MatiButton from "../MatiButton";
import { colorMelloonPrimary } from "src/constants/colors";
import {
  UserOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined
} from "@ant-design/icons";

export interface IManageUserAccountData {
  loading: boolean;
  isPolicyChanged: boolean;
}
export interface IManageUserAccountCallbacks {
  acceptPolicy(): any;
}

export interface IManageUserAccountHocCallback {
  onMatiExit(): any;
  onMatiFinished(): any;
}

export interface IManageUserAccountHocData {
  userInfo: IUserAccount;
}

export interface IManageUserAccountProps
  extends IManageUserAccountData,
    IManageUserAccountHocCallback,
    IManageUserAccountHocData,
    IManageUserAccountCallbacks {}
export interface ILocalState {
  screenOption: number;
  visible: boolean;
  matiValue: string;
  matiVisible: boolean;
}
export class ManageUserAccount extends React.Component<
  IManageUserAccountProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
      visible: true,
      matiValue: "",
      matiVisible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
    this.props.acceptPolicy();
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
    this.props.acceptPolicy();
  };

  showMatiModal = () => {
    this.setState({
      matiVisible: true
    });
  };

  handleMatiNotesOk = e => {
    this.setState({
      matiVisible: false
    });
  };

  handleMatiNotesCancel = e => {
    this.setState({
      matiVisible: false
    });
  };

  renderUsersDate = (input_date: string) =>
    moment(input_date).format("DD.MM.YYYY HH:mm:ss");

  renderKycDate = (input_date: string) =>
    moment(input_date).format("DD.MM.YYYY");

  onMatiExit = item => {
    this.props.onMatiExit();
    this.setState({ matiValue: item });
  };

  matiButtonShow = (status, attempts, rejectionReason) => {
    switch (status) {
      case "Verified":
        return false;
      case "Review-In-Progress":
        return false;
      case "Not-Verified":
        if (attempts === 3) {
          return false;
        }
        return true;
      case "Rejected":
        if (
          rejectionReason === "AgeLessThan18" ||
          rejectionReason === "LessThan18Age"
        ) {
          return false;
        } else if (
          rejectionReason === "watchlists" ||
          rejectionReason === "Watchlists" ||
          rejectionReason === "Watchlist" ||
          rejectionReason === "watchlist"
        ) {
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  matiKycMsg = (status, attempts, rejectionReason) => {
    const display_text = KYC_TEXT;
    switch (status) {
      case "Not-Started":
        return display_text.NOT_STARTED_DISPLAY_TEXT;
      case "Review-In-Progress":
        return display_text.REVIEW_IN_PROGRESS;
      case "Inputs-Not-Completed":
        return display_text.INPUTS_NOT_COMPLETED;
      case "Not-Verified":
        if (attempts === 3) {
          return display_text.ATTEMPTS_NOT_VERIFIED;
        }
        return display_text.NOT_VERIFIED;
      case "Rejected":
        if (
          rejectionReason === "AgeLessThan18" ||
          rejectionReason === "LessThan18Age"
        ) {
          return display_text.REJECTED_AGELESS;
        } else if (
          rejectionReason === "watchlists" ||
          rejectionReason === "Watchlists" ||
          rejectionReason === "Watchlist" ||
          rejectionReason === "watchlist"
        ) {
          return display_text.REJECTED_WATCHLISTS;
        }
        return "";
      default:
        return "";
    }
  };

  displayKycStatusValue = status => {
    switch (status) {
      case "Not-Started":
        return "Not Started";
      case "Review-In-Progress":
        return "Review In Progress";
      case "Inputs-Not-Completed":
        return "Inputs Not Completed";
      case "Not-Verified":
        return "Not Verified";
      case "Rejected":
        return "Rejected";
      default:
        return "";
    }
  };

  renderGeneralSectionData = () => {
    const { userInfo } = this.props;
    return (
      <div>
        <Row justify="space-between" align="middle">
          <Col>
            <Row justify="start" align="middle" style={{ padding: "20px 0px" }}>
              <Col>
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <span
                  style={{
                    paddingLeft: "20px",
                    display: "block",
                    color: "#ccc"
                  }}
                  className={ss.values}
                >
                  {" "}
                  Email{" "}
                </span>
                <span style={{ paddingLeft: "20px", display: "block" }}>
                  {" "}
                  {userInfo ? userInfo.emailId : ""}
                </span>
              </Col>
            </Row>
            <Row justify="start" style={{ paddingBottom: "10px" }}>
              <Col>
                <h3 className={ss.headingName}>Personal Information</h3>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Name: </span>{" "}
                <span> {userInfo ? userInfo.fullName : ""}</span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Date of Birth: </span>{" "}
                <span> {userInfo ? userInfo.dateOfBirth : ""}</span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Country: </span>{" "}
                <span> {userInfo ? userInfo.countryId : ""}</span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Passport Number: </span>{" "}
                <span> {userInfo ? userInfo.passportNumber : ""}</span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Passport Expiration Date: </span>{" "}
                <span> {userInfo ? userInfo.passportExpirationDate : ""}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  renderContactSectionData = () => {
    return (
      <div className={ss.summary}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row
              justify="start"
              style={{ paddingBottom: "10px", paddingTop: "20px" }}
            >
              <Col>
                <h3 className={ss.headingName}>Contact Information</h3>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Addrress: </span> <span> </span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}> Phone Number: </span>{" "}
                <span> </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  renderKycSectionData = () => {
    const { userInfo } = this.props;
    let kycStatusValue: any;
    if (userInfo && userInfo.kycStatus) {
      kycStatusValue = userInfo.kycStatus;
    }
    let rejectionReason = userInfo.kycRejectionReason
      ? userInfo.kycRejectionReason
      : "";
    const displayKycMsg = this.matiKycMsg(
      userInfo.kycStatus,
      userInfo.kycAttempts,
      rejectionReason
    );
    const kycButtonShow = this.matiButtonShow(
      userInfo.kycStatus,
      userInfo.kycAttempts,
      rejectionReason
    );
    const displayKycStatus = this.displayKycStatusValue(userInfo.kycStatus);
    return (
      <div className={ss.summary}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row
              justify="start"
              style={{ paddingBottom: "10px", paddingTop: "20px" }}
            >
              <Col>
                <h3 className={ss.headingName}>KYC Verification</h3>
              </Col>
            </Row>
            {kycStatusValue === "Verified" && (
              <Row justify="start" className={ss.rowSeperate}>
                <Col>
                  <span className={ss.values}> Status: </span>{" "}
                  <span className={ss.verifiedStyle}>
                    {" "}
                    {kycStatusValue ? kycStatusValue : ""}
                  </span>
                </Col>
              </Row>
            )}
            {displayKycStatus ? (
              <Row justify="start" className={ss.rowSeperate}>
                <Col>
                  <span className={ss.values}> Status: </span>{" "}
                  <span> {displayKycStatus}</span>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {userInfo && userInfo.kycMatiVerificationStartedAt ? (
              <Row justify="start" className={ss.rowSeperate}>
                <Col>
                  <span className={ss.values}> Start Date: </span>{" "}
                  <span>
                    {" "}
                    {userInfo.kycMatiVerificationStartedAt
                      ? this.renderKycDate(
                          userInfo.kycMatiVerificationStartedAt || ""
                        )
                      : ""}{" "}
                  </span>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {userInfo && userInfo.kycMatiVerificationInputsCompletedAt ? (
              <Row justify="start" className={ss.rowSeperate}>
                <Col>
                  <span className={ss.values}> Submitted Date: </span>{" "}
                  <span>
                    {" "}
                    {userInfo.kycMatiVerificationInputsCompletedAt
                      ? this.renderKycDate(
                          userInfo.kycMatiVerificationInputsCompletedAt || ""
                        )
                      : ""}{" "}
                  </span>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {this.state.matiValue !== "matiExited" && (
              <Row justify="start" className={ss.rowSeperate}>
                <Col>
                  <span className={ss.displayTextColor}> {displayKycMsg} </span>
                </Col>
              </Row>
            )}
            {this.state.matiValue === "matiExited" && (
              <Row justify="start" className={ss.rowSeperate}>
                <Col>
                  <span className={ss.displayTextColor}>
                    {" "}
                    {KYC_TEXT.EXITED}{" "}
                  </span>
                </Col>
              </Row>
            )}
            {kycButtonShow ? (
              <Row justify="start" className={ss.rowButtonSeperate}>
                <Col>
                  <MatiButton
                    userInfo={this.props.userInfo}
                    matiExitCallback={this.onMatiExit}
                    matiFinishedCallback={this.props.onMatiFinished}
                  />
                </Col>
                <Col className={ss.notesStyle}>
                  <Button
                    type="link"
                    shape="round"
                    icon={<InfoCircleOutlined />}
                    onClick={this.showMatiModal}
                    className={ss.notesTextStyle}
                    size="small"
                  >
                    How to do the KYC process?
                  </Button>
                  <Modal
                    title="Instructions"
                    centered
                    visible={this.state.matiVisible}
                    onOk={this.handleMatiNotesOk}
                    onCancel={this.handleMatiNotesCancel}
                    footer={null}
                  >
                    <p>
                      <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
                      {KYC_NOTES.FIRST_NOTE}
                    </p>
                    <p>
                      <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
                      {KYC_NOTES.SECOND_NOTE}
                    </p>
                    <p>
                      <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
                      {KYC_NOTES.THIRD_NOTE}
                    </p>
                  </Modal>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    );
  };

  renderPoliciesSectionData = () => {
    return (
      <div className={ss.summary}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row
              justify="start"
              style={{ paddingBottom: "10px", paddingTop: "20px" }}
            >
              <Col>
                <h3 className={ss.headingName}>Terms & Policies</h3>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}>
                  {" "}
                  Terms accepted at:{" "}
                  {this.props.userInfo
                    ? this.renderUsersDate(
                        this.props.userInfo.termsAcceptedAt || ""
                      )
                    : ""}
                </span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}>
                  {" "}
                  <a
                    href={LINKS.TERMS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}>
                  {" "}
                  Privacy policy accepted at:{" "}
                  {this.props.userInfo
                    ? this.renderUsersDate(
                        this.props.userInfo.privacyPolicyAcceptedAt || ""
                      )
                    : ""}
                </span>
              </Col>
            </Row>
            <Row justify="start" className={ss.rowSeperate}>
              <Col>
                <span className={ss.values}>
                  {" "}
                  <a
                    href={LINKS.POLICY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  renderItemFooterData = () => {
    return (
      <div className={ss.itemFooter}>
        <Row
          justify="space-between"
          align="middle"
          style={{ color: "#BDC3CC" }}
        >
          <Col style={{ paddingBottom: "10px", paddingRight: "100px" }}>
            <span style={{ paddingRight: "5px" }}> Created At: </span>
            <span>
              {this.props.userInfo
                ? this.renderUsersDate(this.props.userInfo.createdAt || "")
                : ""}
            </span>
          </Col>
          <Col style={{ paddingBottom: "10px" }}>
            <span style={{ paddingRight: "5px" }}> Last Modified At: </span>
            <span style={{ paddingRight: "10px" }}>
              {" "}
              {this.props.userInfo
                ? this.renderUsersDate(this.props.userInfo.modifiedAt || "")
                : ""}
            </span>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <>
        <div>
          <Row justify="center">
            <Col>
              <h3
                style={{
                  color: colorMelloonPrimary,
                  fontWeight: "bold",
                  paddingBottom: "8px"
                }}
              >
                My Account
              </h3>
            </Col>
          </Row>
        </div>

        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          {this.props.loading === false && (
            <div>
              <Card
                loading={this.props.loading}
                headStyle={{ textAlign: "center", fontWeight: "bold" }}
                bodyStyle={{ textAlign: "left" }}
                extra={""}
              >
                <Modal
                  title="Terms & Policies"
                  centered
                  visible={this.props.isPolicyChanged}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  okText={BUTTON_TEXT.AGREE_BUTTON}
                  cancelButtonProps={{ style: { display: "none" } }}
                >
                  <p>
                    {POLICIES_AND_TERMS.POLICY_TEXT}
                    <a
                      href={LINKS.POLICY_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Privacy Policy
                    </a>
                    ,
                    <a
                      href={LINKS.TERMS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Terms & Conditions
                    </a>
                  </p>
                </Modal>

                {this.renderGeneralSectionData()}
                {this.renderContactSectionData()}
                {this.renderKycSectionData()}
                {this.renderPoliciesSectionData()}
                {this.renderItemFooterData()}
              </Card>
            </div>
          )}
        </Spin>
      </>
    );
  }
}
