const crypt = {
  secret: "CIPHERKEY",
  encrypt: (clear) => {
    const cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    return cipher.toString();
  },
  decrypt: (cipher) => {
    const decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    return decipher.toString(CryptoJS.enc.Utf8);
  },
};
const cookieExist = document.cookie;
const userCookieDetail = cookieExist.split("=");
if (userCookieDetail.length) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  function signupForm() {
    console.log("hi");
    document.getElementById("login").style.display = "none";
    console.log("hey");
    document.getElementById("signup").style.display = "block";
  }
  function signinForm() {
    console.log("signup none")
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
    console.log("signin in")
  }
  function validateForm(event) {
    event.preventDefault();
    console.log("at validate form");
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phonenumber").value;
    const password = document.getElementById("password").value;
    let encryptedPassword = crypt.encrypt(password);
    if (!userNameValid(userName)) {
      document.getElementById("userName").style.borderColor = "red";
      alert(
        "Name should contain atleast 3 letters and numbers are not allowed"
      );
      document.getElementById("userName").style.borderColor = "white";
      return false;
    }
    if (!emailValid(email) || !emailNotExist(email)) {
      document.getElementById("email").style.borderColor = "red";
      alert("invalid email");
      document.getElementById("email").style.borderColor = "white";
      return false;
    }
    if (!passwordValid(password)) {
      document.getElementById("password").style.borderColor = "red";
      alert(
        "password should contain atlest 8characters including one uppercase,number and special character"
      );
      document.getElementById("password").style.borderColor = "white";
      return false;
    }
    if (!phoneNumberValid(phoneNumber) || !phonenumNotExist(phoneNumber)) {
      document.getElementById("phonenumber").style.borderColor = "red";
      alert("phone number should contain 10 numbers");
      document.getElementById("phonenumber").style.borderColor = "white";
      return false;
    }
    addDetails(userName, email, phoneNumber, encryptedPassword);
    document.getElementById("signup").reset();
    console.log("form validated");
    return true;
  }

  function validateDetails(event) {
    console.log("validating")
    event.preventDefault();
    const existingUserName = document.getElementById("existingUserName").value;
    console.log("exitname",existingUserName)
    const existingPassword = document.getElementById("existingPassword").value;
    const userExist = userDetails.filter(
      (obj) => obj.userEmail === existingUserName
    );
    console.log(typeof(userExist));
    console.log("my grp",userExist.userEmail);
    console.log("my name",userExist);
    const decryptPassword = crypt.decrypt(userExist[0].userPassword);
    console.log("decrypt",decryptPassword);
    if (decryptPassword === existingPassword) {
      console.log("passwrd find")
      const user = userExist[0].userName;
      const idString = userExist[0].id;
      const userNameid = "userName" + idString;
      setCookie(userNameid, user, 1);
      document.getElementById("login").reset();
      console.log("move")
      window.location.href="/login/dashboard.html";
    } else {
      alert("password is incorrect");
    }
  }
  function userNameValid(userName) {
    const userNamePattern = /^[a-zA-Z ]{3,30}$/;
    return (userNamePattern.test(userName)) 
  }
  function emailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (emailPattern.test(email)) 
  }
  function passwordValid(password) {
    return (
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    ) 
  }
  function phoneNumberValid(phoneNumber) {
    const numberPattern = /^\d{10}$/;
    return (numberPattern.test(phoneNumber));
  }
  function emailNotExist(email) {
    const userExist = userDetails.findIndex((obj) => obj.userEmail === email);
    if (userExist !== -1) {
      alert("email already exist");
      return false;
    } else {
      return true;
    }
  }
  function phonenumNotExist(phoneNumber) {
    const userExist = userDetails.findIndex(
      (obj) => obj.userNumber === phoneNumber
    );
    if (userExist !== -1) {
      alert("phonenumber already exist");
      return false;
    } else {
      return true;
    }
  }

  function setCookie(name, userNameid, dayslive) {
    const todate = new Date();
    todate.setTime(todate.getTime() + dayslive * 24 * 60 * 60 * 1000);
    let expiryDate = "expires=" + todate.toUTCString();
    document.cookie = `${name}=${userNameid};${expiryDate}; path/`;
  }

  function addDetails(userName, email, phoneNumber, password) {
    console.log("to add")
    let id;
      id = userDetails.length + 1;
    newUser = {
      id: id,
      userName: userName,
      userEmail: email,
      userNumber: phoneNumber,
      userPassword: password,
    };
    userDetails.push(newUser);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    console.log("added")
    signinForm();
  }
} else {
  window.location.href="/login/dashboard.html";
}
