import superagent from "superagent";
import jsonwebtoken from "jsonwebtoken";
export default class ApiClient {
  constructor(prefix) {
    console.log("constructing api client");
    if (!prefix) throw new Error("[apiPrefix] required");
    this.prefix = prefix;
    this.token = window.localStorage.getItem("token") || null;
    this.refresh_token = window.localStorage.getItem("refresh_token") || null;
    this.userId = window.localStorage.getItem("userId") || null;
    this.userEmail = window.localStorage.getItem("userEmail") || null;
    this.orgId = window.localStorage.getItem("orgId") || null;
    this.id_token_exp_time_millisec =
      window.localStorage.getItem("id_token_exp_time_millisec") || null;
    this.refresh_token_exp_time_millisec =
      window.localStorage.getItem("refresh_token_exp_time_millisec") || null;

    // TODO: undo below comment if you want to use refresh token to fetch new tokens here

    // this.refresh_token = window.localStorage.getItem('refresh_token') || null;
    // this.auth_time_millisec = window.localStorage.getItem('auth_time_millisec') || null;;

    /* avaoid decode everytime class is loaded
    if (this.token !== null) {
      this.user = jsonwebtoken.decode(this.token);
    } else {
      this.user = null;
    }*/
  }

  setToken(token) {
    this.token = token;
    window.localStorage.setItem("token", token);
  }

  removeToken() {
    this.token = null;
    window.localStorage.removeItem("token");
  }

  setAccessToken(access_token) {
    this.access_token = access_token;
    window.localStorage.setItem("access_token", access_token);
  }

  removeAccessToken() {
    this.access_token = null;
    window.localStorage.removeItem("access_token");
  }

  setRefreshToken(refresh_token) {
    this.refresh_token = refresh_token;
    window.localStorage.setItem("refresh_token", refresh_token);
  }

  removeRefreshToken() {
    this.refresh_token = null;
    window.localStorage.removeItem("refresh_token");
  }

  setUserId(userId) {
    this.userId = userId;
    window.localStorage.setItem("userId", userId);
  }

  removeUserId() {
    this.userId = null;
    window.localStorage.removeItem("userId");
  }

  setUserEmail(userEmail) {
    this.userEmail = userEmail;
    window.localStorage.setItem("userEmail", userEmail);
  }

  removeUserEmail() {
    this.userEmail = null;
    window.localStorage.removeItem("userEmail");
  }

  setOrgId(orgId) {
    this.orgId = orgId;
    window.localStorage.setItem("orgId", orgId);
  }

  removeOrgId() {
    this.orgId = null;
    window.localStorage.removeItem("orgId");
  }

  removeCountry() {
    this.country = null;
    window.localStorage.removeItem("country");
  }

  setAuth_time_millisec(auth_time_millisec) {
    this.auth_time_millisec = auth_time_millisec;
    window.localStorage.setItem("auth_time_millisec", auth_time_millisec);
  }

  removeAuth_time_millisec() {
    this.auth_time_millisec = null;
    window.localStorage.removeItem("auth_time_millisec");
  }

  setId_token_exp_time_millisec(id_token_exp_time_millisec) {
    this.id_token_exp_time_millisec = id_token_exp_time_millisec;
    window.localStorage.setItem(
      "id_token_exp_time_millisec",
      id_token_exp_time_millisec
    );
  }

  removeId_token_exp_time_millisec() {
    this.id_token_exp_time_millisec = null;
    window.localStorage.removeItem("id_token_exp_time_millisec");
  }

  setRefresh_token_exp_time_millisec(refresh_token_exp_time_millisec) {
    this.refresh_token_exp_time_millisec = refresh_token_exp_time_millisec;
    window.localStorage.setItem(
      "refresh_token_exp_time_millisec",
      refresh_token_exp_time_millisec
    );
  }

  removeRefresh_token_exp_time_millisec() {
    this.refresh_token_exp_time_millisec = null;
    window.localStorage.removeItem("refresh_token_exp_time_millisec");
  }

  get(url, params = {}) {
    return this._request({ url, method: "get", params });
  }

  post(url, body) {
    return this._request({ url, method: "post", body });
  }

  patch(url, body) {
    return this._request({ url, method: "patch", body });
  }

  put(url, body) {
    return this._request({ url, method: "put", body });
  }

