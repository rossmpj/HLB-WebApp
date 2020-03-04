import React from 'react';
import { 
  Typography,
  Button,
  Row, 
  Col,
} from 'antd';
import TablaRouter from './TablaRouter';
import FormularioRouter from './FormularioRouter';
const { Title } = Typography;

// ROUTER
//   codigo, nombre, pass, usuario, clave, marca, modelo, numero de serie, descripcion. 

// CONSIDERACIONES GENERALES
//   Cargar ips con estado libre para poder asignarlas y cambiar este estado a en uso, ideal con toggle button

class HomeRouter extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      showComponent: false,
      showTable:true,
      showButton: true,
      showTitle:true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  handleClick() {
    this.setState({
      showComponent: true,
      showTable: false,
      showButton: false,
      showTitle:false,
    });     
  }
  handleClick2() {
    this.setState({
      showComponent: false,
      showTable: true,
      showButton: true,
      showTitle:true,
    });     
  }

  render() {
    return (
      <div className="div-container-title">     
        <Row>
          <Col span={12}>
            {this.state.showTitle ? <Title level={2}>Inventario de routers</Title> : <Title level={2} >Nuevo router</Title>}
          </Col>
          <Col className='flexbox'>
            {this.state.showButton ? 
              <Button onClick={this.handleClick} type="primary" icon="plus">Agregar router</Button>
            : <Button onClick={this.handleClick2} type="primary" icon="left">Volver</Button>
            }
          </Col>
        </Row>
        {this.state.showComponent ? <FormularioRouter /> : null}
        {this.state.showTable ? <TablaRouter /> : null}
      </div> 
    );
  }
}

export default HomeRouter;