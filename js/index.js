import React from "react"
import ReactDOM from "react-dom"
import { Broad } from "./broad.js"
import { PersonalDetail } from "./personal_Detail"
import { data } from "./data.js"
import draw from "./draw.js"

ReactDOM.render(
    <Broad></Broad>, 
    document.querySelector("app-canvas")
);

ReactDOM.render(
    <PersonalDetail></PersonalDetail>,
    document.querySelector("app-person")
)

const ctx = cv.getContext("2d");
data().then(function(value) {
    //这里处理数据
    new draw(ctx, value);
}, function(value) {
    console.log(value);
});