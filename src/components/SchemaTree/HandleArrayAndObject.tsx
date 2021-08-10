import React, { useState, useEffect } from "react";
import ToolTipComponenet from "../ToolTipComponent/ToolTipComponent";
import PayloadContainer from "../PayloadContainer/PayloadContainer";
import "./SchemaTree.css";
import DisplayRowData from "../DisplayRowData/DisplayRowData";
import NestedParameters from "../NestedParameters/NestedParameters";
import {
  isRequired,
  excludeRefInDescription,
  isPrimitive,
} from "../../utils/utils";
import ReactMarkdown from "react-markdown/src/react-markdown";
const gfm = require("remark-gfm");
interface Props {
  nestedObject: any;
  child: any;
  propertyName: string;
}
const HandleArrayAndObject: React.FunctionComponent<Props> = (props) => {
  let [expandParameterSchema, setExpandParameterSchema] = useState(false);

  useEffect(() => {
    setExpandParameterSchema(false);
  }, [props.nestedObject]);
  
  const isArray = (value:string) => value === "array";
  const isObject = (value:string) => value === "object";
  const handleClick = () =>{
    setExpandParameterSchema(!expandParameterSchema);
  }
  return (
    <>
      {props.nestedObject && (
        <>
          {props.child &&
          props.child["type"] &&
          isPrimitive(props.child["type"]) ? (
            <DisplayRowData
              parameter={props.child}
              required={isRequired(
                props.nestedObject?.required,
                props.propertyName
              )}
              name={props.propertyName}
            />
          ) : (
            <li className="parameter-list__parameter bottom-padding-1 top-padding-1 left-margin-8">
              <div className="parameter-info">
                <div className="font-size-14 font-weight-600 pb-1">
                  {props.propertyName}
                </div>
                {isRequired(props.nestedObject?.required, props.propertyName) && (
                  <div className="font-size-12 required-text-clr font-weight-600 pb-1">
                    REQUIRED
                  </div>
                )}
                {props.child["type"] && (
                  <div className="font-size-12 font-weight-600">
                    {props.child["type"]}
                  </div>
                )}
              </div>

              <div className="parameter-description long-path">
                <div className="long-path">
                  <ReactMarkdown
                    children={excludeRefInDescription(props.child.description)}
                    className="api-documentation description-font"
                    linkTarget="_blank"
                    plugins={[gfm]}
                  />
                </div>
              </div>

              <>
                {isObject(props.child["type"]) && !props.child["properties"] ? (
                  <>
                    <div className="arrow-text font-size-12">{`${props.propertyName}{}`}</div>
                  </>
                ) : (
                  <>
                    <div className="child-parameter-list">
                      <PayloadContainer
                        title={
                          isArray(props.child["type"])
                            ? `${props.propertyName}[]`
                            : `${props.propertyName}{}`
                        }
                        handleClick={() => setExpandParameterSchema(!expandParameterSchema)}
                        fontsize={"font-size-14 font-weight-600"}
                      />
                    </div>
                    {expandParameterSchema && (
                      <ul className="parameter-nested left-padding2">
                        <div className="tooltip">
                          <ToolTipComponenet tooltipName={props.propertyName} />
                        </div>{" "}
                        <div className="set-list-width left-align-list">
                          <NestedParameters
                            json={props.child}
                            parentObject={props.nestedObject}
                            key={props.propertyName}
                          />
                        </div>
                      </ul>
                    )}
                  </>
                )}
              </>
            </li>
          )}
        </>
      )}
    </>
  );
};

export default HandleArrayAndObject;
