import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "antd";
import DiList from "src/components/DiList";
import { IInventory } from "src/interfaces/Inventory.interface";

export interface IDiListPageData {}
export interface IDiListPageCallbacks {
  onInit(): any;
  changeSelectedItem(item: IInventory): any;
}
export interface IDiListPageProps
  extends IDiListPageData,
    IDiListPageCallbacks,
    RouteComponentProps {}

export class DiListPage extends React.Component<IDiListPageProps> {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    return (
      <Row justify="center" align="top" style={{ width: "100%" }}>
        <Col xs={24} style={{ textAlign: "center" }}>
          <DiList changeSelectedItem={this.props.changeSelectedItem} />
        </Col>
      </Row>
    );
  }
}
