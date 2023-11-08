// document.cookie="username:aiswarya;expires:"
// const todate=new Date();
// console.log(todate)
// const time=todate.getDate()+1;
// // const time=todate.getTime()
// console.log(time)
const cookieExist=document.cookie;
console.log("my cookie",document.cookie)
const cookieDeatails=cookieExist.split("=")
console.log(cookieDeatails);
console.log(cookieDeatails[1]);
if (cookieDeatails[1]===undefined){
    window.location.href = "http://127.0.0.1:5500/index.html";
}
document.getElementById("nameOfUser").value=cookieDeatails[1];
function deleteItem(){
    document.cookie = cookieDeatails[0] +'=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;';
    window.location.href = "http://127.0.0.1:5500/index.html";
}