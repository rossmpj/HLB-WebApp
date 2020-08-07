import React from 'react';
import { Menu, Icon, Layout  } from 'antd';
import { Link } from 'react-router-dom';
import '../../custom-antd.css';
import { RiRouterLine, RiTerminalWindowLine } from "react-icons/ri";
const { SubMenu } = Menu;
const { Sider } = Layout; 

export default class SiderGeneral extends React.Component{
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };

      render(){
          return(
            <Sider
            breakpoint="lg"
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            {this.state.collapsed ? <img className="App-logo" src={"./Boton.png"} alt="icon" /> : <img className="App-logo" src={"./logo.png"} alt="logo" />}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="11">
                <span>
                <Icon type="home" />
                <span>Inicio
                
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              <SubMenu
                key="dash"
                title={
                  <span>
                    <Icon type="database" />
                    <span>Inventario</span>
                  </span>
                }
              >
                <Menu.Item key="desktop"><Icon type="desktop" />Desktop
                  <Link to="/finanzas/desktop" />
                </Menu.Item>
                <Menu.Item key="laptop"><Icon type="laptop" />Laptop
                  <Link to="/finanzas/laptop" />
                </Menu.Item>
                <Menu.Item key="router"><RiRouterLine className="anticon"/>Router
                  <Link to="/finanzas/router" />
                </Menu.Item>
                <Menu.Item key="impresora"><Icon type="printer" />Impresora
                  <Link to="/finanzas/impresora" />
                </Menu.Item>
                <Menu.Item key="varios"><Icon type="appstore" />Otros equipos
                <Link to="/finanzas/otrosEquipos" />
                </Menu.Item>
              </SubMenu>
              

              <SubMenu
                key="rep"
                title={
                  <span>
                    <Icon type="bar-chart" />
                    <span>Reportes</span>
                  </span>
                }
              >
                <Menu.Item key="general"><Icon type="control"/>General
                  <Link to="/finanzas/reportes/general" />
                </Menu.Item>

                <Menu.Item key="baja"><Icon type="fall"/>Equipos de baja
                  <Link to="/finanzas/reportes/de-baja" />
                </Menu.Item>
              </SubMenu>

              
            </Menu>
          </Sider>
          );
      }
}