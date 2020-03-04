import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';
import FormularioIp from './FormularioIp';
import TablaIp from './TablaIp';

const { Title } = Typography;

class HomeIp extends React.Component {
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
                        {this.state.showTitle ? <Title level={2}>Inventario de direcciones Ip</Title> : <Title level={2}>Nueva IP</Title>}
                    </Col>
                    <Col className='flexbox'>
                        {this.state.showButton ?
                            <Button onClick={this.handleClick} type="primary"  icon="plus">Agregar IP</Button>
                            : <Button onClick={this.handleClick2} type="primary" icon="left">Volver</Button>
                        }
                    </Col>
                </Row>
                {this.state.showComponent ? <FormularioIp /> : null}
                {this.state.showTable ? <TablaIp /> : null}
            </div>
        );
    }
}

export default HomeIp;