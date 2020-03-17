import React from 'react';
import {
    Typography,
    Button,
    Row,
    Col,
} from 'antd';


const { Title } = Typography;

class Header extends React.Component {

    render() {
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}>
                        {this.state.showTitle ? <Title level={2}>Tipos de equipos registrados</Title> : <Title level={2}>Nuevo tipo de equipo</Title>}
                    </Col>
                    <Col className='flexbox'>
                        {this.state.showButton ?
                            <Button type="primary" icon="plus">Agregar registro</Button>
                            : <Button type="primary" icon="left">Volver</Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Header;