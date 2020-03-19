import React from 'react';
import { Row, Col, Typography, Button, Descriptions} from 'antd';

const { Title } = Typography; 

class Detalle_RAM_DD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo: '',
        marca: '',
        modelo: '',
        num_serie: '',
        descripcion: '',
        tipo_equipo: ''
    };
  }

  componentDidMount = () => {
    if (typeof this.props.location !== 'undefined') {
      const { info } = this.props.location.state;
      const { tipo_equipo } = this.props.location.state;
      this.cargar_datos(info);
      this.cambiar_titulo(tipo_equipo);
    }
  }

  cargar_datos(info) {
    console.log("INFO",info);
    this.setState({
        codigo: info,
        marca: info.marca,
        modelo: info.modelo,
        num_serie: info.num_serie,
        descripcion: info.descripcion
    })
  }

  cambiar_titulo(tipo_equipo) {
    this.setState({
      tipo_equipo: tipo_equipo,
    })
  }

  render() {
    return (
      <div>
        <div className="div-container-title">      
          <Row>
            <Col span={12}>
              <Title level={2}>Detalle de {this.state.tipo_equipo} </Title> 
            </Col>
            <Col className='flexbox'>
            <Button onClick={this.props.history.goBack} type="primary" icon="left">Volver</Button>
            </Col>
          </Row>  
          <div className="div-container">
            <Descriptions title={"Información de "+this.state.tipo_equipo} bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Código" span={3} >{this.state.codigo} </Descriptions.Item>
              <Descriptions.Item label="Marca" span={3} >{this.state.marca} </Descriptions.Item>
              <Descriptions.Item label="Modelo" span={3} >{this.state.modelo} </Descriptions.Item>
              <Descriptions.Item label="Número de serie" span={3} >{this.state.num_serie} </Descriptions.Item>
              <Descriptions.Item label="Descripción">{this.state.descripcion} </Descriptions.Item>
            </ Descriptions>
          </div>
        </div>
      </div>
    )
  }
}

export default Detalle_RAM_DD;