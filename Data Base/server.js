const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require('./model/user');
const club = require('./models/clubs');
const bcrypt = require('bcrypt-js');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const app = express();

mongoose.connect('mongodb://localhost:27017/data');


app.use(express.static('public'));
app.use(bodyParser.json())


app.get("/",function(res,req)
{
    res.render('Food');
})

app.get("/team",function(res,req){
    res.render('/about_us')
})

app.use(express.static(__dirname + '/public'));

app.post('/api/register',async(req,res)=>{
    const {username,password,reg_no} = req.body

    const password = await bcrypt.hash(plainTextPassword, 10)

    try{
        const response = await User.create({
            username,
            password,
            reg_no,
        })
    }catch(error){
        console.log(error)
    }
})
   
app.post('/api/login',async(req,res)=>{
    const {username,password} = req.body

    const user = User.find({username,password}).lean()

    if(!user){
        return res.json({status:'error'})
    }

    if (await bcrypt.compare(password, user.password)) {


		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.listen(3000,function(){
    console.log("The Server is working");
  });


//Sugnup page
/* const form = document.getElementById('reg-form')
    form.addEventListner('submit',registerUser)

    async function registerUser(event)
    {
        event.preventDefault()
        const username = document.getElementById('username').value;
         const passsword = document.getElementById('password').value;
         const reg_no = document.getElementById('reg_no').value;
         
         var time_table = document.getElementById('uploadFile').files[0];

         var array = csv.toString().split("\r");
 
let result = [];
 
let headers = array[0].split(", ")
 

for (let i = 1; i < array.length - 1; i++) {
  let obj = {}
 
 
  let str = array[i]
  let s = ''
 
  let flag = 0
  for (let ch of str) {
    if (ch === '"' && flag === 0) {
      flag = 1
    }
    else if (ch === '"' && flag == 1) flag = 0
    if (ch === ', ' && flag === 0) ch = '|'
    if (ch !== '"') s += ch
  }
 
 
  let properties = s.split("|")
 
  
  for (let j in headers) {
    if (properties[j].includes(", ")) {
      obj[headers[j]] = properties[j]
        .split(", ").map(item => item.trim())
    }
    else obj[headers[j]] = properties[j]
  }
 

  result.push(obj)
}
 
let json = JSON.stringify(result);
fs.writeFileSync('output.json', json);

         fetch('/api/register',{
            method : 'POST',
            headers: {
						'Content-Type': 'application/json'
					},
                    	body: JSON.stringify({
						username,
						password,
                        reg_no,
                    
					})
				}).then((res) => res.json())

				if (result.status === 'ok') {
					// everythign went fine
					alert('Success')
				} else {
					alert(result.error)
				}
			}
         })
    }
*/


//login page 
