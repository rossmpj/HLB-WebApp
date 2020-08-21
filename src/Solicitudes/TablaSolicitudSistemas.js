import React from 'react';
import { Button, Row, Col, Table, Input, Icon,  message, Tag, Typography } from 'antd';
import Axios from '../Servicios/AxiosSolicitud'
import FuncionesAuxiliares from '../FuncionesAuxiliares';
const { Title } = Typography;

class TablaSolicitudSistemas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            searchText: '',
            dataSource: [],
            info: [],
            filteredInfo: null,
            loading: false,
            sortedInfo: null,
            index: 0
        };

    }

    llenar_tabla() {
        let datos = [];
        this.setState({loading: true});
        Axios.mostrar_solicitudes().then(res => {
            res.data.forEach(function (dato) {
                let empleado = "";
                if (dato.id_usuario !== null) {
                    empleado = dato.nombre.concat(" ", dato.apellido);
                }
                let equipos = {
                    key: dato.id_solicitud,
                    estado: dato.estado,
                    tipo: dato.tipo,
                    observacion: dato.observacion,
                    user: dato.id_usuario,
                    empleado: empleado,
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

    handleChange = (pagination, filters, sorter) => {
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
                title: 'Realizada por:',
                dataIndex: 'empleado',
                key: 'empleado',
                
                //render: (text, record) => <Link to={{ pathname: '/equipo/view/'+record.key}}>{text}</Link>,
                ...this.getColumnSearchProps('empleado')
            },

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
                onFilter: (value, record) =>  FuncionesAuxiliares.filtrar_array(record.estado, value),
                sorter: (a, b) =>  FuncionesAuxiliares.stringSorter(a.estado, b.estado),
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
                        text: 'Crítica',
                        value: 'C',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.tipo, value),
                sorter: (a, b) =>  FuncionesAuxiliares.stringSorter(a.tipo, b.tipo),
                render: (text, value) => (
                    <div >
                        {
                            text === "B" ? <Tag style={{ margin: 2 }} color="blue" key={value}>Baja</Tag> :
                                text === "M" ? <Tag style={{ margin: 2 }} color="orange" key={value}>Media</Tag> :
                                    text === "A" ? <Tag style={{ margin: 2 }} color="magenta" key={value}>Alta</Tag> :
                                        <Tag style={{ margin: 2 }} color="red" key={value}>Crítica</Tag>}
                    </div>
                )

            },
            {
                title: 'Usuario',
                dataIndex: 'user',
                key: 'user',
                ...this.getColumnSearchProps('user')
            },
            {
                title: 'Tipo de Asistencia',
                dataIndex: 'tipo',
                key: 'tipo',
                filters: [
                    {
                        text: 'Asignación de Equipo',
                        value: 'AE',
                    },
                    {
                        text: 'Servicio Técnico',
                        value: 'ST',
                    }
                ],
                onFilter: (value, record) =>  FuncionesAuxiliares.filtrar_array(record.tipo, value),
                sorter: (a, b) =>  FuncionesAuxiliares.tringSorter(a.tipo, b.tipo),
                render: (text, value) => (
                    <div >
                        {
                            text === "AE" ? <div>Asignación de Equipo</div> :
                                <div>Servicio Técnico</div>}
                    </div>
                )


            },
            {
                title: 'Fecha Realización',
                dataIndex: 'fecha',
                key: 'fecha',
                sorter: (a, b) =>  FuncionesAuxiliares.tringSorter(a.fecha, b.fecha)
            },

            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            }
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Solicitudes </Title></Col>
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

export default TablaSolicitudSistemas;