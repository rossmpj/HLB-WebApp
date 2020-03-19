import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { DesktopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiCpu, FiSpeaker } from "react-icons/fi";

const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      bspi: '',
      departamento: '',
      empleado: '',
      marca: '',
      modelo: '',
      num_serie: '',
      name_pc: '',
      user_pc: '',
      estado: '',
      ip: '',
      so: '',
      so_type: '',
      servpack: '',
      licencia: '',
      office: '',
      procesador: '',
      frecuencia: '',
      nnucleos: '',
      ram_soportada: '',
      slots_ram: '',
      rams: [],
      discos: [],
      monitor: '',
      teclado: '',
      mouse: '',
      parlantes: '',
      mainboard: '',
      tarj_red: '',
      case: '',
      f_alim: '',
      f_poder: '',
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
    console.log("desktop", info);
    this.setState({
        codigo: info.codigo,
        bspi: info.bspi,
        departamento: info.departamento,
        empleado: info.empleado,
        marca: info.marca,
        modelo: info.modelo,
        num_serie: info.num_serie,
        name_pc: info.name_pc,
        user_pc: info.user_pc,
        estado: info.estado,
        ip: info.ip,
        so: info.so,
        so_type: info.so_type,
        servpack: info.servpack,
        licencia: info.licencia,
        office: info.office,
        procesador: info.procesador,
        frecuencia: info.frecuencia,
        nnucleos: info.nnucleos,
        ram_soportada: info.ram_soportada,
        slots_ram: info.slots_ram,
        rams: info.rams,
        discos: info.discos,
        monitor: info.monitor,
        teclado: info.teclado,
        mouse: info.mouse,
        parlantes: info.parlantes,
        mainboard: info.mainboard,
        tarj_red: info.tarj_red,
        case: info.case,
        f_alim: info.f_alim,
        f_poder: info.f_poder,
        descripcion: info.descripcion
    })
  }

  render() {
    return (
      <div>
        <div className="div-container-title">      
          <Row>
            <Col span={12}>
              <Title level={2}>Detalle de computadora</Title> 
            </Col>
            <Col className='flexbox'>
            <Button onClick={this.props.history.goBack} type="primary" icon="left">Volver</Button>
            </Col>
          </Row>  
          <div className="div-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><DesktopOutlined />General</span>} key="1">
                <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Codigo PC" span={3}>{this.state.codigo}</Descriptions.Item>
                  <Descriptions.Item label="BSPI-Punto">{this.state.bspi}</Descriptions.Item>
                  <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo">{this.state.empleado}</Descriptions.Item>
                  <Descriptions.Item label="Nombre PC">{this.state.name_pc}</Descriptions.Item>
                  <Descriptions.Item label="Usuario PC">{this.state.user_pc}</Descriptions.Item>
                  <Descriptions.Item label="Estado">
                    <Badge status="processing" text={this.state.estado} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Dirección IP" span={3}>{this.state.ip}</Descriptions.Item>
                  <Descriptions.Item label="Descripción">
                    {this.state.descripcion}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><WindowsOutlined />SO</span>} key="2" >
                <Descriptions title="Datos del sistema operativo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Sistema operativo" span={2}>{this.state.so}</Descriptions.Item>
                  <Descriptions.Item label="Tipo de sistema operativo">{this.state.so_type}</Descriptions.Item>
                  <Descriptions.Item label="Service Pack 1" span={3}><Badge status="success" text={this.state.servpack} /></Descriptions.Item>
                  <Descriptions.Item label="Licencia" span={3}>
                    <Badge status="error" text={this.state.licencia} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Office">{this.state.office}</Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><FiSpeaker className="anticon" />Periféricos</span>} key="3" >
                <Descriptions title="Monitor" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.monitor}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
                <br />
                <Descriptions title="Teclado" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.teclado}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
                <br />
                <Descriptions title="Mouse" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.mouse}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>    
                <br />
                <Descriptions title="Parlantes" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.parlantes}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions> 
                <br />           
                <Descriptions title="UPS/Regulador" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.f_alim}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><FiCpu className="anticon" />CPU</span>} key="4" >
                <Descriptions title="Tarjeta madre" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.mainboard}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="RAM soportada"> </Descriptions.Item>
                  <Descriptions.Item label="Número de slots"> </Descriptions.Item>
                  <Descriptions.Item label="Conexiones para disco duro"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
                <br />
                <div>
                  {this.state.rams.map((ram, index) => {
                    return (
                      <div key={index}>
                        <Descriptions title={"Memoria RAM "+(index+1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                          <Descriptions.Item label="Código">{ram}</Descriptions.Item>
                          <Descriptions.Item label="Marca"></Descriptions.Item>
                          <Descriptions.Item label="Modelo"></Descriptions.Item>
                          <Descriptions.Item label="Número de serie"></Descriptions.Item>
                          <Descriptions.Item label="Capacidad"></Descriptions.Item>
                          <Descriptions.Item label="Tipo"></Descriptions.Item>
                          <Descriptions.Item label="Descripción"></Descriptions.Item>
                        </Descriptions>       
                        <br /> 
                      </div>     
                    );
                  })}
                </div>
                <br />
                <div>
                  {this.state.discos.map((dd, index) => {
                    return (
                      <div key={index}>
                        <Descriptions title={"Disco duro "+(index+1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                          <Descriptions.Item label="Código">{dd}</Descriptions.Item>
                          <Descriptions.Item label="Marca"></Descriptions.Item>
                          <Descriptions.Item label="Modelo"></Descriptions.Item>
                          <Descriptions.Item label="Número de serie"></Descriptions.Item>
                          <Descriptions.Item label="Capacidad"></Descriptions.Item>
                          <Descriptions.Item label="Tipo"></Descriptions.Item>
                          <Descriptions.Item label="Descripción"></Descriptions.Item>
                        </Descriptions>       
                        <br /> 
                      </div>     
                    );
                  })}
                </div>   
                <br />
                <Descriptions title="Procesador" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.procesador}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Frecuencia"> </Descriptions.Item>
                  <Descriptions.Item label="Número de núcleos"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
                <br />
                <Descriptions title="Tarjeta de red" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.tarj_red}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
                <br />
                <Descriptions title="Case" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.case}</Descriptions.Item>
                  <Descriptions.Item label="Marca"> </Descriptions.Item>
                  <Descriptions.Item label="Modelo"> </Descriptions.Item>
                  <Descriptions.Item label="Número de serie"> </Descriptions.Item>
                  <Descriptions.Item label="Descripción"> </Descriptions.Item>
                </Descriptions>
                <br />
                <Descriptions title="Fuente de poder" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.f_poder}</Descriptions.Item>
                  <Descriptions.Item label="Marca">Lenovo</Descriptions.Item>
                  <Descriptions.Item label="Modelo">SGGT2GTX</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">13353435346</Descriptions.Item>
                  <Descriptions.Item label="Descripción">-</Descriptions.Item>
                </Descriptions>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default DetalleDesktop;