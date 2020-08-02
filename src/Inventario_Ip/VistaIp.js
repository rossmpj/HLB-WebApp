import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';
import FormularioIp from './FormularioIp';
import { Link } from 'react-router-dom';

const { Title } = Typography;

class VistaIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "Inventario IP",
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
                        <Link to={{ pathname: '/sistemas/ip' }} ><Button type="primary" icon="left">Volver</Button></Link>
                    </Col>
                </Row>
                <div className="div-border-top" >
                    <FormularioIp data={this.state.data}></FormularioIp>
                </div>
            </div>

        )
    }
}
export default VistaIp;