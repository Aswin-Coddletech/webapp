import React from "react";
import { Timeline } from "antd";
import { colorMelloonPrimary } from "../../constants/colors";

export interface IRewardsListData {}

export interface IRewardsListHocData {
  rewardsList: any[];
}

export interface IRewardsListCallbacks {}

export interface IRewardsListHocCallbacks {
  onInit(): any;
}

export interface ILocalState {
  screenOption: number;
}

export interface IRewardsListProps
  extends IRewardsListData,
    IRewardsListHocData,
    IRewardsListHocCallbacks,
    IRewardsListCallbacks {}

export class RewardsList extends React.Component<
  IRewardsListProps,
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
          Rewards
        </h2>
        <Timeline>
          {this.props.rewardsList.map((item, i) => (
            <Timeline.Item key={i}>{item.name}</Timeline.Item>
          ))}
        </Timeline>
      </>
    );
  }
}
