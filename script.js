function validateForm(){
    var username=document.getElementById("username").value;
    var email=document.getElementById("email").value;
    var phoneNumber=document.getElementById("phonenumber").value;
    var password=document.getElementById("password").value;
    console.log(username);
    if (email.trim() === '' || !isValidEmail(email) ||!isNotExisting(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!isValidPassword(password)) {
        alert("Password should contain at least one special character,at least 8 characters, at least one uppercase letter and one numbers .");
        return false;
    }
    if (!isValidPhoneNumber(phoneNumber)||!isNotExistingPhonenumber(phoneNumber)) {
        console.log("not true")
        return false;
    }
    addDetails();
    return true;
}

function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    console.log("out")
    console.log(password)
    if (
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password)
    ) {
        console.log("inside")
         return true;
    } else {
         return false;
    }
}

function isValidPhoneNumber(phoneNumber) {
    console.log(phoneNumber)
    var phoneNumberPattern = /^\d{10,}$/;
    return (phoneNumberPattern.test(phoneNumber));
}

function isNotExisting(email){
    let  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    const indexOfEmail=userDetails.findIndex(obj=>obj.email===email);
    if (indexOfEmail===-1){
        return true;
    }else{
        alert("the email is already exist");
    }  
}

function isNotExistingPhonenumber(phoneNumber){
    let  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    const indexOfPhonenum=userDetails.findIndex(obj=>obj.phoneNumber===phoneNumber);
    if (indexOfPhonenum===-1){
        return true
    }else{
        alert("the phonenumber is already exist");
    }  
}

function signupForm(){
    document.getElementById("signup").style.display="block";
    document.getElementById("login").style.display="none";
}

function validateDetails(event){
    event. preventDefault()
    let existingUserName=document.getElementById("existingusername").value;
    //alert(existingUserName)
    let existingPassword=document.getElementById("existingPassword").value;
    let  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    const userData=userDetails.filter(obj=>obj.email===existingUserName);
    let x=JSON.stringify(userData[0].password)    
        //alert(x);
        if(userData[0].password===existingPassword){
           document.getElementById("login").style.display="none";
           dashBoard(userData[0].username);
        }else{
         alert('Password is incorrect');
        }
}

function addDetails(){
    alert("hi")
    var username=document.getElementById("username").value;
    var email=document.getElementById("email").value;
    var phoneNumber=document.getElementById("phonenumber").value;
    var password=document.getElementById("password").value;
        alert("hlo")
        let  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
        let id;
        if (userDetails.length === 0) {
          id = 1;
        } else {
          id = Math.max(...userDetails.map((userDetails) => userDetails.id)) + 1;
        }
        let newDetails = {
            id: id,
            username:username,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        };
        userDetails.push(newDetails);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        document.getElementById("login").style.display="block";
        document.getElementById("signup").style.display="none";
}

function dashBoard(name){
    // alert("at dashboard")
    // alert(name);
    console.log("name..inside",name)
    document.getElementById("login").style.display="none";
    document.getElementById("signup").style.display="none";
    textdisplay.innerHtml= name;
    console.log("name..",name)
    
}