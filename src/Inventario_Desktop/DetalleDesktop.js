import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge} from 'antd';
import { DesktopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiCpu, FiSpeaker } from "react-icons/fi";
import Axios from '../Servicios/AxiosDesktop'
import SinResultados from '../Componentes/SinResultados'

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
      name_pc: '',
      user_pc: '',
      estado: '',
      ip: '',
      so: '',
      so_type: '',
      servpack: '',
      licencia: '',
      office: '',
      procesador: {
        codigo: '',
        marca: '',
        modelo: '',
        frecuencia: '',
        nucleos: '',
        numero_serie: '',
        descripcion: ''
      },
      rams: [],
      discos: [],
      monitor: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
      teclado: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
      mouse: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
      parlantes: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
      mainboard: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: '',
        ram_soportada: '',
        slots_ram: '',
        conexiones_dd: ''
      },
      tarj_red: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
      case: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
      f_alim: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        tipo_equipo: '',
        descripcion: ''
      },
      f_poder: {
        codigo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        descripcion: ''
      },
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
    Axios.obtenerInfoDesktop(info).then(res => {
      let registro = res.data;
      console.log("registro:", registro.general.bspi);
      this.setState({
        codigo: registro.general.codigo,
        bspi: registro.general.bspi,
        departamento: registro.general.departamento,
        empleado: registro.general.empleado === undefined ? null : registro.general.empleado + " " + registro.general.apellido,
        name_pc: registro.so.nombre_pc,
        user_pc: registro.so.usuario_pc,
        estado: registro.general.estado_operativo,
        so: registro.so.so,
        so_type: registro.so.tipo_so,
        servpack: registro.so.services_pack === '0' ? 'No' : 'Si',
        licencia: registro.so.licencia === '0' ? 'No' : 'Si',
        office: registro.so.office,
        procesador: registro.procesador,
        rams: registro.rams,
        discos: registro.discos,
        monitor: registro.monitor,
        teclado: registro.teclado,
        mouse: registro.mouse,
        parlantes: registro.parlantes,
        mainboard: registro.tarjeta_madre,
        tarj_red: registro.tarjeta_red,
        case: registro.case,
        f_alim: registro.f_alim,
        f_poder: registro.fuente_poder,
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
                    {this.state.bspi === undefined ? null :
                      <>
                        <Descriptions.Item label="BSPI-Punto">{this.state.bspi}</Descriptions.Item>
                        <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                        <Descriptions.Item label="Empleado a cargo">{this.state.empleado}</Descriptions.Item>
                      </>
                    }
                    <Descriptions.Item label="Nombre PC">{this.state.name_pc}</Descriptions.Item>
                    <Descriptions.Item label="Usuario PC">{this.state.user_pc}</Descriptions.Item>
                    <Descriptions.Item label="Estado">
                      <Badge status="processing" text={this.state.estado} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Dirección IP" span={3}>{this.state.ip}</Descriptions.Item>
                    <Descriptions.Item label="Descripción">{this.state.descripcion} </Descriptions.Item>
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
                {this.state.monitor === undefined && this.state.teclado === undefined && this.state.teclado === undefined &&
                  this.state.parlantes === undefined && this.state.f_alim === undefined ? null :
                  <TabPane tab={<span><FiSpeaker className="anticon" />Periféricos</span>} key="3" >
                    {this.state.monitor === undefined ? null :
                      <Descriptions title="Monitor" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.monitor.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.monitor.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.monitor.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.monitor.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.monitor.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.teclado === undefined ? null :
                      <Descriptions title="Teclado" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.teclado.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.teclado.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.teclado.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.teclado.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.teclado.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.mouse === undefined ? null :
                      <Descriptions title="Mouse" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.mouse.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.mouse.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.mouse.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.mouse.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.mouse.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.parlantes === undefined ? null :
                      <Descriptions title="Parlantes" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.parlantes.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.parlantes.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.parlantes.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.parlantes.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.parlantes.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.f_alim === undefined ? null : <>
                      <Descriptions title={this.state.f_alim.tipo_equipo === 'ups' ? 'UPS' : 'Regulador'} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.f_alim.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.f_alim.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.f_alim.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.f_alim.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.f_alim.descripcion} </Descriptions.Item>
                      </Descriptions></>}
                  </TabPane>
                }
                {this.state.mainboard === undefined && this.state.rams === undefined && this.state.discos === undefined &&
                  this.state.procesador === undefined && this.state.tarj_red === undefined && this.state.case === undefined &&
                  this.state.f_poder === undefined ? null :
                  <TabPane tab={<span><FiCpu className="anticon" />CPU</span>} key="4" >
                    {this.state.mainboard === undefined ? null :
                      <Descriptions title="Tarjeta madre" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.mainboard.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.mainboard.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.mainboard.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.mainboard.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="RAM soportada">{this.state.mainboard.ram_soportada} </Descriptions.Item>
                        <Descriptions.Item label="Número de slots">{this.state.mainboard.numero_slots} </Descriptions.Item>
                        <Descriptions.Item label="Conexiones para disco duro">{this.state.mainboard.conexiones_dd} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.mainboard.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    <div>
                      {this.state.rams === undefined ? null :
                        this.state.rams.map((ram, i) => {
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
                        })
                      }
                    </div>
                    <br />
                    <div>
                      {this.state.discos === undefined ? null :
                        this.state.discos.map((dd, i) => {
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
                        })
                      }
                    </div>
                    <br />
                    {this.state.procesador === undefined ? null :
                      <Descriptions title="Procesador" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.procesador.codigo}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.procesador.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.procesador.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.procesador.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Frecuencia">{this.state.procesador.frecuencia} </Descriptions.Item>
                        <Descriptions.Item label="Número de núcleos">{this.state.procesador.nucleos} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.procesador.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.tarj_red === undefined ? null :
                      <Descriptions title="Tarjeta de red" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.tarj_red.codigo} </Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.tarj_red.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.tarj_red.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.tarj_red.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.tarj_red.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.case === undefined ? null :
                      <Descriptions title="Case" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.case.codigo} </Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.case.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.case.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.case.numero_serie} </Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.case.descripcion} </Descriptions.Item>
                      </Descriptions>
                    }
                    <br />
                    {this.state.f_poder === undefined ? null :
                      <Descriptions title="Fuente de poder" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Código">{this.state.f_poder.codigo} </Descriptions.Item>
                        <Descriptions.Item label="Marca">{this.state.f_poder.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{this.state.f_poder.modelo}</Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{this.state.f_poder.numero_serie}</Descriptions.Item>
                        <Descriptions.Item label="Descripción">{this.state.f_poder.descripcion}</Descriptions.Item>
                      </Descriptions>
                    }
                  </TabPane>
                }
              </Tabs>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default DetalleDesktop;