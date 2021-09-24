import { useHistory } from "react-router";

const Navbar = () => {

  const history = useHistory();

  const navClickHandler = () => {
    history.push('/');
  }

  const logoutClickHandler = () => {
    history.push('/login');
  }

  const renderLogInOutButton = () => {
    if (history.location.pathname === "/login") {
      //change this to return state and show different button on login screen
      return (
        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <button type="button" className="btn btn-secondary" onClick={logoutClickHandler}>Sign Out</button>
        </div>
      )
    }

    return (
      <div className="col-md-6 d-flex align-items-center justify-content-end">
        <button type="button" className="btn btn-secondary" onClick={logoutClickHandler}>Sign Out</button>
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