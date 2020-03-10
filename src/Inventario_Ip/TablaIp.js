import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';




const ip = [
    {
        key: '1',
        ip: '192.168.1.1',
        estado: 'En uso',
        asignacion: '2020-01-01',
        hostname: 'Procyon',
        subred: '192.168.0.0',
        fortigate: 'Recepcion',
        maquinas: 1,
        asignado: 'Fermín Romero',
        encargado: 'admin',
        observacion: 'ninguna'

    },
    {
        key: '2',
        ip: '192.168.1.2',
        estado: 'Libre',
        asignacion: '2020-01-02',
        hostname: 'Antares',
        subred: '192.168.0.0',
        fortigate: 'Recepcion',
        maquinas: 0,
        asignado: 'Juan Sempere',
        encargado: 'admin',
        observacion: 'ninguna'

    }

]


class TablaIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true
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
        const columns = [
            {
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip'
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'En uso',
                        value: 'En uso',
                    },
                    {
                        text: 'Libre',
                        value: 'Libre',
                    }
                ],
                onFilter: (value, record) => record.estado.indexOf(value) === 0,
                sorter: (a, b) => a.estado.length - b.estado.length
            },
            {
                title: 'Fecha asignación',
                dataIndex: 'asignacion',
                key: 'asignacion'
                /*  filteredValue: filteredInfo.asignacion || null,
                 sortOrder: sortedInfo.columnKey === 'asignacion' && sortedInfo.order */
            },
            {
                title: 'Hostname',
                dataIndex: 'hostname',
                key: 'hostname',
                onFilter: (value, record) => record.hostname.indexOf(value) === 0,
                sorter: (a, b) => a.hostname.length - b.hostname.length,

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
                key: 'maquinas',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.maquinas.length - b.maquinas.length

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
                        <Button style={{ marginRight: '7px' }} type="success" icon="eye" />
                        <Button style={{ marginRight: '7px' }} type="info" icon="edit" />
                        <Button type="error" icon="delete" />
                    </div>
                ),
            },
        ];

        return (
            <div className="div-container">
                <div >
                    <Row>
                        <Col className='flexbox'>
                            <ButtonGroup style={{ align: 'right' }}>
                                <Button type="primary" icon="import">Importar</Button>
                                <Button type="primary" icon="cloud-download">Exportar</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
                <br />
                <Table size="medium" columns={columns} dataSource={ip}></Table>
            </div>
        );
    }
}

export default TablaIp;