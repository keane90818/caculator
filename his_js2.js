let runningTotal = 0;
let buffer = "0";
let previousOperator;
let hold = "";
let preNum = "";
let bufferNum = "";
let historyAns = " ";
const screen = document.querySelector('.screen');
const historyContent1 = document.querySelector('.his_content1');
const historyboard1 = document.querySelector('.historyboard1');
function buttonClick(value){
    if(isNaN(value)){
        
        
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
    $('#his_content1').html(historyAns);

} 

function handleSymbol(symbol){
    switch(symbol){
        case 'C' :
            buffer = '0';
            runningTotal = 0;
            break;
        case '=' :
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            historyboard();
            bufferNum += "=" + runningTotal;
            historyAns += bufferNum + '<br>';
            bufferNum = "";
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '⇤':
            if(buffer.length ===1){
                buffer = '0';
            }
            else{
                buffer = buffer.slice(0, buffer.length-1);
            }
            break;
        case '.':
            if(!buffer.includes('.')){
                buffer+=".";
            }
            break;
        case '%':
            buffer/=100;
            break;
        case '+' :
        case '-' :
        case 'x' :
        case '÷' :
            handleMath(symbol);
            break;
    }
}

function historyboard(){
    bufferNum += hold;
    bufferNum += preNum;
    bufferNum += buffer;
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
        hold = buffer;
    }
    else{
        
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    preNum = previousOperator;
    
    buffer = '0';
}



function flushOperation(intBuffer){
   
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === 'x'){
        runningTotal *= intBuffer;
    }
    else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
    
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}


function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
    
}

init();


    







