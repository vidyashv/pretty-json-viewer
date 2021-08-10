import React, { useState, useEffect } from "react";
import { Dropdown, Row, Column,} from "carbon-components-react";
import PayloadContainer from "../PayloadContainer/PayloadContainer";
import NestedParameters from "../NestedParameters/NestedParameters";
import ToolTipComponenet from "../ToolTipComponent/ToolTipComponent";
interface Props {
  anyOfOneOf: any;
  type: string;
}

export default function AnyOfOneOf(props: Props) {
  let [selectedDropDownItem, setSelectedDropDownItem] = useState("");
  let [expand, setExpand] = useState(false);

  let [refNameList, setRefNameList] = useState<string[] | null>(null);
  let [selectedItemObject, setSelectedItemObject] = useState<any | null>(null);
  /*get the name list to be display in drop down fron description
  example: 
  "description":"#/components/schemas/Pet"
  "description":"#/components/schemas/Tag"
ex :[Pet,Tag]
  */
  const getRefNames = () => {
    let nameList = null;
    if (props.anyOfOneOf) {
      nameList = props.anyOfOneOf.map((element: any, index: any) => {
        if (element.description) {
          return element.description.split("/").pop();
        } else return "";
      });
    }
    setRefNameList(nameList);
    return nameList;
  };
  useEffect(() => {
    const refList: any = getRefNames();
    if (refList) setSelectedDropDownItem(refList[0]);
    else {
      setSelectedDropDownItem("");
    }
    setExpand(false);
    setSelectedItemObject(props.anyOfOneOf[0]);
  }, [props.anyOfOneOf]);

  const getAnyOfOneOfList =
    refNameList &&
    refNameList.map((name) => {
      return { value: name, label: name };
    });

  const onChangeDropDownItem = (event: {
    selectedItem: React.SetStateAction<string>;
  }) => {
    setSelectedDropDownItem(event.selectedItem);
    let objectIndex = -1;
    //on selection change get the index of the selected item in the anyOf or oneOf array
    if (refNameList) {
      objectIndex = refNameList?.findIndex((name) => {
        return name === event.selectedItem;
      });
    }
    setSelectedItemObject(props.anyOfOneOf[objectIndex]);
  };
  const getSelectedItem = (items: any[] | null, selected: string) => {
    return items?.find((item) => item.value === selected);
  };
  return (
    <React.Fragment>
      <Row className="align-leftmargin">
        <Column max={4} xlg={4} lg={4} md={2} sm={4} className="pr-0 pl-0">
          <div className="top-padding">
            <PayloadContainer
              title={props.type}
              handleClick={() =>
                setExpand(!expand)
              }
              fontsize={"font-size-12"}
            />
          </div>
        </Column>
        <Column max={12} xlg={12} lg={12} md={6} sm={4} className="pl-0">
          {refNameList && (
            <Dropdown
              id="list"
              className=""
              items={refNameList}
              onChange={onChangeDropDownItem}
              label={selectedDropDownItem}
              type="default"
              selectedItem={getSelectedItem(
                getAnyOfOneOfList,
                selectedDropDownItem
              )}
              initialSelectedItem={selectedDropDownItem}
              titleText={""}
            />
          )}
        </Column>
      </Row>
      <Row>
        {expand && selectedItemObject && (
          <div className="set-list-width param-align left-padding-2">
            <div className="tooltip">
              <ToolTipComponenet tooltipName={selectedDropDownItem} />
            </div>
            <div className="left-align-list set-list-width">
              <NestedParameters
                json={selectedItemObject}
                keyName={selectedDropDownItem}
              />
            </div>
          </div>
        )}
      </Row>
    </React.Fragment>
  );
}
