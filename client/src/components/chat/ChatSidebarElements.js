import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { myColors } from "../../global/colors";
import { boxShadow, flexStart } from "../../global/styleHelperFunctions";

export const ChatSidebarEl = {
  Container: styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 50px;
    height: 100vh;
    background-color: ${myColors.primaryColor};
    border-right: 1px solid ${myColors.primaryColor3};
  `,
  Icon: styled.div`
    color: ${myColors.silver};
    display: block;
    padding: 5px;
    transition: 0.2s linear;
    &:hover {
      color: ${myColors.white};
      cursor: pointer;
    }
  `,
};
