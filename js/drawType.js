const drawType = function(data) {
    this.data = data;
}

drawType.prototype = {
    line: function() {},
    rectangle: function() {},
    pie: function() {},
    timg: function() {}
}

export default drawType;