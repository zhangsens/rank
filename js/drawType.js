import personal from "./personal"

const drawType = function(characters, ctx) {
    this.characters = characters;
    this.ctx = ctx;
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
    rectangle: function() {
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.fillStyle = this.characters[i].color;
            this.ctx.fillRect(this.characters[i].x, this.characters[i].y, 20, 700 - this.characters[i].y)
        }
    },
    pie: function() {},
    timg: function() {},
    test: function() {
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.fillStyle = `hsla(${i*360/this.characters.length},80%,50%,1)`;
            this.ctx.fillText(`${this.characters[i].data.chn_name}:${this.characters[i].data.ballot_sum}票`, 0, (i + 0.25) * 40 + 800);
            this.ctx.fillText(`有${this.characters[i].data.real_love_num}人和你抢老婆`, 0, (i + 0.75) * 40 + 800);
        }
    }
}

export default drawType;