function data() {
    return (new Promise(
        function(resole, reject) {
            $.post("/data", [], function(data) {
                if (data) {
                    resole(JSON.parse(data));
                } else {
                    reject(0)
                }
            })
        }
    ))
}

export { data }