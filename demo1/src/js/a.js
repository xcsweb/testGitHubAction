function get(){
    return new Promise((resolve,reject)=>{
        resolve("2222")
    })
}
get().then((e)=>{
    console.log(e)
})