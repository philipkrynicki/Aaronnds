import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../redux/userSlice";

const Navbar = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const navClickHandler = () => {
    history.push('/');
  }

  const loginClickHandler = () => {
    history.push('/login');
  }

  const logOutClickHandler = () => {
    if (user.authenticated) {
      dispatch(logoutAsync());
      alert('User logged out');
    }
  }

  const renderLogInOutButton = () => {
    if (history.location.pathname === "/login") {
      //change this to return state and show different button on login screen
      return (
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <button type="button" className="btn btn-secondary" onClick={logOutClickHandler}>Sign Out</button>
        </div>
      )
    }

    return (
      <div className="col-md-6 d-flex align-items-center justify-content-end">
        <button type="button" className="btn btn-secondary" onClick={loginClickHandler}>Sign in</button>
        <button type="button" className="btn btn-secondary" onClick={logOutClickHandler}>Sign out</button>
      </div>   
    )
  }

  return ( 
    <div className="row navbar-row">

      <div className="col-md-6"> 
        <h2 className="nav-home-btn" onClick={navClickHandler}>
          <strong><em>Aaronnds</em></strong>
        </h2>
      </div>

      {renderLogInOutButton()}

    </div>
  );
}

export default Navbar;