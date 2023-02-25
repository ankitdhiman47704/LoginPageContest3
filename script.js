
let form = document.querySelector("form");
let inputs = form.querySelectorAll('input');
let spans = form.querySelectorAll('span');

let data = JSON.parse(localStorage.getItem("currentUser"))
if(data!=null){
   window.location.href = "dashboard.html"
}
let myobj = new Array()

for(let i = 0;i<inputs.length;i++){
    inputs[i].addEventListener("input",()=>{validateInputs(inputs[i].id)});
}
let signupBtn = form.querySelector("#signupBtn");

signupBtn.addEventListener('click',addPrsonIntoData)



//validate

function validateInputs(indNo){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passFormat=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    let conditions = [inputs[0].value.length>=2,inputs[1].value.match(mailformat),inputs[2].value.match(passFormat),inputs[2].value===inputs[3].value]
    if(conditions[indNo]){
        spans[indNo].innerHTML = 'Valid'
        spans[indNo].style.color = "green"
    }else{
        spans[indNo].innerHTML = 'Invalid'
        spans[indNo].style.color = "red"
    }
}

function addPrsonIntoData(e){
    let allFieldValid = true;
    let sucessMsg = document.querySelector('#sucessfullyAdded')
    for (const t of spans) {
        if(t.innerText=="Invalid"||t.innerText==""){
            allFieldValid = false
        }
    }
    let isAlreadyExist = false
    let checkuser = JSON.parse(localStorage.getItem("user"))
    if(checkuser!=null){
        for (const t of checkuser) {
            if(t.email==inputs[1].value){
                isAlreadyExist = true
            }
        }
    }
    
    
    if(allFieldValid==true && isAlreadyExist==false){
        if(checkuser!=null){
            myobj = [...JSON.parse(localStorage.getItem("user"))];
        }
        let obj = new Object();
        
        obj.name = inputs[0].value
        obj.email = inputs[1].value
        obj.password = inputs[2].value
        myobj.push(obj);
        localStorage.setItem("user", JSON.stringify(myobj));
        sucessMsg.innerHTML = "You are Successfully Signed Up"
        sucessMsg.style.color = "green"
        window.location.href = "login.html"
        
    }else{
        sucessMsg.innerHTML = "You Already Exist or you have entered wrong Field inputs! Try Again"
        sucessMsg.style.color = "red"
    }
}

function signinBtn(){
   window.location.href = "login.html"
}