import React, { useState, useEffect} from "react";
import "./ToolTipComponent.css";
interface Props {
  tooltipName: string | undefined;
}

const ToolTipComponent: React.FunctionComponent<Props> = (props) => {
  let [topPosition, setTopPosition] = useState(0);
  let [randomId, setRandomId] = useState(0);
  
  useEffect(() => {
    setTopPosition(0);
    setRandomId( Math.floor(Math.random() * 1000 + 1));
  }, [props.tooltipName]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let element = document.getElementById(`${props.tooltipName}-${randomId}`);
    var top = e.clientY - (element ? element.getBoundingClientRect().top : 0);
    setTopPosition(top);
  };

  return (
    <div
      id={`${props.tooltipName}-${randomId}`}
      className="tooltip--definition"
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <div className="tooltip__trigger"></div>
      <div
        className="tooltip--definition__bottom"
        role="tooltip"
        aria-label={props.tooltipName}
        style={{ top: `${topPosition}px` }}
      >
        <span className="tooltip__caret"></span>
        <p>{props.tooltipName}</p>
      </div>
    </div>
  );
};
export default ToolTipComponent;
