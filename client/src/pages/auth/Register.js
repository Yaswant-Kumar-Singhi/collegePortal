import React,{useState ,  useEffect} from 'react';
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'



const Register= ()=>{

	

	const [email,setEmail] = useState('')
	const {user} = useSelector((state) => ({...state}))
	let history = useHistory()

  useEffect(()=>{
      if(user && user.token) history.push("/");
  },[user])

	const handleSbmit = async (e) => {
		//handling after submit button is clicked
		e.preventDefault();
		const config = {
			url : "http://localhost:3000/register/complete",
			handleCodeInApp : true
		}
		
		
 		await auth.sendSignInLinkToEmail(email , config)
		toast.success(`Email link for registration is send to ${email}. Click to complete your verification`)
		
		window.localStorage.setItem('emailForRegistration',email)
		setEmail("")
	}


	const registerForm = () => {
		
		return(
			<form onSubmit={handleSbmit}>
				<input type="email" 
				className="form-control" 
				value={email}
				onChange={e => {setEmail(e.target.value)} }
				placeholder = "Please type your Email Address"
				autoFocus
				></input>
			<br></br>
			<button className="btn btn-success">Register  </button>
			</form>
		
);
	}

	return (
	  <div className="container p-5">
		  <div className="row">
	        <div className="col-md-6 offset-md-3">
				<h4>
					Register
				</h4>
					
					{registerForm()}
			
			</div>
		  </div>
	  </div>
);
};

export default Register;