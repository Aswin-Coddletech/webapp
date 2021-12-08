import React from "react";
import { Timeline } from "antd";
import { colorMelloonPrimary } from "../../constants/colors";

export interface ILoanHomeListData {}

export interface ILoanHomeListHocData {
  loansList: any[];
}

export interface ILoanHomeListCallbacks {}

export interface ILoanHomeListHocCallbacks {
  onInit(): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ILoanHomeListProps
  extends ILoanHomeListData,
    ILoanHomeListHocData,
    ILoanHomeListHocCallbacks,
    ILoanHomeListCallbacks {}

export class LoanHomeList extends React.Component<
  ILoanHomeListProps,
  ILocalState
> {
  constructor(props) {
    super(props);
    this.state = {
      screenOption: 1
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <h2
          style={{
            color: colorMelloonPrimary
          }}
        >
          Loans
        </h2>
        <Timeline>
          {this.props.loansList.map((item, i) => (
            <Timeline.Item key={i}>{item.name}</Timeline.Item>
          ))}
        </Timeline>
      </>
    );
  }
}
