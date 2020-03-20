import React from 'react';
import { Tabs, Row, Col, Typography, Button, Descriptions, Badge } from 'antd';
import { WifiOutlined } from '@ant-design/icons';

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
            asignacion: "",
            asignado: "",

        }
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined') {
            const { info } = this.props.location.state;
            this.cargar_datos(info);
        }
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
            asignacion: info.asignacion,
            asignado: info.asignado
        })
    }

    render() {
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}>
                        <Title level={2}>Detalle de dirección IP</Title>
                    </Col>
                    <Col className='flexbox'>
                        <Button type="primary" icon="left">Volver</Button>
                    </Col>
                </Row>
                <div className="div-container">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><WifiOutlined />General</span>} key="1">
                            <Descriptions title="Datos generales del equipo" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                <Descriptions.Item label="Dirección Ip" span={3}>{this.state.ip}</Descriptions.Item>
                                <Descriptions.Item label="Estado">
                                    <Badge status="processing" text={this.state.estado} />
                                </Descriptions.Item>
                                <Descriptions.Item label="Hostname">{this.state.hostname}</Descriptions.Item>
                                <Descriptions.Item label="Subred">{this.state.subred}</Descriptions.Item>
                                <Descriptions.Item label="Fortigate">{this.state.fortigate}</Descriptions.Item>
                                <Descriptions.Item label="Máquinas">{this.state.maquinas}</Descriptions.Item>
                                <Descriptions.Item label="Observaciones">{this.state.observacion}</Descriptions.Item>
                            </Descriptions>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }

}

export default DetalleIIp;