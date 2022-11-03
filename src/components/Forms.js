import React from "react";
import FormContainer from "./FormContainer";

function Forms() {
  return (
    <div className="form">
      <div className="form-container">
        <div className="header"></div>
        <div className="body">
          <FormContainer />
        </div>
      </div>
    </div>
  );
}

export default Forms;