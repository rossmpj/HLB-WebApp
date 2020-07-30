import React from 'react';
import { Menu, Icon, Layout, Badge, notification } from 'antd';
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import Auth from '../../Login/Auth';
import AxiosSolicitud from '../../Servicios/AxiosSolicitud';
import '../../custom-antd.css';
const { Header } = Layout;
const { SubMenu } = Menu;
export default class HeaderComp extends React.Component {
  state = {
    pendientes: 0,
  };

  componentDidMount() {
    if (!this.esEmpleado()) {
      const pusher = new Pusher('2d39c81bffd91db217b5', { cluster: 'us2', encrypted: true });
      const channel = pusher.subscribe('solicitud');
      channel.bind('notificar', data => {
        this.crear_notificacion(data.titulo, data.mensaje);
        this.setState({ pendientes: data.pendientes })
      });
      this.solicitudes_pendientes();
    }
  }

  /**
    * Método que asigna la cantidad de solicitudes pendientes a la variable de estado "pendientes".
    */
  solicitudes_pendientes() {
    AxiosSolicitud.contar_solicitudes().then(res => {
      this.setState({ pendientes: res.data });
    })
  }

  crear_notificacion = (titulo, mensaje) => {
    notification.open({
      message: titulo,
      description: mensaje,
      icon: <Icon type="bell" theme="twoTone" />,
      duration: 10,
      placement: 'bottomRight',
      style: { backgroundColor: '#d1d1d1' }
    });
  };

  getDataUser() {
    let data = Auth.getDataLog();
    if (data !== null && data !== undefined) {
      let user = data.user.nombre + " " + data.user.apellido
      return user
    }
    return '';
  }
  esEmpleado() {
    return Auth.getDataLog().user.rol.toLowerCase().indexOf('empleado') > -1
  }


  render() {
    return (
      <Header className="site-layout-background" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Menu theme="dark" mode="horizontal"  >
          {this.esEmpleado() ? null : <SubMenu
            key="notificacion"
            title={
              <div>
                <Link to="/solicitud_sistemas">
                  <Badge count={this.state.pendientes} overflowCount={99}>
                    <Icon type="bell" />
                  </Badge>
                </Link>
              </div>}
          >
          </SubMenu>}

          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                <span>{this.getDataUser()}</span>
              </span>
            }
          >
            <Menu.Item key="40">Mi Perfil<Link to={this.esEmpleado() ? '/empleado/perfil' : "/sistemas/perfil"} /></Menu.Item>
            <Menu.Item key="30" onClick={(e) => { Auth.logout() }} >Cerrar Sesion<Link to="/login" /></Menu.Item>
          </SubMenu>

        </Menu>
      </Header>
    );

  }
}