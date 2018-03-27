import React, { Component } from 'react';
import CurrencyComponent from './components/currency-component';
import { Segment, Divider } from 'semantic-ui-react'
import './App.css';
import logo from './logo.svg';
import Arrow from 'react-icons/lib/fa/retweet';

const API_KEY = 'wJCmdTzftFpSBfBjksXEFNTHQ83EA7';
const BASE_URL = 'https://www.amdoren.com/api/currency.php';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upperConverter: {
        currency: undefined,
        amount: undefined
      },
      lowerConverter: {
        currency: undefined,
        amount: undefined
      }
    }

    this.upperOnChangeDropdown = this.upperOnChangeDropdown.bind(this);
    this.lowerOnChangeDropdown = this.lowerOnChangeDropdown.bind(this);
    this.upperOnChangeInput = this.upperOnChangeInput.bind(this);
    this.lowerOnChangeInput = this.lowerOnChangeInput.bind(this);
  }

  upperOnChangeDropdown(data) {
    this.setState({
      upperConverter: {
        ...this.state.upperConverter,
        currency: data.value,
      },
    })
  }

  lowerOnChangeDropdown(data) {
    this.setState({
      lowerConverter: {
        ...this.state.lowerConverter,
        currency: data.value,
      }
    })
  }

  upperOnChangeInput(data) {
    this.setState({
      upperConverter: {
        ...this.state.upperConverter,
        amount: data.value
      },
    })

    fetch(`${PROXY_URL}${BASE_URL}?api_key=${API_KEY}&from=${this.state.upperConverter.currency}&to=${this.state.lowerConverter.currency}&amount=${data.value}`)
    .then(response => response.json())
    .then((res) => this.setState({
      lowerConverter: {
        ...this.state.lowerConverter,
        amount: res.amount
      }
    }))
  }

  lowerOnChangeInput(data) {
    this.setState({
      lowerConverter: {
        ...this.state.lowerConverter,
        amount: data.value
      }
    })

    fetch(`${PROXY_URL}${BASE_URL}?api_key=${API_KEY}&from=${this.state.lowerConverter.currency}&to=${this.state.upperConverter.currency}&amount=${data.value}`)
    .then(response => response.json())
    .then((res) => this.setState({
      upperConverter: {
        ...this.state.upperConverter,
        amount: res.amount
      }
    }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Segment className="App-content">
          <CurrencyComponent
            onChangeInput={this.upperOnChangeInput}
            onChangeDropdown={this.upperOnChangeDropdown}
            amount={this.state.upperConverter.amount}
            currency={this.state.upperConverter.currency}>
          </CurrencyComponent>
          <Divider horizontal> <Arrow size={50}/> </Divider>
          <CurrencyComponent
            onChangeInput={this.lowerOnChangeInput}
            onChangeDropdown={this.lowerOnChangeDropdown}
            amount={this.state.lowerConverter.amount}
            currency={this.state.lowerConverter.currency}>
          </CurrencyComponent>
        </Segment>
      </div>
    );
  }
}

export default App;
