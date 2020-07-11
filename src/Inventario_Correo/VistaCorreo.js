import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';
import FormularioCorreo from './FormularioCorreo';

const { Title } = Typography;

class VistaCorreo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "Inventario de Correos",
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
                        <Button type="primary" icon="left" onClick={this.props.history.goBack} >Volver</Button>
                    </Col>
                </Row>
                <div className="div-miniborder-top" >
                    <FormularioCorreo data={this.state.data}></FormularioCorreo>
                </div>
            </div>

        );
    }
}

export default VistaCorreo;