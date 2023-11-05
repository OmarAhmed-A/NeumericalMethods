
function parseExpression(expression) {
  return eval(`(x) => ${expression}`);
}
const rootFindingMethods = {
  bisection: bisection,
  falsePosition: falsePosition,
  newtonRaphson: newtonRaphson,
  secant: secant,
  simpleFixedPointIteration: simpleFixedPointIteration,
};
let result, error, message, stepsText;
// Event listener for the Calculate button

document
  .getElementById("calculateButton")
  .addEventListener("click", function () {
    result, error, message, stepsText = null;
    console.log("Button clicked"); // To check if the button click event is detected

    // Retrieve user inputs
    const method = document.getElementById("method").value;
    const expression = document.getElementById("expression").value;
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);
    const maxIterations = parseInt(
      document.getElementById("maxIterations").value
    );

    console.log(method, expression, a, b, tolerance, maxIterations); // To check the user inputs
    console.log(
      typeof method,
      typeof expression,
      typeof a,
      typeof b,
      typeof tolerance,
      typeof maxIterations
    ); // To check the types of the user inputs
    console.log(method); // To check if the selected method is valid

    // Check if the selected method is valid
    if (method in rootFindingMethods) {
      console.log("valid method");
      // Call the appropriate root finding method function based on the selected method
      [result, error, message, stepsText] = rootFindingMethods[method]({
        expression: expression,
        a: a,
        b: b,
        tolerance: tolerance,
        maxIterations: maxIterations
    });

      console.log(method, expression, a, b, tolerance, maxIterations); // To check the user inputs
      console.log(
        typeof method,
        typeof expression,
        typeof a,
        typeof b,
        typeof tolerance,
        typeof maxIterations
      ); // To check the types of the user inputs
      console.log(result, error, message, stepsText); // To check the results
    }

    // Display results
    const resultLabel = document.getElementById("resultLabel");
    const errorLabel = document.getElementById("errorLabel");
    const infoLabel = document.getElementById("infoLabel");

    // Inside the event listener for the "Calculate" button
    if (result === null) {
      resultLabel.textContent = "No root found.";
      resultLabel.style.color = "red";
      errorLabel.textContent = `Error: ${message}`;
      errorLabel.style.color = "red";
      infoLabel.textContent = "";
    } else {
      if (!isNaN(result) && !isNaN(error)) {
        resultLabel.textContent = `Root: ${result.toFixed(6)}`;
        resultLabel.style.color = "lightgreen"; 
        errorLabel.textContent = `Error: ${error.toFixed(6)}`;
        errorLabel.style.color = "red";
        infoLabel.textContent = message;
      } else {
        // Handle the case where result or error is not a valid number
        resultLabel.textContent = "Result or error is not a valid number.";
        resultLabel.style.color = "red";
        errorLabel.textContent = `Error: ${message}`;
        errorLabel.style.color = "red";
        infoLabel.textContent = "";
      }
    }

    // Display steps of iteration
 // Display steps of iteration
const showSteps = document.getElementById("showSteps");
const clearResults = document.getElementById("clearResults");
const stepsWindow = document.getElementById("stepsWindow");

if (showSteps.checked && stepsText?.trim()) {

  // Split the stepsText into rows
  const rows = stepsText.trim().split("\n");
  
  if (rows.length > 2) { // Check if there are rows to display (header + at least one data row)
    // Create an HTML table for the steps
    let tableHtml = "<table>";
    tableHtml += "<tr><th>" + rows[0].replace(/\t/g, "</th><th>") + "</th></tr>"; // Header row
    for (let i = 1; i < rows.length; i++) {
      tableHtml += "<tr><td>" + rows[i].replace(/\t/g, "</td><td>") + "</td></tr>"; // Data row
    }



    // Close the HTML table
    tableHtml += "</table>";

    // Display the HTML table in the stepsWindow
    stepsWindow.style.display = "block";
    stepsWindow.innerHTML = tableHtml;
  } else {
    // Handle the case where there are no data rows
    stepsWindow.style.display = "none";
  }
} else {
  stepsWindow.style.display = "none";
}


  });
// Event listener for the Reset button
document.getElementById("resetButton").addEventListener("click", function () {
  // Reset user inputs
  document.getElementById("method").value = "bisection";
  document.getElementById("expression").value = "2x^3-2x-5";
  document.getElementById("a").value = "-5";
  document.getElementById("b").value = "7";
  document.getElementById("tolerance").value = "0.001";
  document.getElementById("maxIterations").value = "100";

  // Reset results
  document.getElementById("resultLabel").textContent = "";
  document.getElementById("errorLabel").textContent = "";
  document.getElementById("infoLabel").textContent = "";
  document.getElementById("stepsWindow").textContent = "";
  document.getElementById("stepsWindow").style.display = "none";
});


