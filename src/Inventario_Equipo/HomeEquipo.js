import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';
import FormularioEquipo from './FormularioEquipo';
import TablaEquipo from './TablaEquipo';

const { Title } = Typography;

class HomeEquipo extends React.Component {
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
                        {this.state.showTitle ? <Title level={2}>Inventario de Equipos varios</Title> : <Title level={2}>Nuevo equipo</Title>}
                    </Col>
                    <Col className='flexbox'>
                        {this.state.showButton ?
                            <Button onClick={this.handleClick} type="primary"  icon="plus">Agregar Equipo</Button>
                            : <Button onClick={this.handleClick2} type="primary" icon="left">Volver</Button>
                        }
                    </Col>
                </Row>
                {this.state.showComponent ? <FormularioEquipo /> : null}
                {this.state.showTable ? <TablaEquipo /> : null}
            </div>
        );
    }
}

export default HomeEquipo;