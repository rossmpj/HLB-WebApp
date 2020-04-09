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
        modelo: '',
        descripcion: '',
        numero_serie: '',
        id_marca: '',
    },
      modelo_procesador: '',
      frecuencia: '',
      nnucleos: '',
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
            bspi: info.bspi,
            departamento: info.departamento,
            empleado: info.empleado,
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
            id_procesador: info.id_procesador,
            procesador: registro.pc_procesador,
            frecuencia: info.frecuencia,
            nnucleos: info.nnucleos,
            ram_soportada: info.ram_soportada,
            slots_ram: info.slots_ram,
            rams: info.rams,
            discos: info.discos,
            descripcion: info.descripcion
          })
    })
    // console.log("2i",info);
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
                  <Descriptions.Item label="BSPI-Punto">{this.state.bspi}</Descriptions.Item>
                  <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo">{this.state.empleado}</Descriptions.Item>
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
                  <Descriptions.Item label="Código">{this.state.id_procesador}</Descriptions.Item>
                  <Descriptions.Item label="Marca">{this.state.procesador.marca}</Descriptions.Item>
                  <Descriptions.Item label="Modelo">{this.state.procesador.modelo}</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">{this.state.procesador.numero_serie}</Descriptions.Item>
                  <Descriptions.Item label="Frecuencia">{this.state.frecuencia}</Descriptions.Item>
                  <Descriptions.Item label="Número de núcleos">{this.state.nnucleos}</Descriptions.Item>
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
              </TabPane>

              <TabPane tab={<span><FiHardDrive className="anticon" />Disco Duro</span>} key="5" >
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
              </TabPane>  
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default DetalleLaptop;