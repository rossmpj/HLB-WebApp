import React from 'react';
import { Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './custom-antd.css'; //lessc --js mytheme.less ../../../src/custom-antd.css @import "./antd.less"; @primary-color: #0081C3;  
import { Layout } from 'antd';

import Impresora from './Inventario_Impresora/HomeImpresora';
import HomeRouter from './Inventario_Router/HomeRouter';
import HomeLaptop from './Inventario_Laptop/HomeLaptop';
import HomeDesktop from './Inventario_Desktop/HomeDesktop';
import HomeIp from './Inventario_Ip/HomeIp';
import HomeEquipo from './Inventario_Equipo/HomeEquipo'
import HomeTipo from './Extras/TipoEquipo/HomeTipo'
/* Esto es temporal*/
import FormularioTipo from './Extras/TipoEquipo/FormularioTipo';
import FormularioIp from './Inventario_Ip/FormularioIp';
import FormularioImpresora from './Inventario_Impresora/FormularioImpresora'

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
            {this.state.collapsed ? <img className="App-logo" src={"./Boton.png"} alt="icon" /> : <img className="App-logo" src={"./logo.png"} alt="logo" />}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="11">
                <Icon type="home" />
                <span>Inicio</span>
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
                  <Link to="/desktop" />
                </Menu.Item>
                <Menu.Item key="laptop"><Icon type="laptop" />Laptop
                  <Link to="/laptop" />
                </Menu.Item>
                <Menu.Item key="router"><Icon type="wifi" />Router
                  <Link to="/router" />
                </Menu.Item>
                <Menu.Item key="impresora"><Icon type="printer" />Impresora
                  <Link to="/impresora" />
                </Menu.Item>
                <Menu.Item key="varios"><Icon type="appstore" />Otros equipos
                <Link to="/otrosEquipos" />
                </Menu.Item>
                <Menu.Item key="ip"><Icon type="cluster" />IP
                <Link to="/ip" />
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="rocket" />
                    <span>Extra</span>
                  </span>
                }
              >
                <Menu.Item key="marcas"><Icon type="global" />Marcas
                  {/* <Link to="/#" /> */}
                </Menu.Item>
                <Menu.Item key="tipos_equipo"><Icon type="cluster" />Tipo de equipo
                  <Link to="/tipo" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background"></Header>
            <Content style={{ margin: '16px' }}>
              <Route exact path='/router' component={HomeRouter} />
              <Route exact path='/impresora' component={Impresora} />
              <Route exact path='/laptop' component={HomeLaptop} />
              <Route exact path='/desktop' component={HomeDesktop} />
              <Route exact path='/ip' component={HomeIp} />
              <Route exact path='/otrosEquipos' component={HomeEquipo} />
              <Route exact path='/tipo' component={HomeTipo} />
              <Route exact path='/tipo/edit' component={FormularioTipo} />
              <Route exact path='/ip/edit' component={FormularioIp} />
              <Route exact path='/impresora/edit' component={FormularioImpresora} />
            </Content>
            <Footer className="style-footer">Inventario Hospital León Becerra ©2020 Creado por EasySoft [ESPOL]</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
