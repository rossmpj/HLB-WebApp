import React from 'react';
import { Tabs } from 'antd';
import { DesktopOutlined, WindowsOutlined } from '@ant-design/icons';
import { Descriptions, Badge } from 'antd';
import { FiCpu, FiSpeaker } from "react-icons/fi";

const { TabPane } = Tabs;

class DetalleDesktop extends React.Component {
  render() {
    return (
      <div className="div-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><DesktopOutlined />General</span>} key="1">
            <Descriptions title="Datos generales del equipo" bordered>
              <Descriptions.Item label="Codigo PC" span={3}>HLB_PC_01</Descriptions.Item>
              <Descriptions.Item label="Empleado a cargo" span={3}>Rafael Álvarez</Descriptions.Item>
              <Descriptions.Item label="Nombre PC">HLB_PC_SIS</Descriptions.Item>
              <Descriptions.Item label="Usuario PC">SistemasHLB00</Descriptions.Item>
              <Descriptions.Item label="Estado">
                <Badge status="processing" text="Operativo" />
              </Descriptions.Item>
              <Descriptions.Item label="Dirección IP" span={3}>192.168.12.1</Descriptions.Item>
              <Descriptions.Item label="Descripción" span={3}>
                El equipo necesita cambio urgente de algunos componentes.
                <br />
                Además requiere actualización de ciertos drivers.
                <br />
              </Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><WindowsOutlined />SO</span>} key="2" >
            <Descriptions title="Datos del sistema operativo" bordered>
              <Descriptions.Item label="Sistema operativo" span={2}>Windows 7 professional</Descriptions.Item>
              <Descriptions.Item label="Tipo de sistema operativo">64 bits</Descriptions.Item>
              <Descriptions.Item label="Service Pack 1" span={3}><Badge status="success" text="Si" /></Descriptions.Item>
              <Descriptions.Item label="Licencia" span={3}>
                <Badge status="error" text="No" />
              </Descriptions.Item>
              <Descriptions.Item label="Office">2019</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><FiSpeaker className="anticon" />Periféricos</span>} key="3" >
            <Descriptions title="Monitor" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Teclado" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Mouse" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>    
            <br />
            <Descriptions title="Parlantes" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions> 
            <br />           
            <Descriptions title="UPS/Regulador" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><FiCpu className="anticon" />CPU</span>} key="4" >
            <Descriptions title="Tarjeta madre" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="RAM soportada">2 GB</Descriptions.Item>
              <Descriptions.Item label="Número de slots">3</Descriptions.Item>
              <Descriptions.Item label="Conexiones para disco duro">2</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Memoria RAM" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Capacidad">12 GB</Descriptions.Item>
              <Descriptions.Item label="Tipo">SSD</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Disco Duro" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Capacidad">512 MB</Descriptions.Item>
              <Descriptions.Item label="Tipo">SSD</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>    
            <br />
            <Descriptions title="Procesador" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Frecuencia">2 GHz</Descriptions.Item>
              <Descriptions.Item label="Número de núcleos">4</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Tarjeta de red" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Case" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Fuente de poder" bordered>
              <Descriptions.Item label="Código">HLB_1</Descriptions.Item>
              <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
              <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
              <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
              <Descriptions.Item label="Descripción">-</Descriptions.Item>
            </Descriptions>
          </TabPane>
        </Tabs>
      </div>
    )
 }
}

export default DetalleDesktop;