const crypt={
    secret:"CIPHERKEY",
    encrypt : clear => {
        const cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
        return cipher.toString();
      },
    decrypt : cipher => {
        const decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
        return decipher.toString(CryptoJS.enc.Utf8);
      }
};
const cookieExist=document.cookie;
const userCookieDeatail=cookieExist.split("=")
if(userCookieDeatail.length===1){
    let userDetails=JSON.parse(localStorage.getItem("userDetails"))||[];
    function signupForm(){

        document.getElementById("signup").style.display="block";
        document.getElementById("login").style.display="none";
    }
    function signinForm(){
        document.getElementById("signup").style.display="none";
        document.getElementById("login").style.display="block";
    }
    function validateForm(event){
        event.preventDefault();
        const username=document.getElementById("username").value;
        const email=document.getElementById("email").value;
        const phoneNumber=document.getElementById("phonenumber").value;
        const password=document.getElementById("password").value;
        let encriptedPassword = crypt.encrypt(password);
        if (!usernameValid(username)){
            alert("Name should contain atleast 3 letters");
            return false;
        }
        if (!emailValid(email) || !emailNotExist(email)){
            alert("invalid email");
            return false;
        }
        if (!passwordValid(password)){
            alert("password should contain atlest 8characters including one uppercase,number and special character");
            return false;
        }
        if(!phoneNumberValid(phoneNumber) ||!phonenumNotExist(phoneNumber) ){
            alert("phone number should contain 10 numbers")
            return false;
        }
        addDeatails(username,email,phoneNumber,encriptedPassword);
        return true;
    }

    function validateDetails(event){
        event.preventDefault();
        const existingusername=document.getElementById("existingusername").value;
        const existingPassword=document.getElementById("existingPassword").value;
        const userExist=userDetails.filter(obj=>obj.userEmail===existingusername);
        const decriptPassword=crypt.decrypt(userExist[0].userPassword);
        if (decriptPassword === existingPassword){
            const user=userExist[0].userName;
            const idString=userExist[0].id;
            const userNameid="userName"+idString;
            const cookieExist=document.cookie;
            setCookie(userNameid,user,1);
            window.location.href = "http://127.0.0.1:5500/dashboard.html";   
        }
        else{
            alert("password is incorrect");
        }
    }
    function usernameValid(username){
        const usernamePattern=/^[a-zA-Z ]{3,30}$/;
        if(usernamePattern.test(username)){
            return true;
        }else{
            return false;
        }
    }
    function emailValid(email){
        const emailPattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(emailPattern.test(email)){
            return true;
        }else{
            return false;
        }
    }
    function passwordValid(password){
        if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password)
        ) {
            return true;
        }
        else{
            return false;
        }

    }
    function phoneNumberValid(phoneNumber){
        const numberPattern= /^\d{10}$/;
        if (numberPattern.test(phoneNumber)){
            return true;
        }else{
            return false;
        }
    }
    function emailNotExist(email){
        const userExist=userDetails.findIndex(obj=>obj.userEmail===email)
        if (userExist!==-1){
            alert("email already exist")
            return false;
        }
        else {
            return true;
        }
    }
    function phonenumNotExist(phoneNumber){
        const userExist=userDetails.findIndex(obj=>obj.userNumber===phoneNumber)
        if (userExist!==-1){
            alert("phonenumber already exist")
            return false;
        }
        else {
            return true;
        }
    }

    function setCookie(name,userNameid,dayslive){
        const todate=new Date();
        todate.setTime(todate.getTime()+(dayslive*24*60*60*1000));
        let expiryDate="expires="+todate.toUTCString();
        document.cookie=`${name}=${userNameid};${expiryDate}; path/`
    }

    function addDeatails(username,email,phoneNumber,password){
        let id;
        if (userDetails.length===0){
            id=1
        }else{
            id=userDetails[userDetails.length-1].id+1
        }   
        newUser={
            id:id,
            userName:username,
            userEmail:email,
            userNumber:phoneNumber,
            userPassword:password
        }
        userDetails.push(newUser);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        signinForm();
    }
}
else{
    window.location.href = "http://127.0.0.1:5500/dashboard.html"
}
