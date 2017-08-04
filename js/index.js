// import React from "react"
// import ReactDOM from "react-dom"
import {data} from "./data.js"
import draw from "./draw.js"

// var Conponent = React.createClass({
//     render : function(){
//         return (
//             <div>
//                 <p>rank:</p>
//                 <canvas id="cv" width="1000" height="2000"></canvas>
//             </div>
//         )
//     }
// })

// ReactDOM.render(
//     <Conponent></Conponent>, 
//     document.querySelector("#app")
// );
const cv = document.createElement("canvas");
document.querySelector("#app").appendChild(cv);
cv.width = 1000;
cv.height = 2000;

const ctx = cv.getContext("2d");
data().then(function(value){
    //这里处理数据
    new draw(ctx,value);
},function(value){
    console.log(value);
})