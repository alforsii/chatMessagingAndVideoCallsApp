import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { boxShadow } from "../../global/styleHelperFunctions";
import { myColors } from "../../global/colors";

export const LoginEl = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.9s ease-in-out;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.body.secondary};
  `,
  Row: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  Header: styled.h2`
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 1.2px;
  `,
  Form: styled.form`
    background-color: ${({ theme }) => theme.colors.body.primary};
    width: 500px;
    height: 400px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    position: relative;
    ${boxShadow};

    @media screen and (max-width: 568px) {
      width: 400px;
    }
    @media screen and (max-width: 468px) {
      width: 350px;
    }
    @media screen and (max-width: 388px) {
      width: 300px;
    }
  `,
  Control: styled.div`
    min-width: 50%;
    display: flex;
    flex-direction: column;
  `,
  Input: styled.input`
    width: 100%;
    padding: 3px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.text};
    ::placeholder {
      color: ${({ theme }) =>
        theme.name === "dark" ? theme.colors.body.primary : theme.colors.text};
      font-size: 14px;
      opacity: 0.5;
    }
    :focus {
      border: 1px solid ${({ theme }) => theme.colors.text};
    }
  `,
  Label: styled.label`
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    margin-bottom: 0;
  `,
  Check: styled.input`
    :checked {
      + p {
        opacity: 1;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  `,
  Link: styled(LinkRoute)`
    position: absolute;
    right: 20px;
    bottom: 20px;
    opacity: 0.5;
    letter-spacing: 1.2px;
    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
      font-weight: bold;
    }
  `,
  Button: styled.button`
    /* width: 100%; */
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.body.secondary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    padding: 5px 34px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.button.hover.text};
      ${boxShadow};
    }
  `,
  Text: styled.p`
    font-size: 14px;
    padding: 5px;
    margin: 0;
    margin-left: 5px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: ${({ theme, code }) =>
      code === "success"
        ? myColors.green
        : code === "error"
        ? myColors.pink
        : theme.colors.text};
    opacity: 0.5;
  `,
};
