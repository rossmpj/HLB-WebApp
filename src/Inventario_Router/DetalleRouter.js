import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge, message } from 'antd';
import { FaNetworkWired } from "react-icons/fa";
import { MdRouter } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import MetodosAxios from '../Servicios/AxiosRouter'

const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      bspi: '',
      departamento: '',
      asignar: '',
      nombre: '',
      pass: '',
      usuario: '',
      clave: '',
      marca: '',
      modelo: '',
      nserie: '',
      estado: '',
      ip: '',
      penlace: undefined,
      descripcion: ''
    };
  }

  componentDidMount = () => {
    if (typeof this.props.location !== 'undefined') {
      const { info } = this.props.location.state;
      this.inicializar_datos(info);
    }
  }

  inicializar_datos(info) {
    if (typeof info.key !== 'undefined') {
      let empleado = "";
      let objeto = {};
      MetodosAxios.router_id(info.key).then(res => {
        res.data.forEach(function (dato) {
          if (dato.empleado !== null) {
            empleado = dato.empleado.concat(" ", dato.apellido);
          }
          objeto.codigo = dato.codigo;
          objeto.bspi = dato.bspi_punto;
          objeto.departamento = dato.departamento;
          objeto.empleado = empleado;
          objeto.nombre = dato.nombre;
          objeto.pass = dato.pass;
          objeto.usuario = dato.usuario;
          objeto.clave = dato.clave;
          objeto.marca = dato.marca;
          objeto.modelo = dato.modelo;
          objeto.num_serie = dato.numero_serie;
          objeto.estado = dato.estado_operativo;
          objeto.penlace = dato.puerta_enlace;
          objeto.descripcion = dato.descripcion;
          objeto.ip = dato.ip;
        });
        this.cargar_datos(objeto);
      }).catch(err => {
        message.error('Problemas de conexión con el servidor, inténtelo más tarde', 4);
      });
    } else {
      this.cargar_datos(info);
    }
  }


  cargar_datos(info) {
    console.log("router: ", info);
    this.setState({
      codigo: info.codigo,
      bspi: info.bspi,
      departamento: info.departamento,
      asignar: info.empleado,
      nombre: info.nombre,
      pass: info.pass,
      usuario: info.usuario,
      clave: info.clave,
      marca: info.marca,
      modelo: info.modelo,
      nserie: info.num_serie,
      estado: info.estado,
      penlace: info.penlace,
      descripcion: info.descripcion
    })
    info.ip === " " || info.ip == null ? this.setState({ ip: "No asignada" }) :
      MetodosAxios.buscar_ip_por_codigo(info.ip).then(res => {
        res.data.foreach((registro) => {
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
              <Title level={2}>Detalle de router</Title>
            </Col>
            <Col className='flexbox'>
              <Button type="primary" icon="left" onClick={this.props.history.goBack}>Volver</Button>
            </Col>
          </Row>
          <div className="div-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><MdRouter className="anticon" />General</span>} key="1">
                <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Codigo Router" span={3}>{this.state.codigo} </Descriptions.Item>
                  <Descriptions.Item label="BSPI-Punto" >{this.state.bspi}</Descriptions.Item>
                  <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                  <Descriptions.Item label="Empleado a cargo">{this.state.asignar}</Descriptions.Item>
                  <Descriptions.Item label="Marca">{this.state.marca}</Descriptions.Item>
                  <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                  <Descriptions.Item label="Número de serie">{this.state.nserie}</Descriptions.Item>
                  <Descriptions.Item label="Estado">
                    <Badge status="processing" text={this.state.estado} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Descripción">
                    {this.state.descripcion}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>

              {this.state.penlace !== (undefined || null || '') ?
                <TabPane tab={<span><FaNetworkWired className="anticon" />Dirección IP</span>} key="2" >
                  <Descriptions title="Datos de dirección IP" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="Dirección IP" span={3}>{this.state.ip}</Descriptions.Item>
                    <Descriptions.Item label="Puerta de enlace">{this.state.penlace}</Descriptions.Item>
                  </Descriptions>
                </TabPane> : null
              }

              <TabPane tab={<span><AiOutlineSetting className="anticon" />Configuración</span>} key="3" >
                <Descriptions title="Datos de configuración del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Nombre" span={3}>{this.state.nombre}</Descriptions.Item>
                  <Descriptions.Item label="Pass" span={3}>{this.state.pass} </Descriptions.Item>
                  <Descriptions.Item label="Usuario" span={3}>{this.state.usuario} </Descriptions.Item>
                  <Descriptions.Item label="Clave">{this.state.clave}</Descriptions.Item>
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