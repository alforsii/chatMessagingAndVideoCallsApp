import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { myColors } from "../../global/colors";
import { boxShadow } from "../../global/styleHelperFunctions";
import { navHeight } from "./NavbarElements";
export const SidebarEl = {
  Container: styled.aside`
    width: 100%;
    min-height: 100vh;
    max-width: 300px;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    background-color: ${({ dark }) => (dark ? "#333" : "#fff")};
    position: fixed;
    display: grid;
    align-items: center;
    top: ${navHeight};
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    transition: 0.3s ease-in-out;
    z-index: 2;
    ${boxShadow}
  `,
  Header: styled.header`
    color: ${({ dark }) => (dark ? "#fff" : "#333")};
    margin-top: 20px;
    margin-left: 10px;
  `,
  CloseIcon: styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #eee;
    transition: 0.3s linear;
    cursor: pointer;

    &:hover {
      color: ${myColors.red};
    }
  `,
  Menu: styled.ul`
    width: 100%;
    overflow: scroll;
    z-index: 999;
    border-radius: 3px;
  `,
  Item: styled.li`
    padding: 10px 15px;
    padding: 0 30px;
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
  Footer: styled.footer`
    padding: 10px 30px;
  `,
  Button: styled.button`
    display: block;
    width: 100%;
    background-color: ${myColors.silver};
    color: ${myColors.primaryColor};
    padding: 5px 34px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin: 2px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${myColors.green};
      color: ${myColors.white};
      font-weight: bold;
      ${boxShadow}
    }
  `,
};
