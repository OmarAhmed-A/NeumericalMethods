function bisection({expression, a, b, tolerance, maxIterations}) {
    const f = math.compile(expression);
  
    var stepsText = "\nBisection Steps of Iteration:\n\n";
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
  
    var oldMidPoint = 0;
    for (var n = 1; n <= maxIterations; n++) {
      var midPoint = (a + b) / 2;
      var error = Math.abs(midPoint - oldMidPoint);
      if (Math.abs(f.evaluate({ x: midPoint })) < tolerance) {
        stepsText +=
          n +
          "\t " +
          a.toFixed(3) +
          "\t " +
          midPoint.toFixed(3) +
          "\t " +
          b.toFixed(3) +
          "\t " +
          f.evaluate({ x: a }).toFixed(3) +
          "\t " +
          f.evaluate({ x: midPoint }).toFixed(3) +
          "\t " +
          f.evaluate({ x: b }).toFixed(3) +
          "\t " +
          error.toFixed(3);
        return [
          midPoint,
          Math.abs(f.evaluate({ x: midPoint })),
          "Number of iterations: " + n,
          stepsText,
        ];
      } else if (f.evaluate({ x: a }) * f.evaluate({ x: midPoint }) < 0) {
        b = midPoint;
      } else {
        a = midPoint;
      }
      stepsText +=
        n +
        "\t " +
        a.toFixed(3) +
        "\t " +
        midPoint.toFixed(3) +
        "\t " +
        b.toFixed(3) +
        "\t " +
        f.evaluate({ x: a }).toFixed(3) +
        "\t " +
        f.evaluate({ x: midPoint }).toFixed(3) +
        "\t " +
        f.evaluate({ x: b }).toFixed(3) +
        "\t " +
        error.toFixed(3) +
        "\n";
      oldMidPoint = midPoint;
    }
  
    stepsText +=
      "\n" + "The method failed after " + maxIterations + " iterations.";
    return [
      midPoint,
      Math.abs(f.evaluate({ x: midPoint })),
      "The method failed after " + maxIterations + " iterations.",
      stepsText,
    ];
  }