import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { FaNetworkWired } from "react-icons/fa";
import { MdRouter } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo: '',
        bspi: '',
        departamento: '',
        asignar: '',
        nombre: '',
        pass: '',
        usuario: '',
        clave: '',
        marca: '',
        modelo: '',
        nserie: '',
        estado: '',
        ip: '',
        penlace: undefined,
        descripcion: ''
    };
  }

  componentDidMount = () => {
    if (typeof this.props.location !== 'undefined') {
      const { info } = this.props.location.state;
      this.cargar_datos(info);
    }
  }

  cargar_datos(info) {
    console.log("router: ", info)
    this.setState({
        codigo: info.codigo,
        bspi: info.bspi,
        departamento: info.departamento,
        asignar: info.empleado,
        nombre: info.nombre,
        pass: info.pass,
        usuario: info.usuario,
        clave: info.clave,
        marca: info.marca,
        modelo: info.modelo,
        nserie: info.num_serie,
        estado: info.estado,
        ip: info.ip,
        penlace: info.penlace,
        descripcion: info.descripcion
    })
  }

  render() {
    return (
      <div>
        <div className="div-container-title">      
          <Row>
            <Col span={12}>
              <Title level={2}>Detalle de router</Title> 
            </Col>
            <Col className='flexbox'>
            <Link to={{ pathname: '/router' }} ><Button type="primary" icon="left">Volver</Button></Link>
            </Col>
          </Row>  
          <div className="div-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><MdRouter className="anticon" />General</span>} key="1">
                <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Codigo Router" span={3}>{this.state.codigo} </Descriptions.Item>
                  <Descriptions.Item label="BSPI-Punto" >{this.state.bspi}</Descriptions.Item>
                  <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo">{this.state.asignar}</Descriptions.Item>
                  <Descriptions.Item label="Marca">{this.state.marca}</Descriptions.Item>
                  <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">{this.state.nserie}</Descriptions.Item>
                  <Descriptions.Item label="Estado">
                    <Badge status="processing" text={this.state.estado} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Descripción">
                    {this.state.descripcion}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              {this.state.penlace !== (undefined || null || '') ? 
                <TabPane tab={<span><FaNetworkWired className="anticon" />Dirección IP</span>} key="2" >
                  <Descriptions title="Dirección IP asisgnada" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Dirección IP" span={3}>{this.state.ip}</Descriptions.Item>
                    <Descriptions.Item label="Puerta de enlace">{this.state.penlace}</Descriptions.Item>
                  </Descriptions>
                </TabPane> : null    
              }

              <TabPane tab={<span><AiOutlineSetting className="anticon" />Configuración</span>} key="3" >
                <Descriptions title="Datos de configuración del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Nombre" span={3}>{this.state.nombre}</Descriptions.Item>
                  <Descriptions.Item label="Pass" span={3}>{this.state.pass} </Descriptions.Item>
                  <Descriptions.Item label="Usuario" span={3}>{this.state.usuario} </Descriptions.Item>
                  <Descriptions.Item label="Clave">{this.state.clave}</Descriptions.Item>
                </Descriptions>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default DetalleRouter;