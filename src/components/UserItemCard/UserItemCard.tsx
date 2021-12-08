import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions } from "antd";
//import { ClockCircleOutlined } from "@ant-design/icons";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";
import { IInventory } from "src/interfaces/Inventory.interface";
//import ss from "./UserItemCard.module.scss";

export interface IUserItemCardData {}

export interface IUserItemCardHocData {
  loading: boolean;
  userItem: IInventory;
}

export interface IUserItemCardCallbacks {}

export interface ILocalState {
  screenOption: number;
}

export interface IUserItemCardProps
  extends IUserItemCardData,
    IUserItemCardHocData,
    IUserItemCardCallbacks {}

export class UserItemCard extends React.Component<
  IUserItemCardProps,
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

  renderTitle = title => {
    // eslint-disable-next-line
    let t = title != undefined ? "User Item:" + "\xa0" + title : "";
    return t;
  };

  sortFeatures(features) {
    return Object.keys(features)
      .sort()
      .reduce(function(result, key) {
        result[key] = features[key];
        return result;
      }, {});
  }

  renderUserItemStatus = status => {
    let val = "User Item Status: ";
    return val + status;
  };

  renderOtherUserItemData = userItem => {
    if (
      Object.keys(userItem).length > 0 &&
      Object.keys(userItem.features).length > 0
    ) {
      userItem.features = this.sortFeatures(userItem.features);
    }
    return (
      <>
        <div style={{ marginTop: "10px" }}>
          <Descriptions
            title={this.renderUserItemStatus(userItem.status)}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Item Type">
              <span>{userItem.itemType}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Item Id">
              <span>{userItem.itemId}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Title">
              <span>{userItem.title}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Owner Type">
              <span>{userItem.ownerType}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              <span>{userItem.product}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Brand">
              <span>{userItem.brand}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Model">
              <span>{userItem.model}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              <span>{userItem.createdAt}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Condition">
              <span>{userItem.condition}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Registered">
              <span>{userItem.isRegistered ? "Yes" : "No"}</span>
            </Descriptions.Item>
            {userItem.isRegistered && (
              <Descriptions.Item label="Last Registered At">
                <span>{userItem.lastRegisteredAt}</span>
              </Descriptions.Item>
            )}
            {userItem.isRegistered && (
              <Descriptions.Item label="Last Registered By">
                <span>{userItem.lastRegisteredBy}</span>
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Locked">
              <span>{userItem.isLocked ? "Yes" : "No"}</span>
            </Descriptions.Item>
            {userItem.isLocked && (
              <Descriptions.Item label="Last Locked At">
                <span>{userItem.lastLockedAt}</span>
              </Descriptions.Item>
            )}
            {userItem.isLocked && (
              <Descriptions.Item label="Last Locked By">
                <span>{userItem.lastLockedBy}</span>
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Enrolled">
              <span>{userItem.isEnrolled ? "Yes" : "No"}</span>
            </Descriptions.Item>
            {userItem.isEnrolled && (
              <Descriptions.Item label="Enrollment Device Id">
                <span>{userItem.enrollmentDeviceId}</span>
              </Descriptions.Item>
            )}
            {userItem.isEnrolled && (
              <Descriptions.Item label="Enrollment Key">
                <span>{userItem.enrollmentKey}</span>
              </Descriptions.Item>
            )}
            {userItem.isEnrolled && (
              <Descriptions.Item label="Last Enrolled At">
                <span>{userItem.lastEnrolledAt}</span>
              </Descriptions.Item>
            )}
            {userItem.isEnrolled && (
              <Descriptions.Item label="Last Enrolled By">
                <span>{userItem.lastEnrolledBy}</span>
              </Descriptions.Item>
            )}

            {userItem.lastUnEnrolledAt && (
              <Descriptions.Item label="Last UnEnrolled At">
                <span>{userItem.lastUnEnrolledAt}</span>
              </Descriptions.Item>
            )}
            {userItem.lastUnEnrolledBy && (
              <Descriptions.Item label="Last UnEnrolled By">
                <span>{userItem.lastUnEnrolledBy}</span>
              </Descriptions.Item>
            )}
            {userItem.lastUnLockedAt && (
              <Descriptions.Item label="Last UnLocked At">
                <span>{userItem.lastUnLockedAt}</span>
              </Descriptions.Item>
            )}
            {userItem.lastUnLockedBy && (
              <Descriptions.Item label="Last UnLocked By">
                <span>{userItem.lastUnLockedBy}</span>
              </Descriptions.Item>
            )}
            <Descriptions.Item label="User Id">
              <span>{userItem.userId}</span>
            </Descriptions.Item>
          </Descriptions>
          {/* user Information */}
          <Descriptions
            title={"Features"}
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            {userItem.features &&
              Object.keys(userItem.features).map((keyName, i) => (
                <Descriptions.Item key={i} label={keyName}>
                  <span>{userItem.features[keyName]}</span>
                </Descriptions.Item>
              ))}
          </Descriptions>
        </div>
      </>
    );
  };

  renderCard = () => {
    const { userItem, loading } = this.props;
    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(userItem.title)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div> {this.renderOtherUserItemData(userItem)} </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
