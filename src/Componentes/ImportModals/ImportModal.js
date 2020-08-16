import React from 'react';
import { Modal, Button, Upload, Typography, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const { Title } = Typography;


export default class ImportModal extends React.Component {
    state = {
        message: "No olvides eliminar los 'registros ejemplo' del archivo Formato Importacion."
    }

    render() {

        return (
            <Modal
                title={this.props.tittle}
                visible={this.props.visible}
                cancelText="Cancelar"
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="back" onClick={this.props.onCancel}>
                        Cancelar
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={this.props.onOk}
                        disabled={this.props.fileList.length === 0 || this.props.fileList.length > 1}
                        loading={this.props.uploading}
                        style={{ marginTop: 16 }}
                    >
                        {this.props.uploading ? 'Registrando...' : 'Registrar'}
                    </Button>
                ]}
            >
                <div style={{ textAlign: "center" }}>
                    <img className="center" src="/upload.png" alt=":)"></img>
                    <Title level={4}>{this.props.title}</Title>
                    <div hidden={!this.state.message} style={{ textAlign: "center" }}><Tag style={{ margin: 2 }} color="green">{this.state.message}</Tag></div>
                    <br />
                    <div className="table-operations">
                        <ExcelFile filename={this.props.fileName} element={<Button icon="cloud-download">Formato Importacion</Button>}>
                            <ExcelSheet dataSet={this.props.dataFormat} name={this.props.sheetName} />
                        </ExcelFile>
                        <Upload fileList={this.props.fileList} {...this.props.uploadProps}>
                            <Button>
                                <UploadOutlined /> Seleccionar Archivo
                            </Button>
                        </Upload>
                    </div>
                    <div hidden={!this.props.messageFile} className="table-operations">
                        <Tag style={{ margin: 2 }} color="red">{this.props.messageFile}</Tag>
                    </div>

                </div>
            </Modal>
        );
    }
}