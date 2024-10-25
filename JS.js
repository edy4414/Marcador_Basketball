//
const key = "ScoreBoard720";
let timerInterval;
let quarter = 1;
let minutes = 10;
let seconds = 0;
let team_1 = "TEAM A";
let team_2 = "TEAM B";
if (GetLocalStore(key) == null) {
    team_1 = prompt("Ingrese el nombre del equipo 1 ");
    if (team_1 != null) {
        team_2 = prompt("Ingrese el nombre del equipo 2 ");
    }else{
        team_1="TEAM A";
    }
}
else {
    team_1 = GetLocalStore(key)[0].name;
    team_2 = GetLocalStore(key)[1].name;
}


document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('stop-timer').addEventListener('click', stopTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);
document.getElementById('team-1').innerText = team_1
document.getElementById('team-2').innerText = team_2
document.getElementById('team-name-scorecard-1').innerText = team_1
document.getElementById('team-name-scorecard-2').innerText = team_2
document.getElementById('pause-button').addEventListener('click', pauseTimer);
document.getElementById('resume-button').addEventListener('click', resumeTimer);



function startTimer() {
  document.getElementById('timer-container').style.display = 'block';
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function pauseTimer() {
  clearInterval(timerInterval);
}
function resumeTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}


function resetTimer() {
  quarter = 1;
  minutes = 12;
  seconds = 0;
  document.getElementById('timer').innerHTML = '00:00';
  document.getElementById ('quarter').innerHTML = 'Cuarto 1';
  clearInterval(timerInterval);
}

function updateTimer() {
  seconds--;
  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }
  if (minutes < 0) {
    quarter++;
    minutes = 12;
    seconds = 0;
  }
  if (quarter > 4) {
    stopTimer();
  }
  document.getElementById('timer').innerHTML = `${padZero(minutes)}:${padZero(seconds)}`;
  document.getElementById('quarter').innerHTML = `Cuarto ${quarter}`;
}

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}

function add(num, id) {
    let number = Number(document.getElementById(id).innerText);
    if (number + num >= 0) {
        document.getElementById(id).innerText = number + num;
    };
    let date = new Date();
    let obj = {
        hh: date.getHours(),
        mm: date.getMinutes(),
		ss: date.getSeconds(),
        score: num
    }
    let ScoreBoard = [{
        name: team_1,
        score: Number(document.getElementById('score-1').innerText),
        data: GetLocalStore(key)[0].data
    }, {
        name: team_2,
        score: Number(document.getElementById('score-2').innerText),
        data: GetLocalStore(key)[1].data
    }];
    if (id == 'score-1') {
        let data1 = [];
        GetLocalStore(key)[0].data.forEach(e => {
            data1.push(e);
        })
        data1.push(obj);
        ScoreBoard[0].data = data1;
        SetLocalStore(key, ScoreBoard);
        ScoreCard(GetLocalStore(key)[0].data, 'scoreCard-1')
    } else if (id == 'score-2') {
        let data2 = []
        GetLocalStore(key)[1].data.forEach(e => {
            data2.push(e);
        })
        data2.push(obj);
        ScoreBoard[1].data = data2;
        SetLocalStore(key, ScoreBoard);
        ScoreCard(GetLocalStore(key)[1].data, 'scoreCard-2')
    }
}
//Store Data in LocalStore
let ScoreBoard = [{
    name: team_1,
    score: 0,
    data: []
}, {
    name: team_2,
    score: 0,
    data: []
}];
function SetLocalStore(key, value) {
    localStorage.removeItem(key);
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
    return key;
}
if (localStorage.getItem(key) == null) {
    SetLocalStore(key, ScoreBoard);
} else {
    document.getElementById('score-1').innerText = GetLocalStore(key)[0].score;
    document.getElementById('score-2').innerText = GetLocalStore(key)[1].score;
    ScoreCard(GetLocalStore(key)[0].data, 'scoreCard-1')
    ScoreCard(GetLocalStore(key)[1].data, 'scoreCard-2')
}
function GetLocalStore(key) {
    return JSON.parse(localStorage.getItem(key));
}
function removeData() {
    let Sure=confirm("Seguro que quieres un nuevo juego. ??");
    if(Sure){
        localStorage.removeItem(key);
        window.location.reload();
    }
}

function ScoreCard(array, id) {
    document.getElementById(id).innerHTML = null;
    array.forEach(element => {
        element.hh = element.hh % 12;
        if (element.hh == 0) {
            element.hh = 12;
        }
        document.getElementById(id).innerHTML += `<tr>
            <td>
            <center>
            ${element.score}
            </center>
            </td>
            <td>
            <center>
            ${element.hh}:${element.mm}:${element.ss}
            </center>
            </td>
            </tr>`;
    });
}
