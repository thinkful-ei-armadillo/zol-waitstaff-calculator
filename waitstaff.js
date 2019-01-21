'use strict';

const STORE = {
  charges: {
    subtotal: 0,
    tip: 0,
    total: function(){
      return this.subtotal + this.tip;
    }
  },
  earningsInfo: {
    tipTotal: 0,
    mealCount: 0,
    averageTip: function (){
      return this.total/this.mealCount;
    }
  }
};

// generate html string 
function generateCalcString(){
  return `<div id="meal-deals">
<h3>Enter the Meal Details</h3>
<hr>
<form class="meal-deals-form js-meal-deals-form">
    <label for="base-meal-price">Base Meal Price: $</label>
    <input type="number" id="base-meal-price js-base-meal-price" min="0" value="9.99" step=".01" required></input>
    <br>
    <label for="tax-rate">Tax Rate: %</label>
    <input type="number" id="tax-rate js-tax-rate" min="0" value="" required></input>
    <br>
    <label for="tip-percentage">Tip Percentage: %</label>
    <input type="number" id="tip-percentage js-tip-percentage" min="0" value="" required></input>
    <br>
    <button type="submit">Submit</button>
    <button type="reset">Cancel</button>
</form>
</div>
<div class="result">
<div id="customer-charges">
    <h3>Customer Charges</h3>
    <hr>
    <div class="charge-info">
        <p>Subtotal $<span class="js-subtotal-val">0.00</span></p>
        <p>Tip $<span class="js-tip-val">0.00</span></p>
        <hr class="line-divider">
        <p>Total $<span class="js-total-charge-val">0.00</span></p>
    </div>
</div>

<div id="earnings-info">
    <h3>My Earnings Info</h3>
    <hr>
    <div class="earnings-info">
        <p>Tip Total: $<span class="js-tip-total-val">0.00</span></p>
        <p>Meal count: <span class="js-meal-count-val">0</span></p>
        <p>Average Tip Per Meal: $<span class="js-average-tip-val">0.00</span></p>
    </div>
</div>
</div>`;
}

// render page 
function renderCalc(){
    console.log('`renderCalc` ran');
  const waitstaffCalcString = generateCalcString(STORE);
  $('.js-waitstaffCalc').html(waitstaffCalcString);
}

// handle add meal to order 
function handleAddMeal(){
    console.log('`handleAddMeal` ran');
}

// handle reset page for new costumer ---- clear out data store -----  
function handleResetCalc(){
    console.log('`rhandleResetCalc` ran');
}


function handleCalc(){
    console.log('`HandleCalc` ran');
}

$(handleCalc);