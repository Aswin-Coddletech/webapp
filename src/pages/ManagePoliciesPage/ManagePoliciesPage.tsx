/* eslint-disable */
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, Table } from "antd";

import moment from "moment";
import currency from "currency.js";
import { AMOUNTS_FORMAT } from "src/constants/currencies";

import ss from "./ManagePoliciesPage.module.scss";
import {
  IPolicy,
  IInsuranceWarrantyItem
} from "src/interfaces/Insurance.interface";
import InsurancePolicyCard from "src/components/InsurancePolicyCard";
import { colorMelloonPrimary } from "src/constants/colors";
import {
  EyeOutlined,
  EditOutlined,
  DoubleLeftOutlined
} from "@ant-design/icons";

const { Column } = Table;

export interface IManagePoliciesPageData {
  loading: boolean;
  list: IPolicy[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IManagePoliciesPageCallbacks {
  onInit(): any;
  changeSelectedPolicy(policy: IPolicy): any;
  changePagination: any;
  changePageSize: any;
}

export interface IManagePoliciesPageProps
  extends IManagePoliciesPageData,
    IManagePoliciesPageCallbacks,
    RouteComponentProps {}

export interface ILocalState {
  screenOption: number;
}

export class ManagePoliciesPage extends Component<
  IManagePoliciesPageProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {
    this.props.onInit();
  }

  renderDate = (input_date: string) => {
    if (
      typeof input_date === "undefined" ||
      input_date === "undefined" ||
      input_date === null
    ) {
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

  renderPolicyType = (policyType: string, row) => {
    let tempPolicyType = policyType;
    if (policyType == "Home") {
      if (typeof row.policyTypeDetails.landlord != "undefined") {
        if (typeof row.policyTypeDetails.landlord.isLandlord != "undefined") {
          if (row.policyTypeDetails.landlord.isLandlord) {
            tempPolicyType = "Home/Landlord";
          }
        }
      }
    }
    return tempPolicyType;
  };

  togglePolicyCard = (policy: IPolicy) => {
    console.log("in toggle policy card");

    this.props.changeSelectedPolicy(policy);

    this.setState({
      screenOption: 2
    });
  };

  toggleList = () => {
    console.log("in toggle list");
    this.setState({
      screenOption: 1
    });
  };

  renderActions = selectedRowPolicy => (
    <span className={ss.actions}>
      <EyeOutlined
        className={ss.action}
        onClick={() => this.togglePolicyCard(selectedRowPolicy)}
      />
      <EditOutlined className={ss.action} />
    </span>
  );

  renderList = () => {
    const { list, loading, total, page, pageSize } = this.props;
    const { changePagination, changePageSize } = this.props;

    return (
      <div className={ss.root}>
        <Row justify="center">
          <Col>
            <h3
              style={{
                color: colorMelloonPrimary,
                fontWeight: "bold",
                paddingBottom: "8px"
              }}
            >
              Your Insurance Policies
            </h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table
              loading={loading}
              rowKey="id"
              dataSource={list}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    this.togglePolicyCard(record);
                  }
                };
              }}
              style={{ cursor: "pointer" }}
              pagination={{
                onChange: changePagination,
                total,
                current: page,
                pageSize,
                pageSizeOptions: ["5", "10", "50"],
                showSizeChanger: true,
                onShowSizeChange: changePageSize
              }}
            >
              <Column dataIndex="policyNumber" title="Policy#" />
              <Column
                dataIndex="policyType"
                title="Policy Type"
                render={this.renderPolicyType}
              />
              <Column
                dataIndex="coverAmount"
                title="Policy Amount"
                render={this.renderAmount}
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="premiumAmount"
                title="Premium Amount"
                render={this.renderAmount}
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="frequency"
                title="Premium Frequency"
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="policyStartDate"
                title="Start Date"
                render={this.renderDate}
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="policyEndDate"
                title="End Date"
                render={this.renderDate}
                className={ss.hideMeForMobile}
              />
              <Column
                dataIndex="lastModifiedAt"
                title="Last Modify Date"
                render={this.renderDate}
                className={ss.hideMeForMobile}
              />
              <Column dataIndex="status" title="Status" />
            </Table>
          </Col>
        </Row>
      </div>
    );
  };

  renderPolicyCard = () => {
    return (
      <div
        className={ss.root}
        style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <Row>
          <Col xs={12}>
            <h3
              style={{
                textAlign: "left",
                fontWeight: "bold",
                color: colorMelloonPrimary,
                paddingLeft: "10px"
              }}
            >
              Policy Information
            </h3>
          </Col>
          <Col xs={12} style={{ textAlign: "right", paddingRight: "10px" }}>
            <Button type="primary" onClick={() => this.toggleList()}>
              <DoubleLeftOutlined style={{ paddingRight: "5px" }} />
              Polcies List
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <InsurancePolicyCard />
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    switch (this.state.screenOption) {
      case 1:
        return this.renderList();
      case 2:
        return this.renderPolicyCard();
      default:
        break;
    }
  }
}
