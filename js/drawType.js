const drawType = function(data, ctx) {
    this.data = data;
    this.ctx = ctx
}

drawType.prototype = {
    line: function() {
        console.log(this.ctx);
        console.log(this.data);
        for (let i = 0; i < this.data.length; i++) {
            if (i == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(i * 20 + 100, 0);
                this.ctx.lineTo(i * 20 + 100, 100);
                this.ctx.strokeStyle = `hsla(${i*360/this.data.length},80%,50%,1)`;
                this.ctx.stroke();
            } else {
                this.ctx.beginPath();
                this.ctx.moveTo(i * 20 + 80, (this.data[0].ballot_ratio - this.data[i - 1].ballot_ratio) / 10);
                this.ctx.lineTo(i * 20 + 100, (this.data[0].ballot_ratio - this.data[i].ballot_ratio) / 10);
                this.ctx.strokeStyle = `hsla(${i*360/this.data.length},80%,50%,1)`;
                this.ctx.stroke();
            }
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