const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;
/*7. 캔버스 위에 그릴 context설정하기*/ 

let painting = false;
/*기본적으로 painting은 false가 되고 
mouseDown으로 클릭 했을때만 true가 되게 설정*/

function stopPainting() {
    // 5. 좀 더 좋은 방법으로 코드를 작성하기 위해 만든 함수 
    painting = false; 
}

function startPainting(){
    painting = true;
    // 8. startPainting 함수 생성하고 mouseDown의 두번째 인자에 호출 
}


function onMouseMove(event) {
    //1. addEventListener의 인자에 넣은 후 함수 생성 
    const x = event.offsetX;
    const y = event.offsetY;
    //9. 시작점과 끝점사이에 선(path)를 만들기 위한 조건문 생성 
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
        /*painting이 아닐때 beginPath & moveTo x,y를 실행한다. 
        그러면 click하고 움직이면 (painting이 true)면 실행되지 않음 */
    } else {
        ctx.lineTo(x, y);
        //lineTo: 현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결
        /*연결하기 전에 먼저 path를 만들어야하고
        그 선을 보이게 하기 위해서는 stroke( )를 생성해야함  */
        ctx.stroke();
    }
    }
/*offset x&y는 canvas내애서의 좌표고 client x&y는 윈도우 전체의 좌표
canvas와 윈도우의 사이즈가 다르므로 offset과 client의 좌표도 다르다.
canvas안에서의 좌표만 필요한 것이기때문에 offsetX & Y를 가져옴*/

function onMouseDown(event) {
    painting = true; 
    //2. addEventListener의 인자에 넣은 후 함수 생성 
}

/*function onMouseUp(event) {
    //painting = false; 
    //3. addEventListener의 인자에 넣은 후 함수 생성 
    stopPainting();
    /*6. stopPainting 함수를 생성하여 여기서 굳이 painting = false를 
    할 필요 없이 stopPainting 함수를 호출하면됨 
      
}*/

/*function onMouseLeave(event) {
    4. addEventListener의 인자에 넣은 후 함수 생성 
    이렇게 하는 것은 스스로 반복하게 하기 위함임 
    painting = false;
    7.stopPainting 함수를 생성했기 때문에 굳이 작성할 필요없이 
    if 구문의 eventListener의 두번째 인자로 부르면됨 
}*/

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    //캔버스위에서 마우스가 움직일때 움직임을 감지하기위한 event 
    //canvas.addEventListener('mousedown', onMouseDown);
    //클릭하는 순간에만 인지하게 하기 위해 mousedown event를 추가
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    //마우스를 떼는 순간을 인지하게 하기위한 event 
    //canvas.addEventListener('mouseleave', onMouseLeave);
    //마우스가 캔버스에서 나가게 되면 painting이 false가 되도록하는 event
    canvas.addEventListener('mouseleave', stopPainting);
}