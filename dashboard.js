console.log("hi");
const cookieExist = document.cookie;
console.log(cookieExist);
const cookieDetails = cookieExist.split("=");
console.log(cookieDetails);
console.log(cookieDetails[1]);
if (!cookieDetails[1]) {
  console.log("hloi");
  window.location.href="/login/index.html";
  console.log("checking");
}

document.querySelector("#nameOfUser").innerHTML = cookieDetails[1];
console.log("to delete")
function deleteCookie() {
  console.log("inside delete");
  console.log("before delete",document.cookie);
  document.cookie = 'userName' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  console.log("after delete",document.cookie);
  window.location.href="/login/index.html";
  console.log("end of delete");
}
