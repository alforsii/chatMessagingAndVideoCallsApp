import styled from "styled-components";
import { Link as LinkRoute } from "react-router-dom";
import { myColors } from "../../global/colors";
import { boxShadow, flexStart } from "../../global/styleHelperFunctions";
import { UserChatsEl } from "./UserChatsElements";

export const ChatUsersEl = {
  ...UserChatsEl,

  Avatar: styled.div`
    /* max-height: 200px;
    max-width: 300px; */
  `,
  Menu: styled(UserChatsEl.Menu)``,
  SubMenu: styled(UserChatsEl.SubMenu)`
    flex-wrap: wrap;
    box-sizing: border-box;
    margin: 0px 5px 10px 5px;
    border-radius: 3px;
    &:hover {
      ${boxShadow}
    }
  `,
};
