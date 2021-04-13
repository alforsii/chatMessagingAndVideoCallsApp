import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";

export const rightNavbarHeight = 50;
export const NavbarLeftEl = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding-left: 20px;
    min-width: 100%;
    border: none;
    /* background-color: ${({ theme }) => theme.colors.body.secondary}; */
  `,
  Logo: styled(LinkRoute)`
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 1.5px;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    /* transition: ease-in-out 0.1s all; */
    &:hover {
      text-decoration: none;
    }
    @media screen and (max-width: 468px) {
      font-size: 18px;
    }
    @media screen and (max-width: 668px) {
      font-size: 22px;
    }
  `,
};

export const NavbarCenterEl = {
  Container: styled.div`
    height: 50px;
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: space-between;
  `,
};

export const NavbarRightEl = {
  Container: styled.div`
    height: ${rightNavbarHeight + "px"};
    /* min-width: 100%; */
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 20px; */
    /* background-color: ${({ theme }) => theme.colors.body.secondary}; */
  `,
  Title: styled.h6`
    margin: 0;
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    padding: 5px;
    color: ${({ theme }) => theme.colors.primary};
  `,
};
