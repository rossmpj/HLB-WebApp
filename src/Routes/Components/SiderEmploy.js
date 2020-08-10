import React from 'react';
import { Menu, Icon, Layout  } from 'antd';
import { Link } from 'react-router-dom';
import '../../custom-antd.css';
const { Sider } = Layout; 

export default class SiderEmploy extends React.Component{
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };

      render(){
          return(<Sider
            breakpoint="lg"
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            {this.state.collapsed ? <img className="App-logo" src={"/Boton.png"} alt="icon" /> : <img className="App-logo" src={"./logo.png"} alt="logo" />}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="20">
                <span>
                <Icon type="home" />
                <span>Inicio
                
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              
              <Menu.Item key="13">
                <span>
                <Icon type="message" />
                <span>Solicitudes
                </span>
                </span>
                <Link to="/empleado/solicitudes" />
              </Menu.Item>
             

              
            </Menu>
          </Sider>);
      }
    
}