import styled from "styled-components";

export const ChatSidebarEl = {
  Container: styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 50px;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.body.primary};
    border-right: 1px solid ${({ theme }) => theme.colors.body.secondary};
  `,
  Icon: styled.div`
    color: ${({ theme }) => theme.colors.text};
    display: block;
    padding: 5px;
    transition: 0.2s linear;
    opacity: 0.9;
    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
    }
  `,
};
