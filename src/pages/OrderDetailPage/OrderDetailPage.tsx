import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IOrder } from "src/interfaces/Order.interface";
import ss from "./OrderDetail.module.scss";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IOrderDetailPageData {
  loading: boolean;
  order: IOrder;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IOrderDetailPageHocData {}

export interface IOrderDetailPageCallbacks {
  getOrderDetail(orderId: any): any;
}

export interface IOrderDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface IOrderDetailPageProps
  extends IOrderDetailPageData,
    IOrderDetailPageHocData,
    IOrderDetailPageCallbacks,
    IOrderDetailPageHocCallbacks,
    RouteComponentProps {}

export class OrderDetailPage extends React.Component<
  IOrderDetailPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      locationStateInspection: {},
      completeModalVisible: false
    };
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState(
        { locationStateInspection: this.props.location.state },
        () => {
          this.props.getOrderDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }

  render() {
    const IOrderCardHocData = {
      order: this.props.order,
      loading: this.props.loading
      // userAccount: this.props.userAccount,
      // inspectedUser: this.props.inspectedUser,
      // approvedUser: this.props.approvedUser
    };
    const IOrderCardHocCallback = {
      //onInit: this.props.onInit,
    };
    console.log("this.props", this.props);
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <OrderCard {...IOrderCardHocData} {...IOrderCardHocCallback} />
          </Fragment>
          <div>
            {" "}
            <div style={{ marginTop: "10px" }}>
              <Row>
                <Col lg={7}>
                  <Button type="primary" className={ss.buttonStyle} danger>
                    Cancel!
                  </Button>
                </Col>
              </Row>
            </div>{" "}
          </div>
        </Spin>{" "}
      </>
    );
  }
}
