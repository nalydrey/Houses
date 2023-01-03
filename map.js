const mapBox = document.querySelector('.map__box')
const zoomIn = document.querySelector('.in')
const zoomOut = document.querySelector('.out')
const percent = document.querySelector('.percent')

let a = houses.length;
let b = houses.filter((el)=>el.isBuy)
let c = b.length
let buy = Math.round(c*100/a);
console.log(buy);

percent.innerHTML = buy+'%'



mapBox.style.fontSize = calcFluidFontSize(10, 19, 517, 1170) + 'px' 




class House{
    constructor(house){       
        this.house = house
        this.createLabel()
        this.hendler()
        this.solve = true
        
    }

    createLabel(){
        let map = document.querySelector('.map__box')
        let span = document.createElement('span')
        this.label = document.createElement('div')
        this.label.classList.add('label')
        this.label.innerHTML = '<svg viewBox="0 0 49 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.99902C0 0.894455 0.895431 -0.000976563 2 -0.000976563L46.8494 -0.000976563C48.3152 -0.000976563 49.2831 1.52365 48.6593 2.8501L43.8169 13.1479C43.5634 13.687 43.5634 14.311 43.8169 14.8501L48.6593 25.1479C49.2831 26.4744 48.3152 27.999 46.8494 27.999L2 27.999C0.895432 27.999 0 27.1036 0 25.999L0 1.99902Z" fill="#06B436"/></svg>';
        span.innerHTML = this.house.number
        this.label.append(span)
        map.append(this.label)
        this.label.style.left = this.house.posY + '%'
        this.label.style.top = this.house.posX + '%'
        if(this.house.isBuy){
            let path = this.label.querySelector('path')
            path.classList.add('isBuy')
        }
    }

    hendler(){
        this.label.addEventListener('click', (e)=>{ 
            console.log('!');                
            if(this.solve) {
                this.solve = false
                let div = document.createElement('div');
                div.classList.add('card__discr')           
                this.label.append(div)
                let path = this.label.querySelector('path')

                let pathColor = getComputedStyle(path, false).fill;
                console.log(pathColor);

                div.innerHTML =
                 `
                 <div class="tooltip">
                    <div class='sign' style="background: ${pathColor}; color: white">${this.house.number}</div>
                    <ul>
                        <li><p style="color: ${pathColor}">Котедж №${this.house.number}</p></li>
                        <li>
                            <p>Цена</p>
                            <p>${this.house.price}</p>
                        </li>
                        <li>
                            <p>Площадь</p>
                            <p>${this.house.square}</p>
                        </li>
                        <li>
                            <p>Площаль с участком</p>
                            <p>${this.house.totalSquare}</p>
                        </li>
                    </ul>
                 </div>`                
                

                 let divBottom = div.getBoundingClientRect();
                 let mapBottom = mapBox.getBoundingClientRect();

                 console.log(divBottom);
                 console.log(mapBottom);

                 if (divBottom.bottom-mapBottom.bottom > 0){

                    div.style.top = (0 - divBottom.height) + 'px'
                    divBottom = div.getBoundingClientRect();
                    mapBottom = mapBox.getBoundingClientRect();
                    // console.log(divBottom);
                    // console.log(mapBottom);
                 }

                 if (divBottom.top - mapBottom.top < 0){
                    console.log(111);
                    div.style.top = (0 - divBottom.height - divBottom.top + 20 ) + 'px'
                    div.style.left = 30 + 'px'
                    divBottom = div.getBoundingClientRect();
                    mapBottom = mapBox.getBoundingClientRect();
                    console.log(divBottom);
                    console.log(mapBottom);
                 }

                 if(divBottom.right - mapBottom.right > 0){
                    console.log(222);
                    div.style.left = - divBottom.height + 'px'
                 }

                 
                 div.style.transform = 'scale(0)'
                //  div.style.transform = 'scale(1)'
                 setTimeout(()=>{
                div.style.transition = 'transform 1s'
                 div.style.transform = 'scale(1)'
                     div.classList.add('scale')
                 },0)


                 
                 this.label.addEventListener('mouseout', (e)=>{
                     if(e.target.closest('.label')){                        
                        div.classList.remove('scale')
                 div.style.transform = 'scale(0)'

                        setTimeout(()=>{
                            this.solve = true
                            div.remove()  
                            },1000)
                    }                
                })
            }           
        })
    }

}


houses.forEach((el)=>{ 
    new House(el)
})


window.addEventListener('resize', ()=>{    
    mapBox.style.fontSize = calcFluidFontSize(10, 19, 517, 1170) + 'px'    
})

    
function calcFluidFontSize(fmin, fmax, vmin, vmax) {
    k = (fmax - fmin)/(vmax - vmin);
    b = fmin - k * vmin;  
    curent = parseInt(getComputedStyle(mapBox, false).width)       
    return  k * curent + b;
}

function createDiscr(house){
    
    let div = document.createElement('div');
    div.classList.add('card__discr')
    console.log(this);
    this.append(div)
}

zoomIn.addEventListener('mousedown', ()=>{
    let timer = setInterval(()=>{
        mapBox.style.fontSize = calcFluidFontSize(10, 19, 517, 1170) + 'px'         
        let currentWidth = parseInt(getComputedStyle(mapBox, false).width) 
        mapBox.style.width = (currentWidth + 5) + 'px'
    },50)
    zoomIn.addEventListener('mouseup',()=>{
        clearInterval(timer)
    })
  
})
zoomOut.addEventListener('mousedown', ()=>{
    let timer = setInterval(()=>{
        mapBox.style.fontSize = calcFluidFontSize(10, 19, 517, 1170) + 'px'   
        let currentWidth = parseInt(getComputedStyle(mapBox, false).width)    
            mapBox.style.width = (currentWidth - 5) + 'px'
       
    },50)
    zoomOut.addEventListener('mouseup',()=>{
        clearInterval(timer)
    })
  
})


