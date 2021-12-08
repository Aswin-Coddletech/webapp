import * as React from "react";
import { Fragment } from "react";
import { Table, Row, Col, Card, Descriptions } from "antd";

import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import {
  IPolicy,
  IInsuranceWarrantyItem
} from "src/interfaces/Insurance.interface";
import { IInventory } from "src/interfaces/Inventory.interface";

import ss from "./InsurancePolicyCard.module.scss";
import {
  FilePdfOutlined,
  FileTextOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";

const { Column } = Table;
interface IAddWarrantedItemsData {
  _key?: string;
  id?: string;
  policyId?: string;
  warrantedItems?: IInsuranceWarrantyItem[];
}

export interface IInsurancePolicyCardData {
  loading: boolean;
  policy: IPolicy;
  itemsNotInPolicy: IInventory[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IInsurancePolicyCardHocData {}

export interface IInsurancePolicyCardCallbacks {
  changePagination: any;
  changePageSize: any;
  getItemsNotInPolicy(policyId?: string): void;
  refreshPolicy(policyId?: string): void;
  //addWarrantedItems(data: IAddWarrantedItemsData): void;
}

export interface ILocalState {
  screenOption: number;
}

export interface IInsurancePolicyCardProps
  extends IInsurancePolicyCardData,
    IInsurancePolicyCardHocData,
    IInsurancePolicyCardCallbacks {}

export class InsurancePolicyCard extends React.Component<
  IInsurancePolicyCardProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {
    //this.props.getItemsNotInPolicy(this.props.policy.policyId);
  }

  invokeAddWarrantedItem = data => {
    console.log("adding new warranted items to policy");
    //this.props.addWarrantedItems(data);
  };

  renderDate = (input_date: string) => {
    if (input_date === "" || input_date === null) {
      return "";
    } else {
      return moment(input_date).format("DD.MM.YYYY");
    }
  };

  renderAmount = (amount?: number) => {
    const temp = amount || 0;
    const amountFormatted = currency(temp, AMOUNTS_FORMAT).format();
    return `${amountFormatted}`;
  };

  renderTitle = policyId => {
    // eslint-disable-next-line
    let t = "Policy#:" + "\xa0" + policyId || "";
    return t;
  };

  renderTitleOld = (policyId, policyType, policyTypeDetails) => {
    let t =
      // eslint-disable-next-line
      "Policy#:" + "\xa0" + policyId ||
      "" +
        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
        "Policy Type:" +
        "\xa0" +
        (policyType || policyTypeDetails);
    return t;
  };

  showModalWarrantyItem = row => {
    console.log("in show modal");
    this.setState({
      screenOption: 1
    });
  };

  renderWarrantyTypes = () => {
    console.log("in render warranty types");
    return "";
  };

  renderInvoiceDetails = (invoiceDetails, row) => {
    if (typeof invoiceDetails === "undefined") return null;

    let invLabel = "Invoice Number: ";
    let invoiceNum = invLabel + "\xa0" + (invoiceDetails.invoiceId || "");
    let from = invoiceDetails.merchant || "";

    return (
      <div>
        <span key={invoiceNum}> {invoiceNum} </span>
        <br />
        {from}
        <br />
        <a
          href={row.invoiceDocumentSource}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span key={invoiceNum}>
            {(row.invoiceDocumentSource &&
              row.invoiceDocumentSource.includes(".pdf") && (
                <FilePdfOutlined className={ss.action} />
              )) ||
              (row.invoiceDocumentSource && (
                <FileTextOutlined className={ss.action} />
              ))}
            {row.invoiceDocumentSource}
          </span>
        </a>
      </div>
    );
  };

  renderDoumentArray = additionalDocuments => {
    if (typeof additionalDocuments === "undefined") return null;

    return (
      <div>
        {additionalDocuments.map((row, rowIndex) => {
          return (
            <p key={rowIndex}>
              <a
                href={row.documentSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span key={rowIndex}>
                  {(row.documentSource &&
                    row.documentSource.includes(".pdf") && (
                      <FilePdfOutlined className={ss.action} />
                    )) || <FileTextOutlined className={ss.action} />}
                  {row.documentName}
                </span>
              </a>
            </p>
          );
        })}
      </div>
    );
  };

  renderActions = rowItem => (
    <span className={ss.actions}>
      <PlusCircleOutlined
        className={ss.action}
        twoToneColor="green"
        onClick={() => this.invokeAddWarrantedItem(rowItem)}
      />
    </span>
  );

  renderOtherPolicyData = policy => {
    console.log(policy);
    return (
      <div>
        <Descriptions
          title={"Amout: " + this.renderAmount(policy.coverAmount)}
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Premium Frequency">
            <span>{policy.frequency}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Premium Amount">
            <span>{this.renderAmount(policy.premiumAmount)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Term (Months)">
            <span>{policy.term}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            <span>{this.renderDate(policy.policyStartDate)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            <span>{this.renderDate(policy.policyEndDate)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Insurer ID">
            <span>{policy.insurerId}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Insurer Name">
            <span>{policy.insurerName}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Agent ID">
            <span>{policy.agentId}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Agent Name">
            <span>{policy.agentName}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Additional Details">
            <span>additional details</span>
          </Descriptions.Item>
          <Descriptions.Item label="Warranties">
            <span>Warranties and Warranted Items are listed below</span>
          </Descriptions.Item>
        </Descriptions>
        <Row>
          <Col>
            <Table
              dataSource={policy.warranties}
              rowKey="warrantyType"
              className={ss.table}
              pagination={false}
              size={"small"}
              bordered={false}
            >
              <Column dataIndex="warrantyType" title="#" />
              <Column dataIndex="description" title="Warranty" />
              <Column
                dataIndex="amount"
                title="Amount"
                render={this.renderAmount}
              />
            </Table>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {" "}
            <br />
            <h3> Warranted Items </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              dataSource={policy.warrantedItems}
              rowKey="itemId"
              className={ss.table}
              pagination={false}
              size={"small"}
              bordered={false}
              scroll={{ x: 300 }}
            >
              <Column
                dataIndex="itemName"
                title="Item Name"
                key="itemName"
                className={ss.hideMeForMobile}
              />
              <Column dataIndex="oem" title="OEM" />
              <Column dataIndex="oemProductModel" title="Product Model" />
              <Column
                dataIndex="buyAmount"
                title="Amount"
                render={this.renderAmount}
              />
              <Column
                dataIndex="oemProductCode"
                title="Product Code"
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="serialNumber"
                title="Serial#"
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="buyDate"
                title="Buy Date"
                render={this.renderDate}
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="invoiceDetails"
                title="Invoice Details"
                render={this.renderInvoiceDetails}
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="additionalDocuments"
                title="Additional Documents"
                render={this.renderDoumentArray}
                className={ss.hideMeForMobile}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  };

  renderCard = () => {
    const { policy, loading } = this.props;

    return (
      <Card
        //hoverable
        loading={loading}
        headStyle={{ textAlign: "center", fontWeight: "bold" }}
        bodyStyle={{ textAlign: "left" }}
        title={this.renderTitle(policy.policyNumber)}
      >
        <Card.Meta description={" "}></Card.Meta>
        <div> {this.renderOtherPolicyData(policy)} </div>
      </Card>
    );
  };

  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}
