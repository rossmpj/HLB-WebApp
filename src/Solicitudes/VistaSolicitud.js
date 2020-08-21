import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col
} from 'antd';
import FormularioSolicitud from './FormularioSolicitud';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default class VistaSolicitud extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            titulo: "Solicitudes",
            data: this.props.location

        };
    }

    componentDidMount() {
        if (typeof this.props.location.state !== 'undefined') {
            const { titulo } = this.props.location.state;
            this.setState({ titulo: titulo });
        }
    }


    render() {
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>{this.state.titulo}</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/empleado/solicitudes' }} ><Button type="primary" icon="left">Volver</Button></Link>
                    </Col>
                </Row>
                <div className="div-border-top" >
                     <FormularioSolicitud data={this.state.data} hist={this.props.history}></FormularioSolicitud>
                </div>
            </div>

        )
    }
} 