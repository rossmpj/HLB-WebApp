import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, message, Typography, Tag} from 'antd';
import ExcelExportEquipo from './ExcelExportEquipo';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
const { Title } = Typography;

class TablaEquipo extends React.Component {
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
            currentDataSource:[],
            disabelExport:true,
        };

    }

    llenar_tabla() {
        let datos = [];
        Axios.mostrar_equipos().then(res => {
            console.log(res.data)
            datos = FuncionesAuxiliares.transform_data_otros(res.data);
            this.setState({ dataSource: datos, currentDataSource:datos, disabelExport:false }); 
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, revise la conexión con el servidor', 4);
        });
    }

    limpiarFiltros = () => {
        this.setState({ filteredInfo: null });
    };

    handleChange = (pagination, filters, sorter, currentDataSource) => {
        console.log('Various parameters', pagination, filters, sorter, currentDataSource);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
          currentDataSource: currentDataSource.currentDataSource
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
        Axios.eliminar_equipo(key).then(res => {
            message.success({ content: 'Equipo dado de baja satisfactoriamente', key, duration: 3 });
            this.llenar_tabla();
        }).catch(err => {
            console.log(err)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });
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
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                fixed: 'left',
                render: (text, record) => <Link to={{ pathname: '/equipo/view/'+record.key}}>{text}</Link>,
                ...this.getColumnSearchProps('codigo')
            },
            {
                title: 'BSPI Punto',
                dataIndex: 'bspi',
                key: 'bspi',
                width: 130,
                filters: [
                  {
                      text: 'Hospital León Becerra',
                      value: 'Hospital León Becerra',
                  },
                  {
                      text: 'Hogar Inés Chambers',
                      value: 'Hogar Inés Chambers',
                  },
                  {
                    text: 'Unidad Educativa San José Buen Pastor',
                    value: 'Unidad Educativa San José Buen Pastor',
                  },
                  {
                    text: 'Residencia Mercedes Begué',
                    value: 'Residencia Mercedes Begué',
                  }
                ],
                filteredValue: filteredInfo.bspi || null,
                onFilter: (value, record) => record.bspi.indexOf(value) === 0,
                sorter: (a, b) => a.bspi.length - b.bspi.length,
                sortOrder: sortedInfo.columnKey === 'bspi' && sortedInfo.order,
              },  
              {
                title: 'Departamento',
                dataIndex: 'departamento',
                key: 'departamento',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.departamento, b.departamento),
                sortOrder: sortedInfo.columnKey === 'departamento' && sortedInfo.order,
              },
            {
                title: 'Número de serie',
                dataIndex: 'numero_serie',
                key: 'numero_serie',
                ...this.getColumnSearchProps('numero_serie')
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
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado_operativo, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado_operativo, b.estado_operativo),
                render: (text, value) => (
                    <div >
                        {text==="D" ? <Tag style={{margin: 2}} color="green" key={value}>Disponible</Tag> : 
                        text==="O" ?  <Tag style={{margin: 2}} color="blue" key={value}>Operativo</Tag> :
                        text==="ER" ?  <Tag style={{margin: 2}} color="orange" key={value}>En revisión</Tag> :
                        text==="R" ?  <Tag style={{margin: 2}} color="magenta" key={value}>Reparado</Tag> :
                                        <Tag style={{margin: 2}} color="red" key={value}>De baja</Tag> }
                    </div>
                  ),
            },

            {
                title: 'Tipo',
                dataIndex: 'tipo_equipo',
                key: 'tipo_equipo',
                ...this.getColumnSearchProps('tipo_equipo')
            },
            {
                title: 'Modelo',
                dataIndex: 'modelo',
                key: 'modelo',
                ...this.getColumnSearchProps('modelo')
            },

            {
                title: 'Marca',
                dataIndex: 'marca',
                key: 'marca',
                ...this.getColumnSearchProps('marca')
            },
            {
                title: 'Fecha registro',
                dataIndex: 'fecha_registro',
                key: 'fecha_registro',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.fecha_registro, b.fecha_registro)
            },
            {
                title: 'Asignado',
                dataIndex: 'asignado',
                key: 'asignado',
                ...this.getColumnSearchProps('asignado')
            },
            {
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip',
                ...this.getColumnSearchProps('ip')
            },
            {
                title: 'Componente principal',
                dataIndex: 'componente_principal',
                key: 'componente_principal',
                ...this.getColumnSearchProps('componente_principal')
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
                        <Link to={{ pathname: '/otrosequipos/form', state: { info: record, titulo: "Editar equipo" } }}>
                            <Button style={{ marginRight: '2px' }} type="primary" size="small" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea dar de baja este equipo?"
                            okText="Si" cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}>
                                {record.estado_operativo === 'B' ?
                            <Button disabled type="danger" icon="delete" size="small" /> : <Button type="danger" icon="delete" size="small" />}
                        </Popconfirm>
                    </div>
                ),
            },
        ];
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Inventario equipos informáticos</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/otrosequipos/form', state: { titulo: "Nuevo equipo" } }} >
                            <Button type="primary" icon="plus">Agregar tipo de equipo</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">
                    <div >
                        <Row>
                            <Col className='flexbox'>
                                {/* <ButtonGroup> */}
                                    <Button type="primary" icon="import">Importar</Button>
                                    <ExcelExportEquipo data={this.state.currentDataSource} dis = {this.state.disabelExport} masiva = {false}></ExcelExportEquipo>

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

export default TablaEquipo;