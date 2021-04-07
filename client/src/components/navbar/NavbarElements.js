import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { boxShadow, flexStart } from "../../global/styleHelperFunctions";

export const navHeight = "60px";
export const NavbarEl = {
  Container: styled.div`
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.body.primary};
    height: ${navHeight};
    width: 100%;
    padding: 0 50px;
    z-index: 99;
    border-bottom: 2px solid ${({ theme }) => theme.colors.body.secondary};

    @media screen and (max-width: 500px) {
      padding: 0;
    }
    @media screen and (max-width: 678px) {
      padding: 0 10px;
    }
    @media screen and (max-width: 900px) {
      padding: 0 30px;
    }
  `,
  Nav: styled.nav`
    ${flexStart}
    margin-top:15px;
    @media screen and (max-width: 668px) {
      display: none;
    }
  `,
  Logo: styled(LinkRoute)`
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    margin-right: 50px;
    transition: ease-in-out 0.1s all;
    &:hover {
      text-decoration: none;
    }
  `,
  Menu: styled.ul`
    ${flexStart};
  `,
  Item: styled.li`
    list-style: none;
    padding: 0 10px;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.5;
    }
  `,
  Link: styled(LinkRoute)`
    color: ${({ theme }) => theme.colors.text};
    transition: ease-in-out 0.2s all;
    &:hover {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.5;
      text-decoration: none;
    }
  `,
  Actions: styled.div`
    @media screen and (max-width: 768px) {
      display: none;
    }
  `,
  Button: styled.button`
    background-color: ${({ theme }) => theme.colors.button.bg};
    color: ${({ theme }) => theme.colors.button.text};
    padding: 5px 34px;
    border: 1px solid ${({ theme }) => theme.colors.button.text};
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

  Mobil: styled.div`
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      font-size: 24px;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.text};
      &:hover {
        color: ${({ theme }) => theme.colors.text};
      }
    }
  `,
};
