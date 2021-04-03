import styled, { createGlobalStyle } from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { myColors } from "./colors";
import { getStyles, boxShadow } from "./styleHelperFunctions";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
*{
    box-sizing: border-box;
  margin: 0;
  padding: 0;
 font-family: 'Roboto', sans-serif;
}
`;

export const GlobalEl = {
  Container: styled.div`
    background-color: ${myColors.white};
    height: 100vh;
    ${getStyles};
  `,
  Button: styled.button`
    background-color: ${myColors.silver} ${getStyles};
    color: ${myColors.primaryColor};
    padding: 5px 34px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin: 2px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${myColors.green} ${getStyles};
      color: ${myColors.white};
      font-weight: bold;
      ${boxShadow}
    }
    ${getStyles}
  `,
};
