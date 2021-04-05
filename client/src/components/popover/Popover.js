import React, { useEffect } from "react";
import { PopoverEl } from "./PopoverElements";
import { getOffset } from "../../global/styleHelperFunctions";

export default function StyledPopover({
  children,
  textColor,
  backgroundColor,
  align = "bottom",
  message,
}) {
  useEffect(() => {
    handleGlobalClick();
  }, []);

  //   const setAlignment = (currEl, toolTip) => {
  //     //   const el = getOffset(currEl);
  //     //   switch(align){
  //     //       case 'top':
  //     //           return {
  //     //               left: el.left,
  //     //               top:el,top
  //     //           }
  //     //   }
  //   };
  const createTooltip = (e) => {
    if (document.getElementById("myTooltip123")) {
      document.getElementById("myTooltip123").remove();
    } else {
      const currEl = e.currentTarget;
      const data = currEl.getAttribute("data-content");
      const left = getOffset(currEl).left;
      //   const right = getOffset(currEl).right;
      //   const top = getOffset(currEl).top;
      const bottom = getOffset(currEl).bottom;

      const tooltip = document.createElement("div");
      document.getElementsByTagName("body")[0].append(tooltip);
      tooltip.setAttribute("id", "myTooltip123");
      tooltip.style.position = "absolute";
      tooltip.style.minHeight = "50px";
      tooltip.style.maxHeight = window.innerHeight - 250 + "px";
      tooltip.style.minWidth = "100px";
      tooltip.style.maxWidth = "300px";
      tooltip.style.padding = "30px";
      tooltip.style.color = textColor ? textColor : "#fff";
      tooltip.style.backgroundColor = backgroundColor
        ? backgroundColor
        : "#333";
      tooltip.style.overflow = "scroll";
      tooltip.style.zIndex = 99999;
      tooltip.style.top = bottom + 20 + "px";
      tooltip.style.left = left + "px";
      tooltip.style.borderRadius = "10px";
      tooltip.style.transition = "easy-in-out 0.5s all";
      tooltip.innerHTML = data;
    }
  };
  const handleGlobalClick = (e) => {
    document.getElementById("main_container").addEventListener("click", (e) => {
      if (document.getElementById("myTooltip123")) {
        document.getElementById("myTooltip123").remove();
      }
    });
  };

  return (
    <PopoverEl.Container
      data-toggle="popover"
      data-content={message}
      onClick={createTooltip}
    >
      {children}
    </PopoverEl.Container>
  );
}
