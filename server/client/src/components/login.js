import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginAsync } from "../redux/userSlice";
import { username, password } from "../constants/constants";

const Login = () => {
  const [name, setName] = useState('');
  const [formPassword, setFormPassword] = useState('');
  
  const history = useHistory();
  const dispatch = useDispatch();

  const nameFieldInputHandler = (e) => {
    setName(e.target.value);
  }

  const passwordFieldInputHandler = (e) => {
    setFormPassword(e.target.value);
  }

  // For simplicity's sake, the login form makes sure the username and password are correct.
  // This sucks and would never be done in the real world.
  const loginFormSubmit = (e) => {
    if (name !== username || formPassword !== password)
      return alert('Invalid username or password');

    e.preventDefault();
    dispatch(loginAsync({name: name, password: formPassword}));
    history.push("/")
  }

  return (
    <div>
      <div className="row login-title-row">
        <div className="col">
          <div className="text-center">
            <div className="login-title"><strong><em>Aaronnds</em></strong></div>
            <h3 className="login-subtitle"><em>Faster Work, Smoother Flow</em></h3>
            <br></br>
          </div>
        </div>
      </div>

      <div className="row login-input-row">
        <div className="col-md-4 offset-4">
          <form onSubmit={loginFormSubmit}>
            <input type="text" className="form-control login-username-input" placeholder="Username" onChange={nameFieldInputHandler}/>
        
            <input type="password" className="form-control login-password-input" placeholder="Password" onChange={passwordFieldInputHandler}/>

            <button type="submit" className="btn btn-primary login-button">Sign In</button>
          </form>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>
      </div>
    </div>
  );
}

export default Login;