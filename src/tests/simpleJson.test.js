import React, { useEffect } from "react";
import { getByText, getRoles, render, screen } from "@testing-library/react";
import NestedParameters from "../components/NestedParameters/NestedParameters";
import userEvent from "@testing-library/user-event";

import sampleJson from "../mocks/jsonschema.json";
import { Select } from "carbon-components-react";

describe("Simple json", () => {
  test("renders json schema properties", () => {

    const container = render(<NestedParameters json={sampleJson}/>);    
    expect(screen.getByText("username")).toBeInTheDocument();
    //expect(screen.getByText("Example: ")).toBeInTheDocument();
    

    expect((screen.getByTestId("username-minLength")).toBeInTheDocument);
    const minLengthUserName = screen.getByTestId("username-minLength");
    expect(minLengthUserName).toHaveTextContent("minLength: 4");
    expect(screen.getByTestId("username-example")).toHaveTextContent(`Example: "John78"`);

    //"Verify boolean property and example"
      expect(screen.getByText("considerSafetyStock")).toBeInTheDocument();
      expect((screen.getByTestId("considerSafetyStock-default")).toBeInTheDocument);
      expect(screen.getByTestId("considerSafetyStock-default")).toHaveTextContent("Default: true");
      expect(screen.getByTestId("considerSafetyStock-example")).toHaveTextContent(`Example: false`);

      //password
    //"Verify boolean property and example"
    expect(screen.getByText("password")).toBeInTheDocument();
   // expect(screen.getByText("string(password)")).toBeInTheDocument();
    expect(screen.getByTestId("password-minLength")).toHaveTextContent(`minLength: 8`);  
    expect(screen.getByTestId("password-example")).toHaveTextContent(`Example: "drowssaP123"`);   
    expect(screen.getByTestId("password-pattern")).toHaveTextContent(`pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/`);     
    

  });
  test("Verify oneOf", () => {
  const container = render(<NestedParameters json={sampleJson}/>);
  const property1 = screen.getByText("pet{}");
  expect(property1).toBeInTheDocument();
  
  userEvent.click(property1);
  //on click id is expanded
  expect(property1).toHaveClass("arrow-down");

 const oneOfComponent = screen.getByText("oneOf");
  expect(oneOfComponent).toBeInTheDocument;

userEvent.click(oneOfComponent);
  //clicko n oneOf

  expect(oneOfComponent).toHaveClass("arrow-down");
  //after clicking oneOf  below properties are displayed
  expect(screen.getByText("id{}")).toBeInTheDocument;
  expect(screen.getByText("category{}")).toBeInTheDocument;
  expect(screen.getByText("photoUrls[]")).toBeInTheDocument;
  // expect(screen.getByTestId("photoUrls-required")).toHaveTextContent('REQUIRED');
  //expect(screen.getByTestId("photoUrls-type")).toHaveTextContent('array');
  expect(screen.getByText("name")).toBeInTheDocument;
  expect(screen.getByTestId("name-required")).toHaveTextContent('REQUIRED');
  expect(screen.getByTestId("name-type")).toHaveTextContent('string');
  expect(screen.getByTestId("name-example")).toHaveTextContent('Example: "Guru"');

  expect(screen.getByText("status")).toBeInTheDocument;
  expect(screen.getByTestId("status-type")).toHaveTextContent('string');
  expect(screen.getByTestId("status-allowedValues")).toHaveTextContent('Allowed values : [available ,pending ,sold]');
})
test("Verify oneOf selcet option", () => {
  const container = render(<NestedParameters json={sampleJson}/>);
  const property1 = screen.getByText("pet{}");
  expect(property1).toBeInTheDocument();
  
  userEvent.click(property1);
  //on click id is expanded
  expect(property1).toHaveClass("arrow-down");
 const oneOfComponent = screen.getByText("oneOf");
  expect(oneOfComponent).toBeInTheDocument;

userEvent.click(oneOfComponent);
 

  const dropDownSelect = screen.getByRole('listbox');
  expect(dropDownSelect).toBeInTheDocument;
userEvent.type(dropDownSelect,"Tag");
const idTag = screen.getByText("id{}");
expect(idTag).toBeInTheDocument;
userEvent.click(idTag);
expect(idTag).toBeInTheDocument;
const desc = screen.getAllByTestId("id-description");
expect(desc[1]).toHaveTextContent('Tag ID');
 /* const oneOfComponent =  screen.getAllByText((content, node) => {
    return ((node) => node.textContent === "oneOf");
  });
 */ 
expect(screen.getByText("name")).toBeInTheDocument;
expect(screen.getByTestId("name-type")).toHaveTextContent('string');

})
});
