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
<<<<<<< HEAD
import VistaUser from './Modulos_Usuario/VistaUser'
=======
>>>>>>> 1b553824940f43fb9a039b08f7167cbe2dd2fa15
import PerfilUser from './Modulos_Usuario/PerfilUser'
import TablaUser from './Modulos_Usuario/TablaUser'
import PrivateRouteFinanzas from './Routes/PrivateRouteFinanzas';
import FinanzasLayout from './Routes/Layouts/FinanzasLayout'

class App extends React.Component {



  render() {
    return (
      <Router>
          <HomeRoute exact path='/'/>
          <PublicRoute exact path='/login' component={LoginHLB} layout = {PublicLayout}  />

          {/* Routes para empelados institucionales */}
          <PrivateRouteEmpleado exact path = '/empleado' component = {Home} layout = {EmployLayout} />
          <PrivateRouteEmpleado exact path = '/solicitud/form' component = {VistaSolicitud} layout = {EmployLayout} />
          <PrivateRouteEmpleado exact path = '/solicitud_empleado' component = {TablaSolicitudUser} layout = {EmployLayout} />
          <PrivateRouteEmpleado exact path = '/empleado/perfil/' component = {PerfilUser} layout = {EmployLayout} />

          {/* Routes para finanzas */}
          <PrivateRouteFinanzas exact path = '/finanzas' component = {Home} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/router' component={TablaRouter} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/router/view/:id' component={DetalleRouter} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/router/form' component={FormularioRouter} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/desktop' component={TablaDesktop} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/desktop/view/:id' component={DetalleDesktop} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/desktop/form' component={FormularioDesktop} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/laptop' component={TablaLaptop} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/laptop/view/:id' component={DetalleLaptop} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/laptop/form' component={FormularioLaptop} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/otros/view' component={DetalleOtrosEquipos} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/ip/view/:ip' component={DetalleIP} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/impresora' component={Impresora} layout = {FinanzasLayout} />
          {/* <PrivateRouteFinanzas exact path='/finanzas/ip' component={TablaIp} layout = {FinanzasLayout} /> */}
          <PrivateRouteFinanzas exact path='/finanzas/otrosequipos' component={HomeEquipo} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/otrosequipos/form' component={VistaEquipo} layout = {FinanzasLayout} />
          {/* <PrivateRouteFinanzas exact path='/finanzas/ip/form' component={VistaIp} layout = {GeneralLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/ip/detail/:id' component={DetalleIIp} layout = {GeneralLayout} /> */}
          <PrivateRouteFinanzas exact path='/finanzas/impresora/form' component={VistaImpresora} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/impresora/view/:id' component={DetalleImpresora} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/equipo/view/:id' component={DetalleEquipo} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/reportes/general' component={TablaReporte} layout = {FinanzasLayout} />
          <PrivateRouteFinanzas exact path='/finanzas/reportes/de-baja' component={TablaBajas} layout = {FinanzasLayout} />



          {/* Routes para usuarios de sistemas */}
          <PrivateRouteGeneral exact path = '/sistemas' component = {Home} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path = '/sistemas/perfil/' component = {PerfilUser} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/router' component={TablaRouter} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/router/view/:id' component={DetalleRouter} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/router/form' component={FormularioRouter} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/desktop' component={TablaDesktop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/desktop/view/:id' component={DetalleDesktop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/desktop/form' component={FormularioDesktop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/laptop' component={TablaLaptop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/laptop/view/:id' component={DetalleLaptop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/laptop/form' component={FormularioLaptop} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/otros/view' component={DetalleOtrosEquipos} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/ip/view/:ip' component={DetalleIP} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/impresora' component={Impresora} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/ip' component={TablaIp} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/otrosequipos' component={HomeEquipo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/otrosequipos/form' component={VistaEquipo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/marca' component={TablaMarca} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/programa' component={TablaPrograma} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/marca/form' component={VistaMarca} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/programa/form' component={FormularioPrograma} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/ip/form' component={VistaIp} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/ip/detail/:id' component={DetalleIIp} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/impresora/form' component={VistaImpresora} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/impresora/view/:id' component={DetalleImpresora} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/equipo/view/:id' component={DetalleEquipo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/reportes/general' component={TablaReporte} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/reportes/de-baja' component={TablaBajas} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/correo' component={TablaCorreo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/correo/form' component={VistaCorreo} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/users/form' component={VistaUser} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/sistemas/users' component={TablaUser} layout = {GeneralLayout} />
          <PrivateRouteGeneral exact path='/solicitud_sistemas' component={TablaSolicitudSistemas} layout = {GeneralLayout} />
        
      </Router>
    );
  }
}

export default App;
