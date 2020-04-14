import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge, message } from 'antd';
import { PrinterOutlined, UserOutlined } from '@ant-design/icons';
import SinResultados from '../Componentes/SinResultados'
import Axios from '../Servicios/AxiosTipo';
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
            nodata: false
        }
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined' &&
            typeof this.props.location.state !== 'undefined') {
            const { info } = this.props.location.state;
            this.inicializar_datos(info);
        } else {
            this.setState({ nodata: true });
        }
    }

    inicializar_datos(info) {
        let empleado = "";
        let registro = {};
        Axios.impresora_id(info.id_equipo).then(res => {
            res.data.forEach(function (dato) {
                if (dato.empleado !== null) {
                    empleado = dato.empleado.concat(" ", dato.apellido);
                }
                registro.numero_serie = dato.numero_serie;
                registro.asignado = empleado;
                registro.tipo = dato.tipo;
                registro.marca = dato.id_marca;
                registro.codigo = dato.codigo;
                registro.estado_operativo = dato.estado_operativo;
                registro.modelo = dato.modelo;
                registro.tinta = dato.tinta;
                registro.cartucho = dato.cartucho;
                registro.descripcion = dato.descripcion;
                registro.toner = dato.toner;
                registro.rodillo = dato.rodillo;
                registro.cinta = dato.cinta;
                registro.rollo = dato.rollo;
                registro.ip = dato.ip;
                registro.componente_principal = dato.componente_principal;
                registro.bspi = dato.bspi_punto;
                registro.dpto = dato.departamento;

            });
            this.cargar_datos(registro);
        }).catch(err => {
            message.error('Problemas de conexión con el servidor, inténtelo más tarde', 4);
        });
    }

    cargar_datos(info) {
        this.setState({
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
            ip: info.ip,
            tinta: info.tinta,
            cartucho: info.cartucho,
            toner: info.toner,
            rodillo: info.rodillo,
            cinta: info.cinta,
            rollo: info.rollo
        });
    }

    render() {
        if (this.state.nodata) {
            return (<SinResultados></SinResultados>)
        } else {
            return (
                <div className="div-container-title">
                    <Row>
                        <Col span={12}>
                            <Title level={2}>Detalle de impresora</Title>
                        </Col>
                        <Col className='flexbox'>
                                <Button type="primary" icon="left" onClick={this.props.history.goBack}>Volver</Button>
                        </Col>
                    </Row>

                    <div className="div-container">
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
                    </div>
                </div >
            )
        }
    }

}

export default DetalleImpresora;