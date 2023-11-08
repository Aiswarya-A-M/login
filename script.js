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
    addDeatails(username,email,phoneNumber,password);
    return true;
}

function validateDetails(event){
    event.preventDefault();
    const existingusername=document.getElementById("existingusername").value;
    const existingPassword=document.getElementById("existingPassword").value;
    const userExist=userDetails.filter(obj=>obj.userEmail===existingusername);
    if (userExist[0].userPassword === existingPassword){
        const user=userExist[0].userName;
        const idString=userExist[0].id;
        const userNameid="userName"+idString;
        const cookieExist=getCookie(userNameid);
        if(cookieExist===null){
            setCookie(userNameid,user,1);
        }
        
         window.location.href = "http://127.0.0.1:5500/dashboard.html";
        // console.log(todate);
        // const tomorrow = 
        // console.log("hi",tomorrow.toString())
        // document.cookie=`username:${user}; expires:${tomorrow};path/`;
        
    }
    else{
        console.log("incorrect")
    }
}
function usernameValid(username){
    const usernamePattern=/^[a-zA-Z ]{3,30}$/;
    console.log(username)
    if(usernamePattern.test(username)){
        console.log("ji")
        return true;
    }else{
        return false;
    }
}
function emailValid(email){
    const emailPattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log(email);
    if(emailPattern.test(email)){
        console.log("ji")
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

function getCookie(userNameid){
    console.log(userNameid);
    const cookieExist=document.cookie;
    const cookieArr=cookieExist.split(";");
    
    console.log(cookieArr);
    cookieArr.forEach(element=>{
        // console.log(element.indexOf(userNameid))
        const elementArr=element.split("=");
        console.log(elementArr[0]);
        let index=0;
        if (elementArr[0]===' '+userNameid){
            console.log("find",userNameid);
            index=1;
        }
        if (index===1){
            console.log(index);
            return 1;
        }
    })
    console.log("not")
    return null
    //console.log(cookieArr.indexOf(userNameid));
}

function setCookie(name,userNameid,dayslive){
    const todate=new Date();
    todate.setTime(todate.getTime()+(dayslive*24*60*60*1000));
    let expiryDate="expires="+todate.toUTCString();
    document.cookie=`${name}=${userNameid};${expiryDate}; path/`
    console.log(document.cookie);
}

function addDeatails(username,email,phoneNumber,password){
    // let userDetails=JSON.parse(localStorage.getItem("userDetails"))||[];
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
    console.log(userDetails);
    signinForm();
}