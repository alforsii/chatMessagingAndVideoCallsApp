import styled, { createGlobalStyle } from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { myColors } from "./colors";
import { getStyles, boxShadow } from "./styleHelperFunctions";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
  margin: 0;
  padding: 0;
 font-family: 'Roboto', sans-serif;
 .display_none {
     display:none;
 }
}
`;

export const GlobalEl = {
  Container: styled.div`
    background-color: ${myColors.primaryColor};
    height: 100vh;
    overflow: hidden;
  `,
  Button: styled.button`
    background-color: ${myColors.silver};
    color: ${myColors.primaryColor};
    padding: 5px 34px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin: 2px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${myColors.green};
      color: ${myColors.white};
      font-weight: bold;
      ${boxShadow};
    }
  `,
  Text: styled.p`
    margin: 0;
    padding: 0;
    font-weight: 100;
    color: ${myColors.gray};
    ${boxShadow};
  `,
};
