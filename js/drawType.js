const drawType = function(characters, ctx) {
    this.characters = characters;
    this.ctx = ctx;
    this.width = this.ctx.canvas.width - 200;
    this.height = this.ctx.canvas.width;
}

drawType.prototype = {
    line: function(attr, rang) {
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
    rectangle: function(attr, rang) {
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.fillStyle = this.characters[i].color;
            let y = this.characters[i].data[attr] / rang;
            let m = this.characters[i].fontSize == 10 ? 0 : 1;
            this.ctx.save();
            this.ctx.font = this.characters[i].fontSize + "px Arial";
            this.ctx.fillRect(this.characters[i].x - 5 * m, 600 * (1 - y) + 100 - 10 * m, 20 + 10 * m, 600 * y + 10 * m);
            this.ctx.translate(this.characters[i].x, 720);
            this.ctx.rotate(Math.PI * 4 / 9);
            this.ctx.fillText(this.characters[i].data.chn_name, 0, 0);
            this.ctx.restore();
            this.ctx.font = "10px Arial";
            this.ctx.fillStyle = `hsla(0,0%,0%,1)`;
            this.ctx.fillText(this.characters[i].data[attr], this.characters[i].x - 10, 600 * (1 - y) + 100);
        }
    },
    timg: function(attr, rang) {},
    test: function() {
        for (let i = 0; i < this.characters.length; i++) {
            this.ctx.fillStyle = `hsla(${i*360/this.characters.length},80%,50%,1)`;
            this.ctx.fillText(`${this.characters[i].data.chn_name}:${this.characters[i].data.ballot_sum}票`, 0, (i + 0.25) * 40 + 800);
            this.ctx.fillText(`有${this.characters[i].data.real_love_num}人和你抢老婆`, 0, (i + 0.75) * 40 + 800);
        }
    }
}

export default drawType;