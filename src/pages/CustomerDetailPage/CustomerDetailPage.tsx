import * as React from "react";
import { Fragment } from "react";
import { Spin, Row, Col, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { ICustomer } from "src/interfaces/Customer.interface";
import ss from "./CustomerDetail.module.scss";
//import { QuoteCard } from "../../components/QuoteCard/QuoteCard";
import { CustomerCard } from "src/components/CustomerCard/CustomerCard";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export interface ICustomerDetailPageData {
  loading: boolean;
  customer: ICustomer;
  userAccount: IUserAccount;
  inspectedUser: any;
  approvedUser: any;
}

export interface ICustomerDetailPageHocData {}

export interface ICustomerDetailPageCallbacks {
  getCustomerDetail(sellerId: any): any;
}

export interface ICustomerDetailPageHocCallbacks {}

export interface ILocalState {
  locationStateInspection: any;
  completeModalVisible: boolean;
}

export interface ICustomerDetailPageProps
  extends ICustomerDetailPageData,
    ICustomerDetailPageHocData,
    ICustomerDetailPageCallbacks,
    ICustomerDetailPageHocCallbacks,
    RouteComponentProps {}

export class CustomerDetailPage extends React.Component<
  ICustomerDetailPageProps,
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
          this.props.getCustomerDetail(this.state.locationStateInspection.id);
        }
      );
    }
  }

  render() {
    const IProductCardHocData = {
      customer: this.props.customer,
      loading: this.props.loading,
      userAccount: this.props.userAccount,
      inspectedUser: this.props.inspectedUser,
      approvedUser: this.props.approvedUser
    };
    const IProductCardHocCallback = {
      //onInit: this.props.onInit,
    };
    console.log("this.props", this.props);
    console.log("^^^^^Product Data : ", this.props.customer);
    return (
      <>
        <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
          <Fragment>
            <CustomerCard
              {...IProductCardHocData}
              {...IProductCardHocCallback}
            />
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
