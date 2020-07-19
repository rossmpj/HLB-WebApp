import React from 'react';
import {
    Button, Row, Col, Table, Input, Icon, message, Typography, Popconfirm, Tag
} from 'antd';
import ExcelExportCorreo from './ExcelExportCorreo';
import { Link } from 'react-router-dom';
import AxiosTipo from '../Servicios/AxiosTipo';
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
            currentDataSource: [],
            disabelExport: true
        };
    }

    llenar_tabla() {
        let datos = [];
        AxiosTipo.mostrar_correos().then(res => {
            res.data.forEach(function (dato) {
                let registro = {
                    key: dato.id_correo,
                    correo: dato.correo,
                    departamento: dato.departamento,
                    bspi_punto: dato.bspi_punto,
                    estado: dato.estado,
                    empleado: dato.nombre.concat(" ", dato.apellido),
                    asignacion: dato.asignacion,
                    cedula: dato.cedula,
                    contrasena: dato.contrasena
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos, currentDataSource: datos, disabelExport: false });
        }).catch(err => {
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
            currentDataSource: currentDataSource.currentDataSource
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
        AxiosTipo.eliminar_correo(key).then(res => {
            message.success({ content: 'Correo dado de baja satisfactoriamente', key, duration: 3 });
            this.llenar_tabla();
        }).catch(err => {
            console.log(err.response.data.log)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });
    }

    render() {
        const columns = [
            {
                title: 'Correo',
                dataIndex: 'correo',
                key: 'correo',
                ...this.getColumnSearchProps('correo')
            },
            {
                title: 'Empleado',
                dataIndex: 'empleado',
                key: 'empleado',
                ...this.getColumnSearchProps('empleado')
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
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'En uso',
                        value: 'EU',
                    },
                    {
                        text: 'Inactivo',
                        value: 'I',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado, b.estado),
                render: (text, value) => (
                    <div >
                        {text === "EU" ? <Tag style={{ margin: 2 }} color="green" key={value}>En Uso</Tag> :
                            <Tag style={{ margin: 2 }} color="red" key={value}>Inactivo</Tag>}
                    </div>
                ),
            },
            {
                title: 'Fecha de asignación',
                dataIndex: 'asignacion',
                key: 'asignacion',
                ...this.getColumnSearchProps('asignacion')
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        <Link to={{
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
                        </Popconfirm>

                    </div>
                ),
            },
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Inventario de Correos</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/correo/form', state: { titulo: "Nuevo Correo" } }} >
                            <Button type="primary" icon="plus">Agregar Correo</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">
                    <div >
                        <Row>
                            <Col className='flexbox'>
                                {/* <ButtonGroup> */}
                                    <Button type="primary" icon="import">Importar</Button>
                                    <ExcelExportCorreo data={this.state.currentDataSource} dis = {this.state.disabelExport} ></ExcelExportCorreo>

                                    {/* <Button type="primary" icon="cloud-download">Exportar</Button> */}
                                {/* </ButtonGroup> */}
                            </Col>
                        </Row>
                    </div>
                    <br />
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