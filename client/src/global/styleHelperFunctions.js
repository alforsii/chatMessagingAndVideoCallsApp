export const getStyles = ({ style }) => {
  let str = "";
  for (let i in style) {
    str += `${i}:${style[i]};`;
  }
  return str;
};

export const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
};

export const flexStart = (axel = "x") => {
  if (axel === "y") {
    return getStyles({
      style: {
        display: "flex",
        "justify-content": "flex-start",
        "align-items": "center",
        "flex-direction": "column",
      },
    });
  } else {
    return getStyles({
      style: {
        display: "flex",
        "justify-content": "flex-start",
        "align-items": "center",
      },
    });
  }
};

export const breakWords = () => {
  return getStyles({
    style: {
      " word-wrap": "break-word",
      "word-break": "break-all",
      "-moz-word-wrap": "break-word",
      "-moz-word-break": "break-all",
      "-webkit-word-wrap": "break-word",
      "-webkit-word-break": "break-all",
    },
  });
};

export const boxShadow = () => {
  return getStyles({
    style: {
      "-webkit-box-shadow":
        "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0.5) inset",
      "-moz-box-shadow":
        "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0.5) inset",
      "box-shadow":
        "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0.5) inset",
    },
  });
};
export const boxShadow2 = () => {
  return getStyles({
    style: {
      "-webkit-box-shadow":
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      "-moz-box-shadow":
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      "box-shadow":
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  });
};

// box-shadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

//  "-webkit-box-shadow":
//         "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0.5) inset",
//       "-moz-box-shadow":
//         "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0.5) inset",
//       "box-shadow":
//         "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0.5) inset",
