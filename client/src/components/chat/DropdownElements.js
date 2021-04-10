import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { boxShadow } from "../../global/styleHelperFunctions";

const CustomToggle = React.forwardRef((props, ref) => {
  // console.log(props);
  return (
    <DropdownEl.CustomToggle
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        // console.log(e);
        props.onClick(e);
      }}
    >
      {props.children}
    </DropdownEl.CustomToggle>
  );
});
export function StyledDropdown({ children }) {
  return (
    <DropdownEl.Dropdown>
      <Dropdown.Toggle as={CustomToggle}>{children[0]}</Dropdown.Toggle>
      <DropdownEl.Menu as={Dropdown.Menu} style={{ margin: 0 }}>
        {children.slice(1)}
      </DropdownEl.Menu>
    </DropdownEl.Dropdown>
  );
}

export const DropdownEl = {
  Dropdown: styled(Dropdown)``,
  Menu: styled(Dropdown.Menu)`
    background-color: ${({ theme }) => theme.colors.body.primary};
    ${boxShadow}
  `,
  CustomToggle: styled.div`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    padding: 3px 5px;
    border-radius: 3px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.body.secondary};
    }
  `,
  Item: styled(Dropdown.Item)`
    font-size: 14px;
    padding: 10px;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      background-color: ${({ theme }) => theme.colors.body.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  Divider: styled(Dropdown.Divider)`
    margin: 0;
  `,
  Header: styled(Dropdown.Header)`
    margin: 0;
    padding: 10px;
  `,
  ItemText: styled(Dropdown.ItemText)``,
};
