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
            <div style={{ padding: 24, minHeight: 360 }}>
                <Row>
                    <Col span={12}>
                        {this.state.showTitle ? <Title>Inventario de routers</Title> : <Title >Nueva Impresora</Title>}
                    </Col>
                    <Col style={{ align: 'right' }} offset={7} span={5}>
                        {this.state.showButton ?
                            <Button onClick={this.handleClick} type="primary" size="large" icon="plus">Agregar una nueva Impresora</Button>
                            : <Button onClick={this.handleClick2} type="primary" size="large" icon="left">Volver</Button>
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