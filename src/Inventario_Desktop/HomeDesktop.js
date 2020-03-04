import React from 'react';
import { 
  Typography,
  Button,
  Row, 
  Col,
} from 'antd';
import TablaDesktop from './TablaDesktop';
import FormularioDesktop from './FormularioDesktop';
const { Title } = Typography;

// DESKTOP
//   codigo, (monitor, teclado, parlantes, mouse): codigo, marca,modelo, numero serie, descripcion
//   <<<CPU>>>
//   tarjeta madre:codigo, marca,modelo, numero serie, descripcion, ram soportada, numero de slots para ram, conexiones para dd
//   memoria ram: codigo, marca, modelo, numero de serie,  descripcion, capacidad, tipo (add more)
//   disco duro:codigo, marca, modelo. numero de serie, descripcion, capacidad de almacenamiento, tipo (add more)
//   procesador: codigo, marca, modelo, numero de serie, descripcion, frecuencia, numero de nucleos
//   tarjeta de red, case, fuente de poder: codigo, marca, modelo, numero de serie, descripcion
//   <<<descripcion general>>>

// CONSIDERACIONES GENERALES
//   Cargar ips con estado libre para poder asignarlas y cambiar este estado a en uso, ideal con toggle button

class HomeDesktop extends React.Component{
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
            {this.state.showTitle ? <Title level={2}>Inventario de computadoras</Title> : <Title level={2}>Nueva computadora</Title>}
          </Col>
          <Col className='flexbox'>
            {this.state.showButton ? 
              <Button onClick={this.handleClick} type="primary" icon="plus">Agregar computadora</Button>
            : <Button onClick={this.handleClick2} type="primary" icon="left">Volver</Button>
            }
          </Col>
        </Row>
        {this.state.showComponent ? <FormularioDesktop /> : null}
        {this.state.showTable ? <TablaDesktop /> : null}
    </div> 
    );
  }
}

export default HomeDesktop;