import styled from "styled-components";
import { Modal, Badge } from "react-bootstrap";

export const ModalEl = {
  Modal: styled(Modal)`
    /* background-color: ${({ theme }) => theme.colors.body.primary}; */
  `,
  Header: styled(Modal.Header)`
    background-color: ${({ theme }) => theme.colors.body.primary};
    color: ${({ theme }) => theme.colors.text};
  `,
  Title: styled(Modal.Title)`
    font-size: 20px;
    @media screen and (max-width: 400px) {
      font-size: 16px;
    }
  `,
  Body: styled(Modal.Body)`
    background-color: ${({ theme }) => theme.colors.body.primary};
    color: ${({ theme }) => theme.colors.text};
  `,
  Dialog: styled(Modal.Dialog)``,
  Footer: styled(Modal.Footer)``,
  Badge: styled(Badge)`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    padding: 5px 10px;
    font-size: 18px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.body.secondary};
    }
  `,
};
