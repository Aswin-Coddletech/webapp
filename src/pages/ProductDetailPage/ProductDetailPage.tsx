import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IProduct } from "src/interfaces/Product.interface";
import ss from "./ProductDetail.module.scss";
import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface IProductDetailPageData {
  loading: boolean;
  product: IProduct;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface IProductDetailPageHocData {}

export interface IProductDetailPageCallbacks {
  getProductDetail(productId: any): any;
}

export interface IProductDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface IProductDetailPageProps
  extends IProductDetailPageData,
    IProductDetailPageHocData,
    IProductDetailPageCallbacks,
    IProductDetailPageHocCallbacks,
    RouteComponentProps {}

export class ProductDetailPage extends React.Component<
  IProductDetailPageProps,
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
          this.props.getProductDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }

  render() {
    const IProductCardHocData = {
      product: this.props.product,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const IProductCardHocCallback = {
      //onInit: this.props.onInit,
    };
    console.log("this.props", this.props);
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <QuoteCard {...IProductCardHocData} {...IProductCardHocCallback} />
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
