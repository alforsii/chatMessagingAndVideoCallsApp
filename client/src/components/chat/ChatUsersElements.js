import styled from "styled-components";
import { Image } from "react-bootstrap";
import { UserChatsEl } from "./UserChatsElements";
import { rightNavbarHeight } from "./NavbarsElements";

export const ChatUsersEl = {
  ...UserChatsEl,
  Container: styled(UserChatsEl.Container)`
    position: relative;
    /* background-color: ${({ theme }) => theme.colors.body.secondary};
    border-radius: 8px; */
  `,
  Avatar: styled(Image)`
    width: ${({ width }) => (width ? width : "100%")};
    height: ${({ height }) => (height ? height : "100%")};
    border: none;
  `,
  Menu: styled(UserChatsEl.Menu)`
    height: calc(85vh - ${rightNavbarHeight});
    /* position: relative; */
    padding-bottom: 40%;
  `,
};
