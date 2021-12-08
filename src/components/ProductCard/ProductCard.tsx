import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse } from "antd";

import { IProduct } from "src/interfaces/Product.interface";
//import ss from "./ProductCard.module.scss";

//const { Column } = Table;
const { Panel } = Collapse;

export interface IProductCardData {}

export interface IProductCardHocData {
  loading: boolean;
  product: IProduct;
  // userAccount: IUserAccount;
  //   inspectedUser: any;
  //   approvedUser: any;
}

export interface IProductCardCallbacks {}

export interface ILocalState {
  screenOption: number;
  percentage: number;
}

export interface IProductCardProps
  extends IProductCardData,
    IProductCardCallbacks,
    IProductCardHocData {}

export class ProductCard extends React.Component<
  IProductCardProps,
  ILocalState
> {
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
    let t = id !== undefined ? "Product#:\xa0" + id : "";
    return t;
  };

  renderProductStatus = product_status => {
    let val = "Product Status: ";
    return val + product_status;
  };

  renderOtherProductData = product => {
    //const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel
            header={this.renderProductStatus(product.product_status)}
            key="1"
          >
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Title">
                <span>{product.title}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Sub Title">
                <span>{product.sub_title}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <span>{product.description}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Availability">
                <span>{product.product_availability}%</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Proce Details"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Cost Price">
                <span>{product.cost_price}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Selling Price">
                <span>{product.selling_price}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                <span>{product.discount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Discount Price">
                <span>{product.discount_price}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>
      </>
    );
  };

  renderCard = () => {
    const { product, loading } = this.props;
    console.log("IIIInside ProdutCard : ", product);
    if (product) {
      return (
        <Card
          loading={loading}
          headStyle={{ textAlign: "center", fontWeight: "bold" }}
          bodyStyle={{ textAlign: "left" }}
          title={this.renderTitle(product.id)}
        >
          <Card.Meta description={""}></Card.Meta>
          <div>
            {""}
            {this.renderOtherProductData(product)}
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
