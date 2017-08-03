import drawType from "./drawType"
import personal from "./personalDetail"

const draw = function(ctx, data) {
    console.log(data.result);

    new drawType(data.result, ctx)["line"]();

    if (0) {
        requestAnimationFrame(draw);
    }
}

export default draw;