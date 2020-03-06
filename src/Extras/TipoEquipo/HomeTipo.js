import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';
import FormularioTipo from './FormularioTipo';
import TablaTipo from './TablaTipo';

const { Title } = Typography;

class HomeTipo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            showButton: true,
            showTitle: true,
        };
        this.handleClick = this.handleClick.bind(this);

        this.handleClick2 = this.handleClick2.bind(this);
    }
    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
            showButton: false,
            showTitle: false,
        });
    }
    handleClick2() {
        this.setState({
            showComponent: false,
            showTable: true,
            showButton: true,
            showTitle: true,
        });
    }

    render() {
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}>
                        {this.state.showTitle ? <Title level={2}>Tipos de equipos registrados</Title> : <Title level={2}>Nuevo tipo de equipo</Title>}
                    </Col>
                    <Col className='flexbox'>
                        {this.state.showButton ?
                            <Button onClick={this.handleClick} type="primary"  icon="plus">Agregar registro</Button>
                            : <Button onClick={this.handleClick2} type="primary" icon="left">Volver</Button>
                        }
                    </Col>
                </Row>
                {this.state.showComponent ? <FormularioTipo /> : null}
                {this.state.showTable ? <TablaTipo /> : null}
            </div>
        );
    }
}

export default HomeTipo;