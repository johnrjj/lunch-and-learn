import React, { Component } from "react";
import styled from "styled-components";
import { BigNumber } from 'bignumber.js';
import logo from "./logo.svg";
import "./App.css";
import { colors, spacing, fontSizing } from "./theme";

const BASE_ENDPOINT = 'https://api.gdax.com';

// this will get us the bitcoin price in json format
const getBitcoinPrice = async (pair = 'btc-usd') => {
  const fullEndpoint = `${BASE_ENDPOINT}/products/${pair}/ticker`;
  const bitcoinPriceRaw = await fetch(fullEndpoint);
  const bitcoinPriceJson = await bitcoinPriceRaw.json();
  return bitcoinPriceJson;
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: ${fontSizing.large};
  color: ${colors.contrastTextColor};
  text-align: center;
  margin-bottom: ${spacing.large};
`;

const CalculatorContainer = styled.div`
  background-color: ${colors.calculatorBackgroundColor};
  width: 42rem;
  box-shadow: ${colors.boxShadow};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: ${spacing.xlarge};
`;

const Row = styled.div`
  display: flex;
  height: 10rem;
  overflow: hidden:
  flex: 1;
`;

const RowLabel = styled.div`
  min-width: 12rem;
  font-size: ${fontSizing.large};
  color: ${colors.primaryTextColor};
  background-color: ${colors.labelBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowInput = styled.input`
  width: 100%;
  font-size: ${fontSizing.xlarge};
  padding-left: ${spacing.medium};
  font-family: 'Lato';
  color: ${colors.primaryTextColor};
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 42rem;
  height: 8rem;
  border: none;
  border-radius: 8px;
  font-size: ${fontSizing.medium};
  text-transform: uppercase;
  font-family: 'Lato';
  color: ${colors.contrastTextColor};
  box-shadow: ${colors.boxShadow};
  background: ${colors.buttonBackgroundColor};
`;

class App extends Component {
  constructor() {
    super(); // react-ism
    this.state = {
      price: null,
      baseAmountValue: 1,
    };
  }

  async componentDidMount() {
    await this.updatePrice();
    
    setInterval(async () => {
      await this.updatePrice();
    }, 5000);
  }

  async updatePrice() {
    const priceJson = await getBitcoinPrice();
    const price = priceJson.price;
    if (!price) {
      return;
    }
    this.setState({
      price: price,
    }); 
  }

  handleBaseAmountValueChange = (e) => {
    const value = e.target.value;
    this.setState({
      baseAmountValue: value,
    });
  }

  render() {
    const calculatedQuotePrice = calculateQuoteFromBase(this.state.price, this.state.baseAmountValue);
    
    return (
      <AppContainer>
        <Header>Simple Bitcoin Calculator</Header>
        <CalculatorContainer>
          <Row>
            <RowLabel>BTC</RowLabel>
            <RowInput 
              value={this.state.baseAmountValue}
              onChange={this.handleBaseAmountValueChange}
            />
          </Row>
          <Row>
            <RowLabel>USD</RowLabel>
            <RowInput value={calculatedQuotePrice} />
          </Row>
        </CalculatorContainer>
        <Button>Buy Bitcoin</Button>
      </AppContainer>
    );
  }
}

const calculateQuoteFromBase = (quotePrice, baseQuantity) => {
  const quotePriceNumber = new BigNumber(+quotePrice);
  const baseQuantityNumber = new BigNumber(+baseQuantity);
  const actualQuotePrice = quotePriceNumber.multipliedBy(baseQuantityNumber);
  return actualQuotePrice.toFormat(2);
};

export default App;
