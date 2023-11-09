const cookieExist = document.cookie;
const cookieDetails = cookieExist.split("=");
console.log("hi");
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
  document.cookie = cookieDetails[0] + "=; Path=/; Expires=Thu, 21 Feb 2001 00:00:01 GMT;";
  console.log(document.cookie);
  window.location.href="/login/index.html"; 
  console.log("end of delete");
}
