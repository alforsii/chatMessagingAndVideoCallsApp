import styled from "styled-components";
import { boxShadow, breakWords } from "../../global/styleHelperFunctions";
import { navbarHeight } from "./UserChatsElements";

export const MessagesEl = {
  Container: styled.div`
    /* height: 85vh; */
    height: 100%;
    min-width: 300px;
    position: relative;
    /* margin: 20px; */
    /* ${boxShadow} */
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.body.secondary};
  `,
  SubContainer: styled.div`
    scroll-behavior: smooth;
    /* background-color: ${({ theme }) => theme.colors.body.secondary}; */
    overflow: scroll;
    /* padding: 50px 0 10px; */
    /* height: 85vh; */
    height: calc(85vh - ${navbarHeight});
    /* background-color: ${({ theme }) => theme.colors.body.primary}; */
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  Row: styled.div`
    display: flex;
    justify-content: ${({ type }) =>
      type === "sent" ? "flex-end" : "flex-start"};
    align-items: "center";
    /* word-wrap: break-word;
    word-break: break-all; */
  `,
  // Form: styled.form`
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   /* border-top: 1px solid ${({ theme }) => theme.colors.body.primary}; */
  //   background-color: ${({ theme }) => theme.colors.body.primary};
  //   /* margin-top: 1px; */
  //   /* padding: 7px; */
  //   /* border-radius: 0 0 8px 8px; */
  //   /* ${boxShadow} */
  // `,
  // Input: styled.input`
  //   background-color: ${({ theme }) => theme.colors.body.primary};
  //   border: none;
  //   font-size: 14px;
  //   font-style: italic;
  //   padding: 7px;
  //   padding-left: 20px;
  //   outline: 0;
  //   width: 100%;
  //   border-radius: 5px;
  //   /* margin-right: 2px; */
  //   ${breakWords}
  //   border: 1px solid ${({ theme }) => theme.colors.body.primary};
  //   border-top-right-radius: 0;
  //   border-bottom-right-radius: 0;
  //   ::placeholder {
  //     color: ${({ theme }) => theme.colors.text};
  //     opacity: 0.4;
  //   }
  //   :focus {
  //     color: ${({ theme }) => theme.colors.text};
  //     border: 1px solid ${({ theme }) => theme.colors.primary};
  //   }
  // `,
  // Label: styled.label`
  //   cursor: pointer;
  // `,
  // Button: styled.button`
  //   padding: 5px 34px;
  //   border-radius: 3px;
  //   transition: ease-in-out 0.3s all;
  //   border: none;
  //   color: ${({ theme }) => theme.colors.primary};
  //   background-color: ${({ theme }) => theme.colors.body.primary};
  //   border: 1px solid ${({ theme }) => theme.colors.primary};
  //   font-weight: bold;
  //   border-top-left-radius: 0;
  //   border-bottom-left-radius: 0;
  //   &:hover {
  //     ${boxShadow};
  //     color: ${({ theme }) => "#fff"};
  //     background-color: ${({ theme }) => theme.colors.primary};
  //   }
  //   @media screen and (max-width: 400px) {
  //     /* font-size: 22px; */
  //     padding: 3px 24px;
  //   }
  // `,
  Text: styled.p`
    margin: 0;
    padding: 0;
    font-size: 14px;
    padding: 5px;
    color: ${({ theme }) => theme.colors.text};
  `,
  Message: styled.div`
    float: ${({ type }) => (type === "sent" ? "right" : "left")};
    font-size: 14px;
    font-style: italic;
    max-width: 60%;
    /* cursor: pointer; */
    margin: 3px 0;
    color: ${({ theme, type }) =>
      type === "sent" ? "#fff" : theme.colors.primary};
    padding: 7px 15px;
    /* padding-bottom: 10px; */
    ${breakWords}
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    border-bottom-right-radius: ${({ borderR }) => borderR === "sent" && 0};
    border-bottom-left-radius: ${({ borderR }) => borderR === "received" && 0};
    background-color: ${({ theme, type }) => {
      return type === "sent" ? theme.colors.primary : theme.colors.body.primary;
    }};
    /* &:hover {
      ${boxShadow};
    } */
    /* :hover {
      span {
        opacity: 0.6;
        color: ${({ theme }) => theme.colors.text};
      }
    } */
  `,
  // Time: styled.span`
  //   transition: 0.5s linear;
  //   opacity: 0;
  //   font-size: 12px;
  //   margin: 5px;
  //   padding: 10px;
  //   /* display: ${({ display }) => display}; */
  //   /* &:hover {
  //     opacity: 0.5;
  //     color: ${({ theme }) => theme.colors.text};
  //   } */
  // `,
};
