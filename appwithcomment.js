const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
/*canvas의 중요한 점 중 하나는 context를 갖는다는 것임
context는 canvas안에서 픽섹들을 컨트롤 해줌*/ 
const colors = document.getElementsByClassName('jsColor');
//11. stroke의 색상을 바꿔주기위해 컬러들을 가져옴
const range = document.getElementById('jsRange');
//14. brush의 사이즈를 바꾸기 위해 range를 가져옴
const mode = document.getElementById('jsMode');
//17. fill 버튼을 js로 수정하기 위해 가져옴 
const INITIAL_COLOR = '#2c2c2c';
/*24. Variable을 생성하기 시작하는 시점은 무언가 반복하게 되면!
여기서 사용하던 것을 또 다른 곳에 똑같이 사용해야되는 시점에 
variable을 생성해서 간편하게 만들어줌 */
const CANVAS_SIZE = 700; 
//27. 또 반복되는 것을 막기위해 variable 생성 
const saveBtn = document.getElementById('jsSave');
//32. save버튼으로 이미지를 저장할수있게 하기 위해 버튼을 가져옴 

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
/*10. canvas는 사이즈가 2개 필요함
하나는 우리가 설정한 css 사이즈고 나머지 하나는 pixel를 조정할 수 있는
pixel manipulating size여서 Js에서 다시한번 주는 것 */ 

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
/*29. 그림을 저장했을때 canvas의 배경이 투명색이 아닌 기본색이 설정되어있는 것으로 만들기 위해 설정*/
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
//23. fillStyle의 기본 값 설정해주기 - 위에서 생성한 default 값 입력 
ctx.lineWidth = 2.5;
/*7. 캔버스 위에 그릴 context설정하기*/ 
/*ctx.fillStyle = 'green';
ctx.fillRect(50, 20, 100, 40);

캔버스틑 채우기위해 사용하는 것은  fillRect - (x, y, 가로, 세로)
fill 컬러는 fillStyle이고 fillStyle을 먼저 설정해야 색이 적용됨
canvas에서는 모든것이 위에서 아래로 순차 실행되기 떄문*/

let painting = false;
/*기본적으로 painting은 false가 되고 
mouseDown으로 클릭 했을때만 true가 되게 설정*/

let filling = false;
/*20. handleModeClick 함수생성을 위해 filling이라는 변수(variable)을 만들어서 default 값을 false로 줌. 만든 이유는 filling을 하고 있으면 그걸 나에게 말해줄 variable이 필요함. filling mode면 브러쉬로 그려지는 것이 아니라 canvas를 클릭했을때 canvas 전체에 색이 채워지게 하고싶기 때문에 filling mode인지 아닌지 알 수 있는게 필요한 것임*/

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

/*function onMouseDown(event) {
    painting = true; 
    2. addEventListener의 인자에 넣은 후 함수 생성 
}*/

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

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    //background color만 뽑아주는 color를 생성 
    ctx.strokeStyle = color; 
    //위에서 검은색으로 지정했던 strokeStyle을 가져와서 color로 지정해주면 변경할 수 있음
    ctx.fillStyle = color;
    //22. fillStyle이 strokeStyle과 같도록 지정
}
//13. event를 생성하고 컬러를 핸들링하는 함수를 만들어줌 

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
//16. 아래에서 만든 if절의 함수생성 
/*console.log(event)로 필요한 target이 무엇인지 찾아서 확인해보고 함수를 만드는 것이 좋음 */

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = 'Fill'
    } else {
        filling = true;
        mode.innerText = 'Paint'
    }
}
//19. 아래에서 만든 if절의 함수 생성
/*21. 위에서 생성한 variable을 가지고 와서 filling이 true면 filling을 false로 바꾸고 안의 text를 fill로 바꾸고 그게 아니면 paint로 하는 함수 생성*/

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }     
}
/*26. 아래에서 만든 event의 두번째인자로 들어간 함수 생성
rectangle을 만드는 함수, canvas 크기만한 rect를 만드는것 
참고로 CANVAS_SIZE는 canvas.width & canvas.height로 변경해도 됨
28. 그러나 채우는것 뿐만아니라 그리는것도 같이 하기 위해 
if 구문으로 filling일때만 실행하게 만들어줌 */

function handleCM(event){
    event.preventDefault()
}
/*31. 밑에서 만든 event의 함수 생성해서 그 이벤트가 실행되지 않는 
preventDefault로 만들어줌, 우클릭을 없앤 이유는 우리가 만든 save버튼을 이용하게 하기 위해서 */

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[EXPORT]🎨';
    link.click();
}
/*34. 이미지로 저장하기 위해서 우선 canvas의 데이터를 image처럼 얻는다.
위에서 const image로 만든것 
35. 그리고 없는 link를 만들어주고 클릭을 만들어주면됨. 
참고로 다운로드 받기 위해서는 HREF에 image(URL)을 넣어주고 
그 다음 Download에 이름을 만들어줘야함 */

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
    canvas.addEventListener('click', handleCanvasClick);
    //25. 클릭했을때 event가 발생하는 event 생성
    canvas.addEventListener('contextmenu', handleCM);
    //30. 우클릭으로 메뉴가 안나오게 하기위한 event 생성 (우클릭방지)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
//12. colors를 array로 가져와서 클릭을 하면 각각 가져와지는 event를 생성 
//위의 color는 굳이 color가 아니어도됨 potato가 될수도 있고 자기가 원하는 이름으로 지정가능

if(range){
    range.addEventListener('input', handleRangeChange)
}
//15. brush 크기를 변경하기위해 event를 추가하고 이후에 함수생성 

if(mode) {
    mode.addEventListener('click', handleModeClick);
}
//18. 가져온 mode를 클릭했을때 painting으로 바꾸기 위해 if구문으로 event 추가 

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}
//33. 가져온 saveBtn을 클릭했을때 save할 수 있게 하기 위한 event 생성 