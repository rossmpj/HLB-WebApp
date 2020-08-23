import React from 'react';
import { Button, Row, Col, Table, Input, Icon,  message, Tag, Typography } from 'antd';
// import ButtonGroup from 'antd/lib/button/button-group';Popconfirm,
import { Link } from 'react-router-dom';
import Auth from '../Login/Auth'
import Axios from '../Servicios/AxiosSolicitud'
const { Title } = Typography;

class TablaSolicitudUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            info: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0,
            loading: false,
            id_usuario: Auth.getDataLog().user.username
        };

    }

    llenar_tabla() {
        let datos = [];
        this.setState({loading: true});
        Axios.mostrar_solicitudes_user(this.state.id_usuario).then(res => {
            res.data.forEach(function (dato) {
                let equipos = {
                    key: dato.id_solicitud,
                    estado: dato.estado,
                    tipo: dato.tipo,
                    observacion: dato.observacion,
                    fecha: dato.fecha_realizacion + " " + dato.hora_realizacion,
                    prioridad: dato.prioridad
                }
                datos.push(equipos)
            });
            this.setState({ dataSource: datos, loading: false });
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, revise la conexión con el servidor', 4);
            this.setState({loading: false});
        });
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    handleChange = (filters, sorter) => {
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

    handleDelete(key) {
        // Axios.eliminar_equipo(key).then(res => {
        //     message.success({ content: 'Equipo dado de baja satisfactoriamente', key, duration: 3 });
        //     this.llenar_tabla();
        // }).catch(err => {
        //     console.log(err)
        //     message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        // });
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

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node }}
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
                title: 'Estado Solicitud',
                dataIndex: 'estado',
                key: 'estado',
                filters: [
                    {
                        text: 'En Progreso',
                        value: 'EP',
                    },
                    {
                        text: 'Pendiente',
                        value: 'P',
                    },
                    {
                        text: 'Completada',
                        value: 'C',
                    },
                    {
                        text: 'Rechazada',
                        value: 'R',
                    }
                ],
                onFilter: (value, record) => this.filtrar_array(record.estado, value),
                sorter: (a, b) => this.stringSorter(a.estado, b.estado),
                render: (text, value) => (
                    <div >
                        {text === "C" ? <Tag style={{ margin: 2 }} color="green" key={value}>Completada</Tag> :
                            text === "EP" ? <Tag style={{ margin: 2 }} color="blue" key={value}>En Progreso</Tag> :
                                text === "P" ? <Tag style={{ margin: 2 }} color="orange" key={value}>Pendiente</Tag> :
                                    <Tag style={{ margin: 2 }} color="magenta" key={value}>Rechazada</Tag>}
                    </div>
                )
            },

            {
                title: 'Prioridad',
                dataIndex: 'prioridad',
                key: 'prioridad',
                filters: [
                    {
                        text: 'Alta',
                        value: 'A',
                    },
                    {
                        text: 'Baja',
                        value: 'B',
                    },
                    {
                        text: 'Media',
                        value: 'M',
                    },
                    {
                        text: 'Critica',
                        value: 'C',
                    }
                ],
                onFilter: (value, record) => this.filtrar_array(record.tipo, value),
                sorter: (a, b) => this.stringSorter(a.tipo, b.tipo),
                render: (text, value) => (
                    <div >
                        {
                            text === "B" ? <Tag style={{ margin: 2 }} color="blue" key={value}>Baja</Tag> :
                                text === "M" ? <Tag style={{ margin: 2 }} color="orange" key={value}>Media</Tag> :
                                    text === "A" ? <Tag style={{ margin: 2 }} color="magenta" key={value}>Alta</Tag> :
                                        <Tag style={{ margin: 2 }} color="red" key={value}>Critica</Tag>}
                    </div>
                )

            },

            {
                title: 'Tipo de Asistencia',
                dataIndex: 'tipo',
                key: 'tipo',
                filters: [
                    {
                        text: 'Asignacion de Equipo',
                        value: 'AE',
                    },
                    {
                        text: 'Servicio Tecnico',
                        value: 'ST',
                    }
                ],
                onFilter: (value, record) => this.filtrar_array(record.tipo, value),
                sorter: (a, b) => this.stringSorter(a.tipo, b.tipo),
                render: (text, value) => (
                    <div >
                        {
                            text === "AE" ? <div>Asignacion de Equipo</div> :
                                <div>Servicio Tecnico</div>}
                    </div>
                )


            },
            {
                title: 'Fecha Realizacion',
                dataIndex: 'fecha',
                key: 'fecha',
                sorter: (a, b) => this.stringSorter(a.fecha, b.fecha)
            },

            {
                title: 'Observacion',
                dataIndex: 'observacion',
                key: 'observacion'
            },
            // {
            //     title: 'Acción',
            //     key: 'accion',
            //     fixed: 'right',
            //     render: (text, record) => (
            //         <div>
            //             {/* <Link to={{ pathname: '/otrosequipos/form', state: { info: record, titulo: "Editar equipo" } }}>
            //                 <Button style={{ marginRight: '2px' }} type="primary" size="small" icon="edit" />
            //             </Link>
            //             <Popconfirm
            //                 title="¿Desea dar de baja este equipo?"
            //                 okText="Si" cancelText="No"
            //                 onConfirm={() => this.handleDelete(record.key)}>
            //                     {record.estado_operativo === 'B' ?
            //                 <Button disabled type="danger" icon="delete" size="small" /> : <Button type="danger" icon="delete" size="small" />}
            //             </Popconfirm> */}
            //         </div>
            //     ),
            // },
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Solicitudes</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/empleado/solicitud/form', state: { titulo: "Nueva Solicitud" } }} >
                            <Button type="primary" icon="plus">Crear una Nueva Solicitud</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">
                    <div className="table-operations">
                        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
                        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
                        <Button onClick={this.clearAll}>Limpiar todo</Button>
                    </div>
                    <Table loading={this.state.loading} bordered key={this.state.index} onChange={this.handleChange} size="small"
                        scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
            </div>
        );
    }
}

export default TablaSolicitudUser;