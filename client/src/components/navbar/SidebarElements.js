import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { boxShadow, flexStart } from "../../global/styleHelperFunctions";
import { navHeight } from "./NavbarElements";
export const SidebarEl = {
  Container: styled.aside`
    width: 100%;
    min-height: 100vh;
    max-width: 300px;
    background-color: ${({ theme }) => theme.colors.body.primary};
    display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
    display: grid;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: 0.3s ease-in-out;
    position: fixed;
    top: ${navHeight};
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    z-index: 2;
    /* ${boxShadow} */
  `,
  Header: styled.header`
    color: ${({ theme }) => theme.colors.text};
    margin-top: 20px;
    margin-left: 10px;
  `,
  CloseIcon: styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${({ theme }) => theme.colors.text};
    transition: 0.3s linear;
    cursor: pointer;
    font-size: 14px;

    opacity: 0.3;
    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  Menu: styled.ul`
    overflow: scroll;
    border-radius: 3px;
    width: 100%;
    ${flexStart("y")}
  `,
  Item: styled.li`
    padding: 10px 15px;
    padding: 0 30px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    a {
      color: ${({ theme }) => theme.colors.text};
    }
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  Link: styled(LinkRoute)`
    padding: 10px 15px;
    font-size: 1rem;
    /* width: 100%; */
    display: inline-block;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
  `,
  Footer: styled.footer`
    /* padding: 10px 30px; */
  `,
  Button: styled.button`
    display: block;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.button.bg};
    color: ${({ theme }) => theme.colors.button.text};
    padding: 5px 34px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    margin: 2px;
    transition: ease-in-out 0.3s all;

    &:hover {
      background-color: ${({ theme }) => theme.colors.button.hover.bg};
      color: ${({ theme }) => theme.colors.button.hover.text};
      font-weight: bold;
      ${boxShadow}
    }
  `,
};
