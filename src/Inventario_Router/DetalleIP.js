import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { FaNetworkWired } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import MetodosAxios from '../Servicios/AxiosRouter'

const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleIP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo_ip: '',
      codigo: '',
      asignado: '',
      encargado: '',
      ip: '',
      estado: '',
      hostname: '',
      subred: '',
      fortigate: '',
      maquinas_adic: '',
      observacion: ''
    }
  }

  componentDidMount = () => {
    if (typeof this.props.location !== 'undefined') {
      const { info } = this.props.location.state;
      this.obtener_ip(info.ip);
    }
  }

  obtener_ip(codigo) {
    MetodosAxios.buscar_ip_por_codigo(codigo).then(res => {
      res.data.map(registro => {
        this.setState({
          codigo: registro.id_ip,
          asignado: registro.nombre_usuario,
          encargado: registro.encargado_registro,
          ip: registro.direccion_ip,
          estado: registro.estado,
          hostname: registro.hostname,
          subred: registro.subred,
          fortigate: registro.fortigate,
          maquinas_adic: registro.maquinas_adicionales,
          observacion: registro.observacion
        })
      });
    });
  }

  render() {
    return (
      <div>
        <div className="div-container-title">      
          <Row>
            <Col span={12}>
              <Title level={2}>Detalle de IP</Title> 
            </Col>
            <Col className='flexbox'>
            <Button type="primary" onClick={this.props.history.goBack} icon="left">Volver</Button>
            </Col>
          </Row>  
          <div className="div-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><AiOutlineSetting className="anticon" />General</span>} key="1">
                <Descriptions title="Datos generales" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Codigo IP" span={3}>{this.state.codigo} </Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo">{this.state.asignado}</Descriptions.Item>
                  <Descriptions.Item label="Asignado a">{this.state.encargado}</Descriptions.Item>
                  <Descriptions.Item label="Estado">
                    <Badge status="processing" text={this.state.estado} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Observación">
                    {this.state.observacion}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><FaNetworkWired className="anticon" />Dirección IP</span>} key="2" >
                <Descriptions title="Dirección IP asignada" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                <Descriptions.Item label="Dirección IP" span={3}>{this.state.ip}</Descriptions.Item>
                <Descriptions.Item label="Hostname">{this.state.hostname}</Descriptions.Item>
                <Descriptions.Item label="Subred" span={3}>{this.state.subred}</Descriptions.Item>
                <Descriptions.Item label="Fortigate">{this.state.fortigate}</Descriptions.Item>                
                <Descriptions.Item label="Máquinas adicionales">{this.state.maquinas_adic}</Descriptions.Item>
                </Descriptions>
              </TabPane>

            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default DetalleIP;