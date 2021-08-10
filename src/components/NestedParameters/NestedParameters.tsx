import React, { useEffect, useState } from "react";
import DisplayRowData from "../DisplayRowData/DisplayRowData";
import HandleArrayAndObject from "../SchemaTree/HandleArrayAndObject";
import HandleAllOf from "../SchemaTree/HandleAllOf";
import AnyOfOneOf from "../AnyOfOneOf/AnyOfOneOf";
import {
  isRequired,
  isPrimitive
  } from "../../utils/utils";
interface Props {
  json: object | null;
  parentObject?: any;
  keyName?: string;
}
const NestedParameters: React.FunctionComponent<Props> = (props) => {
  let [selectedObject, setSelectedObject] = useState<any | null>(null);

  useEffect(() => {
    setSelectedObject(props.json);
  }, [props.json, props.parentObject]);

  const subSchema =(subSchema: { properties: { [x: string]: any; }; })=>{
  return <>{subSchema &&
    subSchema.properties &&
    Object.keys(subSchema.properties).map((key: any, reactKey) => {
      const child = subSchema.properties[key];
      return <HandleArrayAndObject nestedObject={subSchema} child={child} key={reactKey} propertyName={key}/>;
    }
    )}
    </>
  }
  const getObject = (currentObject: { allOf?: any; oneOf?: any; anyOf?: any; properties: any; })=>{
    if(currentObject.allOf){
      return <HandleAllOf allOfObject={currentObject.allOf} />;
    }else if(currentObject.oneOf){
      return (
        <div> 
        <AnyOfOneOf
          type={"oneOf"}
          anyOfOneOf={currentObject.oneOf}
        />
        </div>
      );  
    }else if(currentObject.anyOf){
      return (
        <div> 
        <AnyOfOneOf
          type={"anyOf"}
          anyOfOneOf={currentObject.anyOf}
        />
        </div>
      );  
    }else if(currentObject.properties){
      return subSchema(currentObject);
    }else{
      return <DisplayRowData
      parameter={currentObject}
      required={isRequired(props.parentObject?.required, props.keyName)}
      name={props.keyName}
    />           
    }

  }
  const processObject = () => {
    if (selectedObject.type) {
      switch (selectedObject.type) {
        case "array":
          if (selectedObject.items) {
            return getObject(selectedObject.items) ;
          }
          break;
        case "object":
          return getObject(selectedObject);
        default:
          //handle primitive data integer, boolean,string etc
          if (isPrimitive(selectedObject["type"])) {
            return <DisplayRowData
            parameter={selectedObject}
            required={isRequired(props.parentObject?.required, props.keyName)}
            name={props.keyName}
          />
          }
          break;
      }
    } else {
      //type is not defined in the schema
      if (selectedObject.items) {
        //handle array
        return getObject(selectedObject.items);
      } else {
        return getObject(selectedObject);
    }
  }
  };
  return <>{selectedObject && processObject()}</>;
};

export default NestedParameters;