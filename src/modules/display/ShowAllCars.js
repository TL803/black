const productsBlock = document.getElementById('products-block')
const productsArr = [
  {
    id: 1,
    icon: '',
    name: 'Lada Granta Sportline Лифтбек',
    description: 'Седан',
    lastPrice: '1 959 900 ₽',
    newPrice: '960 000 ₽'
  },
  {
    id: 2,
    icon: '',
    name: 'Kia Sportage',
    description: 'Кроссовер',
    lastPrice: '2 199 900 ₽',
    newPrice: '1 250 000 ₽'
  },
  {
    id: 3,
    icon: '',
    name: 'Toyota Camry',
    description: 'Седан',
    lastPrice: '2 350 000 ₽',
    newPrice: '1 450 000 ₽'
  },
  {
    id: 4,
    icon: '',
    name: 'Volkswagen Tiguan',
    description: 'Кроссовер',
    lastPrice: '2 499 900 ₽',
    newPrice: '1 350 000 ₽'
  },
  {
    id: 5,
    icon: '',
    name: 'Chery Tiggo 8 Pro Plug-in Hybrid',
    description: 'Кроссовер',
    lastPrice: '1 899 900 ₽',
    newPrice: '1 100 000 ₽'
  },
  {
    id: 6,
    icon: '',
    name: 'Mazda CX-5',
    description: 'Кроссовер',
    lastPrice: '2 299 900 ₽',
    newPrice: '1 300 000 ₽'
  },
];
function showAllCards() {
    productsArr.forEach(product => {
        const card = document.createElement('div')
        card.innerHTML = `
        <a href="./product.html">
            <div class="md:w-[534px] w-[153px] bg-[#32323666] md:h-[873px] h-[330px] rounded-[12px] md:rounded-[60px] shadow-[inset_0_0_0_2px_#4B4B4B]">
                <div class="w-full md:h-[366px] h-[133px] rounded-t-[12px] md:rounded-t-[60px] bg-dark"></div>
                <div class="md:w-[442px] w-[120px] m-auto">
                    <div>
                        <h2 class="md:text-[50px] text-[15px] font-medium md:mt-[40px] mt-[12px] leading-[20px] md:leading-[56px] h-[60px] md:h-[120px]">${product.name}</h2>
                        <div class="w-fit md:text-[24px] text-[10px] md:flex hidden font-medium p-[12px] bg-[#225045] border border-[#19BC8D] mt-[10px] rounded-[20px]">${product.description}</div>
                    </div>
                    <div class="text-end mt-[12px]">
                        <p class="md:text-[20px] text-[10px] line-through md:mr-[129px]">${product.lastPrice}</p>
                        <p class="md:text-[36px] text-[20px] font-medium">${product.newPrice}</p>
                    </div>
                    <button class="w-full bg-secondary md:py-[24px]  py-[8px] rounded-[32px] text-[14px] font-regular md:text-[32px] md:font-medium text-primary mt-[12px] md:mt-[30px]">Купить в кредит</button>
                </div>
            </div>
        </a>
        `
        productsBlock.appendChild(card)
    })
}

showAllCards()