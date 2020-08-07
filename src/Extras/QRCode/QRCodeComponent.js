import React from 'react'
import { Col, Card, Alert } from 'antd'
import QRCode from 'qrcode.react'

class QRCodeComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    downloadQRCode = () => {
        const canvas = document.getElementById("QRCodeDownloadable");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = this.state.key + '.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    render() {
        return (
            <Col md={6} lg={6} span={2}>
                < br />
                < br />
                < br />
                < br />
                <Card
                  style={{ width: 500 }}
                  cover={
                    <QRCode
                      id="QRCode"
                      value={this.props.url}
                      size={128}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={true}
                      renderAs={"svg"}
                    />
                  }
                >
                  <Alert
                    description="Escanee el código para acceder al detalle del equipo"
                    type="info"
                    showIcon
                  />
                  <QRCode
                      id="QRCodeDownloadable"
                      value={this.props.url}
                      size={128}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={true}
                      // renderAs={"svg"}
                    />
                </Card>
              </Col>
        )
    }
}

export default QRCodeComponent;