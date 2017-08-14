const personalDetail = function() {
    this.personal = document.createElement("div");
    document.body.appendChild(this.personal);
    this.personal.appendChild(new Image());
    this.personal.appendChild(document.createElement("div"));
    //0:display,1:position,2:width,3:height,4:top,5:left,
    this.style = ["none", "absolute", 250, 400, 0, 0];
    this.personal.style = `
    display:${this.style[0]};
    position:${this.style[1]};
    width:${this.style[2]}px;
    height:${this.style[3]}px;
    top:${this.style[4]};
    background-color:hsla(1,100%,100%,1);
    left:${this.style[5]};`;
}

personalDetail.prototype = {
    show: function(e) {
        this.style[0] = "block";
        this.style[4] = e.offsetY + 70 > document.body.scrollTop ? e.offsetY + 70 : document.body.scrollTop;
        this.style[5] = e.offsetX + this.style[2] + 50 > window.innerWidth ? window.innerWidth - this.style[2] + 15 : e.clientX + 15;
        this.personal.style = `
        display:${this.style[0]};
        position:${this.style[1]};
        width:${this.style[2]}px;
        height:${this.style[3]}px;
        top:${this.style[4]};
        background-color:hsla(1,100%,100%,1);
        left:${this.style[5]};`;
    },
    hide: function() {
        this.style[0] = "none";
        this.personal.style = `
        display:${this.style[0]};
        position:${this.style[1]};
        width:${this.style[2]}px;
        height:${this.style[3]}px;
        top:${this.style[4]};
        background-color:hsla(1,100%,100%,1);
        left:${this.style[5]};`;
    }
}

export default personalDetail