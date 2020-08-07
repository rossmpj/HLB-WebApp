import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge, message } from 'antd';
import { PrinterOutlined, UserOutlined } from '@ant-design/icons';
import SinResultados from '../Componentes/SinResultados'
import Axios from '../Servicios/AxiosTipo';
import QRCodeComponent from '../Extras/QRCode/QRCodeComponent'
const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleImpresora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "",
            nserie: "",
            bspi: "",
            asignado: "",
            dpto: "",
            tipo: "",
            marca: "",
            estado: "",
            modelo: "",
            tinta: "",
            cartucho: "",
            descripcion: "",
            toner: "",
            rodillo: "",
            cinta: "",
            rollo: "",
            componente: "",
            ip: "",
            data: false,
            url: ""
        }
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
        downloadLink.download = this.state.key + '-impresora.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    inicializar_datos = async (id) => {
        try {
            const respuesta = await this.cargar_datos(id);
            if (respuesta.length === 0) {
                this.setState({ data: true });
            } else {
                const registro = {};
                respuesta.forEach(function (dato) {
                    registro.key = dato.id_impresora;
                    registro.url = "http://localhost:3000/impresora/view/" + dato.id_impresora;
                    registro.numero_serie = dato.numero_serie;
                    registro.tipo = dato.tipo;
                    registro.marca = dato.id_marca;
                    registro.codigo = dato.codigo;
                    registro.estado_operativo = dato.estado_operativo;
                    registro.modelo = dato.modelo;
                    registro.descripcion = dato.descripcion;
                    registro.tinta = dato.tinta === null ? "---" : dato.tinta;
                    registro.cartucho = dato.cartucho === null ? "---" : dato.cartucho;
                    registro.toner = dato.toner === null ? "---" : dato.toner;
                    registro.rodillo = dato.rodillo === null ? "---" : dato.rodillo;
                    registro.cinta = dato.cinta === null ? "---" : dato.cinta;
                    registro.rollo = dato.rollo === null ? "---" : dato.rollo;
                    registro.ip = dato.ip === null ? "No asignada" : dato.ip;
                    registro.componente_principal = dato.componente_principal === null ? "Sin componente principal" : dato.componente_principal;
                    registro.asignado = dato.empleado === null ? "Sin asignar" : dato.empleado.concat(" ", dato.apellido);
                    registro.bspi = dato.bspi_punto === null ? "Sin asignar" : dato.bspi_punto;
                    registro.dpto = dato.departamento === null ? "Sin asignar" : dato.departamento;
                });
                this.inicializar_estados(registro);
            }
        } catch (error) {
            message.error(error.message, 4);
            this.setState({ data: true });
        }
    }

    cargar_datos = async (key) => {
        try {
            const res = await Axios.impresora_id(key);
            return res.data;
        } catch (error) {
            throw new Error('No se pudieron cargar los datos del servidor, inténtelo más tarde');
        }
    }

    inicializar_estados(info) {
        this.setState({
            key: info.key,
            url: info.url,
            codigo: info.codigo,
            nserie: info.numero_serie,
            bspi: info.bspi,
            asignado: info.asignado,
            dpto: info.dpto,
            tipo: info.tipo,
            marca: info.marca,
            estado: info.estado_operativo,
            modelo: info.modelo,
            descripcion: info.descripcion,
            componente: info.componente_principal,
            tinta: info.tinta,
            cartucho: info.cartucho,
            toner: info.toner,
            rodillo: info.rodillo,
            cinta: info.cinta,
            rollo: info.rollo,
            ip: info.ip
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
                            <Title level={2}>Detalle de Impresora</Title>
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
                                <TabPane tab={<span><PrinterOutlined />General</span>} key="1">
                                    <Descriptions title="Datos generales de la impresora" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                        <Descriptions.Item label="Código impresora" span={3}>{this.state.codigo}</Descriptions.Item>
                                        <Descriptions.Item label="Marca" >{this.state.marca}</Descriptions.Item>
                                        <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                                        <Descriptions.Item label="Número de serie">{this.state.nserie}</Descriptions.Item>
                                        <Descriptions.Item label="Tipo de impresora" span={3}>{this.state.tipo}</Descriptions.Item>

                                        <Descriptions.Item label="Tinta">{this.state.tinta}</Descriptions.Item>
                                        <Descriptions.Item label="Cartucho">{this.state.cartucho}</Descriptions.Item>
                                        <Descriptions.Item label="Toner">{this.state.toner}</Descriptions.Item>
                                        <Descriptions.Item label="Rodillo">{this.state.rodillo}</Descriptions.Item>
                                        <Descriptions.Item label="Cinta">{this.state.cinta}</Descriptions.Item>
                                        <Descriptions.Item label="Rollo/Brazalete">{this.state.rollo}</Descriptions.Item>

                                        <Descriptions.Item label="Estado">
                                            <Badge status="processing" text={this.state.estado} /> </Descriptions.Item>
                                        <Descriptions.Item label="Componente principal">{this.state.componente}</Descriptions.Item>
                                        <Descriptions.Item label="Dirección Ip">{this.state.ip}</Descriptions.Item>
                                        <Descriptions.Item label="Descripción">{this.state.descripcion}</Descriptions.Item>
                                    </Descriptions>
                                </TabPane>


                                <TabPane tab={<span><UserOutlined />Asignación</span>} key="2">
                                    <Descriptions title="Información de la asignación" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                        <Descriptions.Item label="Asignado a" span={3}>{this.state.asignado}</Descriptions.Item>
                                        <Descriptions.Item label="BSPI punto">{this.state.bspi}</Descriptions.Item>
                                        <Descriptions.Item label="Departamento">{this.state.dpto}</Descriptions.Item>
                                    </Descriptions>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <QRCodeComponent
                            url={this.state.url}
                        />
                    </Row>
                </div >
            )
        }
    }

}

export default DetalleImpresora;