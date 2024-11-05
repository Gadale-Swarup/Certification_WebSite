import React from 'react';
import Logo from "../img/LOGO.png";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        src={Logo}
                        alt="Logo"
                        width="150"
                        height="70"
                        className="d-inline-block align-text-top"
                        style={{ objectFit: "cover" }}
                    />
                </a>
                <span className='graduate-regular fs-3 text-success mx-2'>
                    Wisdom Sprouts
                </span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span
                                className='nav-link graduate-regular text-success'
                                onClick={() => { navigate('/excel') }}
                            >
                                &nbsp;&nbsp;&nbsp;Couser <br/>
                                Certificate
                            </span>
                        </li>
                        <li className="nav-item">
                            <span
                                className='nav-link graduate-regular text-success'
                                onClick={() => { navigate('/Completion') }}
                            >
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DLC<br/> 
                               Completion
                            </span>
                        </li> <li className="nav-item">
                            <span
                                className='nav-link graduate-regular text-success'
                                onClick={() => { navigate('/participation') }}
                            >
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DLC<br/> 
                               Participation
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
