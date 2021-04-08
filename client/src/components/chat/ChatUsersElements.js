import styled from "styled-components";
import { boxShadow } from "../../global/styleHelperFunctions";
import { UserChatsEl } from "./UserChatsElements";
import { Image } from "react-bootstrap";

export const ChatUsersEl = {
  ...UserChatsEl,
  Container: styled(UserChatsEl.Container)``,
  Avatar: styled(Image)`
    /* max-width: 300px;
    max-height: 300px;
    min-width: 200px;
    min-height: 200px; */

    width: ${({ width }) => (width ? width : "100%")};
    height: ${({ height }) => (height ? height : "100%")};
    border: none;
  `,
  Menu: styled(UserChatsEl.Menu)`
    max-width: 300px;
    margin: 0 auto;
  `,
  SubMenu: styled(UserChatsEl.SubMenu)`
    flex-wrap: wrap;
    border-radius: 10px;
    margin-bottom: 5px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.body.primary};
    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
      ${boxShadow}
    }
  `,
};
