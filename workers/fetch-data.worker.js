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
    const decoder = new TextDecoder('utf-8');
    const promise = new Promise((resolve,reject)=>{
        fetch(url).then(async (response)=>{
            if(response.ok){
                if(format=="jsonl"){
                    const jsonRows = [];
                    let bufferString = "";
                    const reader = response.body.getReader();
                    let readDone = false;
                    do{
                        await reader.read().then(({value,done})=>{
                            readDone = done;
                            const chunk = decoder.decode(value);
                            const chunkLength = chunk.length;
                            for(let i=0;i<chunkLength;i++){
                                const currentChar = chunk.charAt(i);
                                if(currentChar=="\n"){
                                    jsonRows.push(JSON.parse(bufferString));
                                    bufferString="";
                                }else{
                                    bufferString+=currentChar;
                                }
                            }
                        })
                    }while(!readDone);
                    if(bufferString.length>0){
                        jsonRows.push(JSON.parse(bufferString));
                    }
                    resolve(jsonRows);
                }else if(format=="json"){
                    resolve(JSON.parse(response.text()))
                }
                
            }else{
                throw Error("Invalid response");
            }
        }).catch((error)=>{
            reject(error);
        });
    });
    return promise;
}