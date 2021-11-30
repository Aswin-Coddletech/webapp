import * as React from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Card,
  Descriptions,
  Checkbox,
  Button,
  Upload,
  Badge
} from "antd";

import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import { IInventory } from "src/interfaces/Inventory.interface";

import ss from "./ItemCard.module.scss";
import { colorMelloonFineprint } from "src/constants/colors";
import {
  FilePdfOutlined,
  FileTextOutlined,
  WarningOutlined,
  SafetyOutlined,
  CameraOutlined,
  HomeOutlined,
  WalletOutlined,
  EditOutlined
} from "@ant-design/icons";

const { Column } = Table;

export interface IItemCardData {
  loading: boolean;
  item: IInventory;
  total: number;
  page: number;
  pageSize: number;
}

export interface IItemCardHocData {}

export interface IItemCardCallbacks {
  changePagination: any;
  changePageSize: any;
  refreshItem(itemId?: string): void;
  //updateItem(data: IInventory): void;
}

export interface ILocalState {
  screenOption: number;
  imageUrl: string;
  redirectToNewItemPolicy: boolean;
}

export interface IItemCardProps
  extends IItemCardData,
    IItemCardHocData,
    IItemCardCallbacks {}

export class ItemCard extends React.Component<IItemCardProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1,
      imageUrl: "",
      redirectToNewItemPolicy: false
    };
  }

  componentDidMount() {
    //this.props.getItem(this.props.item.itemId);
  }

  invokeUpdateItem = data => {
    //this.props.updateItem(data);
  };

  getItemInsurance = () => {
    this.setState({ redirectToNewItemPolicy: true });
  };

  renderDate = (input_date: string) => moment(input_date).format("DD.MM.YYYY");

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderTitle = () => {
    return (
      <Row justify="space-between">
        <Col style={{ textAlign: "left" }}>
          <h3 style={{ fontWeight: "bold" }}>
            {this.props.item.oemProductModel}
          </h3>
        </Col>
        <Col>
          <Row>
            <Col>
              {!this.props.item.equipmentCover && (
                <Button
                  disabled
                  style={{
                    width: "110px",
                    color: "#f5222d",
                    paddingRight: "0px",
                    paddingLeft: "0px"
                  }}
                >
                  <WarningOutlined />
                  Not Insured!
                </Button>
              )}
              {this.props.item.equipmentCover && (
                <Button
                  disabled
                  style={{
                    width: "110px",
                    color: "green",
                    paddingRight: "0px",
                    paddingLeft: "0px"
                  }}
                >
                  <SafetyOutlined />
                  Insured!
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  renderInvoiceDetails = item => {
    /* 
    invoiceDetails: {"invoiceId": "1",  "invoiceDate": "2019-01-06T08:15:15.919Z", "merchant": "Unicenter, Zeil, Frankfurt 60112"}
    invoiceDocument?: {documentName?: string; documentSource?: string; documentType: string;}; 
    */

    let invoiceNum = "Invoice Number: ";
    let invDate = "";
    let from = "";

    if (item.invoiceDetails && item.invoiceDetails.invoiceId) {
      invoiceNum = invoiceNum + "\xa0" + (item.invoiceDetails.invoiceId || "");
    }

    if (item.invoiceDetails && item.invoiceDetails.invoiceDate) {
      invDate = item.invoiceDetails.invoiceDate || "";
    }

    if (item.invoiceDetails && item.invoiceDetails.merchant) {
      from = item.invoiceDetails.merchant || "";
    }

    return (
      <div>
        <span> {invoiceNum} </span>
        <br /> {invDate}
        <br /> {from}
        <br />
        {item.invoiceDocument && item.invoiceDocument.documentSource && (
          <a
            href={item.invoiceDocument.documentSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {(item.invoiceDocument.documentSource.includes(".pdf") && (
                <FilePdfOutlined className={ss.action} />
              )) || <FileTextOutlined className={ss.action} />}
              {item.invoiceDocument.documentSource}
            </span>
          </a>
        )}
        {!item.invoiceDocument && (
          <Upload
            name="invoice"
            listType="picture-card"
            showUploadList={false}
            className={ss.uploadbutton}
            //beforeUpload={beforeUpload}
            //onChange={handleChange}
          >
            {this.uploadButton("Invoice Image")}
          </Upload>
        )}
      </div>
    );
  };

  renderInvoiceDocument = item => {
    return (
      <div>
        {item.invoiceDocument && item.invoiceDocument.documentSource && (
          <a
            href={item.invoiceDocument.documentSource}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {(item.invoiceDocument.documentSource.includes(".pdf") && (
                <FilePdfOutlined className={ss.action} />
              )) || <FileTextOutlined className={ss.action} />}
              {item.invoiceDocument.documentSource}
            </span>
          </a>
        )}
      </div>
    );
  };

  renderDoumentArray = item => {
    return (
      <div>
        {item.additionalDocuments &&
          item.additionalDocuments.map((row, rowIndex) => (
            <p key={rowIndex}>
              <a
                href={row.documentSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span key={rowIndex}>
                  {(row.documentSource.includes(".pdf") && (
                    <FilePdfOutlined className={ss.action} />
                  )) || <FileTextOutlined className={ss.action} />}
                  {row.documentName}
                </span>
              </a>
            </p>
          ))}
      </div>
    );
  };

  uploadButton = (uploadTitle: string) => (
    <div>
      <CameraOutlined />
      <div> {uploadTitle} </div>
    </div>
  );

  renderItemImages = () => {
    //let prefix = "https://melloon-user-uploads.s3.eu-central-1.amazonaws.com/";
    //let url = prefix + primaryImageSource;

    let publicurl =
      "https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg";
    //let sourceurl = this.props.item.base64imageUrl ? this.props.item.base64imageUrl : publicurl;
    let sourceurl = this.props.item.presignedImageUrl
      ? this.props.item.presignedImageUrl
      : publicurl;

    return (
      <Row
        align="middle"
        justify="space-between"
        style={{ verticalAlign: "middle", marginBottom: "10px" }}
      >
        <Col className={ss.thumbnail}>
          <img
            className={ss.thumbnail}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              objectFit: "contain"
            }}
            src={sourceurl}
            alt={"item"}
          ></img>
        </Col>
        <Col style={{ verticalAlign: "middle" }}>
          <Button
            type="primary"
            disabled
            style={{ width: "110px", paddingRight: "0px", paddingLeft: "0px" }}
          >
            <CameraOutlined style={{ paddingRight: "5px" }} /> Add image
          </Button>
        </Col>
      </Row>
    );
  };

  renderItemFooterData = () => {
    return (
      <div className={ss.itemFooter}>
        <Row
          justify="space-between"
          align="middle"
          style={{ color: "#BDC3CC" }}
        >
          <Col style={{ paddingBottom: "10px", paddingRight: "100px" }}>
            <span style={{ paddingRight: "5px" }}> Added At: </span>{" "}
            <span>{this.renderDate(this.props.item.createdAt || "")}</span>
          </Col>
          <Col style={{ paddingBottom: "10px" }}>
            <span style={{ paddingRight: "5px" }}> Last Modified At: </span>
            <span style={{ paddingRight: "10px" }}>
              {" "}
              {this.renderDate(this.props.item.modifiedAt || "")}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" disabled={true}>
              {" "}
              Remove Item{" "}
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  renderPolicyActions = row => {
    if (row.policyType === "home" && row.policyId === "DUMMY1") {
      return (
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {}}
            style={{ marginRight: "5px" }}
            disabled
          >
            <Badge count={<SafetyOutlined style={{ color: "#f5222d" }} />}>
              <HomeOutlined twoToneColor="red" />
            </Badge>
            <span style={{ marginLeft: "10px" }} className={ss.hideMeForMobile}>
              Add To Home Policy!
            </span>
          </Button>
        </div>
      );
    } else if (row.policyType === "equipment" && row.policyId === "DUMMY2") {
      return (
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {
              this.getItemInsurance();
            }}
            style={{ paddingRight: "0px", paddingLeft: "0px", width: "110px" }}
          >
            <SafetyOutlined style={{ paddingRight: "5px" }} />
            Insure it!
          </Button>
        </div>
      );
    } else if (row.policyId !== "DUMMY1" && row.policyId !== "DUMMY2") {
      return (
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => {}}
            style={{ paddingRight: "0px", paddingLeft: "0px", width: "110px" }}
            disabled
          >
            Stop Insurance
          </Button>
        </div>
      );
    }
  };

  renderItemPolicies = (item: IInventory) => {
    let policies: {}[] = [];
    let cover: {}[] = [];

    cover = [];
    if (item.policies) {
      cover = item.policies.filter(
        brecord => brecord.policyType === "equipment"
      );
    }
    if (cover.length === 0) {
      policies.push({
        key: "DUMMY2",
        policyId: "DUMMY2",
        policyNummber: "",
        policyType: "equipment",
        term: "UNKNOWN",
        premiumAmount: 0,
        franchiseAmount: 0,
        amount: "Amount: ",
        franchise: "Franchise: ",
        policyTitle: "Equipment Policy"
      });
    } else {
      let i = 0;
      for (i = 0; i < cover.length; i++) {
        policies.push({
          key: cover[i]["policyId"],
          policyId: cover[i]["policyId"],
          policyNumber: cover[i]["policyNumber"],
          policyType: "equipment",
          term: cover[i]["term"],
          premiumAmount: cover[i]["premiumAmount"],
          amount:
            "Amount: " + this.renderAmount(cover[i]["premiumAmount"] || 0),
          franchiseAmount:
            "Franchise: " + this.renderAmount(cover[i]["franchiseAmount"] || 0),
          franchise:
            "Franchise: " + this.renderAmount(cover[i]["franchiseAmount"] || 0),
          policyTitle: "Equipment/" + (cover[i]["term"] + " Months" || "Daily")
        });
      }
    }

    return (
      <Row>
        <Col style={{ marginBottom: "16px" }}>
          <h3 style={{ fontWeight: "bold" }}> Product Insurance</h3>

          <Table
            className={ss.hideMeForMobile}
            style={{ borderSpacing: "0px" }}
            dataSource={policies}
            rowKey="policyId"
            pagination={false}
            size={"small"}
            bordered={false}
            showHeader={false}
          >
            <Column dataIndex="policyTitle" title="Policy" />
            <Column dataIndex="amount" title="Premium" />
            <Column dataIndex="franchise" title="Franchise" />
            <Column title="Actions" render={this.renderPolicyActions} />
          </Table>

          <Table
            className={ss.showMeForMobile}
            style={{ borderSpacing: "0px" }}
            dataSource={policies}
            rowKey="policyId"
            pagination={false}
            size={"small"}
            bordered={false}
            showHeader={false}
          >
            <Column
              dataIndex="policyId"
              title="Policy"
              render={this.renderPolicyRow}
            />
          </Table>
        </Col>
      </Row>
    );
  };

  renderPolicyRow = (itemId, policy) => {
    return (
      <Fragment>
        {policy.key === "DUMMY2" &&
          policy.policyId === "DUMMY2" &&
          policy.policyType === "equipment" && (
            <Row justify="space-between" style={{ width: "100%" }}>
              <Col xs={12}>{"Policy Number: -"}</Col>
              <Col
                xs={12}
                style={{ justifyContent: "right", textAlign: "right" }}
              >
                <Button
                  type="primary"
                  style={{
                    width: "110px",
                    paddingRight: "0px",
                    paddingLeft: "0px"
                  }}
                  onClick={() => {
                    this.getItemInsurance();
                  }}
                >
                  <SafetyOutlined style={{ marginRight: "5px" }} />
                  Insure it!
                </Button>
              </Col>
            </Row>
          )}
        {policy.key !== "DUMMY1" &&
          policy.policyId !== "DUMMY1" &&
          policy.key !== "DUMMY2" &&
          policy.policyId !== "DUMMY2" && (
            <Fragment>
              <Row
                justify="space-between"
                align="middle"
                style={{ width: "100%" }}
              >
                <Col xs={12}>
                  <div>
                    {"Policy#: " + policy["policyNumber"] || "111111111"}
                  </div>
                  <div>{"Amount: " + this.renderAmount(policy["amount"])}</div>
                  <div>
                    {"Franchise: " + this.renderAmount(policy["franchise"])}
                  </div>
                </Col>
                <Col
                  xs={12}
                  style={{ justifyContent: "right", textAlign: "right" }}
                >
                  <Button
                    type="primary"
                    disabled
                    style={{
                      width: "110px",
                      marginBottom: "5px",
                      paddingRight: "0px",
                      paddingLeft: "0px"
                    }}
                  >
                    Stop Insurance
                  </Button>
                  <Button
                    type="primary"
                    disabled
                    style={{
                      width: "110px",
                      paddingRight: "0px",
                      paddingLeft: "0px"
                    }}
                  >
                    View Policy
                  </Button>
                </Col>
              </Row>
            </Fragment>
          )}
      </Fragment>
    );
  };

  renderPolicyDescriptions = (policy, rowIndex) => {
    return (
      <Fragment key={rowIndex}>
        {policy.key === "DUMMY2" &&
          policy.policyId === "DUMMY2" &&
          policy.policyType === "equipment" && (
            <div key={"DUMMY2" + rowIndex}>
              <Button
                type="primary"
                onClick={() => {
                  this.getItemInsurance();
                }}
                style={{ marginBottom: "20px" }}
              >
                <Badge count={<SafetyOutlined style={{ color: "#f5222d" }} />}>
                  <WalletOutlined twoToneColor="red" />
                </Badge>
                <span
                  style={{ marginLeft: "5px" }}
                  key={"dummy2span" + rowIndex}
                >
                  Insure it!
                </span>
              </Button>
            </div>
          )}
        {policy.key !== "DUMMY1" &&
          policy.policyId !== "DUMMY1" &&
          policy.key !== "DUMMY2" &&
          policy.policyId !== "DUMMY2" && (
            <Descriptions
              key={"nondummy" + rowIndex}
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Policy">
                <span>{policy["policyTitle"]}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <span>{this.renderAmount(policy["premiumAmount"])}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Franchise">
                <span>{this.renderAmount(policy["franchineAmount"])}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Actions">
                <Button type="primary" disabled>
                  {" "}
                  Stop Insurance{" "}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="Franchise">
                <Row justify="space-between" style={{ width: "100%" }}>
                  <Col xs={12}>
                    <span>{this.renderAmount(policy["franchineAmount"])}</span>
                  </Col>
                  <Col
                    xs={12}
                    style={{ justifyContent: "right", textAlign: "right" }}
                  >
                    <Button type="primary" disabled>
                      {" "}
                      Stop Insurance{" "}
                    </Button>
                  </Col>
                </Row>
              </Descriptions.Item>
            </Descriptions>
          )}
      </Fragment>
    );
  };

  renderItemData = (item: IInventory) => {
    return (
      <Fragment>
        <Row
          justify="space-between"
          align="middle"
          style={{ width: "100%", marginBottom: "16px" }}
        >
          <Col>
            <h3 style={{ fontWeight: "bold" }}> Product Information</h3>
          </Col>
          <Col style={{ justifyContent: "right", textAlign: "right" }}>
            <Button
              type="primary"
              disabled
              style={{ padding: "0px", margin: "0px", width: "110px" }}
            >
              <EditOutlined style={{ paddingRight: "5px" }} /> Edit
            </Button>
          </Col>
        </Row>

        <Descriptions column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="OEM">
            <span>{item.oem}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Serial Number">
            <span>{item.oemSerialNumber}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Cost">
            <span>{this.renderAmount(this.props.item.buyAmount)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Current Value">
            <span style={{ color: colorMelloonFineprint }}>
              Price available in 24 hours
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Get market price?">
            <Checkbox disabled> </Checkbox>
          </Descriptions.Item>
          <Descriptions.Item label="Need expert valuation?">
            <Checkbox disabled> </Checkbox>
          </Descriptions.Item>
          <Descriptions.Item label="Invoice Number">
            {item.invoiceDetails ? item.invoiceDetails["invoiceId"] || "" : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Invoice Date">
            {item.invoiceDetails
              ? item.invoiceDetails["invoiceDate"] || ""
              : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Merchant">
            {item.invoiceDetails ? item.invoiceDetails["merchant"] || "" : ""}
          </Descriptions.Item>
        </Descriptions>
        <Row>
          <Col>
            <h3
              style={{
                fontWeight: "bold",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
              {" "}
              Product Documents
            </h3>
          </Col>
        </Row>
        {item.invoiceDocument && (
          <Row
            justify="start"
            align="middle"
            style={{ paddingBottom: "8px", width: "100%" }}
          >
            <Col>Invoice/Bill:</Col>
            <Col>{this.renderInvoiceDocument(item)}</Col>
          </Row>
        )}
        {!item.invoiceDocument && (
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingBottom: "8px" }}
          >
            <Col>Invoice/Bill:</Col>
            <Col style={{ justifyContent: "right", textAlign: "right" }}>
              <Button
                type="primary"
                style={{ padding: "0px", margin: "0px", width: "110px" }}
                disabled
              >
                <span>
                  {" "}
                  <CameraOutlined /> Add Invoice{" "}
                </span>
              </Button>
            </Col>
          </Row>
        )}
        <Row
          justify="space-between"
          align="middle"
          style={{ paddingBottom: "8px" }}
        >
          <Col>Other Documents:</Col>
          <Col style={{ justifyContent: "right", textAlign: "right" }}>
            <Button
              type="primary"
              style={{ padding: "0px 0px", width: "110px" }}
              disabled
            >
              <span>
                {" "}
                <EditOutlined /> Add/Remove{" "}
              </span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>{this.renderDoumentArray(item)}</Col>
        </Row>
      </Fragment>
    );
  };

  renderCard = () => {
    const { item, loading } = this.props;
    return (
      <Card
        //hoverable
        //style={{width: '100%'}} ==> no need; 100% width is already coming from containing row
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle()}
        extra={""}
      >
        <Card.Meta description={" "}></Card.Meta>

        {this.renderItemImages()}
        {this.renderItemPolicies(item)}
        {this.renderItemData(item)}
        {this.renderItemFooterData()}
      </Card>
    );
  };

  render() {
    if (this.state.redirectToNewItemPolicy) {
      return (
        <Redirect
          push={true}
          to={{
            pathname: "/insurance/new",
            state: {
              option: "item",
              policyType: "equipment",
              item: this.props.item
            }
          }}
        />
      );
    } else return <Fragment>{this.renderCard()}</Fragment>;
  }
}
