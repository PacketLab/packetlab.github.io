self.addEventListener("message",function(e){
    const data = e.data;
    if(data.status=="load" && data.url!=null){
        const dataPromises = [];
        const dataKeys = Object.keys(data.url);
        dataKeys.forEach((key)=>{
            dataPromises.push(fetchDataFromURL(data.url[key]));
        });
        Promise.all(dataPromises).then((data)=>{
            const aggData = {};
            data.forEach((result, i)=>{
                aggData[dataKeys[i]] = result;
            })
            self.postMessage({
                "status":"finished",
                "message":aggData
            })
        })
    }else{
        self.postMessage({
            "status":"error",
            "message":"Invalid arguments"
        })
    }
})

function fetchDataFromURL(source){
    const url = source.url;
    const format = source.format;
    const promise = new Promise((resolve,reject)=>{
        fetch(url).then((response)=>{
            if(response.ok){
                return response.text();
            }else{
                throw Error("Invalid response");
            }
        }).then((response_text)=>{
            if(format=="jsonl"){
                // Split text into rows at new line
                const dataRows = response_text.split("\n")
                // Remove empty string on last row
                if(dataRows[dataRows.length-1].length==0){
                    dataRows.pop();
                }
                const jsonDataRows = dataRows.map(row=>JSON.parse(row));
                resolve(jsonDataRows);
            }else if(format=="json"){
                resolve(JSON.parse(response_text))
            }
            

        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}