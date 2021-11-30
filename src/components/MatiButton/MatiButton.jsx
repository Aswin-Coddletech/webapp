import * as React from "react";

export class MatiButton extends React.Component {
  matiCallback = () => {
    const getMatiButton = document.getElementById("matiButton");

    getMatiButton.addEventListener("mati:exitedSdk", () => {
      this.props.matiExitCallback("matiExited");
    });

    getMatiButton.addEventListener("mati:userFinishedSdk", ({ item }) => {
      this.props.matiFinishedCallback();
    });
  };

  render() {
    const getUserId = this.props.userInfo.userId;
    var metadata = {};
    metadata = {
      userId: getUserId,
      countryId: "MX",
      appVersion: "FINNU STAGING VERSION 0.0.1"
    };
    return (
      <mati-button
        id="matiButton"
        clientid="5e32a89efd44d8001b1a4ae4"
        metadata={JSON.stringify(metadata)}
        onClick={this.matiCallback}
      />
    );
  }
}
