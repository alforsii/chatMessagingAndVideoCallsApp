import styled from "styled-components";
import { boxShadow } from "../../global/styleHelperFunctions";

export const ChatEl = {
  Container: styled.div`
    display: grid;
    transition: 0.3s ease-in-out;
    padding-left: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  `,
  Row: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Col: styled.div`
    flex: 1;
    /* ${boxShadow} */
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    min-width: 250px;
    
    /* height: calc(100vh - 20px); */
    /* max-height: 85vh; */
    /* background-color: red; */
    :nth-child(2) {
      /* max-width: 300px; */
      flex: 1;
    }
    :nth-child(3) {
      flex: 2;
      max-width: 700px;
    }
    :nth-child(4) {
      /* max-width: 300px; */
      flex: 1;
    }

    @media screen and (max-width: 668px) {
      :nth-child(2) {
        display: none;
        flex: 0;
      }
    }
    @media screen and (max-width: 998px) {
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
