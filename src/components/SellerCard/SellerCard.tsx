import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse } from "antd";

import { ISeller } from "src/interfaces/Seller.interface";
//import ss from "./ProductCard.module.scss";

//const { Column } = Table;
const { Panel } = Collapse;

export interface ISellerCardData {}

export interface ISellerCardHocData {
  loading: boolean;
  seller: ISeller;
  // userAccount: IUserAccount;
  //   inspectedUser: any;
  //   approvedUser: any;
}

export interface ISellerCardCallbacks {}

export interface ILocalState {
  screenOption: number;
  percentage: number;
}

export interface ISellerCardProps
  extends ISellerCardData,
    ISellerCardCallbacks,
    ISellerCardHocData {}

export class SellerCard extends React.Component<ISellerCardProps, ILocalState> {
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
    let t = id !== undefined ? "Seller#:\xa0" + id : "";
    return t;
  };

  renderSellerStatus = seller_status => {
    let val = "Seller Status: ";
    return val + seller_status;
  };

  renderOtherSellerData = seller => {
    //const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel header={this.renderSellerStatus(seller.status)} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Seller Name">
                <span>{seller.sellerName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Store Name">
                <span>{seller.storeName}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Seller Status">
                <span>{seller.status}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Product Category">
                <span>{seller.product_category}%</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Seller Details"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Store Status">
                <span>{seller.storeStatus}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Store CreatedAt">
                <span>{seller.storeCreatedAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Reviewed Comment">
                <span>{seller.reviewedComment}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                <span>{seller.phoneNumber}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>
      </>
    );
  };

  renderCard = () => {
    const { seller, loading } = this.props;
    console.log("IIIInside ProdutCard : ", seller);
    if (seller) {
      return (
        <Card
          loading={loading}
          headStyle={{ textAlign: "center", fontWeight: "bold" }}
          bodyStyle={{ textAlign: "left" }}
          title={this.renderTitle(seller.id)}
        >
          <Card.Meta description={""}></Card.Meta>
          <div>
            {""}
            {this.renderOtherSellerData(seller)}
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
