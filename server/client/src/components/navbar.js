import { useHistory } from "react-router";

const Navbar = () => {

  const history = useHistory();

  const navClickHandler = () => {
    history.push('/');
  }

  return ( 
    <div className="row">
      <div className="col">
        <div className="text-center">
          <h2 className="text-danger" onClick={navClickHandler}>
            =============[ N A V B A R ]=============
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Navbar;