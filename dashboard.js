const cookieExist = document.cookie;
const cookieDeatails = cookieExist.split("=");
console.log("hi");
console.log(cookieDeatails[1]);
if (!cookieDeatails[1]) {
  console.log("hloi");
  window.location.href="/login/index.html";
  console.log("checking");
}

document.querySelector("#nameOfUser").innerHTML = cookieDeatails[1];
console.log("to delete")
function deleteCookie() {
  console.log("inside delete");
  document.cookie =
    cookieDeatails[0] + "=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;";
  window.location.href="/login/index.html";
  console.log("end of delete");
}
