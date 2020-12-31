import React,{useState , useEffect} from 'react';
import {auth, googleAuthProvider} from '../../firebase'
import {toast} from 'react-toastify'
import { Card, Button } from 'antd';
import { MailOutlined , GoogleOutlined } from '@ant-design/icons';
import {useDispatch , useSelector} from 'react-redux'
import {useHistory , Link} from 'react-router-dom'
import { create } from "../../functions/auth"


const Login= ({history})=>{

	const [email,setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false);

	const {user} = useSelector((state) => ({...state}))

  useEffect(()=>{
      if(user && user.token) history.push("/");
  },[user])

 
	let dispatch = useDispatch()

	const roleBasedRedirect = (res)=>{
		if(res.data.role == "admin")
			history.push("/admin/dashboard")
		else
			history.push("/user/history")
	}


	

	const handleSbmit = async (e) => {
		//handling after submit button is clicked
		e.preventDefault();
		setLoading(true);
		try{
			const result = await auth.signInWithEmailAndPassword(email,password)
			const {user} = result;
			const idTokenResult = await user.getIdTokenResult()

			create(idTokenResult.token).then((res) => {
				dispatch({
					type: "LOGGED_IN_USER",
					payload: {
						name : res.data.name,
						email: res.data.email,
						token: idTokenResult.token,
						role : res.data.role,
						_id : res.data._id
					}
				})
				roleBasedRedirect(res);
				
			}).catch()

				
			//history.push('/')
			//toast.success(`Successfully Logged In. Welcome ${user.email}`)

		}
		catch(error){
			console.log(error);
      		toast.error(error.message);
      		setLoading(false);

		}
		
	}
 
	const googleLogin = async () => {
		auth
		  .signInWithPopup(googleAuthProvider)
		  .then(async (result) => {
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			create(idTokenResult.token).then((res) => {
				dispatch({
					type: "LOGGED_IN_USER",
					payload: {
						name : res.data.name,
						email: res.data.email,
						token: idTokenResult.token,
						role : res.data.role,
						_id : res.data._id
					}
				})
				roleBasedRedirect(res);
				
			}).catch()
		})
		  .catch((err) => {
			console.log(err);
			toast.error(err.message);
		  });
	  };

	const loginForm = () => {
		
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
				<input type="password" 
				className="form-control" 
				value={password}
				onChange={e => {setPassword(e.target.value)} }
				placeholder = "Password"
				autoFocus
				pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
				></input>
			<br />
			<Button 
			onClick = {handleSbmit}
			type = "primary"
			className = "mb-3"
			block
			shape = "round"
			icon = {<MailOutlined/>}
			size = "large"
			disabled = {!email || password.length<6}
			> Login with Email/Password </Button>
			</form>
		
);
	}

	return (
	  <div className="container p-5">
		  <div className="row">
	        <div className="col-md-6 offset-md-3">
				<Card>
					{loading ? <h4> Loading..</h4> : <h4> Login Form </h4>}
					{loginForm()}

					<Button 
						onClick = {googleLogin}
						type = "danger"
						className = "mb-3"
						block
						shape = "round"
						icon = {<GoogleOutlined/>}
						size = "large"
						> SignIn with Gmail
					</Button>

					<Link to="/forgot/password" className="float-right text-danger"> Forgot Password</Link>

				</Card>				
			
			</div>
		  </div>
	  </div>
);
};

export default Login;