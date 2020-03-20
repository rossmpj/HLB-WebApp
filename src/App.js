import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './custom-antd.css'; //lessc --js mytheme.less ../../../src/custom-antd.css @import "./antd.less"; @primary-color: #0081C3;  



import TablaRouter from './Inventario_Router/TablaRouter';
import FormularioRouter from './Inventario_Router/FormularioRouter';
import DetalleRouter from './Inventario_Router/DetalleRouter'
import DetalleIP from './Inventario_Router/DetalleIP';
import DetalleLaptop from './Inventario_Laptop/DetalleLaptop';
import DetalleOtrosEquipos from './Inventario_Desktop/DetalleOtrosEquipos';
import HomeLaptop from './Inventario_Laptop/HomeLaptop';
import HomeDesktop from './Inventario_Desktop/HomeDesktop';

import Impresora from './Inventario_Impresora/TablaImpresora';
import VistaImpresora from './Inventario_Impresora/VistaImpresora'
import TablaIp from './Inventario_Ip/TablaIp';
import VistaIp from './Inventario_Ip/VistaIp';
import DetalleIIp from './Inventario_Ip/DetalleIIp'
import HomeEquipo from './Inventario_Equipo/TablaEquipo'
import VistaEquipo from './Inventario_Equipo/VistaEquipo'
import TablaTipo from './Extras/TipoEquipo/TablaTipo'
import VistaTipo from './Extras/TipoEquipo/VistaTipo';

import Detalle_RAM_DD from './Inventario_Laptop/Detalle_RAM_DD';
import DetalleDesktop from './Inventario_Desktop/DetalleDesktop';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            breakpoint="lg"
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
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
              <Route exact path='/router' component={TablaRouter} />
              <Route exact path='/router/view' component={DetalleRouter} />
              <Route exact path='/desktop/view' component={DetalleDesktop} />
              <Route exact path='/otros/view' component={DetalleOtrosEquipos} />
              <Route exact path='/ip/view' component={DetalleIP} />
              <Route exact path='/laptop/view' component={DetalleLaptop} />
              <Route exact path='/ram_disco/view' component={Detalle_RAM_DD} />
              <Route exact path='/router/form' component={FormularioRouter} />
              <Route exact path='/impresora' component={Impresora} />
              <Route exact path='/laptop' component={HomeLaptop} />
              <Route exact path='/desktop' component={HomeDesktop} />
              <Route exact path='/ip' component={TablaIp} />
              <Route exact path='/otrosequipos' component={HomeEquipo} />
              <Route exact path='/otrosequipos/form' component={VistaEquipo} />
              <Route exact path='/tipo' component={TablaTipo} />
              <Route exact path='/tipo/form' component={VistaTipo} />
              <Route exact path='/ip/form' component={VistaIp} />
              <Route exact path='/ip/detail' component={DetalleIIp} />
              <Route exact path='/impresora/form' component={VistaImpresora} />



            </Content>
            <Footer className="style-footer">Inventario Hospital León Becerra ©2020 Creado por EasySoft [ESPOL]</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
