const personalDetail = function(data) {
    this.data = data;
    this.personal = document.createElement("div");
    document.body.appendChild(this.personal);
    //0:display,1:position,2:width,3:height,4:top,5:left,
    this.style = ["", "absolute", 250, 400, 0, 0];
    this.personal.style = `
    display:${this.style[0]};
    position:${this.style[1]};
    width:${this.style[2]}px;
    height:${this.style[3]}px;
    top:${this.style[4]};
    background-color:#000;
    left:${this.style[5]};`;
}

personalDetail.prototype = {
    show: function(e) {
        this.style[0] = "";
        this.style[4] = e.clientY - 15;
        this.style[5] = e.clientX + this.style[2] > window.innerWidth ? window.innerWidth - this.style[2] + 15 : e.clientX + 15;
        this.personal.style = `
        display:${this.style[0]};
        position:${this.style[1]};
        width:${this.style[2]}px;
        height:${this.style[3]}px;
        top:${this.style[4]};
        background-color:#000;
        left:${this.style[5]};`;
    },
    hide: function() {
        this.style[0] = "";
        this.personal.style = `
        display:${this.style[0]};
        position:${this.style[1]};
        width:${this.style[2]}px;
        height:${this.style[3]}px;
        top:${this.style[4]};
        background-color:#000;
        left:${this.style[5]};`;
    }
}

export default personalDetail