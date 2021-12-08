import React from "react";
import { IUserAccount } from "src/interfaces/UserAccount.interface";
import { Button, Modal } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const appID = process.env.REACT_APP_INTERCOM_ID;
const INTERCOM_LINK = `https://app.intercom.com/apps/${appID}/users/show?`;
export interface IUserInfoData {}

export interface IUserInfoDataHocData {
  userAccount: IUserAccount;
  visible: boolean;
}

export interface IUserInfoDataCallbacks {}

export interface IUserInfoDataHocCallbacks {
  handleCancel(): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface IUserInfoModalProps
  extends IUserInfoData,
    IUserInfoDataHocData,
    IUserInfoDataCallbacks,
    IUserInfoDataHocCallbacks {}

export class UserInfoModal extends React.Component<
  IUserInfoModalProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Modal
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
          footer={null}
          width={600}
        >
          <div>
            <div>
              <span>
                <strong>User ID : </strong>
              </span>
              <span style={{ fontSize: 14 }}>
                {this.props.userAccount.userId}
              </span>
              <Button
                href={`${INTERCOM_LINK}user=${this.props.userAccount.userId}`}
                target="_blank"
                type="link"
                icon={<LinkOutlined />}
                size={"large"}
              >
                <span style={{ fontSize: 14 }}>
                  visit intercom user-user-id
                </span>
              </Button>
            </div>
            <div>
              <span>
                <strong>Email ID : </strong>
              </span>
              <span style={{ fontSize: 14 }}>
                {this.props.userAccount.emailId}
              </span>
              <Button
                href={`${INTERCOM_LINK}email=${this.props.userAccount.emailId}`}
                target="_blank"
                type="link"
                icon={<LinkOutlined />}
                size={"large"}
              >
                <span style={{ fontSize: 14 }}>visit intercom user-email</span>
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
