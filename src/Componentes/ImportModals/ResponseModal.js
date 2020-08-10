import React from 'react';
import { Modal, Button, Table, Typography, Tag, Tabs, Badge } from 'antd';

const { Title } = Typography;
const { TabPane } = Tabs;

export default class ResponseModal extends React.Component {

    generateTable(registros, key) {
        const columns = [
            {
                title: 'Fila Excel',
                dataIndex: 'rowNum',
                key: 'rowNum' + key,

            },
            {
                title: 'Mensaje de Registro',
                dataIndex: 'message',
                key: 'message' + key,

            }
        ]
        let dataSource = []
        registros.forEach(element => {
            let reg = {
                ...element,
                key: element['rowNum'] + '_' + element['estado']
            }
            dataSource.push(reg);

        })
        return (<Table bordered key={key} size="small"
            scroll={{ x: 'max-content' }} columns={columns} dataSource={dataSource}></Table>);
    }

    render() {

        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                footer={[
                    <Button key="back"
                        onClick={this.props.onCancel}>
                        Minimizar
                    </Button>,
                    <Button key="submit"
                        type="primary" onClick={this.props.onOk}>
                        Cerrar
                </Button>
                ]}
            >

                <div style={{ textAlign: "center" }}>
                    <Title level={4}>{this.props.title}</Title>
                    {
                        this.props.response ?
                            <div className="table-operations">
                                <div style={{ textAlign: "center" }}>{"Archivo Procesado: " + this.props.response.fileName}</div>
                                <div style={{ textAlign: "center" }}>{"Sheet Procesado: " + this.props.response.sheetName}</div>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={
                                        <span>
                                            <Badge count={this.props.response.success.length} overflowCount={99}>
                                                Registros Exitosos
                                            </Badge>
                                        </span>
                                    } key="1">
                                        {this.props.response.success.length === 0 ?
                                            <div style={{ textAlign: "center" }}>No hay registros para mostrar</div> :
                                            this.generateTable(this.props.response.success, 1)

                                        }

                                    </TabPane>
                                    <TabPane tab={<span>
                                        <Badge count={this.props.response.errors.length} overflowCount={99}>
                                            Registros Fallidos
                                </Badge>
                                    </span>} key="2">
                                        {this.props.response.errors.length === 0 ?
                                            <div style={{ textAlign: "center" }}>No hay registros para mostrar</div> :
                                            this.generateTable(this.props.response.errors, 2)
                                        }

                                    </TabPane>
                                </Tabs>
                            </div> :
                            <div hidden={!this.props.messageImport} className="table-operations">
                                <Tag style={{ margin: 2 }} color="red">{this.props.messageImport}</Tag>
                            </div>
                    }
                </div>


            </Modal>
        );
    }
}