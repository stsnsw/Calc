 

let tempExpString = "";
let tmpExString = "";
let lastChar = "";
let memory = "0";
let lastPlace = 0;
let calcString = "";
  let prec = 0;
  // let calcOut = "";
  const teField = document.getElementById('tempExpression');
  const exField = document.getElementById('expression');
  const numClick = document.getElementsByClassName('num');
  const signClick = document.getElementsByClassName('sign');
  const delClick = document.getElementById('del');
  const clearClick = document.getElementById('clear');
  const finalClick = document.getElementById('=');
  const pointClick = document.getElementById('.');
  const mcClick = document.getElementById('eraseM');
  const mpClick = document.getElementById('plusM');
  const mmClick = document.getElementById('minusM');
  const teFildSize = document.getElementById('tempExpression');
  const exFildSize = document.getElementById('expression');
  const pLed = document.getElementById('led');
  let radios = document.querySelectorAll('input[type="radio"]');

  // let enterField = teField;  // текущее поле ввода
  let fSign = false; // флаг наличия знака операции в выражении
  let fPoint = false; // наличие точки
  let fMem = false; // двойное нажатие
  // let fZero = false; // первый ноль уже есть

// числовой набор - первые ноли - ? нах
for (i=0; i< numClick.length; i++)
    numClick[i].onclick = function() {  // первый символ не ноль
	if ((this.innerHTML != "0") | ((this.innerHTML == "0") & ((lastChar == ".") || ((lastChar >= 0) && (lastChar <= 9))) & (lastChar != ""))) {
    lastChar = this.innerHTML;
    tempExpString = tempExpString + lastChar;
    teField.textContent  = tempExpString;
    fMem = false;
    chkSize();
    calcFunc();
	}
  }
// десятичная точка
  pointClick.addEventListener('click', function() {
    if (!fPoint) {
      lastChar = this.innerHTML;
      tempExpString = tempExpString + lastChar;
      teField.textContent  = tempExpString;
      fPoint = true;
      fMem = false;
      chkSize();
    }   
  })

// вставка знака операции
  for (i=0; i< signClick.length; i++)
    signClick[i].onclick = function() {
  // действие только после цифры
      signChar = this.innerHTML;
      if (((lastChar >=0) && (lastChar <=9)) | (((lastChar == "×") | (lastChar == "÷")) & (signChar == "-"))) { // 
      lastChar = this.innerHTML;
      tempExpString = tempExpString + lastChar;
      teField.textContent  = tempExpString;
      fSign = true;
      fPoint = false;
      fMem = false;
      chkSize();      
        }
      };

// удаление символа справа
  delClick.addEventListener('click', function() {
     tempExpString = tempExpString.substring(0, tempExpString.length-1);
     if (tempExpString.length=1) {

     }
     lastChar = tempExpString.substring(tempExpString.length-1, tempExpString.length);
     teField.textContent  = tempExpString;
 
     if (!(tempExpString.includes("-") || 
           tempExpString.includes("+") || 
           tempExpString.includes("×") || 
           tempExpString.includes("÷"))) {
            fSign = false;
     }
     fMem = false;
     chkSize();
     calcFunc();
    });

// полная очистка
clearClick.addEventListener('click', function() {
  tempExpString = "";
  lastChar = "";
  teField.textContent  = "";
  exField.textContent  = "";
  exFildSize.style.fontSize = 50 + 'pt';
  teFildSize.style.fontSize = 50 + 'pt';
  fSign = false;
  fMem = false;
  chkSize();
});

// равно 
finalClick.addEventListener('click', function() {
      // tempExpString = "";
      teField.textContent  = exField.textContent;
      tempExpString   = exField.textContent;
      lastChar = tempExpString.substring(tempExpString.length-1, tempExpString.length);
      // exField.textContent  = "";
      // exFildSize.style.fontSize = 50 + 'pt';
      fSign = false;
      fMem = false;
      chkSize();
});

// вывод из памяти и очистка
        
mcClick.addEventListener('click', function() {
  if (fMem) { // второй клик - стираем
    memory = "";
    fMem = false;
    pLed.style.visibility = "hidden";
  } else {    // первый клик - вывод
    fMem = true;
    tempExpString =  "" + memory;
    teField.textContent =  "" + memory;
  }
  chkSize();
})  

