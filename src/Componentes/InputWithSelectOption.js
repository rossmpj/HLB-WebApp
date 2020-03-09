import React from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;

class InputWithSelectOption extends React.Component {
   
  handleNumberChange = e => {
    const number = parseFloat(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { value } = this.props;
    return (
        <span>
        <Input 
          type="text"
          value={value.number}
          onChange={this.handleNumberChange}
        />    
            <Select value={value.currency}
            onChange={this.handleCurrencyChange}
            style={{ width: 80 }} >
                <Option value="mb">MB</Option>
                <Option value="gb">GB</Option>
                <Option value="tb">TB</Option>
            </Select>
        </span>
    );
  }
}

export default InputWithSelectOption;