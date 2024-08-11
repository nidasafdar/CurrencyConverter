import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Update import
import axios from 'axios';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState('');

    useEffect(() => {
        axios.get('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => {
                setExchangeRate(response.data.rates);
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
    }, []);

    const handleConvert = () => {
        if (exchangeRate && amount && sourceCurrency && targetCurrency) {
            const rate = exchangeRate[targetCurrency];
            const result = parseFloat(amount) * rate;
            setConvertedAmount(result.toFixed(2));
        } else {
            alert("Please select both source and target currencies.");
        }
    };
    const resetConverter = () =>{
        setAmount('');
        setConvertedAmount('');
        }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Currency Converter !</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
                style={styles.input}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={sourceCurrency}
                    onValueChange={(itemValue) => setSourceCurrency(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Choose Currency" value="" />
                    <Picker.Item label="US Dollar (USD)" value="USD" />
                    <Picker.Item label="Euro (EUR)" value="EUR" />
                    <Picker.Item label="British Pound (GBP)" value="GBP" />
                    <Picker.Item label="Indian Rupee (INR)" value="INR" />
                    <Picker.Item label="Pakistani Rupee (PKR)" value="PKR" />
                    <Picker.Item label="Sri Lankan Rupee (LKR)" value="LKR" />
                    <Picker.Item label="Nepalese Rupee (NPR)" value="NPR" />
                    <Picker.Item label="Bangladeshi Taka (BDT)" value="BDT" />
                    <Picker.Item label="Japanese Yen (JPY)" value="JPY" />
                    <Picker.Item label="Chinese Yuan (CNY)" value="CNY" />
                    <Picker.Item label="Canadian Dollar (CAD)" value="CAD" />
                    <Picker.Item label="Australian Dollar (AUD)" value="AUD" />
                    <Picker.Item label="Swiss Franc (CHF)" value="CHF" />
                    <Picker.Item label="Russian Ruble (RUB)" value="RUB" />
                    <Picker.Item label="Brazilian Real (BRL)" value="BRL" />
                    <Picker.Item label="Mexican Peso (MXN)" value="MXN" />
                    <Picker.Item label="South African Rand (ZAR)" value="ZAR" />
                    <Picker.Item label="New Zealand Dollar (NZD)" value="NZD" />
                    <Picker.Item label="Singapore Dollar (SGD)" value="SGD" />
                    <Picker.Item label="Malaysian Ringgit (MYR)" value="MYR" />
                </Picker>
                <Picker
                    selectedValue={targetCurrency}
                    onValueChange={(itemValue) => setTargetCurrency(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Choose Currency" value="" />
                    <Picker.Item label="US Dollar (USD)" value="USD" />
                    <Picker.Item label="Euro (EUR)" value="EUR" />
                    <Picker.Item label="British Pound (GBP)" value="GBP" />
                    <Picker.Item label="Indian Rupee (INR)" value="INR" />
                    <Picker.Item label="Pakistani Rupee (PKR)" value="PKR" />
                    <Picker.Item label="Sri Lankan Rupee (LKR)" value="LKR" />
                    <Picker.Item label="Nepalese Rupee (NPR)" value="NPR" />
                    <Picker.Item label="Bangladeshi Taka (BDT)" value="BDT" />
                    <Picker.Item label="Japanese Yen (JPY)" value="JPY" />
                    <Picker.Item label="Chinese Yuan (CNY)" value="CNY" />
                    <Picker.Item label="Canadian Dollar (CAD)" value="CAD" />
                    <Picker.Item label="Australian Dollar (AUD)" value="AUD" />
                    <Picker.Item label="Swiss Franc (CHF)" value="CHF" />
                    <Picker.Item label="Russian Ruble (RUB)" value="RUB" />
                    <Picker.Item label="Brazilian Real (BRL)" value="BRL" />
                    <Picker.Item label="Mexican Peso (MXN)" value="MXN" />
                    <Picker.Item label="South African Rand (ZAR)" value="ZAR" />
                    <Picker.Item label="New Zealand Dollar (NZD)" value="NZD" />
                    <Picker.Item label="Singapore Dollar (SGD)" value="SGD" />
                    <Picker.Item label="Malaysian Ringgit (MYR)" value="MYR" />
                </Picker>
            </View>
            <Button title="Convert" onPress={handleConvert} />
            {convertedAmount ? <Text style={styles.result}>Converted Amount: {convertedAmount}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#000',
        alignItems:'center',
        justifyContent:'center' // Background color for visibility
    },
    header: {
        fontSize: 30,
        padding: 5,
        marginBottom: 40,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        backgroundColor: 'gray',
        color: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontWeight:600,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        backgroundColor:'white',
        fontWeight:600,

    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'white', // Ensure text is visible against the background
    },
    pickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap', // Ensure pickers wrap properly if needed
    }
});

export default CurrencyConverter;
