let timer;
let isRunning = false;
let mode = "pattern1"; // 默认为工作模式
let minutes = 25;
let seconds = 0;

function updateDisplay() {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(function() {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timer);
                isRunning = false;
                alert("番茄钟结束！");
                resetTimer();
                if (mode === "pattern1") {
                    mode = "pattern2"; // 切换到休息模式
                    resetTimer(); // 重置计时器
                    startTimer(); // 开始休息模式计时
                } else if (mode === "pattern2") {
                    mode = "pattern1"; // 切换回工作模式
                    resetTimer(); // 重置计时器
                    startTimer(); // 开始工作模式计时
                }
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateDisplay();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    if (mode === "pattern1") {
        minutes = 25;
    } else if (mode === "pattern2") {
        minutes = 50;
    }
    seconds = 0;
    updateDisplay();
}

function updateMode() {
    const selectedMode = document.getElementById("mode").value;
    mode = selectedMode;
    resetTimer();
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("mode").addEventListener("change", updateMode);

updateDisplay();