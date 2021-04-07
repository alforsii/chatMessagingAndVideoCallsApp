import styled, { createGlobalStyle } from "styled-components";
import { boxShadow } from "./styleHelperFunctions";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
  margin: 0;
  padding: 0;
 font-family: ${({ theme }) => theme.font}, sans-serif;
 .display_none {
     display:none;
 }
}
`;

export const GlobalEl = {
  Container: styled.div`
    background-color: ${({ theme }) => theme.colors.body.primary};
    height: 100vh;
    overflow: hidden;
  `,
  Button: styled.button`
    background-color: ${({ theme }) => theme.colors.button.bg};
    color: ${({ theme }) => theme.colors.button.text};
    padding: 5px 34px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin: 2px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${({ theme }) => theme.colors.button.hover.bg};
      color: ${({ theme }) => theme.colors.button.hover.text};
      font-weight: bold;
      ${boxShadow};
    }
  `,
  Text: styled.p`
    margin: 0;
    padding: 0;
    font-weight: 100;
    color: ${({ theme }) => theme.colors.text};
    ${boxShadow};
  `,
};
