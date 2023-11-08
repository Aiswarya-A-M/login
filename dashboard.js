const cookieExist=document.cookie;
const cookieDeatails=cookieExist.split("=")
if (cookieDeatails[1]===undefined){
    window.location.href = "http://127.0.0.1:5500/index.html";
}
document.querySelector("#nameOfUser").innerHTML=cookieDeatails[1];
function deleteItem(){
    document.cookie = cookieDeatails[0] +'=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;';
    window.location.href = "http://127.0.0.1:5500/index.html";
}