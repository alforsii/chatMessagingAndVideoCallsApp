import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { myColors } from "../../global/colors";
import {
  getStyles,
  boxShadow,
  flexStart,
} from "../../global/styleHelperFunctions";

export const NavbarEl = {
  NavbarContainer: styled.div`
    display: flex;
    position: sticky;
    justify-content: space-around;
    align-items: center;
    background-color: ${myColors.blue};
    height: 70px;
    padding: 0 50px;
    ${boxShadow}
    @media screen and (max-width: 500px) {
      padding: 0;
    }
    @media screen and (max-width: 678px) {
      padding: 0 10px;
    }
    @media screen and (max-width: 900px) {
      padding: 0 30px;
    }
    ${getStyles}
  `,
  Nav: styled.nav`
    ${flexStart}
    margin-top:15px;
    ${getStyles};
    /* margin: auto; */
  `,
  NavLogo: styled(LinkRoute)`
    color: ${myColors.primaryColor};
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    margin-right: 50px;
    transition: ease-in-out 0.1s all;
    &:hover {
      text-decoration: none;
      color: ${myColors.primaryColor};
    }
    @media screen and (max-width: 500px) {
      margin-right: 10px;
      margin-left: 5px;
    }
    ${getStyles};
  `,
  NavMenu: styled.ul`
    ${flexStart};
    ${getStyles}
  `,
  NavItem: styled.li`
    list-style: none;
    padding: 0 10px;
    color: ${myColors.silver};
    ${getStyles};
  `,
  NavLink: styled(LinkRoute)`
    color: ${myColors.silver};
    font-weight: bold;
    transition: ease-in-out 0.2s all;
    &:hover {
      color: ${myColors.green};
      text-decoration: none;
    }
    ${getStyles}
  `,
  NavbarActions: styled.div`
    ${getStyles}
  `,
  NavbarButton: styled.button`
    background-color: ${myColors.silver} ${getStyles};
    color: ${myColors.primaryColor};
    padding: 5px 34px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin: 2px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${myColors.green} ${getStyles};
      color: ${myColors.white};
      font-weight: bold;
      ${boxShadow}
    }
  `,
};
