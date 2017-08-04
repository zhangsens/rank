const personal = function(data) {
    this.data = data;
    console.log(data);
}

personal.prototype = {
    draw: function() {}
}

export default personal