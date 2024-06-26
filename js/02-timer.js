let timerInterval;
let selectedDate;
const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.getElementById("start-button");
function updateTimer(endTime) {
  timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;
    if (distance < 0) {
      clearInterval(timerInterval);
      alert("Timer finished");
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const daysElem = document.querySelector("[data-days]");
    const hoursElem = document.querySelector("[data-hours]");
    const minutesElem = document.querySelector("[data-minutes]");
    const secondsElem = document.querySelector("[data-seconds]");
    if (daysElem && hoursElem && minutesElem && secondsElem) {
      daysElem.textContent = String(days).padStart(2, "0");
      hoursElem.textContent = String(hours).padStart(2, "0");
      minutesElem.textContent = String(minutes).padStart(2, "0");
      secondsElem.textContent = String(seconds).padStart(2, "0");
    }
  }, 1000);
}
function setupTimer() {
  flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        alert("Please choose a date in the future");
      } else {
        selectedDate = selectedDates[0];
        startButton.removeAttribute("disabled");
      }
    },
  });
}
document.addEventListener("DOMContentLoaded", function () {
  setupTimer();
});
startButton.addEventListener("click", function () {
  if (selectedDate && selectedDate > new Date()) {
    clearInterval(timerInterval);
    updateTimer(selectedDate);
  } else {
    alert("Please select a valid future date.");
  }
});
