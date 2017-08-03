import drawType from "./drawType"
import personal from "./personalDetail"

function draw(ctx, data) {
    console.log(data.result);

    for (let i = 0; i < data.result.length; i++) {
        ctx.fillStyle = `hsla(${i*360/data.result.length},80%,50%,1)`;
        ctx.fillText(`${data.result[i].chn_name}:${data.result[i].ballot_sum}票`, 0, (i + 0.25) * 40);
        ctx.fillText(`有${data.result[i].real_love_num}人和你抢老婆`, 0, (i + 0.75) * 40);
    }

    if (0) {
        requestAnimationFrame(draw);
    }
}

export default draw;