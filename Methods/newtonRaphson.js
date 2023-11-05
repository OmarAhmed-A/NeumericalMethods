function newtonRaphson({expression, a: x0, b, tolerance, maxIterations}) {
    const f = math.compile(expression);
  
    var stepsText = "\nNewton-Raphson Steps of Iteration:\n\n";
    stepsText += "N\t Xn\t F(Xn)\n\n";
  
    for (var i = 0; i < maxIterations; i++) {
      var fx = f.evaluate({ x: x0 });
      if (Math.abs(fx) < tolerance) {
        stepsText +=
          i + 1 + "\t " + x0.toFixed(3) + "\t " + Math.abs(fx).toFixed(3) + "\n";
        return [x0, Math.abs(fx), "Number of iterations: " + i, stepsText];
      }
      var delta = 1e-6; // A small value to approximate the derivative
      var dfx = (f.evaluate({ x: x0 + delta }) - fx) / delta; // Approximate the derivative
      if (dfx === 0) {
        var errorMsg = "The derivative is zero.";
        stepsText += errorMsg;
        return [null, null, errorMsg, stepsText];
      }
      x0 = x0 - fx / dfx;
      stepsText +=
        i +
        1 +
        "\t " +
        x0.toFixed(3) +
        "\t " +
        Math.abs(f.evaluate({ x: x0 })).toFixed(3) +
        "\n";
    }
  
    var errorMsg = "The method failed after " + maxIterations + " iterations.";
    stepsText += errorMsg;
    return [x0, Math.abs(f.evaluate({ x: x0 })), errorMsg, stepsText];
  }