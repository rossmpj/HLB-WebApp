import React from 'react';
import '../App.css';
import { Typography, Row, Col, Card, Divider, Table, Tag, Input, Button, Icon, Spin } from 'antd';
import {
    CheckCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
import Axios from '../Servicios/AxiosDashboard'

const { Title, Text, Paragraph } = Typography;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numero_total_equipos: 0,
            numero_total_ips: 0,
            numero_total_marcas: 0,
            numero_total_programas: 0,
            datos_tabla: [],
            cargando_datos_tabla: true,
        }
    }

    obtener_numero_total_equipos() {
        Axios.obtener_numero_total_equipos().then(res => {
            this.setState({ numero_total_equipos: res.data })
        })
    }

    obtener_numero_total_ips() {
        Axios.obtener_numero_total_ips().then(res => {
            this.setState({ numero_total_ips: res.data })
        })
    }

    obtener_numero_total_marcas() {
        Axios.obtener_numero_total_marcas().then(res => {
            // console.log(res)
            this.setState({ numero_total_marcas: res.data })
        })
    }

    obtener_numero_total_programas() {
        Axios.obtener_numero_total_programas().then(res => {
            this.setState({ numero_total_programas: res.data })
        })
    }

    llenar_datos_tabla() {
        let datos_tabla = [];
        Axios.mostrar_solicitudes().then(res => {
            // console.log(res);
            res.data.map(registro => {
                let obj = {
                    key: registro.fecha_realizacion + ' ' + registro.hora_realizacion,
                    realizada_por: registro.nombre + ' ' + registro.apellido,
                    estado: registro.estado,
                    prioridad: registro.prioridad,
                    usuario: registro.id_usuario,
                    tipo_asistencia: registro.tipo,
                    fecha_realizacion: registro.fecha_realizacion + ' ' + registro.hora_realizacion,
                    observacion: registro.observacion,
                }
                datos_tabla.push(obj);
            })
            this.setState({ datos_tabla: datos_tabla }, () => { console.log(this.state.datos_tabla)})
        })
    }

    componentWillMount() {
        this.obtener_numero_total_equipos();
        this.obtener_numero_total_ips();
        this.obtener_numero_total_marcas();
        this.obtener_numero_total_programas();
        this.llenar_datos_tabla();
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
        // console.log(this.state)
        const style_card = { background: '#5DC1B9' };
        const style_p = { fontSize: "15px", margin: "0 0 10px", display: "block", marginBlockStart: "1em", marginBlockEnd: "1em", marginInlineStart: "0px", marginInlineEnd: "0px" }
        const columns = [
            {
                title: 'Realizada Por',
                dataIndex: 'realizada_por',
                key: 'realizada_por',
                ...this.getColumnSearchProps('realizada_por')
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
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado, b.estado),
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
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.prioridad, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.prioridad, b.prioridad),
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
                dataIndex: 'usuario',
                key: 'usuario',
                render: (text) => {
                    return (
                        <div>
                            <UserOutlined style={{ align: "left" }} />
                            {"\t" + text}
                        </div>
                    )
                }
            },
            {
                title: 'Tipo Asistencia',
                dataIndex: 'tipo_asistencia',
                key: 'tipo_asistencia',
                filters: [
                    {
                        text: 'Asignación de Equipos',
                        value: 'AE',
                    },
                    {
                        text: 'Servicio Técnico',
                        value: 'ST',
                    },
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.tipo_asistencia, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.tipo_asistencia, b.tipo_asistencia),
                render: (text, value) => {
                    switch (text) {
                        case "AE":
                            return (
                                <Tag style={{ margin: 2 }} color="blue" key={value}>Asignación de Equipos</Tag>
                            )
                        case "ST":
                            return (
                                <Tag style={{ margin: 2 }} color="orange" key={value}>Servicio Técnico</Tag>
                            )
                    }
                },
            },
            {
                title: 'Fecha Realizacion',
                dataIndex: 'fecha_realizacion',
                key: 'fecha_realizacion',
            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion',
                width: '25%',
                render: (text) => {
                    return (
                        <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>
                            {text}
                        </Paragraph>
                    )
                }
            }
        ];
        return (
            <>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6}>
                        <Card
                            title={
                                <Spin spinning={this.state.numero_total_equipos === 0}>
                                    <h3 style={{ fontSize: "38px", fontWeight: "700", margin: "0 0 10px", whiteSpace: "nowrap", padding: "0", color: "inherit", lineHeight: "1.1", marginBlockStart: "1em", marginBlockEnd: "1em", marginInlineStart: "0px", marginInlineEnd: "0px" }}
                                    >
                                        {this.state.numero_total_equipos}
                                    </h3>
                                </Spin>
                            }
                            bordered={false}
                            style={{ background: '#5DC1B9' }}
                        >
                            <p style={style_p}>Número de equipos</p>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            title={
                                <Spin spinning={this.state.numero_total_ips === 0}>
                                    <h3 style={{ fontSize: "38px", fontWeight: "700", margin: "0 0 10px", whiteSpace: "nowrap", padding: "0", color: "inherit", lineHeight: "1.1", marginBlockStart: "1em", marginBlockEnd: "1em", marginInlineStart: "0px", marginInlineEnd: "0px" }}
                                    >
                                        {this.state.numero_total_ips}
                                    </h3>
                                </Spin>
                            }
                            bordered={false}
                            style={{ background: '#FF1493' }}
                        >
                            <p style={style_p}>Número de Ips</p>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            title={
                                <Spin spinning={this.state.numero_total_marcas === 0}>
                                    <h3 style={{ fontSize: "38px", fontWeight: "700", margin: "0 0 10px", whiteSpace: "nowrap", padding: "0", color: "inherit", lineHeight: "1.1", marginBlockStart: "1em", marginBlockEnd: "1em", marginInlineStart: "0px", marginInlineEnd: "0px" }}>
                                        {this.state.numero_total_marcas}
                                    </h3>
                                </Spin>
                            }
                            bordered={false}
                            style={{ background: '#F1C30F' }}
                        >
                            <p style={style_p}>Número de marcas</p>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            title={
                                <Spin spinning={this.state.numero_total_programas === 0}>
                                    <h3 style={{ fontSize: "38px", fontWeight: "700", margin: "0 0 10px", whiteSpace: "nowrap", padding: "0", color: "inherit", lineHeight: "1.1", marginBlockStart: "1em", marginBlockEnd: "1em", marginInlineStart: "0px", marginInlineEnd: "0px" }}>
                                        {this.state.numero_total_programas}
                                    </h3>
                                </Spin>
                            }
                            bordered={false}
                            style={{ background: '#A666EA' }}
                        >
                            <p style={style_p}>Número de programas</p>
                        </Card>
                    </Col>
                </Row>
                <Divider orientation="left" dashed style={{ fontSize: "38px" }}>Actividades Recientes de Solicitudes</Divider>

                <Table dataSource={this.state.datos_tabla} columns={columns} loading={this.state.datos_tabla.length === 0}/>;
            </>
        )
    }
}
export default Home;