  delete(url, body) {
    return this._request({ url, method: "delete", body });
  }

  _request({ url, method, params, body }) {
    // Before making a call, check if token is expired
    // If token is expired, and refresh token is valid, fetch new tokens

    const current_time_millisec = new Date().getTime();

    // if (
    //   typeof this.token === "undefined" ||
    //   this.token === "undefined" ||
    //   this.token === null ||
    //   typeof this.userId === "undefined" ||
    //   this.userId === "undefined" ||
    //   this.userId === null ||
    //   typeof this.orgId === "undefined" ||
    //   this.orgId === "undefined" ||
    //   this.orgId === null ||
    //   typeof this.id_token_exp_time_millisec === "undefined" ||
    //   this.id_token_exp_time_millisec === "undefined" ||
    //   this.id_token_exp_time_millisec === null ||
    //   typeof this.refresh_token_exp_time_millisec === "undefined" ||
    //   this.refresh_token_exp_time_millisec === "undefined" ||
    //   this.refresh_token_exp_time_millisec === null
    // ) {
    //   if (process.env.NODE_ENV === "production") {
    //     throw new Error(
    //       "Missing Token Data. Unknown Identity. Login Required."
    //     );
    //   } else {
    //     //
    //   }
    // }

    //can't do this check here as redux and local storage is not in sync
    console.log(
      "token expiry, refresh-token expiry and current time",
      this.id_token_exp_time_millisec,
      this.refresh_token_exp_time_millisec,
      current_time_millisec
    );

    if (
      this.id_token_exp_time_millisec != null &&
      this.refresh_token_exp_time_millisec != null
    ) {
      if (this.id_token_exp_time_millisec <= current_time_millisec) {
        if (this.refresh_token_exp_time_millisec > current_time_millisec) {
          // need to fetch new tokens
          // but for now, we will throw error; for now, we are fetching new tokens only on page-load
          throw new Error("Token Issue. Refresh the Page to Fetch New Tokens.");
        } else {
          throw new Error(
            "Token & Refresh Token Both Expired. Login Required."
          );
        }
      }
    }

    // const req = superagent[method](
    //   process.env.REACT_APP_API_PREFIX + "/" + this.country + url
    // );

    let env_path = process.env.REACT_APP_API_PREFIX + "/" + this.country + url
    console.log(url[0], url[0]==='c')
    if (url[0] === 'c' | url[0]==='s' | url[0]==='p' | url[0]==='o'){
      env_path="http://localhost:8000/"+ url
    }

    console.log('**URL path =',env_path)

    this.country =
      window.localStorage.getItem("country") ||
      process.env.REACT_APP_DEFAULT_COUNTRY;

    const req = superagent[method](
     env_path
    );

    if (params) req.query(params);
    if (body) req.send(body);
    if (this.token) req.set("Authorization", `Bearer ${this.token}`);
    if (this.userId) req.set("User-Id", `${this.userId}`);
    if (this.orgId) req.set("Org-Id", `${this.orgId || "na"}`);
    req.set("Country-Id", this.country);
    //req.set("Country-Id", "MX");
    req.set("Device-Id", "Browser");
    req.set("App-Version", "BACKOFFICE STAGING 0.0.1");
    req.set("X-Api-Key", process.env.REACT_APP_API_KEY);
    // eslint-disable-next-line no-console
    console.log("@@@@@--request object : ", req);

    return req.then((res) => {
      // eslint-disable-next-line no-console
      console.log("response object", res);
      //if (!res.body.status) throw res.body.error;
      // NOTE: The error object inside the body which is returned by
      //       backend api should have error.code and error.message
      //       the code and the message is displayed by notify component sagas.ts
      //       sample: throw { code: 'test err code', message: 'test err message' };

      if (res.body.error) throw res.body.error;

      // return res.body.data;
      // NOTE: The api should return result in res.body.data or res.body
      //       res.body.total, res.body.pageSize etc. is used for pagination
      //       when result is paginated, backend should send the pagination field values
      // eslint-disable-next-line no-throw-literal

      if (res.body.data) {
        return res.body.data;
      } else {
        return res.body;
      }
    });
    /*
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('error on call to api: throwing api error', err);
      throw new Error(err);
    });*/
  }

