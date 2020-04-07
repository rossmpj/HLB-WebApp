import React from 'react';
import { Row, Col, Typography, Button, Descriptions} from 'antd';

const { Title } = Typography; 

class DetalleOtrosEquipos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: '',
            marca: '',
            modelo: '',
            num_serie: '',
            capacidad: '',
            tipo: '',
            descripcion: '',
            tipo_equipo: '',
            frecuencia: '',
            nnucleos: ''
        };
    }

    componentDidMount = () => {
        if (typeof this.props.location !== 'undefined') {
            const { info } = this.props.location.state;
            const { tipo_equipo } = this.props.location.state;
            this.cargar_datos(info);
            this.setState({ tipo_equipo: tipo_equipo })
        }
    }

    cargar_datos(info) {
        console.log("INFO",info);
        this.setState({
            codigo: info,
            marca: info.marca,
            modelo: info.modelo,
            num_serie: info.num_serie,
            capacidad: info.capacidad,
            tipo: info.tipo,
            descripcion: info.descripcion,
            frecuencia: '2',
            nnucleos: '4'
        })
    }     

    render() {
        return (
            <div>
                <div className="div-container-title">      
                    <Row>
                        <Col span={12}>
                            <Title level={2}>Detalle de {this.state.tipo_equipo} </Title> 
                        </Col>
                        <Col className='flexbox'>
                            <Button onClick={this.props.history.goBack} type="primary" icon="left">Volver</Button>
                        </Col>
                    </Row>  
                    <div className="div-container">
                        <Descriptions title={"Información de "+this.state.tipo_equipo} bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                        <Descriptions.Item label="Código" span={2} >{this.state.codigo} </Descriptions.Item>
                        <Descriptions.Item label="Marca" span={2} >{this.state.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo" span={2}>{this.state.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie" span={2} >{this.state.num_serie} </Descriptions.Item>
                        {(this.state.tipo_equipo==='memoria RAM') || (this.state.tipo_equipo==='disco duro') ? 
                            <>
                                <Descriptions.Item label="Capacidad" span={2}>{this.state.capacidad} </Descriptions.Item>
                                <Descriptions.Item label="Tipo" span={2} >{this.state.tipo} </Descriptions.Item>
                            </>
                            : null
                        }
                        { this.state.tipo_equipo==='procesador' ? 
                            <>
                                <Descriptions.Item label="Frecuencia" span={2}>{this.state.frecuencia} </Descriptions.Item>
                                <Descriptions.Item label="Núcleos" span={2} >{this.state.nnucleos} </Descriptions.Item>
                            </>
                            : null
                        }
                        <Descriptions.Item label="Descripción">{this.state.descripcion} </Descriptions.Item>
                        </ Descriptions>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetalleOtrosEquipos;