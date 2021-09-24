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
            <h3 className="login-subtitle"><em>Witty Tagline Here</em></h3>
            <br></br>
          </div>
        </div>
      </div>

      <div className="row login-input-row">
        <div className="col-md-4 offset-4">

          <div className="row login-username-input">
            <input type="email" className="form-control" placeholder="Username" />
          </div>

          <div className="row login-password-input">
            <input type="password" className="form-control" placeholder="Password" />
          </div>

          <br></br>
          
          <div className="row signin-button">
            <button type="button" className="btn btn-primary" onClick={loginClickHandler}>Sign In</button>
          </div>

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