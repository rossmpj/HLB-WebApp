import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './custom-antd.css'; //lessc --js mytheme.less ../../../src/custom-antd.css @import "./antd.less"; @primary-color: #0081C3;  
import { RiRouterLine, RiTerminalWindowLine } from "react-icons/ri";
import TablaRouter from './Inventario_Router/TablaRouter';
import FormularioRouter from './Inventario_Router/FormularioRouter';
import DetalleRouter from './Inventario_Router/DetalleRouter';
import VistaSolicitud from './Solicitudes/VistaSolicitud';
import TablaSolicitud from './Solicitudes/TablaSolicitud';
import TablaLaptop from './Inventario_Laptop/TablaLaptop';
import FormularioLaptop from './Inventario_Laptop/FormularioLaptop';
import DetalleLaptop from './Inventario_Laptop/DetalleLaptop';
import TablaDesktop from './Inventario_Desktop/TablaDesktop';
import FormularioDesktop from './Inventario_Desktop/FormularioDesktop';
import DetalleDesktop from './Inventario_Desktop/DetalleDesktop';
import DetalleIP from './Inventario_Router/DetalleIP';
import DetalleOtrosEquipos from './FormulariosPC/DetalleOtrosEquipos';
import Impresora from './Inventario_Impresora/TablaImpresora';
import VistaImpresora from './Inventario_Impresora/VistaImpresora'
import TablaIp from './Inventario_Ip/TablaIp';
import VistaIp from './Inventario_Ip/VistaIp';
import DetalleIIp from './Inventario_Ip/DetalleIIp'
import HomeEquipo from './Inventario_Equipo/TablaEquipo'
import VistaEquipo from './Inventario_Equipo/VistaEquipo'
import TablaMarca from './Extras/Marcas/TablaMarca'
import TablaPrograma from './Extras/Programas/TablaPrograma'
import VistaMarca from './Extras/Marcas/VistaMarca';
import FormularioPrograma from './Extras/Programas/FormularioPrograma';
import DetalleImpresora from './Inventario_Impresora/DetalleImpresora';
import DetalleEquipo from './Inventario_Equipo/DetalleEquipo';
import TablaReporte from './Reportes/TablaReporte';
import TablaBajas from './Reportes/TablaBajas';
import TablaCorreo from './Inventario_Correo/TablaCorreo';
import VistaCorreo from './Inventario_Correo/VistaCorreo'

import Home from './Home/Home'

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
                <span>
                <Icon type="home" />
                <span>Inicio
                
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="12">
                <span>
                <Icon type="home" />
                <span>Solicitudes
                
                </span>
                </span>
                <Link to="/solicitud" />
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
                <Menu.Item key="router"><RiRouterLine className="anticon"/>Router
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
                <Menu.Item key="correo"><Icon type="mail" />IP
                <Link to="/correo" />
                </Menu.Item>
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
                  <Link to="/marca" />
                </Menu.Item>
                <Menu.Item key="programas"><RiTerminalWindowLine className="anticon" />Programas
                  <Link to="/programa" />
                </Menu.Item>
              </SubMenu>
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
                  <Link to="/reportes/general" />
                </Menu.Item>

                <Menu.Item key="baja"><Icon type="fall"/>Equipos de baja
                  <Link to="/reportes/de-baja" />
                </Menu.Item>
              </SubMenu>

              
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background"></Header>
            <Content style={{ margin: '16px' }}>
              <Route exact path='/router' component={TablaRouter} />
              <Route exact path='/router/view/:id' component={DetalleRouter} />
              <Route exact path='/router/form' component={FormularioRouter} />
              <Route exact path='/desktop' component={TablaDesktop} />
              <Route exact path='/desktop/view/:id' component={DetalleDesktop} />
              <Route exact path='/desktop/form' component={FormularioDesktop} />
              <Route exact path='/solicitud/form' component={VistaSolicitud} />
              <Route exact path='/solicitud' component={TablaSolicitud} />
              <Route exact path='/laptop' component={TablaLaptop} />
              <Route exact path='/laptop/view/:id' component={DetalleLaptop} />
              <Route exact path='/laptop/form' component={FormularioLaptop} />
              <Route exact path='/otros/view' component={DetalleOtrosEquipos} />
              <Route exact path='/ip/view/:ip' component={DetalleIP} />
              <Route exact path='/impresora' component={Impresora} />
              <Route exact path='/ip' component={TablaIp} />
              <Route exact path='/otrosequipos' component={HomeEquipo} />
              <Route exact path='/otrosequipos/form' component={VistaEquipo} />
              <Route exact path='/marca' component={TablaMarca} />
              <Route exact path='/programa' component={TablaPrograma} />
              <Route exact path='/marca/form' component={VistaMarca} />
              <Route exact path='/programa/form' component={FormularioPrograma} />
              <Route exact path='/ip/form' component={VistaIp} />
              <Route exact path='/ip/detail/:id' component={DetalleIIp} />
              <Route exact path='/impresora/form' component={VistaImpresora} />
              <Route exact path='/impresora/view/:id' component={DetalleImpresora} />
              <Route exact path='/equipo/view/:id' component={DetalleEquipo} />
              <Route exact path='/reportes/general' component={TablaReporte} />
              <Route exact path='/reportes/de-baja' component={TablaBajas} />
              <Route exact path='/correo' component={TablaCorreo} />
              <Route exact path='/correo/form' component={VistaCorreo} />

              <Route exact path='/' component={Home} />
            </Content>
            <Footer className="style-footer">Inventario Hospital León Becerra ©2020 Creado por EasySoft [ESPOL]</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
