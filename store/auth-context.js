import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  id: "",
  username: "",
  email: "",
  token: "",
  isAuthenticated: false,
  authenticate: (token, id, username, email) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [username, setUsername] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();

  function authenticate(token, id, username, email) {
    setAuthToken(token);
    setUsername(username);
    setId(id);
    setEmail(email);
    AsyncStorage.setItem("id", id);
    AsyncStorage.setItem("username", username);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    setUsername(null);
    setId(null);
    setEmail(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("username");
    AsyncStorage.removeItem("email");
  }

  const value = {
    id: id,
    username: username,
    email: email,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
