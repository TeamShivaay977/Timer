document.addEventListener('DOMContentLoaded', function() {
    const hourText = document.getElementById('hours');
    const minuteText = document.getElementById('minutes');
    const secondText = document.getElementById('seconds');

    const hourCircle = document.querySelector('.progress-ring__circle.hours');
    const minuteCircle = document.querySelector('.progress-ring__circle.minutes');
    const secondCircle = document.querySelector('.progress-ring__circle.seconds');

    const hourRadius = hourCircle.r.baseVal.value;
    const minuteRadius = minuteCircle.r.baseVal.value;
    const secondRadius = secondCircle.r.baseVal.value;

    const hourCircumference = 2 * Math.PI * hourRadius;
    const minuteCircumference = 2 * Math.PI * minuteRadius;
    const secondCircumference = 2 * Math.PI * secondRadius;

    hourCircle.style.strokeDasharray = `${hourCircumference} ${hourCircumference}`;
    minuteCircle.style.strokeDasharray = `${minuteCircumference} ${minuteCircumference}`;
    secondCircle.style.strokeDasharray = `${secondCircumference} ${secondCircumference}`;

    function setCircleProgress(circle, value, total, circumference) {
        const offset = circumference - (value / total) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function updateTimer() {
        const now = new Date();
        const nowIST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const targetTime = new Date(nowIST);
        targetTime.setHours(19, 5, 0, 0);

        if (nowIST >= targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const total = targetTime - nowIST;
        const totalSeconds = Math.floor(total / 1000);
        const hours = Math.floor((totalSeconds / 3600) % 24);
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = totalSeconds % 60;

        hourText.textContent = String(hours).padStart(2, '0');
        minuteText.textContent = String(minutes).padStart(2, '0');
        secondText.textContent = String(seconds).padStart(2, '0');

        setCircleProgress(hourCircle, hours, 24, hourCircumference);
        setCircleProgress(minuteCircle, minutes, 60, minuteCircumference);
        setCircleProgress(secondCircle, seconds, 60, secondCircumference);

        if (total <= 0) {
            clearInterval(interval);
            hourText.textContent = "00";
            minuteText.textContent = "00";
            secondText.textContent = "00";
        }
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
});
