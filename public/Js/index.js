const mainMenu = document.querySelector('.main_Menu');
const closeMenu = document.querySelector('.close_Menu');
const openMenu = document.querySelector('.open_Menu');
let checkboxes = document.getElementsByName('check')
const btnFetch = document.getElementById('countData');
let postVal = document.getElementById('postVal');
let getData = [];
openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);
function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '100%';
}
const buttonSwitch = document.getElementById('thm-switch');
buttonSwitch.addEventListener('click', function(){
    document.body.classList.toggle('dark-theme')
});
function onlyOne(checkbox) {
    checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
    })
}
let checkedI = document.querySelectorAll('input[type="checkbox"]:checked');
checkedI = false;
btnFetch.addEventListener('click', fetchFunc);
function fetchFunc(){
if(document.querySelectorAll('input[type="checkbox":checked]' == true)){
    let checkedI = document.querySelectorAll('input[type="checkbox"]:checked');
for(let checkbox of checkedI ){
   let arrData = checkbox.value;
   getData.push(arrData)
   console.log(arrData)
}
}
else{
    alert('not selected anything')
}
}