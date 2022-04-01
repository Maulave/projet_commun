import React, { Component } from 'react';
import Style from './Footer.module.scss';


export default class Header extends Component {
    render() {
        return (
            <footer>
                <div className={ Style.containerFooter }>
                    <ul>
                        <li>
                            <a href="/">Présentation</a>
                        </li>
                        <li >
                            <a  href="/">Contact</a>
                        </li>
                        <li>
                            <a  href="/">FAQ</a>
                        </li>
                        <li >
                            <a  href="/">Conditions générales</a>
                        </li>
                        <li >
                            <a  href="/">Soutenir</a>
                        </li>
                        <li >
                            <a  href="/">Témoignages</a>
                        </li>
                    </ul>
                </div>
            </footer>
        )    
    }
}