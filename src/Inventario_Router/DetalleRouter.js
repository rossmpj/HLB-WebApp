import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { FaNetworkWired } from "react-icons/fa";
import { MdRouter } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import MetodosAxios from '../Servicios/AxiosRouter'
import SinResultados from '../Componentes/SinResultados'
import QRCodeComponent from '../Extras/QRCode/QRCodeComponent'

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
            data: false,
            url: '',
        };
    }

    componentDidMount = () => {
        /*Captura el parámetro ID que es pasado en la URL */
        const { id } = this.props.match.params;
        this.inicializar_datos(id);
    }

    downloadQRCode = () => {
        const canvas = document.getElementById("QRCodeDownloadable");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = this.state.key + '-router.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    inicializar_datos(info) {
        MetodosAxios.router_id(info).then(res => {
            console.log("dato", res.data)
            let dato = res.data;
            this.setState({
                key: dato.id_router,
                url: "http://localhost:3000/router/view/" + dato.id_router,
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
                descripcion: dato.descripcion,
                ip: dato.direccion_ip
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
                        <Row justify="end">
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Title level={2}>Detalle de Router</Title>
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
                                                {/* <status="processing"  status="processing" text={this.state.estado} /> */}
                                                {this.state.estado === "D" ? <Badge status="processing" color="green" text="Disponible" /> :
                                                    this.state.estado === "O" ? <Badge status="processing" color="blue" text="Operativo" /> :
                                                        this.state.estado === "ER" ? <Badge status="processing" color="orange" text="En revision" /> :
                                                            this.state.estado === "R" ? <Badge status="processing" color="magenta" text="Reparado" /> :
                                                                <Badge status="processing" color="red" text="De baja" />}
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
                            </Col>
                            <QRCodeComponent
                                url={this.state.url}
                            />
                        </Row>
                    </div>
                </div>
            )
        }
    }
}

export default DetalleRouter;