import styled from "styled-components";
import { Button, Form, Alert, InputGroup } from "react-bootstrap";

export const Elements = {
  Form: styled(Form)``,
  Group: styled(Form.Group)``,
  Label: styled(Form.Label)`
    /* margin-bottom: 2px; */
    @media screen and (max-width: 400px) {
      font-size: 14px;
    }
  `,
  Input: styled(Form.Control)`
    background-color: ${({ theme }) => theme.colors.body.secondary};
    border: 1px solid ${({ theme }) => theme.colors.body.secondary};
    ::placeholder {
      font-size: 14px;
      font-style: italic;
    }
    :focus {
      background-color: ${({ theme }) => theme.colors.body.secondary};
      border: 1px solid ${({ theme }) => theme.colors.primary};
      font-style: italic;
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
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    /* background-color: ${({ theme }) => theme.colors.primary}; */
    /* color: ${({ theme }) => theme.colors.button.hover.text}; */
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
