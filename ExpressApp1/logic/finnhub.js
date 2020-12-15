// finnhub.js
// ========

////fetch seed data from Finnhub.IO

const axios = require('axios');

module.exports = {

    seed: function () {
        console.log("TEST SUCCESSFULL")
    },

    update: function (index, stockBase) {
        if (index < 0) { return -1 };
        var temp = stockBase[index].symbol;
        axios.get('https://finnhub.io/api/v1/quote?symbol='+temp+'&token=buloff748v6prr9ib59g')
            .then(response => {
                stockBase[index].current = response.data.c;
                stockBase[index].high = response.data.h;
                stockBase[index].low = response.data.l;
                stockBase[index].open = response.data.o;
                stockBase[index].pclose = response.data.pc;
                console.log('Stock symbol ' + temp + ' is updated!');
                return 0;
            })
            .catch(error => {
                console.log("Finnhub: API request limit exceeded, will try again later.");
                return -1;
            });
    }

};

console.log("finnhub.js loaded!");
