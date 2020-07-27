import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './custom-antd.css'; //lessc --js mytheme.less ../../../src/custom-antd.css @import "./antd.less"; @primary-color: #0081C3;  
import TablaRouter from './Inventario_Router/TablaRouter';
import FormularioRouter from './Inventario_Router/FormularioRouter';
import DetalleRouter from './Inventario_Router/DetalleRouter';
import VistaSolicitud from './Solicitudes/VistaSolicitud';
import TablaSolicitudSistemas from './Solicitudes/TablaSolicitudSistemas';
import TablaSolicitudUser from './Solicitudes/TablaSolicitudUser';
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
import LoginHLB from './Login/Login'
import Home from './Home/Home'
import HomeRoute from './Routes/HomeRoute'
import EmployLayout from './Routes/Layouts/EmployLayout'
import GeneralLayout from './Routes/Layouts/GeneralLayout'
import PrivateRouteEmpleado from './Routes/PrivateRouteEmpleado'
import PrivateRouteGeneral from './Routes/PrivateRouteGeneral';
import PublicRoute from './Routes/PublicRoute';
import PublicLayout from './Routes/Layouts/PublicLayout'
import FormularioUser from './Modulos_Usuario/FormularioUser'
import PerfilUser from './Modulos_Usuario/PerfilUser'

class App extends React.Component {



  render() {
    return (
      <Router>
          <PublicRoute exact path='/login' component={LoginHLB} layout = {PublicLayout}  />
          <HomeRoute exact path='/'/>
          <PrivateRouteEmpleado exact path = '/empleado' component = {Home} layout = {EmployLayout} />
          <PrivateRouteEmpleado exact path = '/solicitud/form' component = {VistaSolicitud} layout = {EmployLayout} />
          <PrivateRouteEmpleado exact path = '/solicitud_empleado' component = {TablaSolicitudUser} layout = {EmployLayout} />
          <PrivateRouteGeneral exact path = '/sistemas' component = {Home} layout = {GeneralLayout} />
          <PrivateRouteEmpleado exact path = '/empleado/perfil/' component = {PerfilUser} layout = {EmployLayout} />
          <PrivateRouteGeneral exact path = '/sistemas/perfil/' component = {PerfilUser} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/router' component={TablaRouter} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/router/view/:id' component={DetalleRouter} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/router/form' component={FormularioRouter} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/desktop' component={TablaDesktop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/desktop/view/:id' component={DetalleDesktop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/desktop/form' component={FormularioDesktop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/solicitud_sistemas' component={TablaSolicitudSistemas} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/laptop' component={TablaLaptop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/laptop/view/:id' component={DetalleLaptop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/laptop/form' component={FormularioLaptop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/otros/view' component={DetalleOtrosEquipos} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/ip/view/:ip' component={DetalleIP} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/impresora' component={Impresora} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/ip' component={TablaIp} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/otrosequipos' component={HomeEquipo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/otrosequipos/form' component={VistaEquipo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/marca' component={TablaMarca} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/programa' component={TablaPrograma} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/marca/form' component={VistaMarca} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/programa/form' component={FormularioPrograma} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/ip/form' component={VistaIp} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/ip/detail/:id' component={DetalleIIp} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/impresora/form' component={VistaImpresora} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/impresora/view/:id' component={DetalleImpresora} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/equipo/view/:id' component={DetalleEquipo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/reportes/general' component={TablaReporte} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/reportes/de-baja' component={TablaBajas} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/correo' component={TablaCorreo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/correo/form' component={VistaCorreo} layout = {GeneralLayout} />
         
        
      </Router>
    );
  }
}

export default App;
