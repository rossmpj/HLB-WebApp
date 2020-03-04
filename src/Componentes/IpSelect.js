import React from 'react';
import { Select } from 'antd';

class IpSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: []
        };
    }

    componentDidMount = () => {
        var ips= ["192.168.175.0","192.178.0.1"];
        this.setState({ ip: ips});
    }

    render() {
        return (
            <Select>
                <Select.Option key="0" value="">---------------</Select.Option>
                {
                    this.state.ip.map(dato => {
                        return (
                        <Select.Option key={dato} value={dato} >{dato}</Select.Option>
                        )
                    })
                }
            </Select >
        )
    }
}
export default IpSelect;