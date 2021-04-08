import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SignupEl } from "./SignupElements";

const SIGNUP_MUTATION = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      data: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      id
      email
    }
  }
`;

export const Signup = (props) => {
  const [state, setState] = useState({
    message: "",
    emailEl: React.createRef(),
    passwordEl: React.createRef(),
    firstNameEl: React.createRef(),
    lastNameEl: React.createRef(),
  });
  // 1. One way of setting contextType for the class component

  const [Signup] = useMutation(SIGNUP_MUTATION);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const email = state.emailEl.current.value;
    const password = state.passwordEl.current.value;
    const firstName = state.firstNameEl.current.value;
    const lastName = state.lastNameEl.current.value;
    // console.log(email, password);

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0
    ) {
      return setState((prevState) => ({
        ...prevState,
        message: "All fields are mandatory!",
      }));
    }
    const newUser = { email, password, firstName, lastName };
    try {
      const { data, errors } = await Signup({ variables: newUser });
      if (!data) return null;
      if (errors?.length)
        return setState({ ...state, message: errors[0].message });
      props.updateState({ message: "Signup successful! Please login now." });
      props.history.push("/");
    } catch (err) {
      console.log("🚀 err", err);
      return setState({ ...state, message: err.message });
    }
  };

  return (
    <SignupEl.Container>
      <SignupEl.Form onSubmit={handleSignupSubmit}>
        <SignupEl.Text code={"error"}>
          {state.message && state.message}
        </SignupEl.Text>
        <SignupEl.Header>Signup</SignupEl.Header>
        <SignupEl.Control>
          <SignupEl.Label htmlFor="signup_email">Email</SignupEl.Label>
          <SignupEl.Input
            id="signup_email"
            type="email"
            placeholder="Email"
            ref={state.emailEl}
            required
          />
        </SignupEl.Control>
        <SignupEl.Control>
          <SignupEl.Label htmlFor="signup_password">Password</SignupEl.Label>
          <SignupEl.Input
            id="signup_password"
            type="password"
            placeholder="Password"
            ref={state.passwordEl}
            required
          />
        </SignupEl.Control>
        <SignupEl.Control>
          <SignupEl.Label htmlFor="signup_firstName">First name</SignupEl.Label>
          <SignupEl.Input
            id="signup_firstName"
            type="text"
            placeholder="First name"
            ref={state.firstNameEl}
            required
          />
        </SignupEl.Control>
        <SignupEl.Control>
          <SignupEl.Label htmlFor="signup_lastName">Last name</SignupEl.Label>
          <SignupEl.Input
            id="signup_lastName"
            type="text"
            placeholder="Last name"
            ref={state.lastNameEl}
            required
          />
        </SignupEl.Control>
        <SignupEl.Control>
          <SignupEl.Button type="submit">Signup</SignupEl.Button>
        </SignupEl.Control>
        <SignupEl.Link to="/">Login</SignupEl.Link>
      </SignupEl.Form>
    </SignupEl.Container>
  );
};
