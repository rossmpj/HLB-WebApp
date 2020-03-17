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
import { Link } from 'react-router-dom';
/* import FormularioTipo from './FormularioTipo'; */


const datos = [
    {
        key: 1,
        tipo: 'Impresora',
        ip: 'true'
    },
    {
        key: 2,
        tipo: 'Router',
        ip: 'true'
    },
    {
        key: 3,
        tipo: 'Pluma digital',
        ip: 'false'
    },
    {
        key: 4,
        tipo: 'UPS',
        ip: 'false'
    },
    {
        key: 5,
        tipo: 'Monitor',
        ip: 'false'
    },
    {
        key: 6,
        tipo: 'Regulador de voltaje',
        ip: 'false'
    },
    {
        key: 7,
        tipo: 'Mouse',
        ip:'false'
    },
    {
        key: 8,
        tipo: 'CPU',
        ip: 'false'
    },
    {
        key: 9,
        tipo: 'Impresora',
        ip: 'false'
    },
    {
        key: 10,
        tipo: 'Memoria RAM',
        ip: 'false'
    },
    {
        key: 11,
        tipo: 'Tarjete de video',
        ip: 'false'
    },

    {
        key: 12,
        tipo: 'CDROM',
        ip: 'false'
    },
    {
        key: 13,
        tipo: 'Tarjeta de video',
        ip: 'false'
    },
    {
        key: 14,
        tipo: 'Tarjeta gráfica',
        ip: 'false'
    },
    {
        key: 15,
        tipo: 'Mainboard',
        ip: 'false'
    },
    {
        key: 16,
        tipo: 'Tablet',
        ip: 'false'
    },

    {
        key: 17,
        tipo: 'Laptop',
        ip: 'false'
    }, {
        key: 18,
        tipo: 'Switch',
        ip: 'false'
    },
    {
        key: 19,
        tipo: 'Tarjeta de red',
        ip: 'false'
    },
    {
        key: 20,
        tipo: 'Modem',
        ip: 'true'
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

    /*   handleEditar(data) {
  
              return <FormularioTipo></FormularioTipo>
  
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
                        text: 'true',
                        value: 'true',
                    },
                    {
                        text: 'false',
                        value: 'false',
                    }
                ],
                onFilter: (value, record) => record.ip.indexOf(value) === 0
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/tipo/edit',
                            state: {
                                info: record
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} type="info" size="small" icon="edit" />
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