import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
    const navStyle = {
        color: 'white'
    };
    return (
        <nav>
            <ul className = "nav-links">
                <Link style={navStyle} to='/Mid-term/map'>
                    <li>Bản đồ COVID Việt Nam</li>
                </Link>
                <Link style={navStyle} to='/Mid-term/stats'>
                    <li>Biểu đồ COVID Việt Nam và Thế giới</li>
                </Link>
                
            </ul>
        </nav>
    );
}

export default Nav;