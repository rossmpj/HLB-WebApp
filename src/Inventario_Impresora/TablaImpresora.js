import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon,
    Popconfirm,
    message,
    Typography
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const impresoras = [
    {
        key: '1',
        nserie: '123456',
        bspi: 'Hogar Inés Chambers',
        asignado: 'Julián Carax',
        dpto: 'Financiero',
        tipo: 'matricial',
        marca: 'Epson',
        codigo: 123,
        estado: 'Operativo',
        modelo: 'RGB-102',
        tinta: '',
        cartucho: 'RGB',
        descripcion: 'Ninguna',
        toner: '',
        rodillo: '',
        cinta: 'Large',
        rolloBrazalete: ''

    },
    {
        key: '2',
        nserie: '113456',
        bspi: 'Hospital León Becerra',
        asignado: 'Roberto Hendaya',
        dpto: 'Financiero',
        tipo: 'escaner',
        marca: 'Lexmark',
        codigo: 123,
        estado: 'En revisión',
        modelo: 'RGB-102',
        tinta: '',
        cartucho: '',
        descripcion: 'Considerar repuestos originales que se encuentran en la av. siempre viva',
        toner: '',
        rodillo: 'H98',
        cinta: '',
        rolloBrazalete: ''

    },
    {
        key: '3',
        nserie: '3456',
        bspi: 'Hospital León Becerra',
        asignado: 'Carlos Ruiz Zafón',
        dpto: 'Sistemas',
        tipo: 'brazalete',
        marca: 'Epson',
        codigo: 123,
        estado: 'Operativo',
        modelo: 'RGB-102',
        tinta: 'Z95',
        cartucho: 'H96',
        descripcion: 'Ninguna',
        toner: 'J98',
        rodillo: '',
        cinta: '',
        rolloBrazalete: 'Y97'

    }


]


class TablaImpresora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: []
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
    }

    llenar_tabla() {
        this.setState({ dataSource: impresoras });
    }

    componentDidMount() {
        this.llenar_tabla();
    }


    handleDelete(key) {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        message.success("Registro eliminado exitosamente");
        /* message.error("Error al eliminar el registro, inténtelo más tarde"); */
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node }
                    }
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Buscar
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    render() {
        const columns = [
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                render: text => <a href="/#">{text}</a>,
                ...this.getColumnSearchProps('codigo')
            },
            {
                title: 'Número de serie',
                dataIndex: 'nserie',
                key: 'nserie',
                ...this.getColumnSearchProps('nserie')
            },
            {
                title: 'BSPI Punto',
                dataIndex: 'bspi',
                key: 'bspi',
                filters: [
                    {
                        text: 'Hospital León Becerra',
                        value: 'Hospital León Becerra',
                    },
                    {
                        text: 'Hogar Inés Chambers',
                        value: 'Hogar Inés Chambers',
                    }
                ],
                onFilter: (value, record) => record.bspi.indexOf(value) === 0,
                sorter: (a, b) => a.bspi.length - b.bspi.length
            },
            {
                title: 'Departamento',
                dataIndex: 'dpto',
                key: 'dpto',
                filters: [
                    {
                        text: 'Financiero',
                        value: 'Financiero',
                    },
                    {
                        text: 'Sistemas',
                        value: 'Sistemas',
                    }
                ],
                onFilter: (value, record) => record.dpto.indexOf(value) === 0,
                sorter: (a, b) => a.dpto.length - b.dpto.length
            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                ...this.getColumnSearchProps('asignado')
            },
            {
                title: 'Tipo',
                dataIndex: 'tipo',
                key: 'tipo',
                filters: [
                    {
                        text: 'Impresora',
                        value: 'Impresora',
                    },
                    {
                        text: 'Matricial',
                        value: 'Matricial',
                    },
                    {
                        text: 'Brazalete',
                        value: 'Brazalete',
                    },
                    {
                        text: 'Escaner',
                        value: 'Escaner',
                    },
                    {
                        text: 'Multifuncional',
                        value: 'Multifuncional',
                    },
                ],
                onFilter: (value, record) => record.tipo.indexOf(value) === 0,
                sorter: (a, b) => a.tipo.length - b.tipo.length

            },
            {
                title: 'Marca',
                dataIndex: 'marca',
                key: 'marca',
                ...this.getColumnSearchProps('marca')
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'Operativo',
                        value: 'Operativo',
                    },
                    {
                        text: 'En revisión',
                        value: 'En revisión',
                    }
                ],
                onFilter: (value, record) => record.estado.indexOf(value) === 0,
                sorter: (a, b) => a.estado.length - b.estado.length
            },
            {
                title: 'Modelo',
                dataIndex: 'modelo',
                key: 'modelo',
                ...this.getColumnSearchProps('modelo')
            },
            {
                title: 'Tinta',
                dataIndex: 'tinta',
                key: 'tinta',
                ...this.getColumnSearchProps('tinta')
            },
            {
                title: 'Cartucho',
                dataIndex: 'cartucho',
                key: 'cartucho',
                ...this.getColumnSearchProps('cartucho')
            },
            {
                title: 'Toner',
                dataIndex: 'toner',
                key: 'toner',
                ...this.getColumnSearchProps('toner')
            },
            {
                title: 'Rodillo',
                dataIndex: 'rodillo',
                key: 'rodillo',
                ...this.getColumnSearchProps('rodillo')
            },
            {
                title: 'Cinta',
                dataIndex: 'cinta',
                key: 'cinta',
                ...this.getColumnSearchProps('cinta')
            },
            {
                title: 'Rollo/Brazalete',
                dataIndex: 'rolloBrazalete',
                key: 'rolloBrazalete',
                ...this.getColumnSearchProps('rolloBrazalete')
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
                        <Link to={{
                            pathname: '/impresora/form',
                            state: {
                                info: record,
                                titulo: "Editar impresora"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} size="small" type="info" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este registro?"
                            okText="Si"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}
                        >
                            <Button size="small" type="error" icon="delete" />
                        </Popconfirm>
                    </div>
                ),
            },
        ];


        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Inventario Impresora</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/impresora/form', state: {titulo: "Nueva Impresora" } }} >
                            <Button type="primary" icon="plus">Agregar Impresora</Button>
                        </Link>
                    </Col>
                </Row>
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
                    <Table size="medium" tableLayout={undefined} scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
            </div>
        );
    }
}

export default TablaImpresora;