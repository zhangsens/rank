import personal from "./personal"

const drawType = function(data, ctx) {
    this.data = data;
    this.ctx = ctx;
    this.characters = [];
    for (let i = 0; i < this.data.length; i++) {
        let x = i * 20 + 100;
        let y = i == 0 ? 100 : (this.data[0].ballot_ratio - this.data[i - 1].ballot_ratio) / 2 + 100;
        let r = 2;
        let color = `hsla(${i*360/this.data.length},80%,50%,1)`;
        let character = new personal(x, y, r, color);
        this.characters.push(character);
    }
}

drawType.prototype = {
    line: function() {
        for (let i = 0; i < this.characters.length; i++) {
            if (i == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.characters[i].x, this.characters[i].y);
            } else {
                this.ctx.beginPath();
                this.ctx.moveTo(this.characters[i - 1].x, this.characters[i - 1].y);
                this.ctx.lineTo(this.characters[i].x, this.characters[i].y);
            }
            this.ctx.arc(this.characters[i].x, this.characters[i].y, this.characters[i].r, 0, 2 * Math.PI);
            this.ctx.strokeStyle = this.characters[i].color;
            this.ctx.stroke();
        }

    },
    rectangle: function() {},
    pie: function() {},
    timg: function() {},
    test: function() {
        for (let i = 0; i < this.data.length; i++) {
            this.ctx.fillStyle = `hsla(${i*360/this.data.length},80%,50%,1)`;
            this.ctx.fillText(`${this.data[i].chn_name}:${this.data[i].ballot_sum}票`, 0, (i + 0.25) * 40);
            this.ctx.fillText(`有${this.data[i].real_love_num}人和你抢老婆`, 0, (i + 0.75) * 40);
        }
    }
}

export default drawType;