self.addEventListener("message",function(e){
    const data = e.data;
    if(data.status=="load" && data.url!=null){
        fetchDataFromURL(data.url).then((data)=>{
            self.postMessage({
                "status":"finished",
                "message":data
            })
        })
    }else{
        self.postMessage({
            "status":"error",
            "message":"Invalid arguments"
        })
    }
})

function fetchDataFromURL(url){
    const promise = new Promise((resolve,reject)=>{
        fetch(url).then((response)=>{
            if(response.ok){
                return response.text();
            }else{
                throw Error("Invalid response");
            }
        }).then((response_text)=>{
            // Split text into rows at new line
            const dataRows = response_text.split("\n")
            // Remove empty string on last row
            if(dataRows[dataRows.length-1].length==0){
                dataRows.pop();
            }
            const jsonDataRows = dataRows.map(row=>JSON.parse(row));
            resolve(jsonDataRows);

        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}