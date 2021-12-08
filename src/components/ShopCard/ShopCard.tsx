import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse } from "antd";

import { IShop } from "src/interfaces/Shop.interface";

const { Panel } = Collapse;

export interface IShopCardData {}

export interface IShopCardHocData {
  loading: boolean;
  shop: IShop;
  // userAccount: IUserAccount;
  //   inspectedUser: any;
  //   approvedUser: any;
}

export interface IShopCardCallbacks {}

export interface ILocalState {
  screenOption: number;
  percentage: number;
}

export interface IShopCardProps
  extends IShopCardData,
    IShopCardCallbacks,
    IShopCardHocData {}

export class ShopCard extends React.Component<IShopCardProps, ILocalState> {
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

  renderTitle = id => {
    let t = id !== undefined ? "Store#:\xa0" + id : "";
    return t;
  };

  renderShopStatus = store_status => {
    let val = "Store Status: ";
    return val + store_status;
  };

  renderOtherShopData = store => {
    //const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel header={this.renderShopStatus(store.product_status)} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Title">
                <span>{store.title}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Sub Title">
                <span>{store.sub_title}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <span>{store.description}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Availability">
                <span>{store.product_availability}%</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Proce Details"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Cost Price">
                <span>{store.cost_price}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Selling Price">
                <span>{store.selling_price}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                <span>{store.discount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Discount Price">
                <span>{store.discount_price}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>
      </>
    );
  };

  renderCard = () => {
    const { shop, loading } = this.props;
    if (shop) {
      return (
        <Card
          loading={loading}
          headStyle={{ textAlign: "center", fontWeight: "bold" }}
          bodyStyle={{ textAlign: "left" }}
          title={this.renderTitle(shop.id)}
        >
          <Card.Meta description={""}></Card.Meta>
          <div>
            {""}
            {this.renderOtherShopData(shop)}
            {""}
          </div>
        </Card>
      );
    }
  };

  render() {
    console.log("pppros : ", this.props);
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
