import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import ss from "./DataSciencePage.module.scss";

export interface IDataSciencePageData {}
export interface IDataSciencePageCallbacks {}
export interface IDataSciencePageProps
  extends IDataSciencePageData,
    IDataSciencePageCallbacks,
    RouteComponentProps {}
export class DataSciencePage extends React.Component<IDataSciencePageProps> {
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {}

  render() {
    //let current_time = new Date().getTime();

    return (
      <div className={ss.root}>
        <Row justify="center" align="middle">
          <Col>
            <h4>Data Science Section</h4>
          </Col>
        </Row>
        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <Col xs={24} style={{ textAlign: "left", justifyContent: "left" }}>
            <a
              href="https://ds.staging.backoffice.finnu.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              All-Device-Statistics
            </a>
            <br />
            <a href="/">Enrolled-Device-Statistics</a> <br />
            <a href="/">Locked-Device-Statistics</a> <br />
            <a href="/">Enrolled-Locked-Device-Statistics</a> <br />
            <a href="/">Loan-Statistics</a>
          </Col>
        </Row>
      </div>
    );
  }
}
