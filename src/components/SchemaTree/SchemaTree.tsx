import React,{useState} from "react";
import "./SchemaTree.css";
import PayloadContainer from "../PayloadContainer/PayloadContainer";

import NestedParameters from "../NestedParameters/NestedParameters";
interface Props {
  json: any;
  requestBodyName: string | undefined;
}
const SchemaTree: React.FunctionComponent<Props> = (props) => {
  let [expand, setExpand] = useState(false);
  return (
    <>
      {/*buildNode(props.requestBodyName,isRequired(props.json?.required,props.requestBodyName))*/}
      <div className="">
            <PayloadContainer
              title={            props.requestBodyName
                ? props.requestBodyName
                : Object.keys(props.json)[0]}
              handleClick={() => setExpand(!expand)}
              fontsize={"font-size-12"}
            />
          </div>   
          {expand &&    
      <div className="top-padding-1 set-list-width left-align-list">
        <ul id="myUL" className="">
          <NestedParameters json={props.json}/>
        </ul>
      </div>
}
    </>
  );
};

export default SchemaTree;
