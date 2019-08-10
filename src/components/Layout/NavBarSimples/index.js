import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './style.css';

import Logo from './../../../assets/images/logo_temp.png';

export default class Elementos extends Component {
    render() {
        return (
          <div className="header py-4">
          <div className="container">
              <div className="logoCentral">
                <Link className="header-brand" to="/" href="javascript:void(0)">
                  <img src={Logo} className="header-brand-img" alt="tabler logo" />
                </Link>
              </div>
          </div>
        </div>
        );
    }

}