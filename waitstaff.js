'use strict';

//data storage for tracking order info
const STORE = {
  charges: {
    subtotal: 0,
    tip: 0,
    total: function(){
      return this.subtotal + this.tip;
    }
  },
  earningsInfo: {
    tipTotal: function(){
      let tipAcc = 0;
      tipAcc+=STORE.charges.tip;
      return tipAcc;
    },
    mealCount: 0,
    averageTip: function (){
      return (this.tipTotal()/this.mealCount);
    }
  }
};

// this function is responsible for generating html string for the calculator
function generateCalcString(){
//   debugger;
  const subtotal = STORE.charges.subtotal.toFixed(2);
  const tip = STORE.charges.tip.toFixed(2);
  const total = STORE.charges.total().toFixed(2);

  const tipTotal = STORE.earningsInfo.tipTotal().toFixed(2);
  const mealCount = STORE.earningsInfo.mealCount;
  const averageTip = STORE.earningsInfo.averageTip().toFixed(2);

  console.log('`generateCalcstring` ran');

  return `<div id="meal-deals">
  <h3>Enter the Meal Details</h3>
  <hr>
  <form class="meal-deals-form js-meal-deals-form">
      <label for="base-meal-price">Base Meal Price: $</label>
      <input type="number" id="base-meal-price" class="js-base-meal-price" min="0" value="0.00" step=".01" required></input>
      <br>
      <label for="tax-rate">Tax Rate: %</label>
      <input type="number" id="tax-rate" class="js-tax-rate" min="0" max="100" value="" required></input>
      <br>
      <label for="tip-percentage">Tip Percentage: %</label>
      <input type="number" id="tip-percentage" class="js-tip-percentage" min="0" max="100" value="" required></input>
      <br>
      <button type="button" class="js-submit">Submit</button>
      <button type="reset" class="js-cancel">Cancel</button>
  </form>
  </div>
  <div class="result">
  <div id="customer-charges">
      <h3>Customer Charges</h3>
      <hr>
      <div class="charge-info">
          <p>Subtotal $<span class="js-subtotal-val">${subtotal}</span></p>
          <p>Tip $<span class="js-tip-val">${tip}</span></p>
          <hr class="line-divider">
          <p>Total $<span class="js-total-charge-val">${total}</span></p>
      </div>
  </div>
  
  <div id="earnings-info">
      <h3>My Earnings Info</h3>
      <hr>
      <div class="earnings-info">
          <p>Tip Total: $<span class="js-tip-total-val">${tipTotal}</span></p>
          <p>Meal count: <span class="js-meal-count-val">${mealCount}</span></p>
          <p>Average Tip Per Meal: $<span class="js-average-tip-val">${averageTip !== 'NaN' ? averageTip : '0.00'}</span></p>
      </div>
  </div>
  </div>`;
}


// Following function is responsible for rendering the page
function renderCalc(){
  console.log('`renderCalc` ran');
  // insert that HTML into the DOM
  $('#js-waitstaffCalc').html(generateCalcString());
}

// ===================================================================

// this function responsible for updating all the cumulative info in STORE
function updateCustomerCharges(price, taxRate, tipPercent){
  const taxAmount = price * (taxRate/100);
  const totalAmount = price + taxAmount;
  const mealSubtotal = totalAmount + taxAmount;
  STORE.charges.subtotal = STORE.charges.subtotal + mealSubtotal;
  STORE.charges.tip = STORE.charges.tip + (mealSubtotal * (tipPercent/100));
}

function staffMealCount(){
  STORE.earningsInfo.mealCount += 1;
}

// add new meal to order 
function handleAddMeal(){
  console.log('`handleAddMeal` ran');
  $('#js-waitstaffCalc').on('click', '.js-submit', function(){
    // debugger;
    const mealPrice = parseInt($(this).closest('form').find('.js-base-meal-price').val());
    const taxRate = parseInt($(this).closest('form').find('.js-tax-rate').val());
    const tipPercent = parseInt($(this).closest('form').find('.js-tip-percentage').val());
    updateCustomerCharges(mealPrice, taxRate, tipPercent);
    staffMealCount();
    renderCalc();
  }); 
}

// ===================================================================

// reset page for new costumer ---- clear out data store -----  
function handleResetCalc(){
  console.log('`rhandleResetCalc` ran');
  $('.js-reset-button').click(() => {
    STORE.charges.subtotal = 0;
    STORE.charges.tip = 0;
    STORE.earningsInfo.mealCount = 0;
    renderCalc();
  });
}

// ===================================================================

function handleCalc(){
  generateCalcString();
  renderCalc();
  handleAddMeal();
  handleResetCalc();
}


$(handleCalc);