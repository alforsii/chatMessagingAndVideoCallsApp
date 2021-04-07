import styled from "styled-components";

export const ChatEl = {
  Container: styled.div`
    display: grid;
    transition: 0.3s ease-in-out;
    padding-left: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  `,
  Row: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
  `,
  Col: styled.div`
    flex: ${({ flex }) => (flex ? flex : 1)};
  `,
};
