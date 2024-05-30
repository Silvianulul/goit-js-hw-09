function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector(".form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstDelay = parseInt(form.elements.delay.value);
  const delayStep = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const delay = delayStep === 0 ? firstDelay : firstDelay + i * delayStep;
    const position = i + 1;

    try {
      const result = await createPromise(position, delay);
      console.log(
        `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
      );
    } catch (error) {
      console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }
  }
});
