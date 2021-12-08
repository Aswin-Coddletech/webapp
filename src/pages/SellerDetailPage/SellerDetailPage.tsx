import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { ISeller } from "src/interfaces/Seller.interface";
import ss from "./SellerDetail.module.scss";
//import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { SellerCard } from "src/components/SellerCard/SellerCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface ISellerDetailPageData {
  loading: boolean;
  seller: ISeller;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface ISellerDetailPageHocData {}

export interface ISellerDetailPageCallbacks {
  getSellerDetail(sellerId: any): any;
}

export interface ISellerDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface ISellerDetailPageProps
  extends ISellerDetailPageData,
    ISellerDetailPageHocData,
    ISellerDetailPageCallbacks,
    ISellerDetailPageHocCallbacks,
    RouteComponentProps {}

export class SellerDetailPage extends React.Component<
  ISellerDetailPageProps,
  ILocalState
> {
  constructor(props) {
    console.log("Inside SellerDetailPage");
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
          this.props.getSellerDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }

  render() {
    console.log("Inside SellerDetailPage");
    const ISellerCardHocData = {
      seller: this.props.seller,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const ISellerCardHocCallback = {
      //onInit: this.props.onInit,
    };
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <SellerCard {...ISellerCardHocData} {...ISellerCardHocCallback} />
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
