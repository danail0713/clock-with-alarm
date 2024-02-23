const clock = document.getElementById("clock");
const date = document.getElementById("date");
const alarmButton = document.getElementById("setAlarm");
const vibration = document.getElementById("vibration");
const ringtone = document.getElementById("ringtone");
setInterval(() => {
  const today = new Date();
  const todayAsClock = today.toLocaleTimeString("en-US", { hour12: false }); // the current time in format H:m:s
  const todayAsDate = today.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  clock.innerText = todayAsClock;
  date.innerText = todayAsDate;
}, 1000);

alarmButton.onclick = () => {
  const alarmOptions = document.createElement("div");
  alarmOptions.setAttribute("id", "activate");

  const label = document.createElement("label");
  label.setAttribute("id", "audio");
  label.innerText = "Audio";

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "checkAudio");
  label.append(checkbox);

  const timeInput = document.createElement("input");
  timeInput.setAttribute("type", "time");
  timeInput.setAttribute("id", "alarmTime");

  const activateButton = document.createElement("button");
  activateButton.innerText = "Activate";

  alarmOptions.append(label, timeInput, activateButton);
  alarmButton.replaceWith(alarmOptions);

  // Display an alert message with the time the alarm must be activated
  activateButton.onclick = () => {
    timeInput.onchange
    const alarmTime = timeInput.value;
    const currentTime = new Date();
    const alarmDate = new Date(
      `${currentTime.getFullYear()}-${
        currentTime.getMonth() + 1
      }-${currentTime.getDate()} ${alarmTime}`
    );
    if (currentTime < alarmDate) {
      alert(`Alarm set for ${alarmDate}`);
      let alarm;
      setTimeout(() => {
        if (checkbox.checked == false) {
          alarm = vibration;
        } else {
          alarm = ringtone;
        }
        alarm.play();
        alarm.setAttribute("loop", true);

        const clearAlarmButton = document.createElement("button");
        clearAlarmButton.innerText = "Clear Alarm";
        clearAlarmButton.setAttribute("class", "alarmButton");
        alarmOptions.replaceWith(clearAlarmButton);
        clearAlarmButton.onclick = () => {
          clearAlarmButton.replaceWith(alarmButton);
          alarm.pause();
          alarm.currentTime = 0;
        };
      }, alarmDate.getTime() - new Date().getTime());
    } else {
      alert(
        "The time for the alarm is before or is the same with the current time."
      );
    }
  };
};
