import drawType from "./drawType"
import personalDetail from "./personalDetail"
import personal from "./personal"

const draw = function(ctx, data) {
    this.data = data.result;
    this.ctx = ctx;
    console.log(data);
    this.characters = [];

    for (let i = 0; i < this.data.length; i++) {
        let x = i * 20 + 100;
        let y = i == 0 ? 100 : (this.data[0].ballot_ratio - this.data[i - 1].ballot_ratio) / 2 + 100;
        let r = 1;
        let color = `hsla(${i*360/this.data.length},80%,50%,1)`;
        let character = new personal(this.data[i], x, y, r, color);
        character.nX = 800;
        character.nY = (i + 1) * 20 + 100;
        this.characters.push(character);
    }

    this.draw();
    new drawType(this.characters, this.ctx)["test"]();

    if (0) {
        requestAnimationFrame(this);
    }
}

draw.prototype = {
    chart: function() {

        this.ctx.strokeStyle = `hsla(200,80%,60%,1)`;
        this.ctx.moveTo(100, 50);
        this.ctx.lineTo(100, 700);
        this.ctx.lineTo(750, 700);
        this.ctx.stroke();

        this.ctx.strokeStyle = `hsla(0,0%,0%,0.5)`;
        for (let i = 0; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.lineTo(100, 100 * (i + 1));
            this.ctx.lineTo(700, 100 * (i + 1));
            this.ctx.stroke();
        }
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineTo(100 + (i + 1) * 20, 100);
            this.ctx.lineTo(100 + (i + 1) * 20, 700);
            this.ctx.stroke();
            this.ctx.fillStyle = this.characters[i].color;
            this.ctx.translate(90 + (i + 1) * 20, 720);
            this.ctx.rotate(Math.PI * 4 / 9);
            this.ctx.fillText(this.data[i].chn_name, 0, 0);
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
            this.ctx.fillStyle = this.characters[i].color;
            this.ctx.fillText(this.characters[i].data.chn_name, this.characters[i].nX, this.characters[i].nY);
        }
    },
    draw: function() {
        var max = 0;
        for (let i = 0, t = 0, v = 0; t < 1; i++) {
            v = this.characters[0].data.ballot_sum / Math.pow(10, i);
            if (v > 1) {
                max = Math.floor(v) * Math.pow(10, i);
                t = 0;
            } else {
                t = 1;
            }
        }
        max = Math.ceil(max / 6) * 6;

        this.chart();
        this.rang(0, max);
        this.list();

        new drawType(this.characters, this.ctx)["rectangle"]();
        // new personalDetail(this.data);
    }
}

export default draw;