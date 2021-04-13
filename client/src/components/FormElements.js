import styled from "styled-components";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";

export const FormEl = {
  Form: styled(Form)``,
  Group: styled(Form.Group)``,
  Label: styled(Form.Label)`
    margin-bottom: 2px;
    @media screen and (max-width: 400px) {
      font-size: 14px;
    }
  `,
  Input: styled(Form.Control)`
    border: none;
    background-color: ${({ background, theme }) =>
      background === "dark" ? theme.colors.body.primary : ""};
    ::placeholder {
      font-size: 14px;
      font-style: italic;
    }
    :focus {
      background-color: ${({ background, theme }) =>
        background === "dark" ? theme.colors.body.primary : ""};
    }
    @media screen and (max-width: 400px) {
      ::placeholder {
        font-size: 14px;
      }
    }
  `,
  InputGroup: styled(InputGroup)``,
  Text: styled(Form.Text)`
    @media screen and (max-width: 400px) {
      font-size: 10px;
      margin-left: 5px;
    }
  `,
  Button: styled(Button)`
    background-color: ${({ theme }) => theme.colors.body.secondary};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.button.hover.text};
    }
    @media screen and (max-width: 400px) {
      font-size: 14px;
    }
  `,
  Alert: styled(Alert)`
    font-size: 14px;
    @media screen and (max-width: 400px) {
      font-size: 12px;
    }
  `,
};
