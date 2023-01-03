const elements = [
    {        
        icon: './icons/grid1.png',
        text: 'Ипотека от 6%'
    },
    {        
        icon: './icons/grid2.png',
        text: 'Первый взнос: 10%'
    },
    {        
        icon: './icons/grid3.png',
        text: 'Навес для 2-х машин'
    },
    {        
        icon: './icons/grid4.png',
        text: 'Московская прописка'
    },
    {        
        icon: './icons/grid5.png',
        text: 'Все коммуникации: Вода, Канализация, Электричество'
    },
    {        
        icon: './icons/grid6.png',
        text: 'Стены отделаны облицовочным кирпичом'
    },
    {        
        icon: './icons/grid7.png',
        text: 'Дом стоит на УШП (утеплённой шведской плите)'
    },
    {        
        icon: './icons/grid8.png',
        text: 'Тёплые полы во всём доме'
    },
    {        
        icon: './icons/grid9.png',
        text: 'Энерго-эффективное панорамное остекление'
    },
    {        
        icon: './icons/grid10.png',
        text: 'Встроенные напольные конвектора перед панорамным остеклением'
    },
    {        
        icon: './icons/grid11.png',
        text: 'Отопление, электрика и сантехника сделана по всему дому'
    },
    {        
        icon: './icons/grid12.png',
        text: 'Эксклюзивный лицевой кирпич ручной формовки в 3D-кладке'
    },
    {        
        icon: './icons/grid13.png',
        text: 'Стены вашего дома сделаны из экологического керамического блока'
    }   
]

let items = document.querySelector('.grid__items')

function CreateGridItem(number, {icon, text}){

    let li = document.createElement('li')
    li.classList.add('grid__item')
    let span = document.createElement('span')    
    number<10 ? (span.innerHTML = '0' + number) : (span.innerHTML= number)
    let img = new Image(80);
    img.src=icon;
    img.classList.add('grid__img')
    let p= document.createElement('p')
    p.innerHTML = text;
    li.append(span)
    li.append(img)
    li.append(p)
    items.append(li)
}

elements.forEach((el, i)=>{
    CreateGridItem(i+1, el)
})

$(function(){
    $('.slider').slick();
  });