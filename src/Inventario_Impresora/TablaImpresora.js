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
import Axios from '../Servicios/AxiosTipo'
const { Title } = Typography;

class TablaImpresora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0
        };
    }

    departamentos() {
        let dpto = [];
        Axios.mostrar_departamentos().then(res => {
            res.data.forEach(function (dato) {
                let dict = {
                    text: dato.nombre,
                    value: dato.nombre
                }
                dpto.push(dict);
            });

        }).catch(err => { console.log(err) });
        return dpto;
    }

    llenar_tabla() {
        let datos = [];
        Axios.mostrar_impresoras().then(res => {
            res.data.forEach(function (dato) {
                let empleado = ""
                if (dato.empleado !== null) {
                    empleado = dato.empleado.concat(" ", dato.apellido);
                }
                let impresoras = {
                    key: dato.id_impresora,
                    numero_serie: dato.numero_serie,
                    bspi: dato.bspi_punto,
                    asignado: empleado,
                    dpto: dato.nombre,
                    tipo: dato.tipo,
                    id_marca: dato.marca,
                    codigo: dato.codigo,
                    estado_operativo: dato.estado_operativo,
                    modelo: dato.modelo,
                    tinta: dato.tinta,
                    cartucho: dato.cartucho,
                    descripcion: dato.descripcion,
                    toner: dato.toner,
                    rodillo: dato.rodillo,
                    cinta: dato.cinta,
                    rollo: dato.rollo,
                    ip: dato.direccion_ip,
                    componente_principal: dato.componente_principal,
                    id_equipo: dato.id_equipo
                }
                datos.push(impresoras)
            });
            this.setState({ dataSource: datos });
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            index: this.state.index + 1
        });
    };

    limpiarBusquedas = () => {
        this.setState({
            index: this.state.index + 1
        })
    }

    componentDidMount() {
        this.llenar_tabla();
    }

    stringSorter(a, b) {
        let y = a || '';
        let u = b || '';
        return y.localeCompare(u);
    }

    filtrar_array(arr, value) {
        if (arr !== null) {
            return arr.indexOf(value) === 0;
        }
    }

    busqueda_array(arr, dataIndex, value) {
        if (arr[dataIndex] !== null) {
            return arr[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
        }
    }

    handleDelete(key) {
        Axios.eliminar_equipo(key).then(res => {
            message.success({ content: 'Equipo dado de baja satisfactoriamente', key, duration: 3 });
            this.llenar_tabla();
        }).catch(err => {
            console.log(err)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });        
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
        onFilter: (value, record) => this.busqueda_array(record, dataIndex, value),
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
                fixed: 'left',
                render: (text, record) => <Link to={{ pathname: '/impresora/view', state: { info: record } }}>{text}</Link>,
                ...this.getColumnSearchProps('codigo')
            },
            {
                title: 'Número de serie',
                dataIndex: 'numero_serie',
                key: 'numero_serie',
                ...this.getColumnSearchProps('numero_serie')
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
                        text: 'Escáner',
                        value: 'Escáner',
                    },
                    {
                        text: 'Multifuncional',
                        value: 'Multifuncional',
                    },
                ],
                onFilter: (value, record) => this.filtrar_array(record.tipo, value),
                sorter: (a, b) => this.stringSorter(a.tipo, b.tipo)

            },
            {
                title: 'Marca',
                dataIndex: 'id_marca',
                key: 'id_marca',
                ...this.getColumnSearchProps('id_marca')
            },
            {
                title: 'Estado',
                dataIndex: 'estado_operativo',
                key: 'estado_operativo',
                filters: [
                    {
                        text: 'Disponible',
                        value: 'D',
                    },
                    {
                        text: 'Operativo',
                        value: 'O',
                    },
                    {
                        text: 'En revisión',
                        value: 'ER',
                    },
                    {
                        text: 'Reparado',
                        value: 'R',
                    },
                    {
                        text: 'De baja',
                        value: 'B',
                    }
                ],
                onFilter: (value, record) => this.filtrar_array(record.estado_operativo, value),
                sorter: (a, b) => this.stringSorter(a.estado_operativo, b.estado_operativo)
            },
            {
                title: 'Modelo',
                dataIndex: 'modelo',
                key: 'modelo',
                ...this.getColumnSearchProps('modelo')
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                key: 'ip',
                ...this.getColumnSearchProps('ip')
            },
            {
                title: 'BSPI Punto',
                dataIndex: 'bspi',
                key: 'bspi',
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
                onFilter: (value, record) => this.filtrar_array(record.bspi, value),
                sorter: (a, b) => this.stringSorter(a.bspi, b.bspi)
            },
            {
                title: 'Departamento',
                dataIndex: 'dpto',
                key: 'dpto',
                filters: this.departamentos(),
                onFilter: (value, record) => this.filtrar_array(record.dpto, value),
                sorter: (a, b) => this.stringSorter(a.dpto, b.dpto)
            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                ...this.getColumnSearchProps('asignado')
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
                dataIndex: 'rollo',
                key: 'rollo',
                ...this.getColumnSearchProps('rollo')
            },
            {
                title: 'Descripción',
                dataIndex: 'descripcion',
                key: 'descripcion'
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/impresora/form',
                            state: {
                                info: record,
                                titulo: "Editar impresora"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} size="small" type="primary" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea dar de baja este equipo?"
                            okText="Si"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(record.id_equipo)}
                        >
                            <Button size="small" type="danger" icon="delete" />
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
                        <Link to={{ pathname: '/impresora/form', state: { titulo: "Nueva Impresora" } }} >
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

export default TablaImpresora;