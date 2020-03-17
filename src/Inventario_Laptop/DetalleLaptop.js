import React from 'react';
import { Tabs } from 'antd';
import { LaptopOutlined, WindowsOutlined } from '@ant-design/icons';
import { Descriptions, Badge } from 'antd';
import { FiHardDrive } from "react-icons/fi";
import { FaMemory } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";

const { TabPane } = Tabs;

class DetalleLaptop extends React.Component {
  render() {
    return (
      <div className="div-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><LaptopOutlined />General</span>} key="1">
            <Descriptions title="Datos generales del equipo" bordered>
              <Descriptions.Item label="Codigo Laptop" span={3}>HLB_PC_01</Descriptions.Item>
              <Descriptions.Item label="Empleado a cargo" span={3}>Marco Mendieta</Descriptions.Item>
              <Descriptions.Item label="Marca">HP</Descriptions.Item>
              <Descriptions.Item label="Modelo">Pavilion 15-cs0xxx</Descriptions.Item>
              <Descriptions.Item label="Número de serie">454WEFRX-2</Descriptions.Item>
              <Descriptions.Item label="Nombre PC">HLB_PC_SIST1</Descriptions.Item>
              <Descriptions.Item label="Usuario PC">SistemasHLB001</Descriptions.Item>
              <Descriptions.Item label="Estado">
                <Badge status="processing" text="Operativo" />
              </Descriptions.Item>
              <Descriptions.Item label="Dirección IP" span={3}>192.168.1.1</Descriptions.Item>
              <Descriptions.Item label="Descripción" span={3}>
                Cambiar el sistema operativo.
                <br />
                Se necesita reparar el panel táctil.
              </Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><WindowsOutlined />SO</span>} key="2" >
            <Descriptions title="Datos del sistema operativo" bordered>
              <Descriptions.Item label="Sistema operativo" span={2}>Windows 7 professional</Descriptions.Item>
              <Descriptions.Item label="Tipo de sistema operativo">64 bits</Descriptions.Item>
              <Descriptions.Item label="Service Pack 1" span={3}><Badge status="success" text="Si" /></Descriptions.Item>
              <Descriptions.Item label="Licencia" span={3}>
                <Badge status="warning" text="No" />
              </Descriptions.Item>
              <Descriptions.Item label="Office">2016</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><GiProcessor className="anticon" />Procesador</span>} key="3" >
            <Descriptions title="Procesador" bordered>
              <Descriptions.Item label="Código">HLB_PROCES_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Intel Core i7</Descriptions.Item>
              <Descriptions.Item label="Modelo">8va generación</Descriptions.Item>
              <Descriptions.Item label="Número de serie">24353DFXE</Descriptions.Item>
              <Descriptions.Item label="Frecuencia">2.54 GHz</Descriptions.Item>
              <Descriptions.Item label="Número de núcleos">8</Descriptions.Item>
              <Descriptions.Item label="Descripción">Tarjeta gráfica nvidia geforce</Descriptions.Item>
            </Descriptions>
            <br />                     
          </TabPane>

          <TabPane tab={<span><FaMemory className="anticon" />Memoria RAM</span>} key="4" >
            <Descriptions title="Datos generales de memoria RAM" bordered>
              <Descriptions.Item label="RAM soportada">2 GB</Descriptions.Item>
              <Descriptions.Item label="Número de slots">3</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="RAM Principal" bordered>
              <Descriptions.Item label="Código">HLB_RAM_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Kingston</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Capacidad">12 GB</Descriptions.Item>
              <Descriptions.Item label="Tipo">SSD</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><FiHardDrive className="anticon" />Disco Duro</span>} key="5" >
            <Descriptions title="Información sobre discos duros" bordered>
              <Descriptions.Item label="Código">HLB_DD_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Toshiba</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Capacidad">2 TB</Descriptions.Item>
              <Descriptions.Item label="Tipo">SSD</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions> 
          </TabPane>  
        </Tabs>
      </div>
    )
 }
}

export default DetalleLaptop;