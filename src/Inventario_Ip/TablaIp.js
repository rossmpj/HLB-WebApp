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
        title: 'Ip',
        dataIndex: 'ip',
        key: 'ip',
        render: text => <a href="/#">{text}</a>
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado'
    },
    {
        title: 'Fecha asignación',
        dataIndex: 'asignacion',
        key: 'asignacion'
    },
    {
        title: 'Hostname',
        dataIndex: 'hostname',
        key: 'hostname'
    },
    {
        title: 'Subred',
        dataIndex: 'subred',
        key: 'subred'
    },
    {
        title: 'Fortigate',
        dataIndex: 'fortigate',
        key: 'fortigate'
    },
    {
        title: 'Máquinas adicionales',
        dataIndex: 'maquinas',
        key: 'maquinas'
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
        title: 'Observación',
        dataIndex: 'observacion',
        key: 'observacion'
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


class TablaIp extends React.Component {
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

export default TablaIp;