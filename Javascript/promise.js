const readFilePromise= function(FileName){
    return new Promise((resolve,reject)=>{
        fs.readFile(FileName,(err,data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
const fuuuFileName = path.resolve(_dirname,'../data2.json')
const result = readFilePromise(fullFileName)
result.then(data=>{
    console.log(data)
    return JSON.parse(data).a
}).then(a =>{
    console.log(a)
}).catch(err=>{
    console.log(err)// catch能接收readFilePromise中触发的reject，还能接收reject中的参数
})

