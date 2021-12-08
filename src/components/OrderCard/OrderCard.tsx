import * as React from "react";
import { Fragment } from "react";
import { Card, Descriptions, Collapse } from "antd";

import { IOrder } from "src/interfaces/Order.interface";
//import ss from "./ProductCard.module.scss";

//const { Column } = Table;
const { Panel } = Collapse;

export interface IOrderCardData {}

export interface IOrderCardHocData {
  loading: boolean;
  order: IOrder;
  // userAccount: IUserAccount;
  //   inspectedUser: any;
  //   approvedUser: any;
}

export interface IOrderCardCallbacks {}

export interface ILocalState {
  screenOption: number;
  percentage: number;
}

export interface IOrderCardProps
  extends IOrderCardData,
    IOrderCardCallbacks,
    IOrderCardHocData {}

export class OrderCard extends React.Component<IOrderCardProps, ILocalState> {
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
    let t = id !== undefined ? "Order#:\xa0" + id : "";
    return t;
  };

  renderOrderStatus = product_status => {
    let val = "Order Status: ";
    return val + product_status;
  };

  renderOtherOrderData = order => {
    //const { REACT_APP_INTERCOM_LINK } = process.env;
    return (
      <>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel header={this.renderOrderStatus(order.status)} key="1">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Return Status">
                <span>{order.return_status}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Status">
                <span>{order.delivery_status}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <span>{order.payment_status}%</span>
              </Descriptions.Item>
              <Descriptions.Item label="Refund Status">
                <span>{order.refundStatus}%</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header={"Order Details"} key="6">
            <Descriptions
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Order Amount">
                <span>{order.order_amount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                <span>{order.totalAmount}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Order CreatedAt">
                <span>{order.order_createdAt}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Product Count">
                <span>{order.productCount}</span>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>
      </>
    );
  };

  renderCard = () => {
    const { order, loading } = this.props;
    if (order) {
      return (
        <Card
          loading={loading}
          headStyle={{ textAlign: "center", fontWeight: "bold" }}
          bodyStyle={{ textAlign: "left" }}
          title={this.renderTitle(order.id)}
        >
          <Card.Meta description={""}></Card.Meta>
          <div>
            {""}
            {this.renderOtherOrderData(order)}
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
