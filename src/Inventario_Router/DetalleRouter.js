import React from 'react';
import { Tabs, Row, Col, Typography, Button } from 'antd';
import { Descriptions, Badge } from 'antd';
import { FaNetworkWired } from "react-icons/fa";
import { MdRouter } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleRouter extends React.Component {
  render() {
    return (
      <div>
        <div className="div-container-title">      
          <Row>
            <Col span={12}>
              <Title level={2}>Detalle router</Title> 
            </Col>
            <Col className='flexbox'>
            <Link to={{ pathname: '/router' }} ><Button type="primary" icon="left">Volver</Button></Link>
            </Col>
          </Row>  
          <div className="div-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><MdRouter className="anticon" />General</span>} key="1">
                <Descriptions title="Datos generales del equipo" bordered>
                  <Descriptions.Item label="Codigo Router" span={3}>HLB_PC_01</Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo" span={3}>Marco Mendieta</Descriptions.Item>
                  <Descriptions.Item label="Marca">HP</Descriptions.Item>
                  <Descriptions.Item label="Modelo">Pavilion 15-cs0xxx</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">454WEFRX-2</Descriptions.Item>
                  <Descriptions.Item label="Estado">
                    <Badge status="processing" text="Operativo" />
                  </Descriptions.Item>
                  <Descriptions.Item label="Descripción">
                    Cambiar el sistema operativo.
                    <br />
                    Se necesita reparar el panel táctil.
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><FaNetworkWired className="anticon" />Dirección IP</span>} key="2" >
                <Descriptions title="Dirección IP asisgnada" bordered>
                  <Descriptions.Item label="Dirección IP" span={3}>192.168.1.1</Descriptions.Item>
                  <Descriptions.Item label="Puerta de enlace">192.168.1.0</Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><AiOutlineSetting className="anticon" />Configuración</span>} key="3" >
                <Descriptions title="Datos de configuración del equipo" bordered>
                  <Descriptions.Item label="Nombre" span={3}>2 GB</Descriptions.Item>
                  <Descriptions.Item label="Pass" span={3}>3</Descriptions.Item>
                  <Descriptions.Item label="Usuario" span={3}>HLB_RAM_c1</Descriptions.Item>
                  <Descriptions.Item label="Clave">Kingston</Descriptions.Item>
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