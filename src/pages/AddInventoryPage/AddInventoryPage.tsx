import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Button, Steps, Spin, Row, Col } from "antd";

import ImageSelectAndDetect from "src/components/ImageSelectAndDetect";
import EditProductSpecs from "src/components/EditProductSpecs";

import ss from "./AddInventoryPage.module.scss";
import { ROUTES } from "src/constants/routes";
import { colorMelloonPrimary } from "src/constants/colors";
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined
} from "@ant-design/icons";

const Step = Steps.Step;

const steps = [
  {
    title: "Capture Product Image",
    content: "First-content"
  },
  {
    title: "Update Specifications",
    content: "Second-content"
  },
  /*
  {
    title: 'Upload Documents (Optional)',
    content: 'Third-content',
  },
  {
    title: 'Review & Submit',
    content: 'Forth-content',
  },
  */
  {
    title: "Done",
    content: "Last-content"
  }
];

export interface IAddInventoryPageData {
  loading: boolean;
  submitSuccess: string;
  base64imageUrl: string;
  oem: string;
  oemProductModel: string;
}

export interface IAddInventoryPageCallbacks {
  initDefaultSpecs(): void;
  onSubmit(): any;
  onInit(): any;
}

export interface IAddInventoryPageProps
  extends IAddInventoryPageData,
    IAddInventoryPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  current: number;
}

