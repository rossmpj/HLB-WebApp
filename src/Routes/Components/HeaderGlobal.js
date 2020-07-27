import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import '../../custom-antd.css';
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default class HeaderGlobal extends React.Component {

    render() {
        return (
            <Header className="site-layout-background" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Menu theme="dark" mode="horizontal"  >
                    <Menu.Item key="200">Iniciar Sesion<Link to='/login'/></Menu.Item>
                    <Menu.Item key="100" >Registrate<Link to="/registrar_user" /></Menu.Item>
                </Menu>
            </Header>
        );

    }
}