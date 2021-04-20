import React from "react";
import classes from "./Form.module.css";

const form = (props) => {
  return (
    <div>
      <div style={{ marginBottom: "10px", paddingBottom: "10px" }}>
        <strong>Note: </strong>If you click on add Root above, you will not be
        able to add another child here. Clicking on add root will start afresh
        and you can add another root.
      </div>
      <div style={{ borderTop: "1px solid black", padding: "30px 0" }}>
        Add a {props.nodeType} name below for this root and click on submit{" "}
        {props.nodeType}
      </div>
      <div className={classes.formContainer}>
        <label>Add a {props.nodeType}</label>
        <input
          type="text"
          placeholder={"Add a " + props.nodeType}
          onChange={props.addRootNameChangeHandler}
          value={props.rootName}
        />
        <button className="add-root-button" onClick={props.submitRootHandler}>
          Submit {props.nodeType}
        </button>
      </div>
    </div>
  );
};

export default form;
