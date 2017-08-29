import drawType from "./drawType"
import personalDetail from "./personalDetail"
import personal from "./personal"

const draw = function(ctx, data) {
    this.data = data.result;
    this.data.sort(this.descending("ballot_sum"));
    this.ctx = ctx;
    this.width = this.ctx.canvas.width - 200;
    this.height = this.ctx.canvas.width;
    this.personalDetail = new personalDetail();
    this.characters = [];
    console.log(this.data);

    for (let i = 0; i < this.data.length; i++) {
        let x = i * (this.width - 200) / 30 + 100;
        let y = i == 0 ? 100 : (this.data[0].ballot_ratio - this.data[i - 1].ballot_ratio) / 2 + 100;
        let r = 1;
        let color = `hsla(${i*360/this.data.length},80%,50%,1)`;
        let character = new personal(this.data[i], x, y, r, color);
        character.nX = this.width;
        character.nY = (i + 1) * 20 + 100;
        character.radioX = this.width + 200 + i * 200;
        this.characters.push(character);
    }

    this.draw();
    new drawType(this.characters, this.ctx)["test"]();

    this.ctx.canvas.onmousemove = this.mousemove.bind(this);
}

draw.prototype = {
    ascending: function(attr) {
        return (a, b) => {
            return a[attr] - b[attr];
        }
    },
    descending: function(attr) {
        return (a, b) => {
            return b[attr] - a[attr];
        }
    },
    chart: function() {

        this.ctx.strokeStyle = `hsla(200,80%,60%,1)`;
        this.ctx.moveTo(100, 50);
        this.ctx.lineTo(100, 700);
        this.ctx.lineTo(this.width - 50, 700);
        this.ctx.stroke();

        this.ctx.strokeStyle = `hsla(0,0%,0%,0.5)`;
        for (let i = 0; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.lineTo(100, 100 * (i + 1));
            this.ctx.lineTo(this.width - 100, 100 * (i + 1));
            this.ctx.stroke();
        }
        for (let i = 0; i < 10; i++) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineTo(100 + (i + 1) * (this.width - 200) / 10, 100);
            this.ctx.lineTo(100 + (i + 1) * (this.width - 200) / 10, 700);
            this.ctx.stroke();
            this.ctx.fillStyle = this.characters[i].color;
            this.ctx.translate(90 + (i + 1) * 20, 720);
            this.ctx.rotate(Math.PI * 4 / 9);
            //this.ctx.fillText(this.data[i].chn_name, 0, 0);
            this.ctx.restore();
        }
    },
    rang: function(s, e) {
        var subtrahend = (e - s) / 6
        for (let i = 0; i < 7; i++) {
            this.ctx.fillText(e - i * subtrahend, 0, 100 * (i + 1));
        }
    },
    list: function() {
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.font = this.characters[i].fontSize + "px Arial";
            this.ctx.fillStyle = this.characters[i].color;
            this.ctx.fillText(this.characters[i].data.chn_name, this.characters[i].nX, this.characters[i].nY);
        }
    },
    //抢老婆广播
    radio: function() {
        this.ctx.clearRect(0, 1000, this.width + 200, 200);
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.fillStyle = `hsla(0,100%,0%,1)`;
            this.ctx.fillText(`${this.characters[i].data.chn_name}:${this.characters[i].data.ballot_sum}票`, this.characters[i].radioX, 1100);
            this.ctx.fillText(`有${this.characters[i].data.real_love_num}人和你抢老婆`, this.characters[i].radioX, 1120);
            this.characters[i].radioX--;
            if (this.characters[i].radioX < 0) {
                this.characters[i].radioX = this.data.length * 200;
            }
        }
    },
    draw: function() {
        var max = 0,
            pow = 0;
        for (let i = 0, t = 0, v = 0; t < 1; i++) {
            v = this.characters[0].data.ballot_sum / Math.pow(10, i);
            if (v > 10) {
                max = Math.floor(v) * Math.pow(10, i);
                t = 0;
                pow = i;
            } else {
                t = 1;
            }
        }
        max = Math.ceil(max / (6 * Math.pow(10, pow))) * (6 * Math.pow(10, pow));

        this.ctx.clearRect(0, 0, this.width + 200, 900);
        this.chart();
        this.rang(0, max);
        this.list();
        //this.radio();

        new drawType(this.characters, this.ctx)["rectangle"]("ballot_sum", max);


        //requestAnimationFrame(this.draw.bind(this));
    },
    mousemove: function(e) {

        var offsetX = e.offsetX;
        var offsetY = e.offsetY;
        var hide = true;
        var character = this.personalDetail.personal;
        var _post = new Object();

        for (let i = 0; i < this.characters.length; i++) {
            if (
                offsetX > this.characters[i].nX &&
                offsetX < this.characters[i].nX + 200 &&
                offsetY > this.characters[i].nY - 10 &&
                offsetY < this.characters[i].nY
            ) {
                hide = false;
                this.characters[i].fontSize = 15;
                this.personalDetail.show(e);
                _post.character_id = `${this.characters[i].data.character_id}`;
                _post.cover = `${this.characters[i].data.cover}`;

                if (character.dataset.id != _post.character_id) {

                    character.dataset.id = _post.character_id;
                    var ppp = 0
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open("POST", "/imgdata64", true);
                    xmlHttp.send(JSON.stringify(_post));
                    xmlHttp.onreadystatechange = function() {
                        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
                            if (xmlHttp.responseText) {
                                var res = JSON.parse(xmlHttp.responseText)
                                character.querySelector("img").src = `data:image/gif;base64,${res.cover}`;
                                character.querySelector("div").innerHTML = `
                                名字:${this.characters[i].data.chn_name},</br>
                                得票总数:${this.characters[i].data.ballot_sum},</br>
                                比率:${this.characters[i].data.ballot_ratio},</br>
                                性别:${this.characters[i].data.sex == 1?"女":"男"}</br>
                                `;
                            }
                        }
                    }.bind(this);
                };

            } else {
                this.characters[i].fontSize = 10;
            }
        }

        if (hide) {
            this.personalDetail.hide();
        }

        this.draw();
    },
    click: function() {},
    string: function(str) {
        return JSON.parse(str);
    }
}

export default draw;