"use strict";

export function parseMathlikeString() {
  let html = "";
  html += `<div><p><i>An app that parses and calculates a string of #+-/().</i></p></div>`;
  html += `<p></p>`;
  html += `<form id="parseForm">
  <label for="userInput">Enter an arithmetic expression:</label>
  <input type="text" id="parseAndCalculateExpression" placeholder="Input arithmetic #+/-()" name="userInput">
  <button type="button" id="parseAndCalculateButton">Submit</button>
</form>`;

  document.getElementById("operationsButtons").innerHTML = html;
  document
    .getElementById("parseAndCalculateButton")
    .addEventListener("click", () => {
      let string = document.getElementById("parseAndCalculateExpression").value;
      console.log("string at buttonpress", string);
      parseAndCalculate(string);
    });
}

function parseAndCalculate(string) {
  document.getElementById("output").innerHTML = "";
  document.getElementById(
    "output"
  ).innerHTML += `<h2>You entered: ${string} </h2>`;
  let cleanedString = cleanString(string);
  document.getElementById(
    "output"
  ).innerHTML += `<h2>Processing: ${cleanedString} </h2>`;
  let result = evaluateArithmetic(cleanedString);
  document.getElementById("output").innerHTML += `<h2>Result: ${result} </h2>`;
}

function cleanString(inputString) {
  // Remove any characters that are not digits, operators, parentheses, or decimal points
  let noExtraneousCharacterString = inputString.replace(
    /[^0-9\.\+\-\*\/\(\)]/g,
    ""
  );

  // Remove operators not followed or preceded by a number or parentheses
  let noHangingOperatorsString = noExtraneousCharacterString.replace(
    /[\+\-\*\/](?![\d\.\(])/g,
    ""
  );

  // Remove empty parentheses
  let noEmptyParenthesis = noHangingOperatorsString.replace(/\(\)/g, "");

  // Fix multiplication implied between numbers and parentheses
  let fixedParenthesisMultiplication = noEmptyParenthesis.replace(
    /(\d+(\.\d+)?)(\()/g,
    "$1*$3"
  );

  // Remove unnecessary repeated operators
  let noUneccesaryRepeatedString = fixedParenthesisMultiplication.replace(
    /([\+\-\*\/])\1+/g,
    "$1"
  );

  // Remove all whitespace
  let cleanedString = noUneccesaryRepeatedString.replace(/\s/g, "");

  // Remove operators that are neither followed nor preceded by a number or parentheses
  cleanedString = cleanedString.replace(/(?<!\d|\))[\+\-\*\/](?!\d|\()/g, "");

  // Count the number of opening and closing brackets
  let openBrackets = (cleanedString.match(/\(/g) || []).length;
  let closeBrackets = (cleanedString.match(/\)/g) || []).length;

  // If there are more closing brackets, remove the excess from the end
  if (closeBrackets > openBrackets) {
    let difference = closeBrackets - openBrackets;
    cleanedString = cleanedString.replace(
      new RegExp(`\\){${difference}}$`),
      ""
    );
  }

  // Remove doubled parentheses again
  cleanedString = cleanedString.replace(/\(\)/g, "");

  // Add the difference in closing brackets at the end
  if (openBrackets > closeBrackets) {
    cleanedString += ")".repeat(openBrackets - closeBrackets);
  }

  // Remove any sequences of 2 operators in a row
  cleanedString = cleanedString.replace(/[\+\-\*\/]{2,}/g, "");

  return cleanedString;
}

//topmost function
function evaluateArithmetic(inputString) {
  let string = calculateParentheses(inputString);
  let number = multAndSums(string);
  return number;
}

function calculateParentheses(string) {
  let openParenthesisIndex = string.lastIndexOf("(");
  let closeParenthesisIndex = string.indexOf(")", openParenthesisIndex);
  // Check if parentheses are balanced and exist
  if (
    openParenthesisIndex === -1 ||
    closeParenthesisIndex === -1 ||
    closeParenthesisIndex < openParenthesisIndex
  ) {
    // No parentheses found, return the original string evaluated
    return multAndSums(string);
  }
  // Extract the innermost expression
  let innerMostString = string.slice(
    openParenthesisIndex + 1,
    closeParenthesisIndex
  );
  // Evaluate the innermost expression
  let evaluatedInnerMostString = multAndSums(innerMostString);
  // Construct the new string by replacing the innermost parenthesis content with its result
  let newString =
    string.slice(0, openParenthesisIndex) +
    evaluatedInnerMostString +
    string.slice(closeParenthesisIndex + 1);

  const parenthesisTest = /[\(\)]/;
  if (parenthesisTest.test(newString)) {
    return calculateParentheses(newString);
  } else {
    return newString;
  }
}

//this function takes a string of numbers and operators and returns the result of the multiplication and addition operations.
function multAndSums(inputString) {
  let string = inputString;
  let multedString = multOut(string); // returns a string with all the * and / operations completed and folded into the original string.
  let addedString = addOut(multedString); // returns a string with all the + and - operations completed and folded into the original string.
  console.log("addedString", addedString);
  //   let numberOutput = numberify(addedString); //final conversion of the string into a number.
  //   console.log("numberOutput at the bottom of multandsums", numberOutput);
  return addedString;
}

function numberify(string) {
  let number = 0;
  let decimalPlace = 0;
  let hasDecimal = false;

  // Iterate over each character in the string
  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (char === ".") {
      // Handle the decimal point
      if (hasDecimal) {
        throw new Error(`Multiple decimal points found in input string`);
      }
      hasDecimal = true;
      decimalPlace = 1;
    } else {
      // Get the numerical value of the current character
      let digit = char.charCodeAt(0) - "0".charCodeAt(0);

      // Check if digit is in valid range (0-9)
      if (digit < 0 || digit > 9) {
        throw new Error(`Invalid character '${char}' in input string`);
      }

      if (hasDecimal) {
        // For fractional part, shift decimal place
        number += digit / Math.pow(10, decimalPlace);
        decimalPlace++;
      } else {
        // For integer part
        number = number * 10 + digit;
      }
    }
  }
  console.log("string at bottom of numberify", number);
  return number;
}
function stringerify(number) {
  if (number === 0) {
    return "0";
  }

  let isNegative = number < 0;
  if (isNegative) {
    number = -number;
  }

  // Extract the integer part
  let integerPart = Math.floor(number);

  // Extract and limit the fractional part to 2 decimal places
  let fractionalPart = number - integerPart;
  fractionalPart = Math.round(fractionalPart * 100); // Round to 2 decimal places

  // Convert integer part to string
  let string = "";
  let tempInt = integerPart;
  do {
    let digit = tempInt % 10;
    string = String.fromCharCode(digit + "0".charCodeAt(0)) + string;
    tempInt = Math.floor(tempInt / 10);
  } while (tempInt > 0);

  // Add the fractional part
  if (fractionalPart > 0) {
    string += ".";
    // Append fractional part digits (ensuring 2 decimal places)
    string += Math.floor(fractionalPart / 10);
    string += fractionalPart % 10;
  } else {
    // Ensure at least 2 decimal places if the fractional part is zero
    string += ".00";
  }

  // Add negative sign if the original number was negative
  if (isNegative) {
    string = "-" + string;
  }

  console.log("stringerified", string);
  return string;
}

//a function that takes a string as an input, and first finds the first instance of the symbol * or /.
//next, the function finds the numbers on either side of the symbol. They will be strings.
//each number is assigned to a variable (var1 and var2), and the starting and ending index of the whole expression are stored as (startIndex and endIndex).
//next, the function applies numberify to var1 and var2, and then applies the appropriate operation to the two numbers, producing result.
//next, the result is transformed back into a string with strigerify(result).
//finally, the new string is reinserted into the original string, replacing the old expression, using the index markers to ensure it's all in the right place.
//the function then returns the new string.  // Find the first occurrence of * or /
function multOut(string) {
  // Regex to find numbers around the first * or / operator
  let regex = /(\d+(\.\d+)?)\s*([*\/])\s*(\d+(\.\d+)?)/;

  // Check if there's any * or / operator in the string
  if (!regex.test(string)) {
    return string; // No * or / found, return the original string
  }

  // Find the first occurrence of the pattern
  let match = regex.exec(string);
  if (!match) {
    return string; // No match found, return the original string
  }

  // Extract numbers and operator from the match
  let var1 = match[1];
  let var2 = match[4];
  let operator = match[3];

  // Convert to numbers
  let num1 = numberify(var1);
  let num2 = numberify(var2);

  // Apply the appropriate operation
  let result;
  if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "/") {
    result = num1 / num2;
  }
  console.log("result", result);

  let resultString = stringerify(result);

  // Replace the old expression with the new result
  let newString = string.replace(regex, resultString);

  // Continue processing the new string recursively
  return multOut(newString);
}
function addOut(string) {
  // Regex to find numbers around the first + or - operator
  let regex = /(-?\d+(\.\d+)?)\s*([+\-])\s*(-?\d+(\.\d+)?)/;

  if (!regex.test(string)) {
    return string; // No + or - found, return the original string
  }

  // Find the first occurrence of the pattern
  let match = regex.exec(string);
  if (!match) {
    return string; // No match found, return the original string
  }

  // Extract numbers and operator from the match
  let var1 = match[1];
  let var2 = match[4];
  let operator = match[3];

  // Convert to numbers
  let num1 = numberify(var1);
  let num2 = numberify(var2);

  // Apply the appropriate operation
  let result;
  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  }

  // Convert result back to string
  let resultString = stringerify(result);

  // Replace the old expression with the new result
  let newString = string.replace(regex, resultString);

  // Continue processing the new string recursively
  return addOut(newString);
}
