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
  // window.location.href="/login/index.html"; 
  console.log("inside delete");
  console.log("before delete",document.cookie);
  document.cookie = 'userName' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  // document.cookie = cookieDetails[0] + "=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;";
  console.log("after delete",document.cookie);
  console.log("end of delete");
}
