'use strict';

// Request sample: https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DIS&apikey=YVZBFJSOMHM6J2R0
  const API_KEY = "YVZBFJSOMHM6J2R0";
  const symbols = ["AAPL", "AXP", "BA", "CAT", "CSCO"];
  // const symbols = ["AAPL", "AXP", "BA", "CAT", "CSCO", "CVX", "DIS", "DOW", "GS", "HD", "IBM", "INTC", "JNJ", "JPM", "KO", "MCD", "MMM", "MRK", "MSFT", "NKE", "PFE", "PG", "RTX", "TRV", "UNH", "V", "VZ", "WBA", "WMT", "XOM" ];
  const request_quote = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";


  // Sort when table header is clicked.
  const ths = document.getElementsByTagName('th');
  const table = document.querySelector('table');
  let sortOrder = 1; 

  for (let i = 0; i < ths.length; i++) {
    ths[i].addEventListener('click', function() {
      // console.log(this.cellIndex);
      let rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr')); //Convert NodeList to array
      let col = this.cellIndex;
      let type = this.dataset.type;

      rows.sort(function(a, b) {
        if (type === "number") {
          var _a = a.children[col].textContent * 1;
          var _b = b.children[col].textContent * 1;
        }
        if (type === "string") {
          var _a = a.children[col].textContent.toLowerCase();
          var _b = b.children[col].textContent.toLowerCase();
        }
        if ( _a < _b ) {
          return -1 * sortOrder; 
        }
        if ( _a > _b ) {
          return 1 * sortOrder;
        }
        return 0;
      });

      let tbody = document.querySelector('tbody');
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
      for (let j = 0; j < rows.length; j++) {
        tbody.appendChild(rows[j]);
      }      
      for (let k = 0; k < ths.length; k++) {
        ths[k].className = '';
      }
      this.className = sortOrder === 1 ? 'asc' : 'dsc';
      sortOrder *= -1;
    });
  }

  // When "QUOTE" btn is clicked, show result. 
  $(document).ready(function() {
    $('#get_quote').on('click', function() {
      table.classList.remove('hide');
      $("#results").html("");
      $.each(symbols, function(i, symbol) {
        $.get(createQuoteRequest(symbol), function(data, status){
          // console.log("Symbol is: " + symbol + "\n status is: " + status)
          resultsLoop(data);
        });
      });
    });
  });

  function createQuoteRequest(symbols) {
    let request = request_quote + symbols + "&apikey=" + API_KEY;
    return request;
  }

  function resultsLoop(data) {
    const symbol = data["Global Quote"]["01. symbol"];
    const open = data["Global Quote"]["02. open"];
    const high = data["Global Quote"]["03. high"];
    const low = data["Global Quote"]["04. low"];
    const price = Math.floor(data["Global Quote"]["05. price"] * 100) / 100;
    const volume = data["Global Quote"]["06. volume"];
    const latest_trading_day = data["Global Quote"]["07. latest trading day"];
    const previous_close = data["Global Quote"]["08. previous close"];
    const change = Math.floor(data["Global Quote"]["09. change"] * 100) / 100;
    const change_percent = data["Global Quote"]["10. change percent"];
    const time = new Date($.now());    

    $("#results").append(`
      <tr>
        <td>${latest_trading_day}</td>
        <td>${symbol}</td>
        <td>${price}</td>
        <td>${volume}</td>
        <td>${change}</td>
        <td>${change_percent}</td>
      </tr>
      `);
      $("#footer-modify").html(`<p>Last Updated: ${time}`);
  }