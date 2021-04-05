import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { myColors } from "../../global/colors";
import { boxShadow, flexStart } from "../../global/styleHelperFunctions";

export const navHeight = "50px";
export const NavbarEl = {
  Container: styled.div`
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    background-color: ${myColors.primaryColor};
    height: ${navHeight};
    width: 100%;
    padding: 0 50px;
    z-index: 99;
    border-bottom: 3px solid ${myColors.primaryColor3};

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
    @media screen and (max-width: 568px) {
      display: none;
    }
  `,
  Logo: styled(LinkRoute)`
    color: ${myColors.silver};
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    margin-right: 50px;
    transition: ease-in-out 0.1s all;
    &:hover {
      text-decoration: none;
      color: ${myColors.silver};
    }
  `,
  Menu: styled.ul`
    ${flexStart};
  `,
  Item: styled.li`
    list-style: none;
    padding: 0 10px;
    color: ${myColors.silver};
  `,
  Link: styled(LinkRoute)`
    color: ${myColors.silver};
    transition: ease-in-out 0.2s all;
    &:hover {
      color: ${myColors.primaryColor};
      text-decoration: none;
    }
  `,
  Actions: styled.div`
    @media screen and (max-width: 768px) {
      display: none;
    }
  `,
  Button: styled.button`
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

  Mobil: styled.div`
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      font-size: 24px;
      cursor: pointer;
      color: ${myColors.silver};
      &:hover {
        color: ${myColors.silver};
      }
    }
  `,
};
