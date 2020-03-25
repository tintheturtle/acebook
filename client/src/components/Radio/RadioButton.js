import React from "react";
import "./RadioButton.scss";

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input className="input-radio" id={props.id} onChange={props.changed} value={props.value} error={props.error} type="radio" checked={props.isSelected} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default RadioButton