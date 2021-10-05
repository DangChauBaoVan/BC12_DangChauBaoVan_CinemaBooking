import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './BackToHome.scss'

export default class BackToHome extends Component {
    render() {
        return (
            <div className="backToHome">
                <Link to="/">Home</Link>
            </div>
        )
    }
}
