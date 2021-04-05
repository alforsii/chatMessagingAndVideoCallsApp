import styled from "styled-components";
import { myColors } from "../../global/colors";
import { Link as LinkRoute } from "react-router-dom";
import { boxShadow } from "../../global/styleHelperFunctions";

export const PopoverEl = {
  Container: styled.div`
    z-index: 999;
    position: relative;
    background-color: transparent;
    cursor: pointer;
  `,
  Text: styled.p`
    margin: 0;
    padding: 0;
    font-weight: 100;
    color: ${myColors.gray};
  `,
  Menu: styled.ul`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    left: 0;
    top: 30;
    min-width: 200px;
    max-width: 400px;
    min-height: 100px;
    max-height: 500px;
    overflow: scroll;
    z-index: 999;
    background-color: ${myColors.white};
    border-radius: 3px;
    ${boxShadow}
  `,
  Item: styled.li`
    padding: 10px 15px;
    font-size: 1rem;
    color: ${myColors.primaryColor};
    a {
      color: ${myColors.primaryColor};
    }
    &:hover {
      background-color: ${myColors.silver};
      color: ${myColors.primaryColor};
    }
  `,
  Link: styled(LinkRoute)`
    padding: 10px 15px;
    font-size: 1rem;
    width: 100%;
    display: inline-block;
    color: ${myColors.primaryColor};
    &:hover {
      background-color: ${myColors.silver};
      color: ${myColors.primaryColor};
      text-decoration: none;
    }
  `,
};
