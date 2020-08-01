import React from 'react';
import {
    Button, Row, Col, Table, Input, Icon, message, Typography, Popconfirm, Tag
} from 'antd';
import { Link } from 'react-router-dom';
import AxiosAuth from '../Servicios/AxiosAuth';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
const { Title } = Typography;


class TablaCorreo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0,
        };
    }

    llenar_tabla() {
        let datos = [];
        AxiosAuth.get_users().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.username,
                    username: dato.username,
                    departamento: dato.departamento,
                    bspi_punto: dato.bspi_punto,
                    empleado: dato.nombre.concat(" ", dato.apellido),
                    nombre:dato.nombre,
                    apellido: dato.apellido,
                    rol: dato.rol,
                    id_rol: dato.id_rol,
                    id_departamento: dato.id_departamento,
                    fecha: dato.created_at,
                    cedula: dato.cedula,
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            console.log(err.response)
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    limpiarBusquedas = () => {
        this.setState({
            index: this.state.index + 1
        })
    }

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            index: this.state.index + 1
        });
    };

    handleChange = (pagination, filters, sorter, currentDataSource) => {
        console.log('Various parameters', pagination, filters, sorter, currentDataSource);
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
        // AxiosTipo.eliminar_correo(key).then(res => {
        //     message.success({ content: 'Correo dado de baja satisfactoriamente', key, duration: 3 });
        //     this.llenar_tabla();
        // }).catch(err => {
        //     console.log(err.response.data.log)
        //     message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        // });
    }

    render() {
        const columns = [

            {
                title: 'Empleado',
                dataIndex: 'empleado',
                key: 'empleado',
                ...this.getColumnSearchProps('empelado')
            },
            {
                title: 'Cedula',
                dataIndex: 'cedula',
                key: 'cedula',
                ...this.getColumnSearchProps('cedula')
            },
            {
                title: 'Usuario',
                dataIndex: 'username',
                key: 'username',
                ...this.getColumnSearchProps('username')
            },
            {
                title: 'Rol',
                dataIndex: 'rol',
                key: 'rol',
                filters: [
                    {
                        text: 'Administrador',
                        value: 'Administrador',
                    },
                    {
                        text: 'Soporte técnico',
                        value: 'Soporte técnico',
                    },
                    {
                        text: 'Empleado institucional',
                        value: 'Empleado institucional',
                    },
                    {
                        text: 'Pasante',
                        value: 'Pasante',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.rol, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.rol, b.rol)
            },
            {
                title: 'BSPI Punto',
                dataIndex: 'bspi_punto',
                key: 'bspi_punto',
                filters: [
                    {
                        text: 'Hogar Inés Chambers',
                        value: 'Hogar Inés Chambers',
                    },
                    {
                        text: 'Hospital León Becerra',
                        value: 'Hospital León Becerra',
                    },
                    {
                        text: 'Residencia Mercedes Begue',
                        value: 'Residencia Mercedes Begue',
                    },
                    {
                        text: 'Unidad Educativa San José del Buen Pastor',
                        value: 'Unidad Educativa San José del Buen Pastor',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.bspi_punto, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.bspi_punto, b.bspi_punto)
            },
            {
                title: 'Departamento',
                dataIndex: 'departamento',
                key: 'departamento',
                ...this.getColumnSearchProps('departamento')
            },
            {
                title: 'Fecha de Creacion',
                dataIndex: 'fecha',
                key: 'fecha',
                ...this.getColumnSearchProps('fecha')
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        {/* <Link to={{
                            pathname: '/correo/form',
                            state: {
                                info: record,
                                titulo: "Editar Correo"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} type="primary" size="small" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este correo?"
                            okText="Si" cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}>
                            {record.estado === 'I' ?
                                <Button disabled type="danger" icon="delete" size="small" /> : <Button type="danger" icon="delete" size="small" />}
                        </Popconfirm> */}

                    </div>
                ),
            },
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Usuarios Del Sistema</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/users/form', state: { titulo: "Nuevo Usuario" } }} >
                            <Button type="primary" icon="plus">Agregar Usuario</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">

                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table bordered key={this.state.index} onChange={this.handleChange} size="small"
                        scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
            </div>
        );
    }
}

export default TablaCorreo;