export class AddInventoryPage extends Component<
  IAddInventoryPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.props.onInit();
    this.state = {
      current: 0
    };
  }

  componentDidMount() {
    //this.props.onInit();
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });

    if (current === 1) {
      // initialise default specs based on AI detected specs
      this.props.initDefaultSpecs();
    } else if (current === steps.length - 1) {
      //submit item
      this.props.onSubmit();
    }
  }

  prev() {
    const current = this.state.current - 1;
    if (current >= 0) {
      this.setState({ current });
    }
  }

  redirectToProductList = () => {
    this.setState({
      current: 5
    });
  };

  goToStepOne = () => {
    this.props.onInit();
    this.setState({
      current: 0
    });
  };

  render() {
    const current = this.state.current;

    return (
      <form className={ss.root} onSubmit={this.props.onSubmit}>
        <Row style={{ paddingBottom: "16px" }}>
          <Col xs={12}>
            <h3 style={{ color: colorMelloonPrimary, fontWeight: "bold" }}>
              {" "}
              Add New Item{" "}
            </h3>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={() => this.redirectToProductList()}>
              <DoubleLeftOutlined style={{ paddingRight: "10px" }} />
              Product List
            </Button>
          </Col>
        </Row>

        <Row justify="center" align="middle">
          <Col xs={24}>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>

        <Row justify="center" align="middle">
          <Col xs={24}>{this.renderScreen(current)}</Col>
        </Row>

        <Row justify="center" align="middle">
          <Col xs={24}>{this.renderPrevNextButtons(current)}</Col>
        </Row>
      </form>
    );
  }

  renderPrevNextButtons = current => (
    <div style={{ textAlign: "center" }}>
      {/* Barcode & Qrcode Temporarily placed here for better alignment */}
      {/* TODO: To be shifted to ImageSelectAndDetectComponent later */}

      {current < steps.length - 1 && (
        <Button
          className={ss.actionbutton}
          type="primary"
          onClick={() => this.redirectToProductList()}
        >
          Cancel
        </Button>
      )}

      {current === 0 && (
        <Button className={ss.actionbutton} type="primary" disabled={true}>
          {" "}
          Scan Barcode{" "}
        </Button>
      )}

      {current === 0 && (
        <Button className={ss.actionbutton} type="primary" disabled={true}>
          {" "}
          Scan Qrcode{" "}
        </Button>
      )}

      {current > 0 && current < steps.length - 1 && (
        <Button
          className={ss.actionbutton}
          type="primary"
          onClick={() => this.prev()}
          disabled={current <= 0}
        >
          <LeftOutlined style={{ paddingRight: "5px" }} /> Previous
        </Button>
      )}
      {current === 0 && steps.length - 2 && (
        <Button
          className={ss.actionbutton}
          type="primary"
          onClick={() => this.next()}
          disabled={this.props.base64imageUrl.length <= 0}
        >
          <span style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            Next <RightOutlined style={{ paddingLeft: "5px" }} />
          </span>
        </Button>
      )}
      {current > 0 && current < steps.length - 2 && (
        <Button
          className={ss.actionbutton}
          type="primary"
          onClick={() => this.next()}
        >
          Next
        </Button>
      )}
      {current === steps.length - 2 && (
        <Button
          className={ss.actionbutton}
          type="primary"
          onClick={() => this.next()}
          disabled={
            this.props.base64imageUrl.length <= 0 ||
            this.props.oem.length <= 0 ||
            this.props.oemProductModel.length <= 0
          }
        >
          Submit
        </Button>
      )}
    </div>
  );

  renderStepOne = () => (
    <Fragment>
      <div className={ss.row}>
        <ImageSelectAndDetect></ImageSelectAndDetect>
      </div>
    </Fragment>
  );

  renderEditProductSpecs = () => (
    <Fragment>
      <EditProductSpecs></EditProductSpecs>
    </Fragment>
  );

  renderEditInvoiceDetails = () => (
    <Fragment>
      <div className={ss.basicInfo}>
        <h3>Upload Invoice and other supporting documents</h3>
        EditInvoiceDetails component goes here
      </div>
    </Fragment>
  );

  renderReviewProductInfo = () => (
    <Fragment>
      <h4>Review Newly Added Product</h4>
      <div className={ss.basicInfo}>ReviewProductInfo component goes here</div>
    </Fragment>
  );

  renderLastStep = () => (
    <Fragment>
      <Spin spinning={this.props.loading} style={{ marginTop: "40px" }}>
        {this.props.submitSuccess === "YES" && (
          <Fragment>
            <Row align="middle" style={{ paddingTop: "40px" }}>
              <Col>
                <span style={{ color: "green" }}>
                  {" "}
                  Product added successfully!
                </span>
              </Col>
            </Row>
            <Row align="middle" style={{ paddingTop: "20px" }}>
              <Col xs={12}>
                <span> View Item in Product List: </span>
              </Col>
              <Col xs={12} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  style={{ width: "140px" }}
                  onClick={() => this.redirectToProductList()}
                >
                  <DoubleLeftOutlined style={{ paddingRight: "5px" }} /> Product
                  List
                </Button>
              </Col>
            </Row>
            <Row align="middle" style={{ paddingTop: "20px" }}>
              <Col xs={12}>
                <span> Add another product: </span>
              </Col>
              <Col xs={12} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  style={{ width: "140px" }}
                  onClick={() => this.goToStepOne()}
                >
                  <PlusOutlined style={{ paddingRight: "5px" }} /> Add Product
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
        {this.props.submitSuccess === "NO" && (
          <Row align="middle" style={{ paddingTop: "40px" }}>
            <Col xs={12}>
              <span style={{ color: "red" }}> Product addition failed!</span>
            </Col>
            <Col xs={12} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                style={{ width: "140px" }}
                onClick={() => this.prev()}
              >
                <LeftOutlined style={{ paddingRight: "5px" }} /> Go Back
              </Button>
            </Col>
          </Row>
        )}
        {this.props.submitSuccess === "" && (
          <div className={ss.successMessage}>Nothing to submit!</div>
        )}
      </Spin>
    </Fragment>
  );

  renderScreen = current => {
    switch (current) {
      case 0:
        return this.renderStepOne();
      case 1:
        return this.renderEditProductSpecs();
      /*
      case 2:
          console.log("current step 2");
          return this.renderEditInvoiceDetails();
      case 3:
        console.log("current step 3");
        return this.renderReviewProductInfo();
      */
      case 2:
        return this.renderLastStep();
      case 5:
        return <Redirect to={ROUTES.DI_LIST} push={true}></Redirect>;
      default:
        break;
    }
  };
}
