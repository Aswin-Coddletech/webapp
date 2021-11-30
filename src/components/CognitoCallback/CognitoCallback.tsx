import * as React from "react";

import { queryStringToObject } from "src/helpers/routeParams";

import superagent from "superagent";
import jsonwebtoken from "jsonwebtoken";
import { me } from "src/constants/localprofile";

export interface ICognitoCallbackCallbacks {
  caughtLoginCallback: any;
}

export class CognitoCallback extends React.Component<
  ICognitoCallbackCallbacks
> {
  componentDidMount() {
    /* commenting previous version
    this.props.caughtLoginCallback(
      queryStringToObject(window.location.hash.replace('#', '')),
    );
    */

    console.log("getting window.location");
    let str: string = window.location.search.substring(1);

    console.log("window location", str);
    let querystr = str.substr(str.search("\\?") + 1);

    let retObj = queryStringToObject(querystr);
    console.log("query params", retObj);

    let cognitoCode = retObj["code"];

    let bodyParams = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_COGNITO_CALLBACK_URL,
      code: cognitoCode
    };

    let req = superagent.post(process.env.REACT_APP_COGNITO_OAUTH2_TOKEN_URL);
    req.send(bodyParams);
    req.type("form");

    //NOTE: above form type is very important
    console.log("request obj", req);

    req
      .then(res => {
        console.log("results from cognito refresh token call", res);

        // cognitoData will now have id_token, access_token, refresh_token, expires_in, token_type

        let cognitoData = res.body;
        let twenty9_days_in_millisec = 29 * 24 * 60 * 60 * 1000;
        let accessTokenDecoded: any = jsonwebtoken.decode(
          cognitoData["access_token"]
        );
        //let idTokenDecoded = jsonwebtoken.decode(cognitoData['id_token']);

        cognitoData["user"] = jsonwebtoken.decode(cognitoData["id_token"]);
        cognitoData["userId"] = cognitoData["user"]["sub"];
        cognitoData["userEmail"] = cognitoData["user"]["email"];
        cognitoData["orgId"] =
          typeof cognitoData["user"]["orgId"] === "undefined"
            ? "na"
            : cognitoData["user"]["orgId"];

        cognitoData["auth_time_millisec"] =
          cognitoData["user"]["auth_time"] * 1000;
        cognitoData["id_token_exp_time_millisec"] =
          cognitoData["user"]["exp"] * 1000;
        cognitoData["access_token_exp_time_millisec"] =
          accessTokenDecoded["exp"] * 1000;
        cognitoData["refresh_token_exp_time_millisec"] =
          cognitoData["auth_time_millisec"] + twenty9_days_in_millisec;

        console.log("final cognitoData at logincallback", cognitoData);

        this.props.caughtLoginCallback(cognitoData);
      })
      .catch(e => {
        console.log("error from cognito refresh token call", e);
        console.log(
          "checking local environ and setting a token for same; else raise error"
        );
        if (process.env.NODE_ENV === "production") {
          throw new Error("Error in fetching cognito refresh token" + e);
        } else {
          let localData = me;
          this.props.caughtLoginCallback(localData);
        }
      });
  }

  render() {
    return <div></div>;
  }
}