  getNewTokens() {
    console.log(
      "in api getNewTokens fetching new tokens using the refresh token"
    );
      
    const binArrayToJson = function(binArray) {
      let str = "";
      for (let i = 0; i < binArray.length; i++) {
        str += String.fromCharCode(parseInt(binArray[i]));
      }
      return JSON.parse(str);
    };
    
    console.log(
      "refreshToken from local storage ",
      window.localStorage.getItem("refresh_token") ? "value notnull" : null
    );

    const my_refresh_token = window.localStorage.getItem("refresh_token");

    const mybodyParams = {
      ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: my_refresh_token,
        //SECRET_HASH: "your_secret", // In case you have configured client secret
        // eslint-disable-next-line comma-dangle
      },
    };

    const newreq = superagent.post(
      //"https://cognito-idp.us-west-2.amazonaws.com/"
      "https://cognito-idp.eu-central-1.amazonaws.com/"
    );
    newreq.send(JSON.stringify(mybodyParams));
    newreq.set(
      "X-Amz-Target",
      "AWSCognitoIdentityProviderService.InitiateAuth"
    );
    newreq.set("Content-Type", "application/x-amz-json-1.1");

    console.log("request object", newreq);

    // NOTE: The return is MUST; else you will get a weird type-error from HomePage actions
    return newreq
      .then((res) => {
        console.log("successfully back from cognito");
        console.log("response object is below");
        console.log(res);

        // the result should come in res.body
        // res.body is a binaryArray that needs conversion to JSON
        // NOTE:
        // for some reason, in cloud, the result is coming back in res.text
        // res.text is string that needs to be parsed into JSON

        let result;
        if (typeof res.body === "undefined" || res.body === null) {
          const resultText = res.text;
          result = JSON.parse(resultText);
        } else {
          result = binArrayToJson(res.body);
        }

        const cognitoData = {};
        //let twenty9_days_in_millisec = 29*24*60*60*1000;
        const idTokenDecoded = jsonwebtoken.decode(
          result.AuthenticationResult.IdToken
        );
        const accessTokenDecoded = jsonwebtoken.decode(
          result.AuthenticationResult.AccessToken
        );

        cognitoData["id_token"] = result.AuthenticationResult.IdToken;
        cognitoData["access_token"] = result.AuthenticationResult.AccessToken;
        cognitoData["expires_in"] = result.AuthenticationResult.ExpiresIn;
        cognitoData["token_type"] = result.AuthenticationResult.TokenType;
        cognitoData["userEmail"] = idTokenDecoded["email"];
        //cognitoData['auth_time_millisec'] = idTokenDecoded['auth_time'] * 1000;
        cognitoData["id_token_exp_time_millisec"] =
          idTokenDecoded["exp"] * 1000;
        cognitoData["access_token_exp_time_millisec"] =
          accessTokenDecoded["exp"] * 1000;
        //cognitoData['refresh_token_exp_time_millisec'] = cognitoData['auth_time_millisec'] + twenty9_days_in_millisec;

        // we will not use auth_time_millisec, refresh_token_exp_time_millisec
        // those two fields will remain same as LOGIN time values
        // also note that at LOGIN, we get refresh token; here we don't have it

        //update localstorage before returning
        this.setToken(result.AuthenticationResult.IdToken);
        this.setAccessToken(result.AuthenticationResult.AccessToken);
        this.setId_token_exp_time_millisec(idTokenDecoded["exp"] * 1000);
        console.log(
          "final cognitoData after refreshing tokens",
          cognitoData ? " value notnull" : null
        );
        return cognitoData;
      })
      .catch((e) => {
        console.log(
          "api getNewTokens - error in fetching new tokens using refresh token",
          e
        );
        throw new Error(e);
      });
  }

  getImageLabels(base64imageUrl) {
    const newreq = superagent.post(
      "https://4ip88h5723.execute-api.eu-west-1.amazonaws.com/prod/detectimage"
    );
    newreq.send(base64imageUrl);
    newreq.set("X-API-Key", "foobar");
    newreq.set("accept", "json");

    //console.log('getImageLabels newreq', newreq);

    return newreq
      .then((res) => {
        console.log("back from superagent imagedetect");
        //console.log('back from superagent. res', res);
        return res.body.detectedLabels;
      })
      .catch((e) => {
        //console.log('api getImageLabels - error in fetching labels', e);
        throw new Error(e);
      });
  }
}
