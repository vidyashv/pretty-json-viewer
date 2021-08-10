import React from "react";
import "./App.scss";
import NestedParameters from "../src/components/NestedParameters/NestedParameters";
import jsonSchema from "../src/mocks/bigSchema.json";


function App() {


  return (
    <React.Fragment>
        <NestedParameters json={jsonSchema} />
    </React.Fragment>
  );
}

export default App;
