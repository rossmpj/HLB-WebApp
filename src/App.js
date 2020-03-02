import React from 'react';
import { Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './custom-antd.css'; //lessc --js mytheme.less ../../../src/custom-antd.css @import "./antd.less"; @primary-color: #0081C3;  
import { Layout } from 'antd';
import HomeRouter from './Router/HomeRouter';
import FormRouter from './Router/FormularioRouter';
import Impresora from './Impresora/HomeImpresora';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <img className="App-logo" src={"./hlb.jpg"} alt="e" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="11">
                <Icon type="home" />
                <span>Inicio</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="database" />
                    <span>Inventario</span>
                  </span>
                }
              >
                <Menu.Item key="1"><Icon type="desktop" />Desktop

                </Menu.Item>
                <Menu.Item key="2"><Icon type="laptop" />Laptop

                </Menu.Item>
                <Menu.Item key="3"><Icon type="wifi" />Router
                  <Link to="/router" />
                </Menu.Item>
                <Menu.Item key="4"><Icon type="printer" />Impresora
                  <Link to="/impresora" />
                </Menu.Item>
                <Menu.Item key="5"><Icon type="appstore" />Otros equipos</Menu.Item>
                <Menu.Item key="6"><Icon type="cluster" />IP</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
            </Header>
            <Content style={{ margin: '16px' }}>
              <Route exact path='/router' component={HomeRouter} />
              <Route exact path='/formrouter' component={FormRouter} />
              <Route exact path='/impresora' component={Impresora} />
            </Content>
            <Footer className="App" style={{ background: 'linear-gradient(#0081C3, #39CCCC)', color: '#fff', fontWeight: "bold" }}>
              Inventario Hospital León Becerra ©2020 Creado por EasySoft [ESPOL]
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
