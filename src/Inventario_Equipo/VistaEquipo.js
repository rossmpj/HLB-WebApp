import React from 'react';
import {Typography,Button, Row, Col} from 'antd';
import FormularioEquipo from './FormularioEquipo';
import { Link } from 'react-router-dom';
import Auth from '../Login/Auth';

const { Title } = Typography;

class VistaEquipo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: "Inventario de Equipos informáticos",
            data: this.props.location,
            route: Auth.isNotSistemas() ? '/finanzas' : '/sistemas'
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
                        <Link to={{ pathname: this.state.route+'/otrosequipos' }} ><Button type="primary" icon="left">Volver</Button></Link>
                    </Col>
                </Row>
                <div className="div-miniborder-top" >
                    <FormularioEquipo data={this.state.data}></FormularioEquipo>
                </div>
            </div>

        )
    }
}
export default VistaEquipo;