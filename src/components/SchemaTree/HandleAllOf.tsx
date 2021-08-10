import * as React from "react";
import NestedParameters from "../NestedParameters/NestedParameters";
interface Props {
  allOfObject:Array<object>;
}

const HandleAllOf: React.FunctionComponent<Props> = (props) => {
  return (
    <div >
        {props.allOfObject && props.allOfObject.length > 0 && (
            props.allOfObject.map((element,index) =>{
                return <NestedParameters key={index} json={element}/>
            })
        )}
    </div>
  );
};

export default HandleAllOf;