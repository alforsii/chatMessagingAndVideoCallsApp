import styled from "styled-components";

export const ChatOnlineUsersEl = {
  Container: styled.div`
    height: ${({ height }) => height + "%"};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: "100%";
    background: ${({ theme }) => theme.colors.body.secondary};
  `,
  Menu: styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `,
  Item: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* background: ${({ theme }) => theme.colors.body.secondary}; */
    border-bottom:1px solid ${({ theme }) => theme.colors.body.primary};
    width: 100%;
    padding: 10px;
    /* border-radius: 8px; */
  `,
  Text: styled.p`
    color: ${({ theme }) => theme.colors.text};
    padding-left: 10px;
    margin: 0;
    font-size: 14px;
  `,
  Button: styled.button`
    width: 100%;
    /* padding: 3px; */
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.body.primary};
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  `,
};
