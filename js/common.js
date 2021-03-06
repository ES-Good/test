let outputSumPay = document.querySelector('.footer__box-sentence__output__value');
let inputControl = document.querySelector('#control');
let outputSum = document.querySelector('.footer__sum');
let radioButton = document.querySelectorAll('.radio');
let btnWindowForm = document.querySelector('#btn-form');
let col_4 = document.querySelector('.col-4');
let form = document.querySelector('.form');
let mobileForm = document.querySelector('.mobile-form');
let closeForm = document.querySelector('.close-form');
let warning = document.querySelector('.warning-title');




function calc() {
    function calcStartPage() {
    outputSumPay.innerText = prettify(getPayment(+inputControl.value, checkedRadio(), 6.5));
    outputSum.value = prettify(inputControl.value);
  }

  calcStartPage();

  inputControl.oninput = function () {
    warning.innerText = 'Процент одобрения кредита: 95%';
    outputSum.value = prettify(inputControl.value);
    outputSumPay.innerText = prettify(getPayment(+inputControl.value,checkedRadio(), 6.5));
  }

  function checkedRadio() {
    let years;
    for (var i = 0; i < radioButton.length; i++) {
      if (radioButton[i].checked) {
        years = +radioButton[i].value;
      }
    }
    return +years;
  }

  for (var i = 0; i < radioButton.length; i++) {
    radioButton[i].onchange = function (){
      outputSumPay.innerText = prettify(getPayment(+inputControl.value,checkedRadio(), 6.5));
    }
  }

  outputSum.onchange = function () {
    if (+outputSum.value < 100000) {
      warning.innerText = 'Процент одобрения кредита: 10%';
      outputSumPay.innerText = prettify(getPayment(+outputSum.value,checkedRadio(), 6.5));
      outputSum.value = prettify(outputSum.value);
    }else if (+outputSum.value >= 100000) {
      warning.innerText = 'Процент одобрения кредита: 95%';
      inputControl.value = outputSum.value;
      outputSumPay.innerText = prettify(getPayment(+outputSum.value,checkedRadio(), 6.5));
      outputSum.value = prettify(outputSum.value);
    }
  }
}

calc();

function getPayment(sum, period, rate) {
// *
// * sum - сумма кредита
// * period - срок в годах
// * rate - годовая ставка в процентах
// * 
    var i,
        koef,
        result;

    // ставка в месяц
    i = (rate / 12) / 100;

    // коэффициент аннуитета
    koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

    // итог
    result = sum * koef;

    return result.toFixed();
};

if (window.innerWidth >= 1406 ){
  btnWindowForm.onclick = function () {
    form.classList.toggle('show-form');
    col_4.classList.toggle('hide-col-4');
  }
}else if (window.innerWidth < 1406) {
  btnWindowForm.onclick = function(){
    closeForm.classList.toggle('show-close-form');
    mobileForm.classList.toggle('show-form');
  }
}

document.onclick = function (event) {
  if (event.target.classList.contains('close-form')) {
    closeForm.classList.remove('show-close-form');
    mobileForm.classList.remove('show-form');
  }
}

function prettify(num) {
  var n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}
