import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { LoginEl } from "./LoginElements";

const LOGIN_QUERY = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const LoginForm = (props) => {
  const [Login] = useMutation(LOGIN_QUERY);
  const [errMessage, setErrMessage] = useState(null);
  const emailEl = React.createRef();
  const passwordEl = React.createRef();

  useEffect(() => {
    return () => {
      console.log("LOGIN CLEARED");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Consumer>
      {(context) => {
        const handleLoginSubmit = async (e) => {
          e.preventDefault();
          const email = emailEl.current.value;
          const password = passwordEl.current.value;

          if (email.trim().length === 0 || password.trim().length === 0) {
            setErrMessage("Please enter email and password!");
            return;
          }
          try {
            const { data } = await Login({ variables: { email, password } });

            if (!data?.login?.token) {
              return null;
            }
            const { userId, token } = data.login;
            console.log(data);

            context.getUserDetails(userId, token);
            // context.updateState({ token: data.login?.token });
            localStorage.setItem("token", JSON.stringify(data.login?.token));
            props.history.push("/chat");
          } catch (err) {
            return setErrMessage(err.message);
          }
        };

        return (
          <LoginEl.Container>
            <LoginEl.Form onSubmit={handleLoginSubmit}>
              <LoginEl.Text code={"error"}>
                {errMessage && errMessage}
              </LoginEl.Text>
              <LoginEl.Header className="primary_color">Login</LoginEl.Header>
              <LoginEl.Control>
                <LoginEl.Label htmlFor="login_email">Email</LoginEl.Label>
                <LoginEl.Input
                  id="login_email"
                  type="email"
                  placeholder="Email"
                  ref={emailEl}
                  required
                />
              </LoginEl.Control>
              <LoginEl.Control>
                <LoginEl.Label htmlFor="login_password">Password</LoginEl.Label>
                <LoginEl.Input
                  id="login_password"
                  type="password"
                  placeholder="Password"
                  ref={passwordEl}
                  required
                />
              </LoginEl.Control>
              <LoginEl.Control>
                <LoginEl.Row>
                  <LoginEl.Check type="checkbox" />
                  <LoginEl.Text>Remember me</LoginEl.Text>
                </LoginEl.Row>
              </LoginEl.Control>
              <LoginEl.Control>
                <LoginEl.Button type="submit">Login</LoginEl.Button>
              </LoginEl.Control>
              <LoginEl.Link to="/signup">Signup</LoginEl.Link>
            </LoginEl.Form>
          </LoginEl.Container>
        );
      }}
    </AuthContext.Consumer>
  );
};
