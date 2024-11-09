//Variables
const $screen = document.querySelector(".screen");
const $numbers = document.querySelectorAll(".number");
const $signs = document.querySelectorAll(".sign");
const $delete = document.getElementById("delete");
const $backspace = document.getElementById("backspace");
const $plusOrMinus = document.getElementById("plus-or-minus");
const $dot = document.getElementById("dot");
const $percent = document.getElementById("percent");
const $equal = document.getElementById("equal");
// numbers Events
$numbers.forEach(number => {
    number.addEventListener("click", () => {
        if($screen.value === "" && number.textContent === "0") {
            $screen.value += "";
        } else {
            $screen.value += number.textContent;
        }         
    })
});
// signs Events
$signs.forEach(sign => {
    sign.addEventListener("click", () => {
        if($screen.value === "" && sign.textContent != "-") {
             $screen.value += "";
        } else if($screen.value === "-")  {
             $screen.value += "";
        } else if ($screen.value[$screen.value.length - 1] === "+" || $screen.value[$screen.value.length - 1] === "-" || $screen.value[$screen.value.length - 1] === "*" || $screen.value[$screen.value.length - 1] === "/") {
             $screen.value = $screen.value.substring(0, $screen.value.length - 1) + sign.textContent;            
        } else {
             $screen.value += sign.textContent;
          }
    })
});
// delete Event
$delete.addEventListener("click", () => $screen.value = "");
//plus or minus Event
$plusOrMinus.addEventListener("click", () => {
    if($screen.value === "" || $screen.value.substring(1, $screen.value.length).includes("+") || $screen.value.substring(1, $screen.value.length).includes("-")) {
        $screen.value += "";
    } else if($screen.value[0] != "-") {
        $screen.value = "-" + $screen.value;
    } else {
        $screen.value = $screen.value.substring(1, $screen.value[$screen.value.length]);
    }
});
// backspace Event
$backspace.addEventListener("click", () => {
    if($screen.value === "") {
        $screen.value += "";
    } else {
        $screen.value = $screen.value.substring(0, $screen.value.length - 1);
    }
});
// percent Event
$percent.addEventListener("click", () => {
    if($screen.value.substring(1, $screen.value.length).includes("+") || $screen.value.substring(1, $screen.value.length).includes("-") || $screen.value.substring(1, $screen.value.length).includes("*") || $screen.value.substring(1, $screen.value.length).includes("/") || $screen.value === "") {
        $screen.value += "";
    } else {
        $screen.value = $screen.value/100;
    }
}) 
// dot Event
$dot.addEventListener("click", () => {    
     if($screen.value === "" || $screen.value[$screen.value.length - 1] === "+" || $screen.value[$screen.value.length - 1] === "-" || $screen.value[$screen.value.length - 1] === "*" || $screen.value[$screen.value.length - 1] === "/") {
         $screen.value += "0" + $dot.textContent;
     } else if($screen.value[$screen.value.length - 1] === $dot.textContent) {
         $screen.value +="";
     } else if(!$screen.value.includes("+") && !$screen.value.includes("-") && !$screen.value.includes("*") && !$screen.value.includes("/")) {
         if($screen.value.includes($dot.textContent)) {
             $screen.value += "";
         } else {
             $screen.value += $dot.textContent;
         }
     } else {
        const index = Math.max($screen.value.lastIndexOf("+"), $screen.value.lastIndexOf("-"), $screen.value.lastIndexOf("*"), $screen.value.lastIndexOf("/"));
        if($screen.value.includes($dot.textContent) && index < $screen.value.lastIndexOf($dot.textContent)) {
            $screen.value += "";
        } else {
            $screen.value += $dot.textContent;
        }             }
})
//equal Event
$equal.addEventListener("click", () => {
    if($screen.value != "") {
        $screen.value = operate($screen.value);
    } else {
        $screen.value += "";
    }  
})
// Validation
const valideKey = (evt) => {
    // code is the decimal ASCII representation of the pressed key.
    var code = evt.which ? evt.which : evt.key;  
    if (code === 8 || code === 37 || code === 42 || code === 43) { // backspace or % or * or +      
      return true;
    } else if (code >= 45 && code <= 57) { // - or . or / or is a number      
      return true;
    } else { // other keys.      
      return false;
    }
  };
// Basic operations functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b; 

// operations object
const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
  };

const operate = (fn) => {  
    fn[0] === "-" ? fn = "0" + fn : fn;
    const values = [];
    const operators = [];
    let number = '';         
    for (let i = 0; i < fn.length; i++) {        
      const character = fn[i];            
      if (!isNaN(character) || character === '.') {
        number += character;
      } else if (character in operations) {
        values.push(parseFloat(number));
        number = '';  
        while (operators.length && precedence(character) <= precedence(operators[operators.length - 1])) {
          calculate(values, operators.pop());
        }
        operators.push(character);
      }
    }
    values.push(parseFloat(number));  
    while (operators.length) {
      calculate(values, operators.pop());
    }  
    return values[0];
}
const precedence = (op) => {
    if (op === '+' || op === '-') {
        return 1;
    } else if (op === '*' || op === '/') 
        { return 2;
    } else {
        return 0;
    }
}  
const calculate = (values, op) => {
    const b = values.pop();
    const a = values.pop();
    values.push(operations[op](a, b));
}
// arithmetic operation function
//const mathOperation = (fn) => new Function('return ' + fn)();





