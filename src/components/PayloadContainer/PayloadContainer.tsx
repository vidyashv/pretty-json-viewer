
import React, {  useEffect } from "react";
interface Props {
  title: any;
  handleClick: Function;
  fontsize:string;
}

const PayloadContainer: React.FunctionComponent<Props> = (props) => {

    const toggle = (event: any) => {
      const target = event.target as Element;
        target.classList.toggle("arrow-down");
        props.handleClick();
      };
  return (
    <>
      <span
        className={`arrow arrow-text ${props.fontsize}`}
        onClick={(e) => {toggle(e)}}
      >
        {props.title}
      </span>
    </>
  );
};

export default PayloadContainer;
