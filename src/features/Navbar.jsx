import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
    return (
        <div className='navbar'>
            <div className='navbar-logo'>HackerNews</div>
            <div className='navbar-item'>
                <Link to="/newstories">New</Link>
            </div>
            <div className='navbar-item'>
                <Link to="/topstories">Top</Link>
            </div>
            <div className='navbar-item'>
                <Link to="/beststories">Best</Link>
            </div>
        </div>
    )

}

export default Navbar;