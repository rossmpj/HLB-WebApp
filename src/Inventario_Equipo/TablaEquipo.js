import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id_equipo',
        key: 'id_equipo'
    },
    {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo',
        render: text => <a href="/#">{text}</a>
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado'
    },
    {
        title: 'Número de serie',
        dataIndex: 'nserie',
        key: 'nserie'
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo'
    },
    {
        title: 'Modelo',
        dataIndex: 'modelo',
        key: 'modelo'
    },
    
    {
        title: 'Marca',
        dataIndex: 'marca',
        key: 'marca'
    },
    {
        title: 'Ip',
        dataIndex: 'ip',
        key: 'ip'
    },
    {
        title: 'Componente principal',
        dataIndex: 'componente',
        key: 'componente',
        render: text => <a href="/#">{text}</a>
    },
    {
        title: 'Asignado',
        dataIndex: 'asignado',
        key: 'asignado'
    },
    {
        title: 'Encargado',
        dataIndex: 'encargado',
        key: 'encargado'
    },
    {
        title: 'Fecha registro',
        dataIndex: 'registro',
        key: 'registro'
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion'
    },
    {
        title: 'Acción',
        key: 'accion',
        render: (text, record) => (
            <div>
                <Button style={{ marginRight: '7px' }} size="medium" type="success" icon="eye" />
                <Button style={{ marginRight: '7px' }} size="medium" type="info" icon="edit" />
                <Button size="medium" type="error" icon="delete" />
            </div>
        ),
    },
];


class TablaEquipo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
    }

    render() {
        return (
            <div className="div-container">
                <div >
                    <Row>
                        <Col className='flexbox'>
                            <ButtonGroup style={{ align: 'right' }} size="medium">
                                <Button type="primary" icon="import">Importar</Button>
                                <Button type="primary" icon="cloud-download">Exportar</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
                <br />
                <Table size="medium" columns={columns}></Table>
            </div>
        );
    }
}

export default TablaEquipo;