import React from "react";
import { Table } from "antd";
//import { colorMelloonPrimary } from "../../constants/colors";
import { ILoan } from "src/interfaces/Loans.interface";
import ss from "./TableList.module.scss";

export interface ITableListData {}

export interface ITableListHocData {
  list: any[];
  loading: boolean;
  columns: any[];
  rowKey: any;
  currentPage: number;
}

export interface ITableListCallbacks {}

export interface ITableListHocCallbacks {
  onSelectedValues(data: any): any;
  onPageChange(page: number): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ITableListProps
  extends ITableListData,
    ITableListCallbacks,
    ITableListHocData,
    ITableListHocCallbacks {}

export class TableList extends React.Component<ITableListProps, ILocalState> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {}

  toggleLoanCard = (item: ILoan) => {
    this.props.onSelectedValues(item);
  };

  getColumnSearchProps = () => {};

  render() {
    const { columns, loading, list, rowKey } = this.props;
    let pages = 0;
    if (list.length > 0) {
      pages = this.props.currentPage;
    }
    return (
      <>
        <Table
          columns={columns}
          loading={loading}
          dataSource={list}
          rowKey={rowKey}
          pagination={{
            current: pages,
            onChange: (page, pageSize) => {
              this.props.onPageChange(page);
            }
          }}
          locale={{ emptyText: "No Items Available" }}
          bordered={true}
          size="small"
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                this.toggleLoanCard(record);
              }
            };
          }}
          className={ss.tableStyling}
        ></Table>
      </>
    );
  }
}
