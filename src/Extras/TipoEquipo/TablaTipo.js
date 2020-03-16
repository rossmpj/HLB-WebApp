import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon,
    Popconfirm,
    message
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';




const datos = [
    {
        key: 1,
        tipo: 'Impresora',
        ip: 'si'
    },
    {
        key: 2,
        tipo: 'Router',
        ip: 'si'
    },
    {
        key: 3,
        tipo: 'Pluma digital',
        ip: 'no'
    },
    {
        key: 4,
        tipo: 'UPS',
        ip: 'no'
    },
    {
        key: 5,
        tipo: 'Monitor',
        ip: 'no'
    },
    {
        key: 6,
        tipo: 'Regulador de voltaje',
        ip: 'no'
    },
    {
        key: 7,
        tipo: 'Mouse',
        ip: 'no'
    },
    {
        key: 8,
        tipo: 'CPU',
        ip: 'no'
    },
    {
        key: 9,
        tipo: 'Impresora',
        ip: 'no'
    },
    {
        key: 10,
        tipo: 'Memoria RAM',
        ip: 'no'
    },
    {
        key: 11,
        tipo: 'Tarjete de video',
        ip: 'no'
    },

    {
        key: 12,
        tipo: 'CDROM',
        ip: 'no'
    },
    {
        key: 13,
        tipo: 'Tarjeta de video',
        ip: 'no'
    },
    {
        key: 14,
        tipo: 'Tarjeta gráfica',
        ip: 'no'
    },
    {
        key: 15,
        tipo: 'Mainboard',
        ip: 'no'
    },
    {
        key: 16,
        tipo: 'Tablet',
        ip: 'no'
    },

    {
        key: 17,
        tipo: 'Laptop',
        ip: 'no'
    }, {
        key: 18,
        tipo: 'Switch',
        ip: 'no'
    },
    {
        key: 19,
        tipo: 'Tarjeta de red',
        ip: 'no'
    },
    {
        key: 20,
        tipo: 'Modem',
        ip: 'no'
    },


]


class TablaTipo extends React.Component {
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
        this.setState({ dataSource: datos });
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    /*  handleEditar(data){
        return <FormularioTipo datos={data}></FormularioTipo>
     } */

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
                title: 'Tipo de equipo',
                dataIndex: 'tipo',
                key: 'tipo',
                ...this.getColumnSearchProps('tipo')
            },
            {
                title: '¿Usa Ip?',
                dataIndex: 'ip',
                key: 'ip',
                filters: [
                    {
                        text: 'si',
                        value: 'si',
                    },
                    {
                        text: 'no',
                        value: 'no',
                    }
                ],
                onFilter: (value, record) => record.ip.indexOf(value) === 0
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div> 
                            <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit"
                        /* onClick={() => this.handleEditar(record)} */ />
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
                <Table size="medium" columns={columns} dataSource={this.state.dataSource}></Table>
            </div>
        );
    }
}

export default TablaTipo;