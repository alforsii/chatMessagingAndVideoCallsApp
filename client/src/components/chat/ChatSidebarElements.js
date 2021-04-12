import styled from "styled-components";

export const ChatSidebarEl = {
  Container: styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 40px;
    height: 85vh;
    background-color: ${({ theme }) => theme.colors.body.primary};
    /* border-right: 1px solid ${({ theme }) => theme.colors.body.secondary}; */
  `,
  Icon: styled.div`
    color: ${({ theme }) => theme.colors.text};
    display: block;
    padding: 5px;
    transition: 0.2s linear;
    opacity: 0.9;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    transition: 0.5s ease-in-out;

    @media screen and (min-width: 668px) {
      :nth-child(1) {
        display: none;
      }
    }
    @media screen and (min-width: 900px) {
      :nth-child(2) {
        display: none;
      }
    }
  `,
};
