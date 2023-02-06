import React from "react";

const RangeInput = ({ width, ...props }) => {
  const size = props.size * 100 + "% 100%";
  return (
    <div size={size} width={width}>
      <input type={"range"} {...props} />
    </div>
  );
};

export default RangeInput;
