import React, { useState, useEffect } from "react";
import dollarSign from "./assets/dollar-sign.svg";
import personIcon from "./assets/person.svg";
import "./TipCalculator.css";

export default function TipCalculator() {
    const [billAmount, setBillAmount] = useState('');
    const [tipPercentage, setTipPercentage] = useState(null);
    const [customTipPercentage, setCustomTipPercentage] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [tipAmount, setTipAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        calculateTip();
    }, [billAmount, tipPercentage, customTipPercentage, numOfPeople]);

    const handleBillChange = (e) => {
        setBillAmount(e.target.value);
    };

    const handleTipButtonClick = (percentage) => {
        setTipPercentage(percentage);
        setCustomTipPercentage('');
    };

    const handleCustomTipChange = (e) => {
        setCustomTipPercentage(e.target.value);
        setTipPercentage(null);
    };

    const handlePeopleChange = (e) => {
        setNumOfPeople(e.target.value);
    };

    const calculateTip = () => {
        const bill = parseFloat(billAmount);
        const tipPercent = parseFloat(tipPercentage) || parseFloat(customTipPercentage);
        const people = parseInt(numOfPeople, 10);
        
        if (!isNaN(bill) && bill > 0 && !isNaN(tipPercent) && tipPercent > 0 && !isNaN(people) && people > 0) {
            const tip = (bill * tipPercent) / 100;
            const total = bill + tip;
            setTipAmount(tip / people);
            setTotalAmount(total / people);
        } else {
            setTipAmount(0);
            setTotalAmount(0);
        }
    };

    const resetCalculator = () => {
        setBillAmount('');
        setTipPercentage(null);
        setCustomTipPercentage('');
        setNumOfPeople('');
        setTipAmount(0);
        setTotalAmount(0);
    };

    return (
        <div className="tip-calculator-container">
            <div className="input-container">
                <div className="bill-input-container">
                    <label htmlFor="bill-input">Bill</label>
                    <div className="bill-input-layout">
                        <img src={dollarSign} alt="dollar-sign" />
                        <input
                            id="bill-input"
                            type="text"
                            placeholder="0"
                            value={billAmount}
                            onChange={handleBillChange}
                        />
                    </div>
                </div>
                <div className="tip-input-container">
                    <label>Select Tip %</label>
                    <div className="tip-selections-container">
                        {[5, 10, 15, 25, 50].map((percentage) => (
                            <button
                                key={percentage}
                                className={tipPercentage === percentage ? 'selected' : ''}
                                onClick={() => handleTipButtonClick(percentage)}
                            >
                                {percentage}%
                            </button>
                        ))}
                        <input
                            id="custom-tip-input"
                            type="text"
                            placeholder="Custom"
                            value={customTipPercentage}
                            onChange={handleCustomTipChange}
                        />
                    </div>
                </div>
                <div className="num-of-people-input-container">
                    <label htmlFor="num-of-people-input">Number of People</label>
                    <div className="num-of-people-input-layout">
                        <img src={personIcon} alt="" />
                        <input
                            id="num-of-people-input"
                            type="text"
                            placeholder="0"
                            value={numOfPeople}
                            onChange={handlePeopleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="output-container">
                <div className="output-layout">
                    <div className="tip-amount-info">
                        <div className="main-info">
                            <h3 className="title">Tip Amount</h3>
                            <p className="add-info">/ person</p>
                        </div>
                        <h1 className="tip-amount">${tipAmount.toFixed(2)}</h1>
                    </div>
                    <div className="total-amount-info">
                        <div className="main-info">
                            <h3 className="title">Total</h3>
                            <p className="add-info">/ person</p>
                        </div>
                        <h1 className="total-amount">${totalAmount.toFixed(2)}</h1>
                    </div>
                </div>
                <div className="reset-button-container">
                    <button
                        className={billAmount && (tipPercentage || customTipPercentage) && numOfPeople ? '' : 'disabled'} 
                        onClick={billAmount && (tipPercentage || customTipPercentage) && numOfPeople ? resetCalculator : null}
                        disabled={!billAmount || !(tipPercentage || customTipPercentage) || !numOfPeople}
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
}