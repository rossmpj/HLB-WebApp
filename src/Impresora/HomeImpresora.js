import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';
import FormularioImpresora from './FormularioImpresora';
import TablaImpresora from './TablaImpresora';

const { Title } = Typography;

class HomeImpresora extends React.Component {
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
                        {this.state.showTitle ? <Title level={2}>Inventario de impresoras</Title> : <Title level={2}>Nueva Impresora</Title>}
                    </Col>
                    <Col className='flexbox'>
                        {this.state.showButton ?
                            <Button onClick={this.handleClick} type="primary" size="medium" icon="plus">Agregar una nueva Impresora</Button>
                            : <Button onClick={this.handleClick2} type="primary" size="medium" icon="left">Volver</Button>
                        }
                    </Col>
                </Row>
                {this.state.showComponent ? <FormularioImpresora /> : null}
                {this.state.showTable ? <TablaImpresora /> : null}
            </div>
        );
    }
}

export default HomeImpresora;