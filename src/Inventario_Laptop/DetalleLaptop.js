import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { LaptopOutlined, WindowsOutlined } from '@ant-design/icons';
import { FiHardDrive } from "react-icons/fi";
import { FaMemory } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import Axios from '../Servicios/AxiosLaptop'
import SinResultados from '../Componentes/SinResultados'
import QRCodeComponent from '../Extras/QRCode/QRCodeComponent'
import DetalleEquipo from '../Componentes/DetalleEquipo'

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
      data: false,
      url: ''
    };
  }

  componentDidMount = () => {
    /*Captura el parámetro ID que es pasado en la URL */
    const { id } = this.props.match.params;
    this.cargar_datos(id);
  }

  downloadQRCode = () => {
    const canvas = document.getElementById("QRCodeDownloadable");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = this.state.key + '-laptop.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  cargar_datos(info) {
    Axios.obtenerInfoLaptop(info).then(res => {
      let registro = res.data;
      console.log("registro:", registro);
      this.setState({
        key: registro.general.id_equipo,
        url: "http://localhost:3000/laptop/view/" + registro.general.id_equipo,
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
        <div className="div-container-title">
          <Row justify="end">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Title level={2}>Detalle de laptop</Title>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <Button size="large" onClick={this.downloadQRCode}>Descargar Codigo QR</Button>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <Button size="large" onClick={this.props.history.goBack} type="primary" icon="left">Volver</Button>
            </Col>
          </Row>
          <Row justify="space-around" align="middle">
            <Col md={16} lg={16}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<span><LaptopOutlined />General</span>} key="1">
                  <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Código Laptop" span={3}>{this.state.codigo}</Descriptions.Item>
                    {this.state.bspi === undefined ? null :
                      <>
                        <Descriptions.Item label="BSPI-Punto">{this.state.bspi}</Descriptions.Item>
                        <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                        <Descriptions.Item label="Empleado a cargo">{this.state.empleado}</Descriptions.Item>
                      </>
                    }
                    <Descriptions.Item label="Marca">{this.state.marca}</Descriptions.Item>
                    <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                    <Descriptions.Item label="Número de serie">{this.state.num_serie}</Descriptions.Item>
                    <Descriptions.Item label="Nombre PC">{this.state.name_pc}</Descriptions.Item>
                    <Descriptions.Item label="Usuario PC">{this.state.user_pc}</Descriptions.Item>
                    <Descriptions.Item label="Estado">
                      {this.state.estado === "D" ? <Badge status="processing" color="green" text="Disponible" /> :
                        this.state.estado === "O" ? <Badge status="processing" color="blue" text="Operativo" /> :
                          this.state.estado === "ER" ? <Badge status="processing" color="orange" text="En revision" /> :
                            this.state.estado === "R" ? <Badge status="processing" color="magenta" text="Reparado" /> :
                              <Badge status="processing" color="red" text="De baja" />}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dirección IP" span={3}>{this.state.ip}</Descriptions.Item>
                    <Descriptions.Item label="Descripción">
                      {this.state.descripcion}
                    </Descriptions.Item>
                  </Descriptions>
                </TabPane>

                <TabPane tab={<span><WindowsOutlined />SO</span>} key="2" >
                  <DetalleEquipo
                    titulo={'Datos del sistema operativo'} so={this.state.so} so_type={this.state.so_type} servpack={this.state.servpack}
                    licencia={this.state.licencia} >
                  </DetalleEquipo>
                  <br />
                  <div>
                    {this.state.office === undefined ? null :
                      this.state.office.map((programa, i) => {
                        return (
                          <div key={programa.id_programa}>
                            <DetalleEquipo
                              titulo={'Programa '} index={i} codigo={programa.codigo} nombre={programa.nombre} version={programa.version}
                              editor={programa.editor} fecha_instalacion={programa.fecha_instalacion} observacion={programa.observacion} >
                            </DetalleEquipo>
                            <br />
                          </div>
                        );
                      })
                    }
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
                          <DetalleEquipo
                            titulo={'Memoria RAM '} index={i} codigo={ram.codigo} marca={ram.marca} modelo={ram.modelo}
                            numero_serie={ram.numero_serie} capacidad={ram.capacidad} tipo={ram.tipo} descripcion={ram.descripcion}>
                          </DetalleEquipo>
                        </div>
                      );
                    })}
                  </div>
                </TabPane>
                {/* {this.state.discos !== [] ? <> */}
                <TabPane tab={<span><FiHardDrive className="anticon" />Disco Duro</span>} key="5" >
                  <div>
                    {this.state.discos === undefined ? null :
                      this.state.discos.map((dd, i) => {
                        return (
                          <div key={dd.id_equipo}>
                            <DetalleEquipo
                              titulo={'Disco duro '} index={i} codigo={dd.codigo} marca={dd.marca} modelo={dd.modelo}
                              numero_serie={dd.numero_serie} capacidad={dd.capacidad} tipo={dd.tipo} descripcion={dd.descripcion}>
                            </DetalleEquipo>
                          </div>
                        );
                      })
                    }
                  </div>
                </TabPane>
                {/* </> : null} */}
              </Tabs>
            </Col>
            <QRCodeComponent
              url={this.state.url}
            />
          </Row>
        </div>
      )
    }
  }
}

export default DetalleLaptop;