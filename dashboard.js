const cookieExist = document.cookie;
const cookieDetails = cookieExist.split("=");
console.log("hi");
console.log(cookieDetails[1]);
if (!cookieDetails[1]) {
  console.log("hloi");
  // window.location.href = "http://127.0.0.1:5500/index.html";
  window.location.href="/login/index.html";
  window.location.href="/login/index.html";
  console.log("checking");
}

document.querySelector("#nameOfUser").innerHTML = cookieDetails[1];
console.log("to delete")
function deleteCookie() {
  console.log("inside delete");
  document.cookie =
    cookieDetails[0] + "=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;";
  //window.location.href = "http://127.0.0.1:5500/index.html";
  window.location.href="/login/index.html";
    cookieDetails[0] + "=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;";
  window.location.href="/login/index.html";
  console.log("end of delete");
}
