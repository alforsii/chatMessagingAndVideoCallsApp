export const getStyles = ({ style }) => {
  let str = "";
  for (let i in style) {
    str += `${i}:${style[i]};`;
  }
  return str;
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
