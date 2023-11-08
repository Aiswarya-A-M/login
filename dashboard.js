const cookieExist=document.cookie;
const cookieDeatails=cookieExist.split("=")
if (cookieDeatails[1]===undefined){
    window.location.href = "https://aiswarya-a-m.github.io/login/";
}
document.querySelector("#nameOfUser").innerHTML=cookieDeatails[1];
function deleteItem(){
    document.cookie = cookieDeatails[0] +'=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;';
    window.location.href = "https://aiswarya-a-m.github.io/login/";
}