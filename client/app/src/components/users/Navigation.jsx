import React from 'react';

const Navigation = () => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <div className="brand-logo left" id="navLogin">DocumentME</div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/login" className="waves-effect waves-light">
              Login
            </a>
          </li>
          <li>
            <a className="waves-effect wave-light" href="/signup">Signup</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
export default Navigation;
