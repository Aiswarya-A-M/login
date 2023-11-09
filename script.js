const cookieExist = document.cookie;
const userCookieDetail = cookieExist.split("=");

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

if (userCookieDetail.length) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  function signupForm() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
  }

  function signinForm() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  function validateForm(event) {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phonenumber").value;
    const password = document.getElementById("password").value;
    const encryptedPassword = crypt.encrypt(password);

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
    return true;
  }

  function validateDetails(event) {
    event.preventDefault();
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const userExist = userDetails.filter((obj) => obj.userEmail == loginEmail);
    const decryptPassword = crypt.decrypt(userExist[0].userPassword);

    if (decryptPassword === loginPassword) {
      const user = userExist[0].userName;
      setCookie("userName", user, 1);
      document.getElementById("login").reset();
      window.location.href = "/login/dashboard.html";
    } else {
      alert("password is incorrect");
    }
  }

  function userNameValid(userName) {
    const userNamePattern = /^[a-zA-Z ]{3,30}$/;
    return userNamePattern.test(userName);
  }

  function emailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function passwordValid(password) {
    return (
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    );
  }

  function phoneNumberValid(phoneNumber) {
    const numberPattern = /^\d{10}$/;
    return numberPattern.test(phoneNumber);
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

  function setCookie(name, userName, dayslive) {
    const todate = new Date();
    todate.setTime(todate.getTime() + dayslive * 24 * 60 * 60 * 1000);
    const expiryDate = "expires=" + todate.toUTCString();
    document.cookie = `${name}=${userName};${expiryDate}; path/`;
  }

  function addDetails(userName, email, phoneNumber, password) {
    const id = userDetails.length + 1;
    newUser = {
      id,
      userName: userName,
      userEmail: email,
      userNumber: phoneNumber,
      userPassword: password,
    };

    userDetails.push(newUser);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    signinForm();
  }
} else {
  window.location.href = "/login/dashboard.html";
}
