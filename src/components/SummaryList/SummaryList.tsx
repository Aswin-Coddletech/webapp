import React from "react";
import { Typography } from "antd";
import { colorMelloonPrimary } from "../../constants/colors";

const { Text } = Typography;
export interface ISummaryListData {}

export interface ISummaryListHocData {
  rewardsList: any[];
}

export interface ISummaryListCallbacks {}

export interface ISummaryListHocCallbacks {
  onInit(): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface ISummaryListProps
  extends ISummaryListData,
    ISummaryListHocData,
    ISummaryListHocCallbacks,
    ISummaryListCallbacks {}

export class SummaryList extends React.Component<
  ISummaryListProps,
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
          Summary
        </h2>
        <Text>Summary Update Soon</Text>
      </>
    );
  }
}
