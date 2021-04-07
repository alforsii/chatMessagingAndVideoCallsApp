import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { ThemeProvider } from "styled-components";

import MyAlertMessage from "./components/MyAlertMessage";
import { AuthContext } from "./context/AuthContext";
import { AppRouter } from "./AppRouter";
import StyledNavbar from "./components/navbar/Navbar";
import { GlobalStyles, GlobalEl } from "./global/styles";
import StyledSidebar from "./components/navbar/Sidebar";
import { data as allThemes } from "./themes.json";
// import { lightOrDark } from "./global/globalHelpers";
// import StyledLoader from "./components/StyledLoader";

const IS_LOGGED_QUERY = gql`
  mutation($token: String!) {
    isLoggedIn(token: $token) {
      token
      userId
    }
  }
`;
const GET_USER_QUERY = gql`
  mutation($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      mode
    }
  }
`;

const initialState = {
  token: "",
  user: null,
  isLoading: false,
  isOpen: false,
  message: "",
  chats: [],
  alertMessage: "",
  alertMessageId: null,
  alertSuccess: false,
  defaultMode: "light",
};

function App() {
  const [IsLoggedIn] = useMutation(IS_LOGGED_QUERY);
  const [GetUser] = useMutation(GET_USER_QUERY);
  const [state, setState] = useState({ ...initialState });

  const updateState = (data) => {
    setState({
      ...state,
      ...data,
    });
  };

  const getUserDetails = async (id, token) => {
    const { data, errors } = await GetUser({
      variables: { id },
    });
    if (!data) return;
    if (errors?.length) {
      return setState({ ...state, message: errors[0].message });
    }

    const mode = data.getUser?.mode || state.defaultMode;

    updateState({
      ...initialState,
      token,
      user: data.getUser,
      defaultMode: mode,
    });
    return data.getUser.id;
  };

  const isLoginValid = async () => {
    try {
      updateState({ isLoading: true });
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await IsLoggedIn({ variables: { token } });

      if (!data || !data.isLoggedIn.token) {
        handleLogout();
        return null;
      }

      const { userId, token: validToken } = data.isLoggedIn;

      getUserDetails(userId, validToken);
    } catch (err) {
      console.log(err);
      handleLogout();
    }
  };

  const handleLogout = () => {
    updateState({ ...initialState });
    localStorage.clear();
  };

  useEffect(() => {
    isLoginValid();
    return () => {};
    // eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider
      value={{
        state: state,
        logout: handleLogout,
        updateState: updateState,
        getUserDetails: getUserDetails,
      }}
    >
      {state.isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <ThemeProvider theme={allThemes[state.defaultMode]}>
          <GlobalStyles />
          <GlobalEl.Container id="main_container">
            <StyledNavbar
              logout={handleLogout}
              state={state}
              updateState={updateState}
            />
            <StyledSidebar isOpen={state.isOpen} updateState={updateState} />

            <MyAlertMessage
              success={state.alertSuccess}
              msg={state.alertMessage}
              msgId={state.alertMessageId}
            />

            <AppRouter state={state} updateState={updateState} />
          </GlobalEl.Container>
        </ThemeProvider>
      )}
    </AuthContext.Provider>
  );
}

export default App;
