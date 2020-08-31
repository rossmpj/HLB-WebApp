import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, Tag, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import FuncionesAuxiliares from '../FuncionesAuxiliares'
import Axios from '../Servicios/AxiosDesktop'
import AxiosLaptop from '../Servicios/AxiosLaptop';
import ExcelExportDesktop from './ExcelExportDesktop';
import Auth from '../Login/Auth';
import FunAuxImport from '../Componentes/ImportModals/FunAuxImport';
import ImportModal from '../Componentes/ImportModals/ImportModal';
import ResponseModal from '../Componentes/ImportModals/ResponseModal';

const { Title } = Typography;
const key = 'updatable';

class TablaDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showTable: true,
      filteredInfo: null,
      sortedInfo: null,
      disabelExport: true,
      searchText: '',
      searchedColumn: '',
      index: 0,
      dataSource: [],
      loading: false,
      currentDataSource: [],
      isNotSistemas: Auth.isNotSistemas(),
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

  recargar_datos() {
    this.obtener_datos();
  }

  obtener_datos = () => {
    this.setState({ loading: true });
    let datos = [];
    Axios.listar_desktops().then(res => {
      datos = FuncionesAuxiliares.transform_data_desktop(res.data);
      this.setState({ dataSource: datos, currentDataSource: datos, disabelExport: false, loading: false });
    }).catch(err => {
      message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
      this.setState({ loading: false });
    });
  }

  handleUpload = async () => {
    this.setState({
      uploading: true,
      responseImport: null,
      messageImport: '',
      hiddenBRI: true,
      messageFile: ''
    });
    const { fileList } = this.state;
    try {
      const hoja = await FunAuxImport.ExcelToJson(fileList[0], this.state.encargado_registro, 'laptop');
      console.log(hoja)
      if (hoja.data.length > 50) {
        this.setState({
          uploading: false,
          messageFile: 'El archivo posee mas de 50 registros. No es posible procesar tantos registros.'
        });
        return;
      }
      Axios.reg_masivo_desktops(hoja).then(res => {
        console.log(res.data, 'res')
        this.setState({
          uploading: false,
          visibleModal: false,
          responseImport: res.data,
          visibleModalResp: true,
          messageImport: '',
          hiddenBRI: true,
          fileList: [],
          messageFile: ''
        })
      }).catch(err => {
        console.log('err import', err, err.response);
        this.setState({
          uploading: false,
          visibleModal: false,
          messageImport: "Ha ocurrido un error en el servidor. Intentelo mas tarde",
          visibleModalResp: true,
          hiddenBRI: true,
          messageFile: ''
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

  componentDidMount = () => {
    this.obtener_datos();
  }

  handleDelete(id) {
    console.log("clave a eliminar", id)
    AxiosLaptop.darDeBajaEquipoID(id, 'desktop').then(res => {
      message.success({ content: 'Registro eliminado satisfactoriamente', key, duration: 3 });
      this.recargar_datos();
    }).catch(err => {
      message.error("Ha ocurrido un error al procesar la petición, inténtelo más tarde", 4);
    });
  }

  handleClick() {
    this.setState({
      showComponent: true,
      showTable: false,
    });
  }

  handleChange = (pagination, filters, sorter, currentDataSource) => {
    console.log('Various parameters', pagination, filters, sorter, currentDataSource);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      currentDataSource: currentDataSource.currentDataSource
    });
  };

  limpiarFiltros = () => {
    this.setState({ filteredInfo: null });
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
          Limpiar
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

  getColumns = () => {
    let route = this.state.isNotSistemas ? '/finanazas' : '/sistemas';
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    let generalColumns = [
      {
        title: 'Código',
        dataIndex: 'codigo',
        key: 'codigo',
        fixed: 'left',
        render: (text, record) => <Link to={{ pathname: route + '/desktop/view/' + record.key }} >{text}</Link>,
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
        sorter: (a, b) => a.departamento.length - b.departamento.length,
        sortOrder: sortedInfo.columnKey === 'departamento' && sortedInfo.order,
      },
      {
        title: 'Empleado',
        dataIndex: 'empleado',
        key: 'empleado',
        ...this.getColumnSearchProps('empleado')
      },
      {
        title: 'Nombre PC',
        dataIndex: 'name_pc',
        key: 'name_pc',
        ...this.getColumnSearchProps('name_pc')
      },
      {
        title: 'Usuario PC',
        dataIndex: 'user_pc',
        key: 'user_pc',
        ...this.getColumnSearchProps('user_pc')
      },
      {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
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
        filteredValue: filteredInfo.estado || null,
        onFilter: (value, record) => record.estado.indexOf(value) === 0,
        sorter: (a, b) => a.estado.length - b.estado.length,
        sortOrder: sortedInfo.columnKey === 'estado' && sortedInfo.order,
        render: (text, value) => (
          <div >
            {text === "D" ? <Tag style={{ margin: 2 }} color="green" key={value}>Disponible</Tag> :
              text === "O" ? <Tag style={{ margin: 2 }} color="blue" key={value}>Operativo</Tag> :
                text === "ER" ? <Tag style={{ margin: 2 }} color="orange" key={value}>En revisión</Tag> :
                  text === "R" ? <Tag style={{ margin: 2 }} color="magenta" key={value}>Reparado</Tag> :
                    <Tag style={{ margin: 2 }} color="red" key={value}>De baja</Tag>}
          </div>
        ),
      },
      {
        title: 'Sistema operativo',
        dataIndex: 'so',
        key: 'so',
        width: 150,
        sorter: (a, b) => a.so.length - b.so.length,
        sortOrder: sortedInfo.columnKey === 'so' && sortedInfo.order,
      },
      {
        title: 'Tipo SO',
        dataIndex: 'so_type',
        key: 'so_type',
        filters: [
          {
            text: '32 Bits',
            value: '32 Bits',
          },
          {
            text: '64 Bits',
            value: '64 Bits',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.so_type || null,
        onFilter: (value, record) => record.so_type.indexOf(value) === 0,
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.so_type, b.so_type),
        sortOrder: sortedInfo.columnKey === 'so_type' && sortedInfo.order,
      },
      {
        title: 'Service Pack 1',
        dataIndex: 'servpack',
        key: 'servpack',
        width: 110,
        filters: [
          {
            text: 'Si',
            value: 'Si',
          },
          {
            text: 'No',
            value: 'No',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.servpack || null,
        onFilter: (value, record) => record.servpack.indexOf(value) === 0,
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.servpack, b.servpack),
        sortOrder: sortedInfo.columnKey === 'servpack' && sortedInfo.order,
      },
      {
        title: 'Licencia',
        dataIndex: 'licencia',
        key: 'licencia',
        filters: [
          {
            text: 'Si',
            value: 'Si',
          },
          {
            text: 'No',
            value: 'No',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.licencia || null,
        onFilter: (value, record) => record.licencia.indexOf(value) === 0,
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.licencia, b.licencia),
        sortOrder: sortedInfo.columnKey === 'licencia' && sortedInfo.order,
      },
      {
        title: 'Programas',
        dataIndex: 'office',
        key: 'office',
        width: 100,
        render: (office) => (
          <div>
            {office.map((disco, index) => {
              return (
                <Tag style={{ margin: 2 }} color="purple" key={index}>{disco.nombre}</Tag>
              );
            })}
          </div>
        ),
      },
      {
        title: 'IP',
        dataIndex: 'dirIP',
        key: 'dirIP',
        render: (text, record) => <Link to={{ pathname: route + '/ip/view/' + record.ip }} >{text}</Link>,
      },
      {
        title: 'Monitor',
        dataIndex: 'monitor',
        key: 'monitor',
        render: monitor =>
          <Link key={monitor.codigo} to={{ pathname: route + '/otros/view', state: { info: monitor, tipo_equipo: 'monitor' } }} >
            {monitor.codigo}
          </Link>,
      },
      {
        title: 'Teclado',
        dataIndex: 'teclado',
        key: 'teclado',
        render: teclado =>
          <Link key={teclado.codigo} to={{ pathname: route + '/otros/view', state: { info: teclado, tipo_equipo: 'teclado' } }} >
            {teclado.codigo}
          </Link>
      },
      {
        title: 'Parlantes',
        dataIndex: 'parlantes',
        key: 'parlantes',
        render: parlantes => <Link key={parlantes.codigo} to={{ pathname: route + '/otros/view', state: { info: parlantes, tipo_equipo: 'parlantes' } }} >
          {parlantes.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'parlantes'} }} >{text}</Link>,
      },
      {
        title: 'Mouse',
        dataIndex: 'mouse',
        key: 'mouse',
        render: mouse => <Link key={mouse.codigo} to={{ pathname: route + '/otros/view', state: { info: mouse, tipo_equipo: 'mouse' } }} >
          {mouse.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'mouse'} }} >{text}</Link>,
      },
      {
        title: 'Mainboard',
        dataIndex: 'mainboard',
        key: 'mainboard',
        render: mainboard => <Link key={mainboard.codigo} to={{ pathname: route + '/otros/view', state: { info: mainboard, tipo_equipo: 'tarjeta madre' } }} >
          {mainboard.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'mainboard'} }} >{text}</Link>,
      },
      {
        title: 'Memorias RAM',
        dataIndex: 'rams',
        key: 'rams',
        width: 70,
        render: (rams) => (
          <div>
            {rams.map(memoria => {
              return (
                <Link key={memoria.codigo} to={{ pathname: route + '/otros/view', state: { info: memoria, tipo_equipo: 'memoria RAM' } }} >
                  <Tag style={{ margin: 2 }} color="cyan" key={memoria.id_equipo}>{memoria.codigo}</Tag>
                </Link>
              );
            })}
          </div>
        ),
      },
      {
        title: 'Discos duros',
        dataIndex: 'discos',
        key: 'discos',
        width: 70,
        render: (discos) => (
          <div>
            {discos.map(disco => {
              return (
                <Link key={disco.codigo} to={{ pathname: route + '/otros/view', state: { info: disco, tipo_equipo: 'disco duro' } }} >
                  <Tag style={{ margin: 2 }} color="blue" key={disco.id_equipo}>{disco.codigo}</Tag>
                </Link>
              );
            })}
          </div>
        ),
      },
      {
        title: 'Procesador',
        dataIndex: 'procesador',
        key: 'procesador',
        render: proces => <Link key={proces.codigo} to={{ pathname: route + '/otros/view', state: { info: proces, tipo_equipo: 'procesador' } }} >
          {proces.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'procesador'} }} >{text}</Link>,
      },
      {
        title: 'Tarjeta de red',
        dataIndex: 'tarj_red',
        key: 'tarj_red',
        render: tred => <Link key={tred.codigo} to={{ pathname: route + '/otros/view', state: { info: tred, tipo_equipo: 'tarjeta de red' } }} >
          {tred.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'tarjeta de red'} }} >{text}</Link>,
      },
      {
        title: 'Case',
        dataIndex: 'case',
        key: 'case',
        render: carcasa => <Link key={carcasa.codigo} to={{ pathname: route + '/otros/view', state: { info: carcasa, tipo_equipo: 'carcasa' } }} >
          {carcasa.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'case'} }} >{text}</Link>,
      },
      {
        title: 'Fuente poder',
        dataIndex: 'f_poder',
        key: 'f_poder',
        render: f_poder => <Link key={f_poder.codigo} to={{ pathname: route + '/otros/view', state: { info: f_poder, tipo_equipo: 'fuente de poder' } }} >
          {f_poder.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'fuente de poder' } }} >{text}</Link>,
      },
      {
        title: 'Alimentación',
        dataIndex: 'f_alim',
        key: 'f_alim',
        render: f_alim => <Link key={f_alim.codigo} to={{ pathname: route + '/otros/view', state: { info: f_alim, tipo_equipo: f_alim.tipo_equipo } }} >
          {f_alim.codigo}
        </Link>,
        //text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'fuente de alimentación'} }} >{text}</Link>,
        filters: [
          {
            text: 'UPS',
            value: 'UPS',
          },
          {
            text: 'Regulador',
            value: 'Regulador',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.f_alim || null,
        onFilter: (value, record) => record.f_alim.indexOf(value) === 0,
        sorter: (a, b) => a.f_alim.length - b.f_alim.length,
        sortOrder: sortedInfo.columnKey === 'f_alim' && sortedInfo.order,
      },
      {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion',
      },
    ];

    let actionsColumns = [
      {
        title: 'Acción',
        key: 'accion',
        fixed: 'right',
        render: (text, record) => (
          <span>
            <Link to={{ pathname: '/sistemas/desktop/form', state: { info: record, titulo: "Editar computadora", disabled: true } }} >
              {record.estado === 'B' ? <Button disabled style={{ marginRight: '2px' }} size="small" type="primary" icon="edit" /> :
                <Button style={{ marginRight: '2px' }} size="small" type="primary" icon="edit" />}
            </Link>
            <Popconfirm placement="topRight"
              title="¿Desea eliminar este registro?"
              okText="Si" cancelText="No" onConfirm={() => this.handleDelete(record.key)}>
              {record.estado === 'B' ?
                <Button disabled type="danger" icon="delete" size="small" /> : <Button type="danger" icon="delete" size="small" />}
            </Popconfirm>
          </span>
        ),
      },
    ];

    return this.state.isNotSistemas ? generalColumns : generalColumns.concat(actionsColumns)
  }

  render() {

    let columns = this.getColumns();

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
      <div>
        <div className="div-container-title">
          <Row>
            <Col span={12}><Title level={2}>Inventario de computadoras</Title></Col>
            <Col hidden={this.state.isNotSistemas} className='flexbox'>
              <Link to={{ pathname: '/sistemas/desktop/form', state: { titulo: "Nueva computadora" } }} >
                <Button type="primary" icon="plus">Agregar computadora</Button>
              </Link>
            </Col>
          </Row>
          <div className="div-container">
            <div >
              <Row>
                <Col className='flexbox'>
                  {/* <ButtonGroup size="medium"> */}
                  <Button onClick={this.showModal}  hidden={this.state.isNotSistemas} type="primary" icon="import">Importar</Button>
                  <ExcelExportDesktop data={this.state.currentDataSource} dis={this.state.disabelExport} ></ExcelExportDesktop>
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
            <Table loading={this.state.loading} bordered key={this.state.index} onChange={this.handleChange} size="small" tableLayout={undefined}
              scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
          </div>
        </div>
        <ImportModal
          title="Importar Desktops"
          visible={this.state.visibleModal}
          onOk={this.handleUpload}
          onCancel={this.handleCancel}
          fileList={fileList}
          uploading={uploading}
          uploadProps={uploadProps}
          dataFormat={FunAuxImport.dataFormatDesktops()}
          messageFile={this.state.messageFile}
          fileName='Formato Desktops'
          sheetName='Laptops'
        >
        </ImportModal>
        <ResponseModal
          title="Importar Desktops"
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

export default TablaDesktop;