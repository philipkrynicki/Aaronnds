import { useHistory } from "react-router";

const Login = () => {
  
  const history = useHistory();

  const loginClickHandler = () => {
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
      
          <input type="email" className="form-control login-username-input" placeholder="Username" />
      
          <input type="password" className="form-control login-password-input" placeholder="Password" />

          <button type="button" className="btn btn-primary login-button" onClick={loginClickHandler}>Sign In</button>

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