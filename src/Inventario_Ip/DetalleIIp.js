import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge, message } from 'antd';
import { WifiOutlined, UserOutlined } from '@ant-design/icons';
import SinResultados from '../Componentes/SinResultados'
import Axios from '../Servicios/AxiosTipo';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleIIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "",
            estado: "",
            hostname: "",
            subred: "",
            fortigate: "",
            maquinas: "",
            observacion: "",
            asignado: "",
            data: false,
            punto: "",
            departamento: "",
            equipo: "",
            tipo: ""
        }
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined' &&
            typeof this.props.location.state !== 'undefined') {
            const { info } = this.props.location.state;
            this.inicializar_datos(info);
        } else {
            this.setState({ data: true });
        }
    }

    inicializar_datos(info) {
        let registro = {};
        Axios.buscar_ip(info.key).then(res => {
            res.data.forEach(function (dato) {
                let empleado = "";
                let punto = "";
                let departamento = "";
                let equipo = "";
                let tipo = "";
                if (dato.nombre !== null) {
                    empleado = dato.nombre.concat(" ", dato.apellido);
                    punto = dato.bspi_punto;
                    departamento = dato.departamento;
                }
                equipo = dato.codigo;
                tipo = dato.tipo_equipo;
                registro.ip = dato.direccion_ip;
                registro.hostname = dato.hostname;
                registro.asignado = empleado;
                registro.subred = dato.subred;
                registro.fortigate = dato.fortigate;
                registro.maquinas = dato.maquinas;
                registro.observacion = dato.observacion;
                registro.estado = dato.estado;
                registro.punto = punto;
                registro.departamento = departamento;
                registro.equipo = equipo;
                registro.tipo = tipo;
            });
            this.cargar_datos(registro);
        }).catch(err => {
            message.error('Problemas de conexión con el servidor, inténtelo más tarde', 4);
        });
    }

    cargar_datos(info) {
        this.setState({
            ip: info.ip,
            hostname: info.hostname,
            subred: info.subred,
            fortigate: info.fortigate,
            maquinas: info.maquinas,
            observacion: info.observacion,
            estado: info.estado,
            asignado: info.asignado,
            punto: info.punto,
            departamento: info.departamento,
            tipo: info.tipo,
            equipo: info.equipo
        })
    }

    render() {
        if (this.state.data) {
            return (<SinResultados></SinResultados>)
        } else {
            return (
                <div className="div-container-title">
                    <Row>
                        <Col span={12}>
                            <Title level={2}>Detalle de dirección IP</Title>
                        </Col>
                        <Col className='flexbox'>
                            <Link to={{pathname: '/ip'}}>
                                    <Button type="primary" icon="left">Volver</Button>
                            </Link>
                        </Col>
                    </Row>

                <div className="div-container">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><WifiOutlined />General</span>} key="1">
                            <Descriptions title="Datos generales de la dirección IP" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                <Descriptions.Item label="Dirección Ip" span={3}>{this.state.ip}</Descriptions.Item>
                                <Descriptions.Item label="Subred" span={3}>{this.state.subred}</Descriptions.Item>
                                <Descriptions.Item label="Hostname" span={3}>{this.state.hostname}</Descriptions.Item>
                                <Descriptions.Item label="Estado">
                                    <Badge status="processing" text={this.state.estado} />
                                </Descriptions.Item>
                                <Descriptions.Item label="Fortigate">{this.state.fortigate}</Descriptions.Item>
                                <Descriptions.Item label="Máquinas">{this.state.maquinas}</Descriptions.Item>
                                <Descriptions.Item label="Observaciones">{this.state.observacion}</Descriptions.Item>
                            </Descriptions>
                        </TabPane>


                        <TabPane tab={<span><UserOutlined />Asignación</span>} key="2">
                            <Descriptions title="Información de la asignación" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                <Descriptions.Item label="Asignado a" span={3}>{this.state.asignado}</Descriptions.Item>
                                <Descriptions.Item label="BSPI punto">{this.state.punto}</Descriptions.Item>
                                <Descriptions.Item label="Departamento">{this.state.departamento}</Descriptions.Item>
                                <Descriptions.Item label="Código equipo">{this.state.equipo}</Descriptions.Item>
                                <Descriptions.Item label="Tipo">{this.state.tipo}</Descriptions.Item>
                            </Descriptions>
                        </TabPane>
                    </Tabs>
                </div>
                </div >
            )
        }
    }

}

export default DetalleIIp;