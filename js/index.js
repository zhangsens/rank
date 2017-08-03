import React from "react"
import ReactDOM from "react-dom"
import {data} from "./data.js"
import draw from "./draw.js"

var Conponent = React.createClass({
    render : function(){
        return (
            <div>
                <p>rank:</p>
                <canvas id="cv" width="800" height="2000"></canvas>
            </div>
        )
    }
})

ReactDOM.render(
    <Conponent></Conponent>, 
    document.querySelector("#app")
);

const ctx = cv.getContext("2d");
data().then(function(value){
    //这里处理数据
    draw(ctx,value);
},function(value){
    console.log(value);
})