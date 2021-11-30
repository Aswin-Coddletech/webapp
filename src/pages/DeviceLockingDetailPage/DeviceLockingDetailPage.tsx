import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Form, Button, Modal, Alert } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IInventory } from "src/interfaces/Inventory.interface";
import ss from "./DeviceLockingDetailPage.module.scss";
import { UserItemCard } from "../../components/UserItemCard/UserItemCard";

export interface IDeviceLockingDetailPageData {
  loading: boolean;
  userItem: IInventory;
  lockActionSuccess: string;
}

export interface IDeviceLockingDetailPageHocData {}

export interface IDeviceLockingDetailPageCallbacks {
  applyLockAction(quoteId: string, lockAction: string): any;
  getUserItem(itemId: any): any;
  //observationInfo(data: {}): any;
}

export interface IDeviceLockingDetailPageHocCallbacks {
  //changeSelectedQuote(quote: IQuote): any;
}

export interface ILocalState {
  locationStateDevice: any;
  completeModalVisible: boolean;
  lockAction: string;
}

export interface IDeviceLockingDetailPageProps
  extends IDeviceLockingDetailPageData,
    IDeviceLockingDetailPageHocData,
    IDeviceLockingDetailPageCallbacks,
    IDeviceLockingDetailPageHocCallbacks,
    RouteComponentProps {}

export class DeviceLockingDetailPage extends React.Component<
  IDeviceLockingDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateDevice: {},
      completeModalVisible: false,
      lockAction: "",
    };
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState({ locationStateDevice: this.props.location.state }, () => {
        this.props.getUserItem(this.state.locationStateDevice.itemId);
      });
    }
  }

  onFinish = (values) => {
    console.log(values);
    //this.props.observationInfo(values);
  };

  submitLockAction = (id, lockAction) => {
    console.log("id", id);
    console.log("lockAction", lockAction);
    this.setState({ completeModalVisible: false });
    this.props.applyLockAction(id, lockAction);
  };

  completeModal(lockAction) {
    this.setState({ lockAction }, () => {
      this.setState({ completeModalVisible: true });
    });
  }

  renderLockAction = (userItem) => {
    const { locationStateDevice } = this.state;
    return (
      <div style={{ marginTop: "10px" }}>
        <div>
          <Row>
            <Col>
              {" "}
              <br />
              <h3 style={{ fontWeight: "bold" }}> Lock/Unlock Device </h3>
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Form name="nest-messages" onFinish={this.onFinish}>
                {userItem.isEnrolled === true && userItem.isLocked === false && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.completeModal("lock")}
                  >
                    Lock The Device
                  </Button>
                )}
                {userItem.isEnrolled === true && userItem.isLocked === true && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.completeModal("unlock")}
                  >
                    Unlock The Device
                  </Button>
                )}
              </Form>
            </Col>
          </Row>

          <Modal
            title="Lock/Unlock Device"
            centered
            visible={this.state.completeModalVisible}
            onOk={() =>
              this.submitLockAction(
                locationStateDevice.itemId,
                this.state.lockAction
              )
            }
            onCancel={() => this.setState({ completeModalVisible: false })}
          >
            <p>Do you really want to {this.state.lockAction} the Device?</p>
          </Modal>
        </div>
      </div>
    );
  };

  render() {
    const { userItem, loading } = this.props;
    const IUserItemCardHocData = {
      userItem: this.props.userItem,
      loading: this.props.loading,
    };
    const IUserItemCardHocCallback = {
      //onInit: this.props.onInit,
    };
    console.log("this.props", this.props);
    return (
      <>
        <div className={ss.successMsg}>
          {!loading && this.props.lockActionSuccess === "OK" && (
            <Alert
              message={`Device is  Successfully ${this.state.lockAction}ed`}
              type="success"
            />
          )}
          {!loading && this.props.lockActionSuccess === "ERROR" && (
            <Alert
              message={`Device ${this.state.lockAction} is Failed`}
              type="error"
            />
          )}
        </div>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <div className={ss.successMsg}>
              {" "}
              {Object.keys(userItem).length !== 0 &&
                this.renderLockAction(userItem)}{" "}
            </div>
            <UserItemCard
              {...IUserItemCardHocData}
              {...IUserItemCardHocCallback}
            />
          </Fragment>
        </Spin>{" "}
      </>
    );
  }
}
