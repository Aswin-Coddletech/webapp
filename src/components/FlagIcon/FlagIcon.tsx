import cn from "classnames";
import * as React from "react";

import ss from "./FlagIcon.module.scss";

const basePath =
  "https://raw.githubusercontent.com/wiredmax/react-flags/master/vendor/flags/flags-iso/shiny/16/";

export interface IFlagIconData {
  code: string;
  className?: string;
}

export interface IFlagIconCallbacks {
  onClick?: (...args: any[]) => any;
}

export interface IFlagIconProps extends IFlagIconData, IFlagIconCallbacks {}

export class FlagIcon extends React.Component<IFlagIconProps> {
  render() {
    const { code, className, onClick } = this.props;
    const src = `${basePath}${code}.png`;

    return (
      <img src={src} onClick={onClick} className={cn(className, ss.FlagIcon)} />
    );
  }
}
