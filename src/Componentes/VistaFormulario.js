import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Button } from 'antd';

const { Title } = Typography;

function VistaFormulario(props) {
    return (
        <Row>
            <Col span={12}><Title level={2}>{props.titulo}</Title></Col>
            <Col className='flexbox'>
                <Link to={{ pathname: props.enlace }} ><Button type="primary" icon="left">Volver</Button></Link>
            </Col>
        </Row>  
        )
    }
export default VistaFormulario;