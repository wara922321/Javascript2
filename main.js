
'use strict'
{
  const num_bth = document.querySelectorAll('.num_bth');
  let output_sub = document.getElementById('output_sub');
  const output_total = document.getElementById('output_total');

  let total = 0;
  let state = 'start';
  let mode = 'integer_mode'; 

  const one_nine = document.querySelectorAll('.one_nine');
  one_nine.forEach(index => {
    index.addEventListener('click', () => {
      if(state === 'start') {
        total = index.dataset.indexId;
      }else if(state === 'finish') {
        reset();
        total = index.dataset.indexId;  
      }else if(state === 'calculation'||state === 'calBtn'){
        total += index.dataset.indexId;
      }
        output_sub.textContent = total;
        state = 'calculation'
        changeOutput()
      })
    })

  const zero = document.getElementById('zero');
  zero.addEventListener('click', () => {

  if(state==='start'||state==='finish'||state==='calBtn'){
      if(output_sub.textContent.slice(-1) === '0') {
        console.log('前の文字はゼロ');
        return;
      }
    }

    if(state==='start') {
      total = zero.dataset.indexId;  
    }else{
      total += zero.dataset.indexId;
    }      
    output_sub.textContent = total;
    changeOutput()
  })

  const point = document.getElementById('point');
  point.addEventListener('click', () => {
    console.log(point.dataset.indexId)
    if(mode === 'decimal_mode'){
      return;
       }
    if(state==='start'||state==='finish') {
      total = 0;
    }else if(state==='calBtn'){
      if(output_sub.textContent.slice(-1)!=='0'){
        total += 0;
      }
    }
    total += point.dataset.indexId;

    output_sub.textContent = total;
    state = 'calculation';
    mode = 'decimal_mode';
    changeOutput()
  })

  const cal = document.querySelectorAll('.cal');
  cal.forEach(index => {
    index.addEventListener('click', () => {
      if(state === 'start') {
        return;
      }else if(state === 'calculation'){
        total += index.dataset.indexId;
      }else if(state === 'finish'){
        total = output_total.textContent;
        total += index.dataset.indexId;
        output_total.textContent = 0
      }else if(state ==='calBtn') {
        total = total.slice(0, -1)
        total += index.dataset.indexId;
      }

      output_sub.textContent = total;
      state = 'calBtn';
      mode ='integer_mode';
      changeOutput();
    });
  });

  const equal_btn = document.getElementById('equal_btn');
  equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = digitNum(eval(total));
    state = 'finish';
    mode ='integer_mode';
    changeOutput();
  });

  const clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    reset();
  });

  function reset() {
    total = 0; 
    output_sub.textContent = 0;
    output_total.textContent = 0;
    mode ='integer_mode'
    state ='start';
    changeOutput()
  }

  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }

  function changeOutput(){
    if(state==='finish'){
      output_total.classList.add('active');
      output_sub.classList.remove('active');   
    }else{
      output_sub.classList.add('active');
      output_total.classList.remove('active'); 
    } 
  }
}