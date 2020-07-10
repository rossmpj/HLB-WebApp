import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge} from 'antd';
import { LaptopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiHardDrive } from "react-icons/fi";
import { FaMemory } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import Axios from '../Servicios/AxiosLaptop'
import SinResultados from '../Componentes/SinResultados'

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
      office: [],
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
      descripcion: '',
      data: false
    };
  }

  componentDidMount = () => {
    /*Captura el parámetro ID que es pasado en la URL */
    const { id } = this.props.match.params;
    this.cargar_datos(id);
  }

  cargar_datos(info) {
    Axios.obtenerInfoLaptop(info).then(res => {
      let registro = res.data;
      console.log("registro:", registro);
      this.setState({
        codigo: registro.general.codigo,
        bspi: registro.general.bspi,
        departamento: registro.general.departamento,
        empleado: registro.general.empleado === undefined ? null : registro.general.empleado + " " + registro.general.apellido,
        marca: registro.general.marca,
        modelo: registro.general.modelo,
        num_serie: registro.general.numero_serie,
        name_pc: registro.so.nombre_pc,
        user_pc: registro.so.usuario_pc,
        estado: registro.general.estado_operativo,
        so: registro.so.so,
        so_type: registro.so.tipo_so,
        servpack: registro.so.services_pack === '0' ? 'No' : 'Si',
        licencia: registro.so.licencia === '0' ? 'No' : 'Si',
        office: registro.programas,
        procesador: registro.procesador,
        ram_soportada: registro.ram_soportada,
        slots_ram: registro.numero_slots,
        rams: registro.rams,
        discos: registro.discos,
        descripcion: registro.general.descripcion,
        ip: registro.general.ip === null ? "No asignada" : registro.general.direccion_ip
      })
    }).catch(err => {
      this.setState({ data: true });
    });
  }

  render() {
    if (this.state.data) {
      return (<SinResultados></SinResultados>)
    } else {
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
                    {this.state.estado==="D" ? <Badge status="processing"  color="green" text="Disponible"/> : 
                                            this.state.estado==="O" ?  <Badge status="processing"  color="blue"   text="Operativo"/> :
                                            this.state.estado==="ER" ?  <Badge status="processing"  color="orange"  text="En revision"/> :
                                            this.state.estado==="R" ?  <Badge status="processing"  color="magenta" text="Reparado"/> :
                                                            <Badge status="processing"  color="red"  text="De baja"/> }
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
                    {/* <Descriptions.Item label="Office">{this.state.office}</Descriptions.Item> */}
                  </Descriptions>
                  <br />
                  <div>
                    {this.state.office.map((ram, i) => {
                      return (
                        <div key={ram.id_programa}>
                          <Descriptions title={"Programa " + (i + 1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={1} label="Código">{ram.codigo} </Descriptions.Item>
                            <Descriptions.Item span={1} label="Nombre">{ram.nombre} </Descriptions.Item>
                            <Descriptions.Item span={1} label="Versión">{ram.version} </Descriptions.Item>
                            <Descriptions.Item span={1} label="Editor">{ram.editor} </Descriptions.Item>
                            <Descriptions.Item span={1} label="Fecha de instalación">{ram.fecha_instalacion.slice(0,10)} </Descriptions.Item>
                            <Descriptions.Item span={1} label="Observación">{ram.observacion} </Descriptions.Item>
                          </Descriptions>
                          <br />
                        </div>
                      );
                    })}
                  </div>
                </TabPane>

                <TabPane tab={<span><GiProcessor className="anticon" />Procesador</span>} key="3" >
                  <Descriptions title="Procesador" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Código">{this.state.procesador.codigo}</Descriptions.Item>
                    <Descriptions.Item label="Marca">{this.state.procesador.marca}</Descriptions.Item>
                    <Descriptions.Item label="Modelo">{this.state.procesador.modelo}</Descriptions.Item>
                    <Descriptions.Item label="Número de serie">{this.state.procesador.numero_serie}</Descriptions.Item>
                    <Descriptions.Item label="Frecuencia">{this.state.procesador.frecuencia + " GHz"}</Descriptions.Item>
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
                          <Descriptions title={"Memoria RAM " + (i + 1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
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
                {/* {this.state.discos !== [] ? <> */}
                <TabPane tab={<span><FiHardDrive className="anticon" />Disco Duro</span>} key="5" >
                  <div>
                    {this.state.discos.map((dd, i) => {
                      return (
                        <div key={dd.id_equipo}>
                          <Descriptions title={"Disco duro " + (i + 1)} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
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
                {/* </> : null} */}
              </Tabs>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default DetalleLaptop;