import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuth = () => {
  const clientId =
    "1051985378257-tt7u9vuoltfdnd2tf5tct1c7p6cmc02m.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
