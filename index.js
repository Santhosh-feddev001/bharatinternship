var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to database"))
db.once('open',()=> console.log("connceted to database"))

app.post("/signup",(req,res) => {
    var first = req.body.first
    var last = req.body.last
    var email = req.body.email
    var dob = req.body.dob
    var password = req.body.password
    var repassword = req.body.repassword
    var mobile = req.body.mobile
    var gender = req.body.gender
    
    var data={
        "first":first,
        "last":last,
        "email":email,
        "dob":dob,
        "password":password,
        "repassword":repassword,
        "mobile":mobile,
        "gender":gender
    }

    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("record inserted successfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
})
return res.redirect('index.html')
}).listen(5500);

console.log("listening on port 5500")

function solve() { 
    let password =  
        document.getElementById('password').value; 
    let repassword =  
        document.getElementById('repassword').value; 
    let mobile =  
        document.getElementById('mobile').value; 
    let mail = 
        document.getElementById('email').value; 
    let flag = 1; 
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  
    if (!emailRegex.test(mail)) { 
        flag = 0; 
        pass.innerText =  
            'Please enter a valid email address.'; 
        setTimeout(() => { 
            pass.innerText = ""; 
        }, 3000); 
    } 
  
    if (password !== repassword) { 
        flag = 0; 
        pass.innerText = 
            "Passwords do not match. Please re-enter."; 
        setTimeout(() => { 
            pass.innerText = ""; 
        }, 3000); 
    } 
  
    let passwordRegex =  
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$/; 
  
    if (!passwordRegex.test(password)) { 
        flag = 0; 
        pass.innerText = 
            'Password must be at least 8 characters'+ 
            ' long and include at least one number,'+ 
            ' one alphabet, and one symbol.'; 
        setTimeout(() => { 
            pass.innerText = ""; 
        }, 3000); 
    } 
    if (flag) 
        alert("Form submitted"); 
}
