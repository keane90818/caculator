let runningTotal = 0;
let buffer = "0";
let previousOperator;
let hold = "";
let pre = "";
let abc = "";
let historyAns = " ";
const screen = document.querySelector('.screen');
const historyContent1 = document.querySelector('.his_content1');
function buttonClick(value){
    if(isNaN(value)){
        
        
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
    //let hisAns = ["333333333 <br>", "4444444 <br>"];
    let hisAns = '<br> 4444444<br>';
    // historyContent1.innerText =historyAns;
    $('#his_content1').html(historyAns);

    //let origin = [-3, -4 ,4 ,2,6]
    //$('#his_content1').html(origin.sort());

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
            abc += "=" + runningTotal;
            historyAns += abc + '<br>';
            abc = "";
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
    abc += hold;
    abc += pre;
    abc += buffer;
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
    pre = previousOperator;
    
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

document.querySelector('.calc-history').addEventListener('click',function(){
    document.querySelector('.history_page').style  = "z-index:1;animation-name:oxxo; animation-duration:2s; ";
})
document.querySelector('.close_his').addEventListener('click',function(){
    document.querySelector('.history_page').style  = "z-index:-1";
})

    







