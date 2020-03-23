import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import SinResultados from '../Componentes/SinResultados'
const { TabPane } = Tabs;
const { Title } = Typography;

class DetalleIIp extends React.Component {
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
            descripcion: "",
            componente: "",
            ip: "",
            registro: "",
            nodata: false
        }
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined' &&
            typeof this.props.location.state !== 'undefined') {
            const { info } = this.props.location.state;
            this.cargar_datos(info);
        } else {
            this.setState({ nodata: true });
        }
    }

    cargar_datos(info) {
        this.setState({
            codigo: info.codigo,
            nserie: info.nserie,
            bspi: info.bspi,
            asignado: info.asignado,
            dpto: info.dpto,
            tipo: info.tipo,
            marca: info.marca,
            estado: info.estado,
            modelo: info.modelo,
            descripcion: info.descripcion,
            componente: info.componente,
            registro: info.registro,
            ip: info.ip
        })
    }

    render() {
        if (this.state.nodata) {
            return (<SinResultados></SinResultados>)
        } else {
            return (
                <div className="div-container-title">
                    <Row>
                        <Col span={12}>
                            <Title level={2}>Detalle equipo informático</Title>
                        </Col>
                        <Col className='flexbox'>
                            <Button type="primary" icon="left">Volver</Button>
                        </Col>
                    </Row>

                    <div className="div-container">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><RobotOutlined />General</span>} key="1">
                                <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                    <Descriptions.Item label="Código equipo" span={3}>{this.state.codigo}</Descriptions.Item>
                                    <Descriptions.Item label="Marca" >{this.state.marca}</Descriptions.Item>
                                    <Descriptions.Item label="Modelo">{this.state.modelo}</Descriptions.Item>
                                    <Descriptions.Item label="Número de serie">{this.state.nserie}</Descriptions.Item>
                                    <Descriptions.Item label="Tipo de equipo" span={3}>{this.state.tipo}</Descriptions.Item>
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
                                    <Descriptions.Item label="BSPI punto">Hospital LB</Descriptions.Item>
                                    <Descriptions.Item label="Departamento">Sistemas</Descriptions.Item>
                                    <Descriptions.Item label="Fecha de asignación">n/a</Descriptions.Item>
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