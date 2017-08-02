import React from "react"
import ReactDOM from "react-dom"
import {data} from "./data.js"

var Conponent = React.createClass({
    render : function(){
        return (
            <div>
                <canvas id="cv" width="800" height="800"></canvas>
            </div>
        )
    }
})

ReactDOM.render(
    <Conponent></Conponent>, 
    document.querySelector("#app")
);

data().then(function(value){
    //这里处理数据
    console.log(value);
})