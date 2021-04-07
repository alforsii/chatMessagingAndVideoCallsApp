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
    flex: 1;
    :nth-child(3) {
      flex: 2;
    }

    @media screen and (max-width: 668px) {
      :nth-child(2) {
        display: none;
        flex: 0;
      }
    }
    @media screen and (max-width: 900px) {
      :nth-child(3) {
        flex: 3;
        transition: 0.3s ease-in-out;
      }
      :nth-child(4) {
        display: none;
        flex: 0;
      }
    }
  `,
};
