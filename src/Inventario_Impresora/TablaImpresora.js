import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const impresora = [
    {
        key: '1',
        nserie: '123456',
        bspi: 'Hospital León Becerra',
        asignado: 'Julián Carax',
        dpto: 'Financiero',
        tipo: 'Matricial',
        marca: 'EPSON',
        codigo: 123,
        estado: 'Operativo',
        modelo: 'RGB-102',
        tinta: '',
        cartucho: 'RGB',
        descripcion: 'Ninguna',
        toner: '',
        rodillo: '',
        cinta: 'RGB',
        rolloBrazalete: ''

    },
    {
        key: '2',
        nserie: '123456',
        bspi: 'Hospital León Becerra',
        asignado: 'Julián Carax',
        dpto: 'Financiero',
        tipo: 'Matricial',
        marca: 'EPSON',
        codigo: 123,
        estado: 'Operativo',
        modelo: 'RGB-102',
        tinta: '',
        cartucho: 'RGB',
        descripcion: 'Ninguna',
        toner: '',
        rodillo: '',
        cinta: 'RGB',
        rolloBrazalete: ''

    },
    {
        key: '3',
        nserie: '123456',
        bspi: 'Hospital León Becerra',
        asignado: 'Julián Carax',
        dpto: 'Financiero',
        tipo: 'Matricial',
        marca: 'EPSON',
        codigo: 123,
        estado: 'Operativo',
        modelo: 'RGB-102',
        tinta: '',
        cartucho: 'RGB',
        descripcion: 'Ninguna',
        toner: '',
        rodillo: '',
        cinta: 'RGB',
        rolloBrazalete: ''

    }


]



const columns = [
    {
        title: 'Número de serie',
        dataIndex: 'nserie',
        key: 'nserie',
        render: text => <a href="/#">{text}</a>
    },
    {
        title: 'BSPI Punto',
        dataIndex: 'bspi',
        key: 'bspi',
    },
    {
        title: 'Departamento',
        dataIndex: 'dpto',
        key: 'dpto',
    },
    {
        title: 'Asignado',
        dataIndex: 'asignado',
        key: 'asignado',
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo'
    },
    {
        title: 'Marca',
        dataIndex: 'marca',
        key: 'marca'
    },
    {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo'
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado'
    },
    {
        title: 'Modelo',
        dataIndex: 'modelo',
        key: 'modelo'
    },
    {
        title: 'Tinta',
        dataIndex: 'tinta',
        key: 'tinta'
    },
    {
        title: 'Cartucho',
        dataIndex: 'cartucho',
        key: 'cartucho'
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion'
    },
    {
        title: 'Toner',
        dataIndex: 'toner',
        key: 'toner'
    },
    {
        title: 'Rodillo',
        dataIndex: 'rodillo',
        key: 'rodillo'
    },
    {
        title: 'Cinta',
        dataIndex: 'cinta',
        key: 'cinta'
    },
    {
        title: 'Rollo/Brazalete',
        dataIndex: 'rolloBrazalete',
        key: 'rolloBrazalete'
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


class TablaImpresora extends React.Component {
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
                <Table size="medium" tableLayout={undefined} scroll={{x:'max-content'}} columns={columns} dataSource={impresora}></Table>
            </div>
        );
    }
}

export default TablaImpresora;