import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { LaptopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiHardDrive } from "react-icons/fi";
import { FaMemory } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import MetodosAxios from '../Servicios/AxiosRouter'
import Axios from '../Servicios/AxiosLaptop'

const { TabPane } = Tabs;
const { Title } = Typography; 

class DetalleLaptop extends React.Component {
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
      id_procesador: '',
      procesador: {
        codigo: '',
        modelo: '',
        descripcion: '',
        numero_serie: '',
        marca: '',
        frecuencia: '',
        nucleos: '',
    },
      ram_soportada: '',
      slots_ram: '',
      rams: [],
      discos: [],
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
    Axios.obtenerInfoLaptop(info.key).then(res => {
      let registro = res.data;
      console.log("registro:",registro);
        this.setState({
            codigo: info.codigo,
            bspi: registro.general.bspi,
            departamento: registro.general.departamento,
            empleado: registro.general.asignado,
            marca: info.marca,
            modelo: info.modelo,
            num_serie: info.num_serie,
            name_pc: info.name_pc,
            user_pc: info.user_pc,
            estado: info.estado,
            so: info.so,
            so_type: info.so_type,
            servpack: info.servpack,
            licencia: info.licencia,
            office: info.office,
            procesador: registro.procesador,
            ram_soportada: registro.ram_soportada,
            slots_ram: registro.numero_slots,
            rams: info.rams,
            discos: info.discos,
            descripcion: info.descripcion
          })
    })
    info.ip === " " ? this.setState({ip: "No asignada"}) : 
    MetodosAxios.buscar_ip_por_codigo(info.ip).then(res => {      
        res.data.forEach((registro) => {
            this.setState({ ip: registro.direccion_ip })
        })
    })
  }

  render() {
    return (
      <div>
        <div className="div-container-title">      
          <Row>
            <Col span={12}>
              <Title level={2}>Detalle de laptop</Title> 
            </Col>
            <Col className='flexbox'>
            <Button onClick={this.props.history.goBack} type="primary" icon="left">Volver</Button>
            </Col>
          </Row>  
          <div className="div-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><LaptopOutlined />General</span>} key="1">
                <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código Laptop" span={3}>{this.state.codigo}</Descriptions.Item>                  
                  {this.state.bspi === undefined ? null :    
                  <>         
                  <Descriptions.Item label="BSPI-Punto">{this.state.bspi}</Descriptions.Item>
                  <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo">{this.state.empleado}</Descriptions.Item></>}
                  <Descriptions.Item label="Marca">{this.state.marca}</Descriptions.Item>
                  <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">{this.state.num_serie}</Descriptions.Item>
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
                    <Badge status="warning" text={this.state.licencia} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Office">{this.state.office}</Descriptions.Item>
                </Descriptions>
              </TabPane>

              <TabPane tab={<span><GiProcessor className="anticon" />Procesador</span>} key="3" >
                <Descriptions title="Procesador" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Código">{this.state.procesador.codigo}</Descriptions.Item>
                  <Descriptions.Item label="Marca">{this.state.procesador.marca}</Descriptions.Item>
                  <Descriptions.Item label="Modelo">{this.state.procesador.modelo}</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">{this.state.procesador.numero_serie}</Descriptions.Item>
                  <Descriptions.Item label="Frecuencia">{this.state.procesador.frecuencia+" GHz"}</Descriptions.Item>
                  <Descriptions.Item label="Número de núcleos">{this.state.procesador.nucleos}</Descriptions.Item>
                  <Descriptions.Item label="Descripción">{this.state.procesador.descripcion}</Descriptions.Item>
                </Descriptions>
                <br />                     
              </TabPane>

              <TabPane tab={<span><FaMemory className="anticon" />Memoria RAM</span>} key="4" >
                <Descriptions title="Datos generales de memoria RAM" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="RAM soportada">{this.state.ram_soportada}</Descriptions.Item>
                  <Descriptions.Item label="Número de slots">{this.state.slots_ram}</Descriptions.Item>
                </Descriptions>
                <br />
                <div>
                  {this.state.rams.map((ram, i) => {
                    return (
                      <div key={ram.id_equipo}>
                        <Descriptions title={"Memoria RAM "+(i+1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                          <Descriptions.Item label="Código">{ram.codigo} </Descriptions.Item>
                          <Descriptions.Item label="Marca">{ram.marca} </Descriptions.Item>
                          <Descriptions.Item label="Modelo">{ram.modelo} </Descriptions.Item>
                          <Descriptions.Item label="Número de serie">{ram.numero_serie} </Descriptions.Item>
                          <Descriptions.Item label="Capacidad">{ram.capacidad} </Descriptions.Item>
                          <Descriptions.Item label="Tipo">{ram.tipo} </Descriptions.Item>
                          <Descriptions.Item label="Descripción">{ram.descripcion} </Descriptions.Item>
                        </Descriptions>       
                        <br /> 
                      </div>     
                    );
                  })}
                </div>               
              </TabPane>

              <TabPane tab={<span><FiHardDrive className="anticon" />Disco Duro</span>} key="5" >
              <div>
                  {this.state.discos.map((dd, i) => {
                    return (
                      <div key={dd.id_equipo}>
                        <Descriptions title={"Disco duro "+(i+1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                          <Descriptions.Item label="Código">{dd.codigo} </Descriptions.Item>
                          <Descriptions.Item label="Marca">{dd.marca} </Descriptions.Item>
                          <Descriptions.Item label="Modelo">{dd.modelo} </Descriptions.Item>
                          <Descriptions.Item label="Número de serie">{dd.numero_serie} </Descriptions.Item>
                          <Descriptions.Item label="Capacidad">{dd.capacidad} </Descriptions.Item>
                          <Descriptions.Item label="Tipo">{dd.tipo} </Descriptions.Item>
                          <Descriptions.Item label="Descripción">{dd.descripcion} </Descriptions.Item>
                        </Descriptions>       
                        <br /> 
                      </div>     
                    );
                  })}
                </div>
              </TabPane>  
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default DetalleLaptop;