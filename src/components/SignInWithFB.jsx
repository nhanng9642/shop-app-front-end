/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";

const appId = import.meta.env.VITE_FACEBOOK_APP_ID;

export const SingInWithFB = ({onSuccess }) => {
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = () => {
      window.FB.init({
        appId, 
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        console.log(response);
        if (response.status === "connected") {
          const { accessToken } = response.authResponse;
          if (onSuccess) onSuccess(accessToken); // Pass the accessToken to the parent component
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile" } // Specify permissions
    );
  };

return (
    <Button onClick={handleFacebookLogin} 
            className="bg-blue-600 text-white py-2 px-4 text-sm
                        rounded-md text-lg hover:bg-blue-700">
        Login with Facebook
    </Button>
);
};