import React from 'react';
import { Modal, Radio } from 'antd';

class ModalDownload extends React.Component {
  render() {
    return (
      <Modal
        title={this.props.tittle}
        visible={this.props.visible}
        cancelText="Cancelar"
        okText="Descargar"
        onOk={this.props.handleOk}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleCancel}
      >
        <div style={{ textAlign: "center" }}>
          <img className="center" src="/save.png" alt=":)"></img>
          <p>Seleccione un formato de descarga</p>
          <Radio.Group defaultValue="xlsx" buttonStyle="solid"
            onChange={this.tipo_archivo}>
            <Radio.Button value="xlsx">.XLSX</Radio.Button>
            <Radio.Button value="csv">.CSV</Radio.Button>
          </Radio.Group>
        </div>
      </Modal>
    );
  }
}

export default ModalDownload;