import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import '../../custom-antd.css';
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default class HeaderGlobal extends React.Component {

    render() {
        return (
            <Header className="site-layout-background" style={{display: 'flex', alignItems: 'center',justifyContent: 'flex-end'}}>
                <img className="App-logo" src={"./Boton.png"} alt="icon" style={{height:'80px', width:'80px'}}/> 
            </Header>
        );

    }
}