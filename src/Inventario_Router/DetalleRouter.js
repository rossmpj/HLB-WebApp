import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { FaNetworkWired } from "react-icons/fa";
import { MdRouter } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import MetodosAxios from '../Servicios/AxiosRouter'
import SinResultados from '../Componentes/SinResultados'

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
            descripcion: '',
            data: false
        };
    }

    componentDidMount = () => {
        /*Captura el parámetro ID que es pasado en la URL */
        const { id } = this.props.match.params;
        this.inicializar_datos(id);
    }

    inicializar_datos(info) {
        MetodosAxios.router_id(info).then(res => {
            console.log("dato", res.data)
            let dato = res.data;
            this.setState({
                codigo: dato.codigo,
                bspi: dato.bspi_punto === null ? "Sin asignar" : dato.bspi_punto,
                departamento: dato.departamento === null ? "Sin asignar" : dato.departamento,
                asignar: dato.empleado === null ? "Sin asingar" : dato.empleado.concat(" ", dato.apellido),
                nombre: dato.nombre,
                pass: dato.pass,
                usuario: dato.usuario,
                clave: dato.clave,
                marca: dato.marca,
                modelo: dato.modelo,
                nserie: dato.numero_serie,
                estado: dato.estado_operativo,
                penlace: dato.puerta_enlace,
                descripcion: dato.descripcion
            })
            dato.ip === " " || dato.ip == null ? this.setState({ ip: "No asignada" }) :
                MetodosAxios.buscar_ip_por_codigo(dato.ip).then(res => {
                    res.data.forEach(registro => {
                        this.setState({ ip: registro.direccion_ip })
                    });
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
                                        {this.state.asignar === null ? null :
                                            <>
                                                <Descriptions.Item label="BSPI-Punto">{this.state.bspi}</Descriptions.Item>
                                                <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                                                <Descriptions.Item label="Empleado a cargo">{this.state.asignar}</Descriptions.Item>
                                            </>
                                        }
                                        <Descriptions.Item label="Marca">{this.state.marca}</Descriptions.Item>
                                        <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                                        <Descriptions.Item label="Número de serie">{this.state.nserie}</Descriptions.Item>
                                        <Descriptions.Item label="Estado">
                                            <Badge status="processing" text={this.state.estado} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Descripción">{this.state.descripcion} </Descriptions.Item>
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
}

export default DetalleRouter;