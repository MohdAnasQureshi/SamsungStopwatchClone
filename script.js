const start = document.getElementsByClassName("start")[0];
const stop = document.getElementsByClassName("stop")[0];
const reset = document.getElementsByClassName("reset")[0];
const resume = document.getElementsByClassName("resume")[0];
const lap = document.getElementsByClassName("lap")[0];
const millisecond = document.getElementsByClassName("millisecond")[0];
const lapmillisecond = document.getElementsByClassName("millisecond")[1];
const lapContainer = document.getElementsByClassName("lapContainer")[0];
const second = document.getElementsByClassName("second")[0];
const lapsecond = document.getElementsByClassName("second")[1];
const minute = document.getElementsByClassName("minute")[0];
const lapminute = document.getElementsByClassName("minute")[1];
const lapTime = document.getElementsByClassName("lapTime")[0];
const table = document.getElementsByTagName("table")[0];
totalElapsedMilliSec = [];

minCount = 0;
secCount = 0;
millisecCount = 0;

function startFunc() {
  min = setInterval(() => {
    minute.innerHTML = minCount < 9 ? "0" + ++minCount : ++minCount;
  }, 60 * 1000);

  sec = setInterval(() => {
    second.innerHTML = secCount < 9 ? "0" + ++secCount : ++secCount;
    if (secCount === 60) {
      second.innerHTML = "00";
      secCount = 0;
    }
  }, 1000);

  millisec = setInterval(() => {
    millisecond.innerHTML =
      millisecCount < 9 ? "0" + ++millisecCount : ++millisecCount;
    if (millisecCount === 100) {
      millisecond.innerHTML = "00";
      millisecCount = 0;
    }
  }, 10);

  lapTimer();
  start.style.display = "none";
  lap.style.display = "block";
  stop.style.display = "block";
  reset.style.display = "none";
}

function stopFunc() {
  clearInterval(min);
  clearInterval(sec);
  clearInterval(millisec);
  clearInterval(lapMilliInterval);
  clearInterval(lapMinInterval);
  clearInterval(lapSecondInterval);

  start.innerHTML = "Resume";
  start.style.display = "block";
  stop.style.display = "none";
  reset.style.display = "block";
  lap.style.display = "none";
}

function resetFunc() {
  minute.innerHTML = "00";
  second.innerHTML = "00";
  millisecond.innerHTML = "00";

  lapminute.innerHTML = "00";
  lapsecond.innerHTML = "00";
  lapmillisecond.innerHTML = "00";
  clearInterval(min);
  clearInterval(sec);
  clearInterval(millisec);
  clearInterval(lapMinInterval);
  clearInterval(lapMilliInterval);
  clearInterval(lapSecondInterval);
  minCount = 0;
  secCount = 0;
  millisecCount = 0;
  lapMin = 0;
  lapSec = 0;
  lapMilliSec = 0;
  a = 1;
  start.innerHTML = "Start";
  start.style.display = "block";
  reset.style.display = "none";
  stop.style.display = "none";
  lap.style.display = "none";
  lapTime.style.visibility = "hidden";
  lapContainer.style.visibility = "hidden";
  tr = document.getElementsByClassName("remove");
  x = Array.from(tr);
  x.forEach((element) => {
    element.remove();
  });
  totalElapsedMilliSec = [];
}
lapMin = 0;
lapSec = 0;
lapMilliSec = 0;
function lapTimer() {
  lapMinInterval = setInterval(() => {
    ++lapMin;
    lapminute.innerHTML = lapMin < 10 ? "0" + lapMin : lapMin;
  }, 60 * 1000);

  lapSecondInterval = setInterval(() => {
    ++lapSec;
    lapsecond.innerHTML = lapSec < 10 ? "0" + lapSec : lapSec;
    if (lapSec === 60) {
      lapSec = 0;
      lapsecond.innerHTML = "00";
    }
  }, 1000);

  lapMilliInterval = setInterval(() => {
    ++lapMilliSec;
    lapmillisecond.innerHTML =
      lapMilliSec < 10 ? "0" + lapMilliSec : lapMilliSec;
    if (lapMilliSec === 100) {
      lapMilliSec = 0;
      lapmillisecond.innerHTML = "00";
    }
  }, 10);
}

function checkLap() {
  tr = document.getElementsByClassName("remove");

  x = Array.from(tr);
  console.log(x.length);
  if (x.length > 2) {
    x.forEach((element) => {
      attributeValue = Number(element.getAttribute("data-lapTime"));
      if (attributeValue === minLap) {
        console.log(element);
        element.classList.add("blue");
       
        element.children[0].style.color = "rgb(131, 79, 255)";
        element.children[1].style.color = "rgb(131, 79, 255)";
      } else if (attributeValue !== minLap) {
        element.classList.remove("blue");
        element.children[0].style.color = "";
        element.children[1].style.color = "";
      }
      if (attributeValue === maxLap) {
        element.classList.add("red");

        element.children[0].style.color = " rgb(255, 25, 113)";
        element.children[1].style.color = " rgb(255, 25, 113)";
      } else if (attributeValue !== maxLap) {
        element.classList.remove("red");
      }
    });
  }
}

var a = 1;

function lapFunc() {
  lapTime.style.visibility = "visible";
  lapminute.innerHTML = "00";
  lapmillisecond.innerHTML = "00";
  lapsecond.innerHTML = "00";

  lapContainer.style.visibility = "visible";
  tableBody = document.getElementsByTagName("tbody")[0];
  const tableRow = document.createElement("tr");
  tableRow.classList.add("remove");
  tableRow.setAttribute(
    "data-lapTime",
    `${lapMin * 60 * 1000 + lapSec * 1000 + lapMilliSec}`
  );
  const tableData1 = document.createElement("td");
  const tableData2 = document.createElement("td");
  const tableData3 = document.createElement("td");

  tableData1.innerHTML = a < 10 ? "0" + a++ : a++;
  tableData2.innerHTML = `${lapMin < 10 ? "0" + lapMin : lapMin}:${
    lapSec < 10 ? "0" + lapSec : lapSec
  }.${lapMilliSec < 10 ? "0" + lapMilliSec : lapMilliSec}`;

  totalElapsedMilliSec.push(lapMin * 60 * 1000 + lapSec * 1000 + lapMilliSec);

  totalElapsedMilliSec.sort(function (a, b) {
    return a - b;
  });
  minLap = totalElapsedMilliSec[0];
  maxLap = totalElapsedMilliSec[totalElapsedMilliSec.length - 1];

  console.log(minLap, maxLap);

  lapSec = 0;
  lapMilliSec = 0;
  lapMin = 0;

  tableData3.innerHTML = `${minCount < 10 ? "0" + minCount : minCount}:${
    secCount < 10 ? "0" + secCount : secCount
  }.${millisecCount < 10 ? "0" + millisecCount : millisecCount}`;

  tableRow.appendChild(tableData1);
  tableRow.appendChild(tableData2);
  tableRow.appendChild(tableData3);

  tableBody.prepend(tableRow);

  checkLap();
}

reset.addEventListener("click", resetFunc);
stop.addEventListener("click", stopFunc);
start.addEventListener("click", startFunc);

lap.addEventListener("click", lapFunc);
