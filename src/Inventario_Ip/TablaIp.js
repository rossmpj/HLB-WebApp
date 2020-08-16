import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, message, Typography, Tag } from 'antd';
import ExcelExportIP from './ExcelExportIP';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
import Auth from '../Login/Auth';
import FunAuxImport from '../Componentes/ImportModals/FunAuxImport';
import ImportModal from '../Componentes/ImportModals/ImportModal';
import ResponseModal from '../Componentes/ImportModals/ResponseModal';

const { Title } = Typography;

class TablaIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showTable: true,
            data: [],
            pagination: {},
            loading: false,
            searchText: '',
            dataSource: [],
            filteredInfo: null,
            sortedInfo: null,
            index: 0,
            currentDataSource: [],
            disabelExport: true,
            fileList: [],
            uploading: false,
            visibleModal: false,
            disabledImport: false,
            messageFile: '',
            responseImport: null,
            messageImport: '',
            visibleModalResp: false,
            hiddenBRI: true,
            encargado_registro: Auth.getDataLog().user.username,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            showComponent: true,
            showTable: false,
        });
    }

    handleUpload = async () => {
        this.setState({
            uploading: true,
            responseImport: null,
            messageImport: '',
            hiddenBRI: true
        });
        const { fileList } = this.state;
        try {
            const hoja = await FunAuxImport.ExcelToJson(fileList[0]);
            console.log(hoja)
            if (hoja.data.length > 50) {
                this.setState({
                    uploading: false,
                    messageFile: 'El archivo posee mas de 50 registros. No es posible procesar tantos registros.'
                });
                return;
            }
            Axios.reg_masivo_correos(hoja).then(res => {
                console.log(res.data, 'res')
                this.setState({
                    uploading: false,
                    visibleModal: false,
                    responseImport: res.data,
                    visibleModalResp: true,
                    messageImport: '',
                    hiddenBRI: true,
                    fileList: []
                })
            }).catch(err => {
                console.log('err import', err, err.response);
                this.setState({
                    uploading: false,
                    visibleModal: false,
                    messageImport: "Ha ocurrido un error en el servidor. Intentelo mas tarde",
                    visibleModalResp: true,
                    hiddenBRI: true
                })
            })
        } catch (e) {
            this.setState({
                messageFile: 'No se pudo procesar el archivo seleccionado',
                uploading: false,
                hiddenBRI: true
            })
        }
    }

    showModal = () => {
        this.setState({
            visibleModal: true,
        });
    };

    handleCancel = () => {
        this.setState({ visibleModal: false });
    };

    handleCancelMR = () => {
        this.setState({
            visibleModalResp: false,
            hiddenBRI: false

        });
    };

    handleOkMR = () => {
        this.setState({
            visibleModalResp: false,
            responseImport: null,
            messageImport: '',
            hiddenBRI: true
        });
    };

    showModalResp = () => {
        this.setState({
            visibleModalResp: true
        })
    }

    llenar_tabla() {
        let datos = [];
        this.setState({ loading: true });
        Axios.ver_ips().then(res => {
            res.data.forEach(function (dato) {
                let empleado = ""
                if (dato.nombre !== null) {
                    empleado = dato.nombre.concat(" ", dato.apellido);
                }
                let registro = {
                    key: dato.id_ip,
                    ip: dato.direccion_ip,
                    estado: dato.estado,
                    hostname: dato.hostname,
                    subred: dato.subred,
                    fortigate: dato.fortigate,
                    maquinas: dato.maquinas_adicionales,
                    encargado: dato.encargado_registro,
                    observacion: dato.observacion,
                    empleado: empleado,
                    bspi: dato.bspi_punto,
                    departamento: dato.departamento,
                    codigo_equipo: dato.codigo,
                    tipo_equipo: FuncionesAuxiliares.UpperCase(dato.tipo_equipo, '')
                }
                datos.push(registro)
            });
            this.setState({ dataSource: datos, currentDataSource: datos, disabelExport: false, loading: false });
        }).catch(err => {
            console.log(err)
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
            this.setState({ loading: false });
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
        Axios.eliminar_ip(key).then(res => {
            message.success({ content: 'Registro eliminado satisfactoriamente', key, duration: 3 });
        }).catch(err => {
            console.log(err)
            message.error('Error al eliminar el registro, inténtelo más tarde', 4);
        });
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
                    style={{ width: 90, marginRight: 8 }}>
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
                title: 'Ip',
                dataIndex: 'ip',
                key: 'ip',
                fixed: 'left',
                render: (text, record) => <Link to={{ pathname: '/sistemas/ip/detail/' + record.key }}>{text}</Link>,
                ...this.getColumnSearchProps('ip')
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
                title: 'Empleado',
                dataIndex: 'empleado',
                key: 'empleado',
                ...this.getColumnSearchProps('empleado'),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.empleado, b.empleado),
                sortOrder: sortedInfo.columnKey === 'empleado' && sortedInfo.order,
            },
            {
                title: 'Código Equipo Asignado',
                dataIndex: 'codigo_equipo',
                key: 'codigo_equipo',
                ...this.getColumnSearchProps('codigo_equipo'),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.codigo, b.codigo),
                sortOrder: sortedInfo.columnKey === 'codigo_equipo' && sortedInfo.order,
            },
            {
                title: 'Tipo Equipo Asignado',
                dataIndex: 'tipo_equipo',
                key: 'tipo_equipo',
                ...this.getColumnSearchProps('tipo_equipo')
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
                        text: 'Libre',
                        value: 'L',
                    }
                ],
                onFilter: (value, record) => FuncionesAuxiliares.filtrar_array(record.estado, value),
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.estado, b.estado),
                render: (text, value) => (
                    <div >
                        {text === "L" ? <Tag style={{ margin: 2 }} color="green" key={value}>Libre</Tag> :

                            <Tag style={{ margin: 2 }} color="red" key={value}>En Uso</Tag>}
                    </div>
                ),
            },
            {
                title: 'Hostname',
                dataIndex: 'hostname',
                key: 'hostname',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.hostname, b.hostname)

            },
            {
                title: 'Subred',
                dataIndex: 'subred',
                key: 'subred',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.subred, b.subred)
            },
            {
                title: 'Fortigate',
                dataIndex: 'fortigate',
                key: 'fortigate',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.fortigate, b.fortigate)
            },
            {
                title: 'Máquinas adicionales',
                dataIndex: 'maquinas',
                key: 'maquinas',
                sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.maquinas, b.maquinas)

            },
            {
                title: 'Observación',
                dataIndex: 'observacion',
                key: 'observacion'
            },
            {
                title: 'Acción',
                key: 'accion',
                fixed: 'right',
                render: (text, record) => (
                    <div>
                        <Link to={{
                            pathname: '/sistemas/ip/form',
                            state: {
                                info: record,
                                titulo: "Editar dirección IP"
                            }
                        }} >
                            <Button style={{ marginRight: '2px' }} size="small" type="primary" icon="edit" />
                        </Link>
                        <Popconfirm
                            title="¿Desea eliminar este registro?"
                            okText="Si"
                            cancelText="No"
                            onConfirm={() => this.handleDelete(record.key)}>
                            <Button size="small" type="danger" icon="delete" />
                        </Popconfirm>
                    </div>
                ),
            },
        ];

        const { uploading, fileList } = this.state;
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
                this.setState({
                    messageFile: ''
                })
            },
            beforeUpload: file => {
                let l_fn = file.name.toLowerCase().split('.');
                let ext = l_fn[l_fn.length - 1];
                if (ext !== 'xlsx') {
                    this.setState({
                        messageFile: '[' + file.name + ']: El archivo debe ser Excel (.xlsx)'
                    })
                }
                else if (fileList.length > 0) {
                    this.setState({
                        messageFile: 'Solo se puede importar un archivo a la vez'
                    })
                }
                else {
                    this.setState({
                        messageFile: ''
                    })
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                    }));
                }
                return false;

            }
        };

        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Inventario IP</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/sistemas/ip/form', state: { titulo: "Nueva dirección IP" } }} >
                            <Button type="primary" icon="plus">Agregar dirección IP</Button>
                        </Link>
                    </Col>
                </Row>
                <div className="div-container">
                    <div >
                        <Row>
                            <Col className='flexbox'>
                                {/* <ButtonGroup style={{ align: 'right' }}> */}
                                <Button type="primary" icon="import">Importar</Button>
                                <ExcelExportIP onClick={this.showModal}  data={this.state.currentDataSource} dis={this.state.disabelExport} ></ExcelExportIP>
                                <Button hidden={this.state.hiddenBRI} onClick={this.showModalResp} type="primary">Result. Importación</Button>
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
                    <Table loading={this.state.loading} bordered key={this.state.index} onChange={this.handleChange} size="small"
                        scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
                </div>
                <ImportModal
                    title="Importar IPs"
                    visible={this.state.visibleModal}
                    onOk={this.handleUpload}
                    onCancel={this.handleCancel}
                    fileList={fileList}
                    uploading={uploading}
                    uploadProps={uploadProps}
                    dataFormat={FunAuxImport.dataFormatIPs()}
                    messageFile={this.state.messageFile}
                    fileName='Formato IPs'
                    sheetName='IPs'
                >
                </ImportModal>
                <ResponseModal
                    title="Importar IPs"
                    visible={this.state.visibleModalResp}
                    onOk={this.handleOkMR}
                    onCancel={this.handleCancelMR}
                    messageImport={this.state.messageImport}
                    response={this.state.responseImport}
                >
                </ResponseModal>
            </div>
        );
    }
}

export default TablaIp;