function simpleFixedPointIteration({expression, a:x0, b:x1, tolerance, maxIterations}) {
    const f = math.compile(expression);
  
    let stepsText = "\nSimple Fixed-Point Iteration Steps of Iteration:\n\n";
    stepsText += "N\t Xn\t F(Xn)\n\n";
  
    for (let i = 0; i < maxIterations; i++) {
      const fx = f.evaluate({ x: x0 });
  
      stepsText += `${i + 1}\t ${x0.toFixed(4)}\t ${Math.abs(fx).toFixed(4)}\n`;
  
      if (Math.abs(fx) < tolerance) {
        return [x0, Math.abs(fx), `Number of iterations: ${i + 1}`, stepsText];
      }
  
      x0 = fx;
    }
  
    const errorMsg = `The method failed after ${maxIterations} iterations.`;
    stepsText += errorMsg;
    return [x0, Math.abs(f), errorMsg, stepsText];
  }
  