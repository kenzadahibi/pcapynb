import React from 'react'
import '../Containerlog/Login.css'



/*var qs = require('qs')*/

 const Login = () => {
  /*let navigate=useNavigate();
  const{
    register,handleSubmit , fromState: {error},
  }= useForm();

const onFormSubmit=async(data)=>{
  const parms=qs.stringify({
    'username':data.email,
    'password':data.password,
  })
}


const header={
  'accept':'application/json',
  'Content-type':'application/x-www-form-urlencoded'
}
axios.post('/user/signin').then(response=>{
  if(response.status === 200){
    console.log(response.data)
    setToken(response.data.token)
    navigate("Home")
  }
})
.catch(e => {
  console.log("Login error");
  console.log(e.request)
})
const onErrors = error => {
  console.log(error)
}
*/

  return (
  
    <div className="container">
    
    <form >
    <input type="text" placeholder="Your Name"   />
    <input type="email" placeholder="Your Email"  />
    
    <button type="submit" >Submit</button>
  
    </form>
    </div>
  )
}
export default Login;