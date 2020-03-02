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


//DESKTOP
 //codigo, (monitor, teclado, parlantes, mouse): codigo, marca,modelo, numero serie, descripcion
 //<<<CPU>>>
 //tarjeta madre:codigo, marca,modelo, numero serie, descripcion, ram soportada, numero de slots para ram, conexiones para dd
 //memoria ram: codigo, marca, modelo, numero de serie,  descripcion, capacidad, tipo (add more)
 //disco duro:codigo, marca, modelo. numero de serie, descripcion, capacidad de almacenamiento, tipo (add more)
 //procesador: codigo, marca, modelo, numero de serie, descripcion, frecuencia, numero de nucleos
 //tarjeta de red, case, fuente de poder: codigo, marca, modelo, numero de serie, descripcion
 //<<<descripcion general>>>


//LAPTOP
  //codigo, marca, modelo, nserie, ram soportada, numero de slots para ram, frecuencia del procesador, nnucleos del procesador, descripcion
  ////memoria ram: codigo, marca, modelo, numero de serie,  descripcion, capacidad, tipo (add more)
 //disco duro:codigo, marca, modelo. numero de serie, descripcion, capacidad de almacenamiento, tipo (add more)


 //ROUTER
 //codigo, nombre, pass, usuario, clave, marca, modelo, numero de serie, descripcion. 

 //CONSIDERACIONES GENERALES
 //Cargar ips con estado libre para poder asignarlas y cambiar este estado a en uso, ideal con toggle button

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
      <div style={{ padding: 24, minHeight: 360 }}>     
      <Row>
        <Col span={12}>
          {this.state.showTitle ? <Title>Inventario de routers</Title> : <Title >Nuevo router</Title>}
        </Col>
        <Col style={{ align: 'right' }} offset={7} span={5}>
          {this.state.showButton ? 
             <Button onClick={this.handleClick} type="primary" size="large" icon="plus">Agregar un nuevo router</Button>
           : <Button onClick={this.handleClick2} type="primary" size="large" icon="left">Volver</Button>
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