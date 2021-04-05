import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Spinner } from "react-bootstrap";

import MyAlertMessage from "./components/MyAlertMessage";
import { AuthContext } from "./context/AuthContext";
import { AppRouter } from "./AppRouter";
import StyledNavbar from "./components/navbar/Navbar";
import { GlobalStyles, GlobalEl } from "./global/styles";
import StyledSidebar from "./components/navbar/Sidebar";
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
    }
  }
`;

function App() {
  const [IsLoggedIn] = useMutation(IS_LOGGED_QUERY);
  const [GetUser] = useMutation(GET_USER_QUERY);

  const [state, setState] = useState({
    token: "",
    user: null,
    isLoading: false,
    isOpen: false,
    message: "",
    chats: [],
    alertMessage: "",
    alertMessageId: null,
    alertSuccess: false,
    // showAlert: false,
  });

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

    updateState({
      token,
      isLoading: false,
      user: data.getUser,
      message: "",
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

      await getUserDetails(userId, validToken);
    } catch (err) {
      console.log(err);
      handleLogout();
    }
  };

  const handleLogout = () => {
    updateState({ token: null, isLoading: false, user: null });
    localStorage.clear();
  };

  useEffect(() => {
    isLoginValid();
    // handleGlobalClick();
    return () => {};
    // eslint-disable-next-line
  }, []);

  // const handleGlobalClick = (e) => {
  //   document.getElementById("main_container").addEventListener("click", (e) => {
  //     console.log(e.currentTarget.getAttribute("id"));
  //     if (
  //       document.getElementById("myTooltip123") &&
  //       e.currentTarget.getAttribute("id") !== "myTooltip123"
  //     ) {
  //       document.getElementById("myTooltip123").remove();
  //     }
  //   });
  // };

  return (
    <AuthContext.Provider
      value={{
        state: state,
        logout: handleLogout,
        updateState: updateState,
        getUserDetails: getUserDetails,
      }}
    >
      <GlobalStyles />
      <GlobalEl.Container id="main_container">
        <StyledNavbar
          token={state.token}
          logout={handleLogout}
          username={state.user?.email}
          updateState={() => updateState({ isOpen: !state.isOpen })}
        />
        <StyledSidebar isOpen={state.isOpen} updateState={updateState} />

        <MyAlertMessage
          success={state.alertSuccess}
          msg={state.alertMessage}
          msgId={state.alertMessageId}
        />
        {/* <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> */}
        <AppRouter state={state} updateState={updateState} />
      </GlobalEl.Container>
    </AuthContext.Provider>
  );
}

export default App;
