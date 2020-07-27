import React from 'react';
import { Menu, Icon, Layout  } from 'antd';
import { Link } from 'react-router-dom';
import Auth from '../../Login/Auth'
import '../../custom-antd.css'; 
const { Header } = Layout;
const { SubMenu } = Menu;
export default class HeaderComp extends React.Component{

    getDataUser(){
        let data = Auth.getDataLog();
        if(data!==null&&data!==undefined){
          let user = data.user.nombre+" "+ data.user.apellido
          return user
        }
        return '';
    }
    esEmpleado(){
      return Auth.getDataLog().user.rol.toLowerCase().indexOf('empleado') > -1
    }
    render(){
        return(
            <Header className="site-layout-background" style={{display: 'flex', alignItems: 'center',justifyContent: 'flex-end'}}>
            <Menu theme="dark" mode="horizontal"  >
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
                        <Menu.Item key="30" onClick ={ (e) => {Auth.logout()} } >Cerrar Sesion<Link to="/login" /></Menu.Item>
                    </SubMenu>
              </Menu>
          </Header>
        );

    }
}