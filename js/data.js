function data() {
    return (new Promise(
        function(resole, reject) {

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", "/data", false);
            xmlHttp.send(null);
            if (xmlHttp.responseText) {
                resole(JSON.parse(xmlHttp.responseText));
            } else {
                reject(0);
            }
            // async = true;
            // xmlHttp.onreadystatechange = function() {
            //     if (xmlHttp.status == 200) {
            //         if (xmlHttp.responseText) {
            //             resole(xmlHttp.responseText);
            //         }
            //     } else {
            //         reject("connect error");
            //     }
            // }

        }
    ))
}

export { data }