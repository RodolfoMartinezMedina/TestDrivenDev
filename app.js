// Initial array of stocks
const stocksList = ['FB', 'AAPL', 'TSLA', 'GOOGL'];
const validationURL = "https://api.iextrading.com/1.0/ref-data/symbols";
const validationList = [];
// displaystockInfo function re-renders the HTML to display the appropriate content
const bigList = function(event){

 
  // validationList API call
     $.ajax({
       url:validationURL,
       method: 'GET'
     }).then(function (response){
     
         console.log(response[0].symbol);
          for (let i = 0; i < response.length; i++){
            let sym = response[i].symbol;
            
            validationList.push(sym);
            
            //validationList.push(sym);
            //console.log(validationList);
          };
          console.log(validationList);
         });
        }
//
const displayStockInfo = function () {

  // Grab the stock symbol from the button clicked and add it to the queryURL
  const stocksList = $(this).attr('data-name');
  const queryURL = `https://api.iextrading.com/1.0/stock/${stocksList}/batch?types=quote,news&range=1m&last=10`;
  const logoURL = `https://api.iextrading.com/1.0/stock/${stocksList}/logo`;
  // Creating an AJAX call for the specific stock button being clicked
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {

    // Creating a div to hold the stock
    const stockDiv = $('<div>').addClass('stock card-body ');
    //
    
    //
    // Storing the company name
    const companyName = response.quote.companyName;
          
    // Creating an element to display the company name
    
    const nameHolder = $('<p>').html(`<h3>Company Name: ${companyName}</h3>`).addClass("card-title ");
    // Appending the name to our stockDiv
    stockDiv.append(nameHolder);

    // Storing the stock symbol
    const stockSymbol = response.quote.symbol;

    // Creating an element to display the stock symbol
    const symbolHolder = $('<p>').html(`<h5>Stock Symbol: ${stockSymbol}</h5>`).addClass("card-text ");

    // Appending the symbol to our stockDiv
    stockDiv.append(symbolHolder);

    // Storing the price
    const stockPrice = response.quote.latestPrice;

    // Creating an element to display the price
    const priceHolder = $('<p>').html(`<h5>Stock Price: $${stockPrice}</h5>`).addClass("card-text");

    // Appending the price to our stockDiv
    stockDiv.append(priceHolder);

    // Storing the first news summary
    
    
    for (let i = 0; i < response.news.length ; i++){
      const companyNews = response.news[i];
     // alert(companyNews);
      const summaryHolder = $('<p>').text(`News Headline: ${companyNews.summary}`).addClass("card-text ");
      stockDiv.append(summaryHolder);
      
      };
   //Get logo
       $.ajax({
       url: logoURL,
       method: "GET"
      }).then(function(response) {
       const logo = response.url;
       const logoHere = $('<p>').append(`<img src=${logo} style="float:right"></img>`).addClass("card-img-top");
       stockDiv.prepend(logoHere);
     });
     //Extra
     
      const newButton = $('<button>');
      newButton.addClass(`${companyName}-details btn btn-primary`);
      newButton.text("Details");
      stockDiv.append(newButton);
      const detailsSym = function(){
        alert("hello");
      };
     //Extra
     $(`.${stockSymbol}-details`).on('click', detailsSym);
     //Extra
    $('#stocks-view').prepend(stockDiv);
  });

}

// Function for displaying stock data
const render = function () {

  // Deleting the stocks prior to adding new stocks
  // (this is necessary otherwise you will have repeat buttons)
  $('#buttons-view').empty();

  // Looping through the array of stocks
  for (let i = 0; i < stocksList.length; i++) {

    // Then dynamically generating buttons for each stock in the array
    // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
    const newButton = $('<button>');
    
    // Adding a class of stock-btn to our button
    newButton.addClass('stock-btn');
    
    // Adding a data-attribute
    newButton.attr('data-name', stocksList[i]);
    
    // Providing the initial button text
    newButton.text(stocksList[i]);
    
    // Adding the button to the buttons-view div
    $('#buttons-view').append(newButton);
  }
}





// This function handles events where one button is clicked
const addButton = function(event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  const stocks = $('#stock-input').val().trim().toUpperCase();
  //
  if (jQuery.inArray(stocks, validationList)  != -1  ){


  //
  // The stock from the text box is then added to our array
  stocksList.push(stocks);

  // Deletes the contents of the input
  $('#stock-input').val('');

  // calling render which handles the processing of our stock array
  render();
  } else{
    alert("Opps!!! Not a vaild symbol");
    $('#stock-input').val('');
  };
}
//



// });
//

//  
// Even listener for #add-stock button
$('#add-stock').on('click', addButton);

// Adding a click event listener to all elements with a class of 'stock-btn'
$('#buttons-view').on('click', '.stock-btn', displayStockInfo);

// Load on start
$( window ).on('load', bigList);
//

//
render();
