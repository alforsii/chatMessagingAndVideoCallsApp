import styled from "styled-components";
import { LoginEl } from "./LoginElements";

export const SignupEl = {
  ...LoginEl,
  Form: styled(LoginEl.Form)`
    height: 450px;
  `,
};
