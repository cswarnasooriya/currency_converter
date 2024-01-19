const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wars
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req,res)=>{
    const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=1b33176170ca40f6a1e19db02a387c85';


    
    try{
        const nameResponce = await axios.get(nameURL);
        const nameData = nameResponce.data;

        return res.json(nameData);


    }catch(err){
        console.error(err);
    }

});

//get the target amount
app.get("/convert" , async (req,res)=>{
    const { 
        date, 
        sourceCurrency, 
        targetCurrency, 
        amountInSourceCurrency ,
    } = req.query;

    try{
        const dataUrl = "https://openexchangerates.org/api/historical/2022-12-18.json?app_id=1b33176170ca40f6a1e19db02a387c85";
        
        const dataResponce = await axios.get(dataUrl);
        
        const rates = dataResponce.data.rates;

        //rates

        const sourceRate =rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target currency
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
        
        return res.json(targetAmount.toFixed(2));
    
        }catch(err){
            console.error(err);
        }


   
});

//listen to the port
app.listen(5000, ()=>{
    console.log("Server Started");
});