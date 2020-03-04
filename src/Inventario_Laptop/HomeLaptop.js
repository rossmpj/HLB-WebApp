import React from 'react';
import { 
  Typography,
  Button,
  Row, 
  Col,
} from 'antd';
import TablaLaptop from './TablaLaptop';
import FormularioLaptop from './FormularioLaptop';
const { Title } = Typography;

// LAPTOP
//   codigo, marca, modelo, nserie, ram soportada, numero de slots para ram, frecuencia del procesador, nnucleos del procesador, descripcion
//   memoria ram: codigo, marca, modelo, numero de serie,  descripcion, capacidad, tipo (add more)
//   disco duro:codigo, marca, modelo. numero de serie, descripcion, capacidad de almacenamiento, tipo (add more)

// CONSIDERACIONES GENERALES
//   Cargar ips con estado libre para poder asignarlas y cambiar este estado a en uso, ideal con toggle button

class HomeLaptop extends React.Component{
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
            {this.state.showTitle ? <Title level={2}>Inventario de laptops</Title> : <Title level={2}>Nueva laptop</Title>}
          </Col>
          <Col className='flexbox'>
            {this.state.showButton ? 
              <Button onClick={this.handleClick} type="primary" icon="plus">Agregar laptop</Button>
            : <Button onClick={this.handleClick2} type="primary" icon="left">Volver</Button>
            }
          </Col>
        </Row>
        {this.state.showComponent ? <FormularioLaptop /> : null}
        {this.state.showTable ? <TablaLaptop /> : null}
    </div> 
    );
  }
}

export default HomeLaptop;