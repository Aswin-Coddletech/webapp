import React from "react";
import StripeCheckout from "react-stripe-checkout";
import superagent from "superagent";
import { Button } from "antd";
import { colorMelloonPrimary } from "src/constants/colors";

//import logo from 'src/assets/images/logo.png';
//import ss from './StripeButton.module.scss';

const fromEuroToCent = amount => amount * 100;

export interface IStripeButtonData {
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
}

export interface IStripeButtonHocData {
  userId: string;
  orgId: string;
  apitoken: string;

  orderId: string;
  orderNumber: string;
  orderReference: {};

  txnType: string;
  paymentDescription: string;
  userEmail: string;
  amount: number;
  ccy: number;

  buttonDisabled: boolean;
  buttonLabel: string;
}

export interface IStripeButtonHocCallback {
  paymentSuccess(): void;
  paymentFailure(): void;
  paymentToken(): void;
}

export interface IStripeButtonCallbacks {}

export interface ILocalState {}

export const StripeButton = ({
  IStripeButtonHocCallback,
  IStripeButtonHocData
}) => {
  const publishableKey = "pk_test_fJvr8faueX6zkYzaEVCKEktQ00mWhLxPEv";

  const onToken = token => {
    IStripeButtonHocCallback.paymentToken();

    const body = {
      paymentType: "stripe",
      stripeParams: { token: token },
      amount: IStripeButtonHocData.amount,
      ccy: "EUR",
      txnType: IStripeButtonHocData.txnType,
      orderId: IStripeButtonHocData.orderId,
      orderNumber: IStripeButtonHocData.orderNumber,
      orderReference: IStripeButtonHocData.orderReference
    };

    const apptoken = window.localStorage.getItem("token") || null;
    const userId = window.localStorage.getItem("userId") || null;
    const orgId = window.localStorage.getItem("orgId") || null;

    const apiurl =
      process.env.NODE_ENV === "production"
        ? "https://krapjoldfd.execute-api.eu-central-1.amazonaws.com/prod/payments/newpolicy"
        : "http://localhost:3004/payments";

    const req = superagent.post(apiurl);
    req.send(body);
    req.set("Authorization", `Bearer ${apptoken}`);
    req.set("User-Id", `${userId}`);
    req.set("Org-Id", `${orgId || "na"}`);

    req
      .then(response => {
        IStripeButtonHocCallback.paymentSuccess();
        //alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        IStripeButtonHocCallback.paymentFailure();
        //alert("Payment Error");
      });
  };

  return (
    <StripeCheckout
      label="Process Payment" //Component button text
      name="Melloon Gmbh" //Modal Header
      description="Your Personal Belongings Manager"
      panelLabel="Pay" //Submit button in modal
      amount={fromEuroToCent(IStripeButtonHocData.amount)} //Amount in cents $9.99
      currency={"EUR"}
      email={IStripeButtonHocData.userEmail}
      token={onToken}
      stripeKey={publishableKey}
      image="https://melloon-public-images.s3.eu-central-1.amazonaws.com/logo.png" //Pop-in header image
      allowRememberMe={false}
      billingAddress={false}
      ComponentClass="div"
    >
      <Button
        type="primary"
        disabled={IStripeButtonHocData.buttonDisabled}
        style={{ backgroundColor: colorMelloonPrimary }}
      >
        {IStripeButtonHocData.buttonLabel}
      </Button>
    </StripeCheckout>
  );
};
