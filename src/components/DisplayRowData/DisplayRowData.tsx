import React, { useState, useEffect } from "react";
import "./DisplayRowData.css";
import SchemaTree from "../SchemaTree/SchemaTree";
import { excludeRefInDescription } from "../../utils/utils";
import ReactMarkdown from "react-markdown/src/react-markdown";
const gfm = require("remark-gfm");

interface Props {
  parameter: any;
  required?: boolean;
  name?: string;
  requestBodyName?: string;
  schema?: any;
  selectedContent?: string;
  oasFile?: any;
  contentType?: string | undefined;
  operation?: any;
  type?: string | undefined;
  responseCode?: string | undefined;
  payload?:any;
}
const DisplayRowData: React.FunctionComponent<Props> = (props) => {
  let [parameterSchema, setParameterSchema] = useState<null | any>(null);

  useEffect(() => {
    setParameterSchema(null);
    initializeParameterSchema();
  }, [props.parameter]);
  const initializeParameterSchema = () => {
    let schema = props.parameter;
    if (schema.schema) {
      schema = schema.schema;
    } else if (
      schema.content &&
      schema.content[Object.keys(schema.content)[0]].schema
    ) {
      schema = schema.content[Object.keys(schema.content)[0]].schema;
    }
    setParameterSchema(schema);
  };
  const paramNameForId = props.parameter.name ? props.parameter.name : props.name;
  console.log("paramNameForId "+paramNameForId);
  const viewExample = () => {

        if (parameterSchema?.type === "boolean") {
        return (
          <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-example`}>
            Example: {props.parameter?.example.toString()}
          </div>
        );
      } else {
        return (
          <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-example`}>
            Example: <code>{JSON.stringify(props.parameter?.example)}</code>
          </div>
        );
      }

  };
  const getNameComponenet = (
    <>
      {parameterSchema && (
        <div>
          {parameterSchema.type && (
              <div className="param-align pb-1 font-size-12" data-testid={`${paramNameForId}-type`}>
                <div>
                  {" "}
                  {Array.isArray(parameterSchema.type) ? (
                    <> {parameterSchema.type.join(" ,")}</>
                  ) : (
                    parameterSchema.type
                  )}
                </div>
                {parameterSchema.format && (
                  <div>({parameterSchema.format})</div>
                )}
              {parameterSchema.items && parameterSchema.items.type && (
                <div className="pb-1">[{parameterSchema.items.type}]</div>
              )}
              {parameterSchema.items &&
                Array.isArray(parameterSchema.items.oneOf) && (
                  <div className="pb-1">
                    [{parameterSchema.items.oneOf.join(" | ")}]
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </>
  );
  

  const parameterDetails = (
    <>
      <li className="parameter-list__parameter">
        <div className="parameter-info">
          <div className="font-size-14 font-weight-600 bottom-padding-1">
            {" "}
            {props.parameter.name ? props.parameter.name : props.name}{" "}
          </div>

          <div className="">
            {(props.parameter.required && props.parameter.required === true) ||
            props.required ? (
              <div data-testid={`${paramNameForId}-required`} className="font-size-12 required-text-clr font-weight-600">
                REQUIRED
              </div>
            ) : null}
          </div>
          {parameterSchema && <div>{getNameComponenet}</div>}
          {props.parameter.in && (
            <div data-testid={`${paramNameForId}-in`} className="font-size-12 pb-1"> ({props.parameter.in})</div>
          )}
        </div>
        <div className="parameter-description">
          {props.parameter.description && (
            <div className="mb-1" data-testid={`${paramNameForId}-description`}>
              <ReactMarkdown
                children={excludeRefInDescription(props.parameter.description)}
                className="api-documentation description-font"
                linkTarget="_blank"
                plugins={[gfm]}
          />
            </div>
          )}
          {parameterSchema &&
            parameterSchema.items &&
            parameterSchema.items.enum && (
              <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-allowedValues`}>
                Allowed values : [{parameterSchema.items.enum.join(" ,")}]
              </div>
            )}
          {parameterSchema && parameterSchema.enum && (
            <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-allowedValues`}>
              Allowed values : [{parameterSchema.enum.join(" ,")}]
            </div>
          )}
          {parameterSchema?.default !== undefined && (
            <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-default`}>
              Default:{" "}
              {parameterSchema?.type === "boolean"
                ? parameterSchema.default.toString()
                : parameterSchema?.default}
            </div>
          )}
          {props.parameter.allowEmptyValue && (
            <div className="font-size-12"data-testid={`${paramNameForId}-allowEmptyValue`}>allowEmptyValue: true</div>
          )}
          {props.parameter.allowReserved && (
            <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-allowReserved`}>
              allowReserved: true
            </div>
          )}
          {(props.parameter?.example !== undefined )&& <> {viewExample()}</>}
          {parameterSchema?.pattern && parameterSchema?.type === "string" && (
            <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-pattern`}>
              pattern: {parameterSchema?.pattern}
            </div>
          )}
          {parameterSchema?.minLength !== undefined &&
            parameterSchema?.type === "string" && (
              <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-minLength`}>
                {`minLength: ${parameterSchema?.minLength}`}
              </div>
            )}
          {parameterSchema?.maxLength && parameterSchema?.type === "string" && (
            <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-maxLength`}>
              maxLength: {parameterSchema?.maxLength}
            </div>
          )}

          {parameterSchema?.minimum !== undefined &&
            (parameterSchema?.type === "number" ||
              parameterSchema?.type === "integer") && (
              <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-minimum`}>
                minimum
                {parameterSchema.exclusiveMinimum && (
                  <span>&nbsp;(exclusive)</span>
                )}
                : {parameterSchema?.minimum}
              </div>
            )}
          {parameterSchema?.maximum &&
            (parameterSchema.type === "number" ||
              parameterSchema.type === "integer") && (
              <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-maximum`}>
                maximum
                {parameterSchema?.exclusiveMaximum && (
                  <span>&nbsp;(exclusive)</span>
                )}
                : {parameterSchema?.maximum}
              </div>
            )}
          {parameterSchema?.maxItems !== undefined &&
            parameterSchema.type === "array" && (
              <div className="font-size-12 font-weight-600"data-testid={`${paramNameForId}-maxItems`}>
                maxItems: {parameterSchema.maxItems}
              </div>
            )}
          {parameterSchema?.minItems !== undefined &&
            parameterSchema.type === "array" && (
              <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-minItems`}>
                minItems: {parameterSchema.minItems}
              </div>
            )}
          {parameterSchema?.uniqueItems !== undefined &&
            parameterSchema.type === "array" && (
              <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-uniqueItems`}>
                uniqueItems: true
              </div>
            )}
          {props.parameter?.$ref && (
            <div className="font-size-12 font-weight-600" data-testid={`${paramNameForId}-circularRef`}>
              circular_reference : {props.parameter?.$ref}
            </div>
          )}
          {props.parameter.values
            ? props.parameter.values.map((value:string) => {
                return <div className="font-size-12" data-testid={`${paramNameForId}-values`}>{value}</div>;
              })
            : null}
          {parameterSchema?.nullable && <div>nullable : true</div>}
        </div>
        <div className="child-parameter-list">
        {props.schema && (
          <SchemaTree
            json={props.schema}
            requestBodyName={
              props.requestBodyName
                ? props.requestBodyName
                : parameterSchema?.type
            }
          />
        )}
        </div>
      </li>
    </>
  );
  return (
    <React.Fragment>

          {props.selectedContent === "properties" && (
            <div className="param-align header-background">
              <h5 className="font-size-14 parameter-info">Name</h5>
              <h5 className="font-size-14 parameter-description">
                Description
              </h5>
            </div>
          )}
          {parameterDetails}
    </React.Fragment>
  );
};
export default DisplayRowData;
