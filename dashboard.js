const cookieExist = document.cookie;
const cookieDeatails = cookieExist.split("=");
console.log("hi");
console.log(cookieDeatails[1]);
if (!cookieDeatails[1]) {
  console.log("hloi");
  // window.location.href = "http://127.0.0.1:5500/index.html";
  window.location.href="/login/index.html";
}

document.querySelector("#nameOfUser").innerHTML = cookieDeatails[1];

function deleteCookie() {
  console.log("inside delete");
  document.cookie =
    cookieDeatails[0] + "=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;";
  //window.location.href = "http://127.0.0.1:5500/index.html";
  window.location.href="/login/index.html";
  console.log("end of delete");
}
