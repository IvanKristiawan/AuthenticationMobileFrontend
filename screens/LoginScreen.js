import axios from "axios";
import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      try {
        const token = await axios.post(
          `https://authentication-web-mobile.herokuapp.com/auth/login`,
          {
            email: email,
            password: password,
          }
        );
        authCtx.authenticate(
          token.data.details.token,
          token.data.details._id,
          token.data.details.username,
          token.data.details.email
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
