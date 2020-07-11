import React from 'react';
import {
    Button,
    Row,
    Col,
    Table,
    Input,
    Icon,
    message,
    Typography,
    Popconfirm
} from 'antd';
import { Link } from 'react-router-dom';
import AxiosTipo from '../../Servicios/AxiosTipo';
const { Title } = Typography;


class TablaMarca extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            index: 0
        };
    }

    llenar_tabla() {
        let datos = [];
        AxiosTipo.mostrar_marcas().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.id_marca,
                    nombre: dato.nombre,
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

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

    handleDelete(key) {
        AxiosTipo.eliminar_marca(key).then(res => {
            message.success({ content: 'Equipo dado de baja satisfactoriamente', key, duration: 3 });
            this.llenar_tabla();
        }).catch(err => {
            console.log(err.response.data.log)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });
    }


    render() {
        const columns = [
            {
                title: 'Marca',
                dataIndex: 'nombre',
                key: 'nombre',
                ...this.getColumnSearchProps('nombre')
            },
            {
                title: 'Acción',
                key: 'accion',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/marca/form',
                            state: {
                                info: record,
                                titulo: "Editar Marca"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} type="primary" size="small" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar esta marca?"
                            okText="Si" cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}>
                        </Popconfirm>

                    </div>
                ),
            },
        ];
        return (
            <div>
                <div className="div-container-title">
                    <Row>
                        <Col span={12}><Title level={2}>Inventario de Marcas</Title></Col>
                        <Col className='flexbox'>
                            <Link to={{ pathname: '/marca/form', state: { titulo: "Nueva Marca" } }} >
                                <Button type="primary" icon="plus">Agregar marca</Button>
                            </Link>
                        </Col>
                    </Row>
                    <div className="div-container">
                        <Table bordered key={this.state.index} onChange={this.handleChange} size="small"
                            scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TablaMarca;