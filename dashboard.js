// document.cookie="username:aiswarya;expires:"
// const todate=new Date();
// console.log(todate)
// const time=todate.getDate()+1;
// // const time=todate.getTime()
// console.log(time)
const cookieExist=document.cookie;
const name1=cookieExist.split("=")
console.log(name1[1]);
if (name1[1]===undefined){
    window.location.href = "http://127.0.0.1:5500/index.html";
}
document.getElementById("nameOfUser").value=name1[1];
function deleteItem(){
    document.cookie = name1[0] +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "http://127.0.0.1:5500/index.html";
}