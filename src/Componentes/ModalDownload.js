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
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <div style={{ textAlign: "center" }}>
          <img className="center" src="/save.png" alt=":)"></img>
          <p>Seleccione un formato de descarga</p>
          <Radio.Group buttonStyle="solid"
            onChange={this.props.onChange}>
            <Radio.Button value="xlsx">.XLSX</Radio.Button>
            <Radio.Button value="csv">.CSV</Radio.Button>
          </Radio.Group>
        </div>
      </Modal>
    );
  }
}

export default ModalDownload;