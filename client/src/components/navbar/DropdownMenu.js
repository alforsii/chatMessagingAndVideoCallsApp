import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { PopoverEl } from "../popover/PopoverElements";
import { NavbarEl } from "./NavbarElements";

export const StyledDropMenu = withRouter(
  ({ children, title, items, history }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      handleGlobalClick();
      // eslint-disable-next-line
    }, []);

    const toggleDropMenu = () => {
      setIsOpen(!isOpen);
    };

    const handleGlobalClick = (e) => {
      document
        .getElementById("main_container")
        .addEventListener("click", (e) => {
          console.log(isOpen);
          setIsOpen(false);
        });
    };
    return (
      <React.Fragment>
        <PopoverEl.Container>
          <NavbarEl.Item id="nav_dropdownBtn" onClick={toggleDropMenu}>
            {title}
          </NavbarEl.Item>
          <PopoverEl.Menu id="nav_dropMenu" isOpen={isOpen}>
            {items.map((item, index) => {
              return item.to ? (
                <PopoverEl.Link key={index} to={item.to}>
                  {item.name}
                </PopoverEl.Link>
              ) : (
                <PopoverEl.Item
                  key={index}
                  // onClick={() => history.push(item.to)}
                >
                  {item.name}
                </PopoverEl.Item>
              );
            })}
          </PopoverEl.Menu>
        </PopoverEl.Container>
      </React.Fragment>
    );
  }
);
