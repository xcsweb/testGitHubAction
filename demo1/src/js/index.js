import "../css/index.css";
import "../css/body.scss";
console.log(1)
console.log(2)
import "./a.js"
if(module.hot){
    module.hot.accept("./a.js",()=>{
        console.log("ajs 加载完成")
    })
}