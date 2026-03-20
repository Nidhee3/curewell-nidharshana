import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
            <Link className="navbar-brand ms-4" to="/view-doctors">
                CureWell
            </Link>
 
            <div className="collapse navbar-collapse ms-3">
                <ul className="navbar-nav me-auto">
 
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-doctors">
                            View Doctors
                        </Link>
                    </li>
 
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-specializations">
                            View Specializations
                        </Link>
                    </li>
 
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-todays-surgery">
                            View Today's Surgery
                        </Link>
                    </li>
 
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-doctor">
                            Add Doctor
                        </Link>
                    </li>
 
                </ul>
            </div>
        </nav>
    );
};
 
export default Navbar;
