function secant({expression, a:x0, b:x1, tolerance, maxIterations}) {
    const f = math.compile(expression);
  
    var stepsText = "\nSecant Steps of Iteration:\n\n";
    stepsText += "N\t Xn\t F(Xn)\n\n";
  
    for (var i = 0; i < maxIterations; i++) {
      if (Math.abs(f.evaluate({ x: x1 })) < tolerance) {
        stepsText +=
          i +
          1 +
          "\t " +
          x1.toFixed(3) +
          "\t " +
          Math.abs(f.evaluate({ x: x1 })).toFixed(3) +
          "\n";
        return [
          x1,
          Math.abs(f.evaluate({ x: x1 })),
          "Number of iterations: " + i,
          stepsText,
        ];
      }
  
      try {
        var denominator =
          (f.evaluate({ x: x1 }) - f.evaluate({ x: x0 })) / (x1 - x0);
        var x = x1 - f.evaluate({ x: x1 }) / denominator;
      } catch (e) {
        var errorMsg = "Zero division error in secant method!";
        stepsText += errorMsg;
        return [null, null, errorMsg, stepsText];
      }
  
      x0 = x1;
      x1 = x;
      stepsText +=
        i +
        1 +
        "\t " +
        x1.toFixed(3) +
        "\t " +
        Math.abs(f.evaluate({ x: x1 })).toFixed(3) +
        "\n";
    }
  
    var errorMsg = "The method failed after " + maxIterations + " iterations.";
    stepsText += errorMsg;
    return [x1, Math.abs(f.evaluate({ x: x1 })), errorMsg, stepsText];
  }