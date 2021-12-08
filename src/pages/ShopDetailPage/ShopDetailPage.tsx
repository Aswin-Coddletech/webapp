import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IShop } from "src/interfaces/Shop.interface";
import ss from "./ShopDetail.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IShopDetailPageData {
  loading: boolean;
  shop: IShop;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IShopDetailPageHocData {}

export interface IShopDetailPageCallbacks {
  getShopDetail(quoteId: any): any;
}

export interface IShopDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface IShopDetailPageProps
  extends IShopDetailPageData,
    IShopDetailPageHocData,
    IShopDetailPageCallbacks,
    IShopDetailPageHocCallbacks,
    RouteComponentProps {}

export class ShopDetailPage extends React.Component<
  IShopDetailPageProps,
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
          this.props.getShopDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }

  render() {
    //const { quote, loading } = this.props;
    const IShopCardHocData = {
      quote: this.props.shop,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const IShopCardHocCallback = {
      //onInit: this.props.onInit,
    };
    console.log("this.props", this.props);
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <QuoteCard {...IShopCardHocData} {...IShopCardHocCallback} />
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
