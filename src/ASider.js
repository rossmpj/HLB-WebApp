import React from 'react';
import { Layout, Menu, Icon } from 'antd'; 
import './App.css';
const { Sider } = Layout;
const { SubMenu } = Menu;


class ASider extends React.Component {
    state = {
      collapsed: false,
    };
  
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };


  render() {
  return (
    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
      <img className="App-logo" src={"./logo.png"} alt="e" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="11">
          <Icon type="home" />
          <span>Inicio</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="desktop" />
              <span>Intentario equipos</span>
            </span>
          }
        >
          <Menu.Item key="1"><Icon type="home" />Desktop</Menu.Item>
          <Menu.Item key="2"><Icon type="home" />Laptop</Menu.Item>
          <Menu.Item key="3"><Icon type="home" />Impresora</Menu.Item>
          <Menu.Item key="4"><Icon type="home" />Router</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="mail" />
              <span>Inventario</span>
            </span>
          }
        >
          <Menu.Item key="5">Correo</Menu.Item>
          <Menu.Item key="6">IP</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
}

export default ASider;