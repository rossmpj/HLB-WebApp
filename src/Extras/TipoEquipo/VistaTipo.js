import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col
} from 'antd';
import FormularioTipo from './FormularioTipo';
import { Link } from 'react-router-dom';
const { Title } = Typography;

class VistaTipo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: "Inventario de Equipos informáticos",
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
                        <Link to={{ pathname: '/tipo' }} ><Button type="primary" icon="left">Volver</Button></Link>
                    </Col>
                </Row>
                <div className="div-border-top" >
                    <FormularioTipo data={this.state.data}></FormularioTipo>
                </div>
            </div>

        )
    }
}
export default VistaTipo;