// сложение с памятью
mpClick.addEventListener('click', function() {

  if (exField.textContent.length > 0) {
  memory = memory + "+" + exField.textContent;
  if (prec =="99") {
    memory = eval(memory);
  } else {
    memory = eval(memory).toFixed(prec);
  }
  pLed.style.visibility = "visible";
}
})  

//    вычитание из памяти  
mmClick.addEventListener('click', function() {
  if (exField.textContent.length > 0) {
    memory = memory + "-" + exField.textContent;
    if (prec =="99") {
      memory = eval(memory);
    } else {
      memory = eval(memory).toFixed(prec);
    }
    pLed.style.visibility = "visible";
  }  
} )       

function chkSize() {
  
  if ((tempExpString.length>0) && (440/tempExpString.length) > 50) {
    teFildSize.style.fontSize = 50 + 'pt';
  } else {
    teFildSize.style.fontSize = 440/tempExpString.length + 'pt';
  }
}


function calcFunc() {

  if (fSign) {

    if ((lastChar=="-") || 
        (lastChar=="+") || 
        (lastChar=="×") || 
        (lastChar=="÷")) {

      outExpString = tempExpString.substring(0, tempExpString.length-1);
          // если в выражении знак операций только в конце
        if (!(outExpString.includes("-") || 
          outExpString.includes("+") || 
          outExpString.includes("×") || 
          outExpString.includes("÷"))) {
          // fSign = false;
          exField.textContent  = "";
          exFildSize.style.fontSize = 50 + 'pt';
          return;
        }
      } else {
        outExpString = tempExpString;
        }
          // есть ещё операции в выражении

      outExpString = outExpString.replace(/×/g, "*");
      outExpString = outExpString.replace(/÷/g, "/");

      for (let radio of radios) {
        if (radio.checked) {
          prec = radio.value;
        }
      }
      if (prec =="99") {
        tmpExString = " " +  myEval(outExpString);
      } else {
        tmpExString = " " + myEval(outExpString).toFixed(prec); 
      }
    
      if ((tmpExString.length>0) && (440/tmpExString.length) > 50) {
        exFildSize.style.fontSize = 50 + 'pt';
      } else {
        exFildSize.style.fontSize = 440/tmpExString.length + 'pt';
      }
      exField.textContent = tmpExString;
  }    
}

function myEval(calcStr) {
  let rez = 0;
  rezStr = "";
  signPl = 0;
  while ( calcStr.length > rezStr.length ) {
  
  lastPl = 0;
  signPl = findSign(calcStr, lastPl); // место первого знака
  Num1 = Number(calcStr.substring(lastPl, signPl)); // первое число
  signCheck = calcStr.substring(signPl, signPl + 1); // первый знак
  lastPl = signPl + 1;
  signPl = findSign(calcStr, lastPl); //место следущего знака
  if (signPl == 99999) {signPl = calcStr.length}
  Num2 = Number(calcStr.substring(lastPl, signPl)); // второе число

  if (signCheck == "-") {rez = Num1 - Num2};
  if (signCheck == "+") {rez = Num1 + Num2};
  if (signCheck == "*") {rez = Num1 * Num2};
  if (signCheck == "/") {rez = Num1 / Num2};
  rezStr = String(rez);
  calcStr = rezStr + calcStr.substring(signPl, calcStr.length);
}
return (Number(rez));
}

function findSign(calcString, lastPlace) {  // ищем знак действия
  signPlace = 99999;
  Check = calcString.indexOf("-", lastPlace);
  if ((Check != -1) && (signPlace > Check)) {signPlace = Check}
  Check = calcString.indexOf("+", lastPlace);
  if ((Check != -1) && (signPlace > Check)) {signPlace = Check}
  Check = calcString.indexOf("*", lastPlace);
  if ((Check != -1) && (signPlace > Check)) {signPlace = Check}
  Check = calcString.indexOf("/", lastPlace);
  if ((Check != -1) && (signPlace > Check)) {signPlace = Check}
  return signPlace;
  
}