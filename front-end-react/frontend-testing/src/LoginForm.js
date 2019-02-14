import React, {Component, Fragment} from "react"
import axios from "axios"
class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			userName: "",
			password: "",
			placeholder: "",
			users: []
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.checkLogin = this.checkLogin.bind(this)
		this.handleSignup = this.handleSignup.bind(this)

	}
 
	componentDidMount() {
		fetch("https://reqres.in/api/users?page=2")
			.then((res) => res.json())
			.then(result => {
				this.setState({
					users: result.data,
					placeholder: result.total_pages
				})
			},
			(error) => {
				this.setState({
					placeholder: "error"
				})
			})		
		}
	
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleLogin() {
		const user = {
			
			    "email": this.state.userName,
			    "password": this.state.password
			
		}
		this.setState({
					placeholder: "Logging in..."
				})

		axios.post('https://reqres.in/api/login', user)
      	.then(res => {
	        console.log(res);
	        this.setState({
					placeholder: res.data['token']
				 })
				})      	
      		//this.props.history.push(`/Profile`)	
      	// if(this.checkLogin(user,1)) {
      	// }
        
	}
	checkLogin(user,index) {
			if(user.email === user.password && user.email !== "") {
				this.setState({
					placeholder: "Login Successful"
				})
				return true
			}
			else {
				this.setState({
				placeholder: "Login Failed"
			})
				return false
			}
		}
	handlePassword() {
		this.setState({
			placeholder:"Bhaag BC!!"
		})
		this.props.history.push(`/ForgotPassword`)
	}

	handleSignup() {		
		this.props.history.push(`/Signup`)
	}
	render() {
		return (
			<Fragment >
			<div className="text-center">
				<h1 >Login Page</h1>
				<p className="text-danger">{this.state.placeholder}</p>
				<input 
				className = "well well-sm"
					name = "userName"
					type = "text" 
					placeholder = "User Name" 
					onChange = {this.handleChange}
				/>
				<br/>
				<br/>
				<input className = "well well-sm"
					name = "password" 
					type = "text" 
					placeholder = "Password" 
					onChange = {this.handleChange}
				/>
				<br/>
				<button 
					className = "btn btn-danger" onClick = {this.handleLogin}>Login 
				</button>
				<button 
					className = "btn btn-danger" onClick = {this.handleSignup}>Signup
				</button>

				<br/>
				<br/>

				<button 
					className = "btn btn-danger" onClick = {this.handlePassword}>Forgot Password
				</button>
				</div>
			</Fragment>
		)
	}
}
export default LoginForm