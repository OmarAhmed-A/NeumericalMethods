function falsePosition({expression, a, b, tolerance, maxIterations}) {
    console.log("IN falsePosition");
    const f = math.compile(expression);
  
    var stepsText = "\nFalse Position Steps of Iteration:\n\n";
    stepsText += "N\t Xu\t Xm\t Xl\t F(Xu)\t F(Xm)\t F(Xl)\t error\n\n";
  
    if (f.evaluate({ x: a }) * f.evaluate({ x: b }) >= 0) {
      var errorMsg =
        "The boundary values do not bracket the root.\n The function values at the boundary values are:\n f(" +
        a +
        ") = " +
        f.evaluate({ x: a }) +
        " and f(" +
        b +
        ") = " +
        f.evaluate({ x: b });
      stepsText += errorMsg;
      return [null, null, errorMsg, stepsText];
    }
  
    var x =
      b -
      ((b - a) * f.evaluate({ x: b })) /
        (f.evaluate({ x: b }) - f.evaluate({ x: a }));
  
    for (var n = 1; n <= maxIterations; n++) {
      if (f.evaluate({ x: a }) * f.evaluate({ x: x }) < 0) {
        b = x;
      } else {
        a = x;
      }
  
      var xPrev = x;
      x =
        b -
        ((b - a) * f.evaluate({ x: b })) /
          (f.evaluate({ x: b }) - f.evaluate({ x: a }));
  
      if (Math.abs(x - xPrev) < tolerance) {
        stepsText +=
          n +
          "\t " +
          a.toFixed(3) +
          "\t " +
          x.toFixed(3) +
          "\t " +
          b.toFixed(3) +
          "\t " +
          f.evaluate({ x: a }).toFixed(3) +
          "\t " +
          f.evaluate({ x: x }).toFixed(3) +
          "\t " +
          f.evaluate({ x: b }).toFixed(3) +
          "\t " +
          Math.abs(x - xPrev).toFixed(3) +
          "\n";
        return [x, Math.abs(x - xPrev), "Number of iterations: " + n, stepsText];
      }
  
      stepsText +=
        n +
        "\t " +
        a.toFixed(3) +
        "\t " +
        x.toFixed(3) +
        "\t " +
        b.toFixed(3) +
        "\t " +
        f.evaluate({ x: a }).toFixed(3) +
        "\t " +
        f.evaluate({ x: x }).toFixed(3) +
        "\t " +
        f.evaluate({ x: b }).toFixed(3) +
        "\t " +
        Math.abs(x - xPrev).toFixed(3) +
        "\n";
    }
  
    stepsText +=
      "\n" + "The method failed after " + maxIterations + " iterations.";
    return [
      x,
      Math.abs(x - xPrev),
      "The method failed after " + maxIterations + " iterations.",
      stepsText,
    ];
  }