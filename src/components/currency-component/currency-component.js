import React from 'react';
import { Dropdown, Input, Label, Image} from 'semantic-ui-react'
import './currency-component.css';

const countryOptions = [
  { key: 'se', value: 'SEK', flag: 'se', text: 'Swedish Kronor' },
  { key: 'us', value: 'USD', flag: 'us', text: 'US Dollar' },
  { key: 'ru', value: 'RUB', flag: 'ru', text: 'Russian Rubel' },
  { key: 'no', value: 'NOK', flag: 'no', text: 'Norwegian Kronor' }
]

const CurrencyComponent = ({ onChangeInput, onChangeDropdown, amount, currency }) => {
  const getFlagImgPath = () => {
    if (currency === 'SEK'){
      return 'https://files.gamebanana.com/img/ico/sprays/swedish_flag_spray_5.png';
    } else if (currency === 'USD'){
      return 'https://discsport.se/img/disc/dynamicdiscs/americanflag.jpg';
    } else if (currency === 'NOK'){
      return 'https://www.shareicon.net/download/2015/07/23/73780_flag.ico';
    } else if (currency === 'RUB'){
      return 'https://www.shareicon.net/download/2015/11/14/166059_flag_256x256.png';
    }
  }

  const flagImgPath = getFlagImgPath();

  return (
    <div className="container">
      {flagImgPath === undefined ? null : <Image style={{ width: 300, height: 300, position: 'absolute' }} src={flagImgPath} /> }
      <div style={{ padding: 20, alignSelf: 'center', textAlign: 'center' }}>
        <Dropdown onChange={(event, data) => onChangeDropdown(data)} style={{ marginBottom: 10 }} placeholder='Select Country' fluid search selection options={countryOptions} />
        <Input onChange={(event, data) => onChangeInput(data)} value={amount} min={0} labelPosition='right' type='number' placeholder='Amount'>
          <Label basic>$</Label>
          <input />
          <Label>.00</Label>
        </Input>
      </div>
    </div>
  );
}

export { CurrencyComponent };
