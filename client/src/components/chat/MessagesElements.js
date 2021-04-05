import styled from "styled-components";
import { myColors } from "../../global/colors";
import { boxShadow } from "../../global/styleHelperFunctions";

export const MessagesEl = {
  Container: styled.div`
    /* background-color: ${myColors.primaryColor}; */
    height: 100vh;
  `,
  SubContainer: styled.div`
    padding: 10px;
    scroll-behavior: smooth;
    overflow: scroll;
    height: calc(100vh - 100px);
  `,
  Row: styled.div`
    display: flex;
    justify-content: ${({ type }) =>
      type === "sent" ? "flex-end" : "flex-start"};
    align-items: "center";
  `,
  Time: styled.i`
    transition: 0.5s linear;
    opacity: 0;
    font-size: 12px;
    display: ${({ display }) => display};
    &:hover {
      opacity: 1;
      color: ${myColors.gray};
    }
  `,
  Form: styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${myColors.primaryColor};
    padding: 10px;
  `,
  Input: styled.input`
    /* background-color: ${myColors.primaryColor}; */
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-style: italic;
    padding: 5px;
    padding-left: 20px;
    outline: 0;
    width: 100%;
    border-radius: 30px;
    margin-right: 5px;
    border: 1px solid ${myColors.primaryColor3};
    ::placeholder {
      /* background-color: ${myColors.primaryColor}; */
      color: ${myColors.primaryColor3};
    }
    /* :focus {
      background-color: ${myColors.primaryColor3};
      ${boxShadow};
    } */
  `,
  Label: styled.label`
    cursor: pointer;
  `,
  Button: styled.button`
    /* background-color: ${myColors.primaryColor}; */
    background-color: transparent;
    color: ${myColors.white};
    padding: 5px 34px;
    border: 1px solid ${myColors.primaryColor3};
    border-radius: 30px;
    font-weight: bold;
    margin: 0 5px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${myColors.primaryColor3};
      color: ${myColors.white};
      font-weight: bold;
      ${boxShadow};
    }
  `,
  Text: styled.p`
    margin: 0;
    padding: 0;
    font-size: 14px;
    padding: 5px;
    color: ${myColors.green};
  `,
  Message: styled.p`
    font-size: 14px;
    font-style: italic;
    max-width: 60%;
    cursor: pointer;
    margin: 1px;
    color: ${myColors.silver};
    padding: 3px 15px;
    -moz-border-radius: 30px;
    -webkit-border-radius: 30px;
    border-radius: 30px;
    border-bottom-right-radius: ${({ borderR }) => borderR === "sent" && 0};
    border-bottom-left-radius: ${({ borderR }) => borderR === "received" && 0};
    border: 1px solid;
    border-color: ${({ type }) => myColors.primaryColor3};
    background-color: ${(type) => myColors.primaryColor3};
    &:hover {
      ${boxShadow};
    }
  `,
};
