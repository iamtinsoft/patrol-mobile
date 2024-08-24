import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import JWT from 'expo-jwt';
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
    console.log(user);
  };

  const getUser = (authToken) => {
    let user = jwtDecode(authToken);
    return user;
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut, getUser };
};
