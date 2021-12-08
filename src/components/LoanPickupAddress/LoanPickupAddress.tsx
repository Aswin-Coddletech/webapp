import React, { Fragment } from "react";
import { Input, Row, Col } from "antd";
import ss from "./LoanPickupAddress.module.scss";
import { LINKS, LEGAL_TEXT } from "../../constants/legal";

export interface ILoanPickupAddressData {
  pickupStreet: string;
  pickupNumber: number;
  pickupArea: string;
}

export interface ILoanPickupAddressHocData {
  loading: boolean;
  userId: string;
}

export interface ILoanPickupAddressCallbacks {
  changePickupStreet(value: string): void;
  changePickupNumber(value: string): void;
  changePickupArea(value: string): void;
}

export interface ILoanPickupAddressHocCallbacks {
  onInit(): any;
  onQuoteSubmit(): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ILoanPickupAddressProps
  extends ILoanPickupAddressData,
    ILoanPickupAddressHocData,
    ILoanPickupAddressHocCallbacks,
    ILoanPickupAddressCallbacks {}

export class LoanPickupAddress extends React.Component<
  ILoanPickupAddressProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {
    //this.props.getItem(this.props.item.itemId);
  }

  handlePickupStreet = e => {
    this.props.changePickupStreet(e.target.value);
  };

  handlePickupNumber = e => {
    this.props.changePickupNumber(e.target.value);
  };

  handlePickupArea = e => {
    this.props.changePickupArea(e.target.value);
  };

  render() {
    console.log("this.props", this.props);
    return (
      <>
        <div>
          <h4 className={ss.sectionTitle}>Pickup Address</h4>

          <div>
            <Fragment>
              <Row className={ss.mTransitionCol} gutter={16}>
                <Col xs={24} lg={12}>
                  <div className={ss.pickup_stat}>
                    <div className={ss.inputWrapper}>
                      <div className={ss.inputLabel}>Street</div>
                      <Input
                        id="street"
                        className={ss.inputField}
                        placeholder="Enter Street"
                        defaultValue={""}
                        required={true}
                        onChange={this.handlePickupStreet}
                      />
                    </div>
                    <div className={ss.inputWrapper}>
                      <div className={ss.inputLabel}>Number</div>
                      <Input
                        id="number"
                        className={ss.inputField}
                        placeholder="Enter Number"
                        defaultValue={""}
                        required={true}
                        onChange={this.handlePickupNumber}
                      />
                    </div>
                    <div className={ss.inputWrapper}>
                      <div className={ss.inputLabel}>Area</div>
                      <Input
                        id="area"
                        className={ss.inputField}
                        placeholder="Enter Area"
                        defaultValue={""}
                        required={true}
                        onChange={this.handlePickupArea}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div className={ss.pickup_stat}>
                    <div className={ss.inputWrapper}>
                      <div className={ss.inputLabel}>Contact Number</div>
                      <Input
                        id="contact_number"
                        className={ss.inputField}
                        placeholder="Enter Contact Number"
                        defaultValue={""}
                        required={true}
                        //onChange={this.handleNameChange}
                      />
                      <h6 className={ss.smallText}>
                        My phone for all communication&nbsp;& payment
                        notification
                      </h6>
                    </div>

                    {this.props.userId === null && (
                      <div>
                        <div className={ss.inputWrapper}>
                          <div className={ss.inputLabel}>
                            Email Address for Finnu Account
                          </div>
                          <Input
                            id="email"
                            className={ss.inputField}
                            placeholder="Enter email"
                            defaultValue={""}
                            required={true}
                            //onChange={this.handleNameChange}
                          />
                          <h6 className={ss.smallText}>
                            My email for Payment notification
                          </h6>
                        </div>
                        <div className={ss.inputWrapper}>
                          <div className={ss.inputLabel}>Password</div>
                          <Input.Password
                            id="password"
                            className={ss.inputField}
                            placeholder="Enter Password"
                            defaultValue={""}
                            required={true}
                            //onChange={this.handleNameChange}
                          />
                        </div>
                        <div className={ss.inputWrapper}>
                          <div className={ss.inputLabel}>Confirm Password</div>
                          <Input.Password
                            id="confirm_password"
                            className={ss.inputField}
                            placeholder="Enter Confirm Password"
                            defaultValue={""}
                            required={true}
                            //onChange={this.handleNameChange}
                          />
                        </div>
                        <h5 className={ss.smallText}>
                          {LEGAL_TEXT.SUBMIT_TEXT}
                          <a
                            href={LINKS.TERMS_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {LEGAL_TEXT.TERMS_TEXT}
                          </a>{" "}
                          and our{" "}
                          <a
                            href={LINKS.POLICY_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {LEGAL_TEXT.PRIVACY_TEXT}
                          </a>
                        </h5>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {/* <Row type="flex" justify="center" align="middle">
                <Col>
                  <Button
                    className={ss.actionbutton}
                    type="primary"
                    onClick={() => this.pickupAddressSubmit()}
                  >
                    Submit
                  </Button>
                </Col>
              </Row> */}
            </Fragment>
          </div>
        </div>
      </>
    );
  }
}
