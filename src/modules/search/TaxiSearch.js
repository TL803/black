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
  {
    id: 7,
    icon: '',
    name: 'Hyundai Creta',
    description: 'Кроссовер',
    lastPrice: '2 049 900 ₽',
    newPrice: '1 150 000 ₽'
  },
  {
    id: 8,
    icon: '',
    name: 'Nissan X-Trail',
    description: 'Кроссовер',
    lastPrice: '2 399 900 ₽',
    newPrice: '1 400 000 ₽'
  },
  {
    id: 9,
    icon: '',
    name: 'Skoda Octavia',
    description: 'Седан',
    lastPrice: '2 150 000 ₽',
    newPrice: '1 280 000 ₽'
  },
  {
    id: 10,
    icon: '',
    name: 'Renault Duster',
    description: 'Кроссовер',
    lastPrice: '1 799 900 ₽',
    newPrice: '980 000 ₽'
  },
  {
    id: 11,
    icon: '',
    name: 'Great Wall Haval F7',
    description: 'Кроссовер',
    lastPrice: '2 100 000 ₽',
    newPrice: '1 320 000 ₽'
  },
  {
    id: 12,
    icon: '',
    name: 'Ford Kuga',
    description: 'Кроссовер',
    lastPrice: '2 250 000 ₽',
    newPrice: '1 370 000 ₽'
  },
  {
    id: 13,
    icon: '',
    name: 'UAZ Patriot',
    description: 'Внедорожник',
    lastPrice: '1 649 900 ₽',
    newPrice: '1 450 000 ₽'
  },
  {
    id: 14,
    icon: '',
    name: 'Genesis G70',
    description: 'Седан',
    lastPrice: '3 400 000 ₽',
    newPrice: '2 800 000 ₽'
  },
  {
    id: 15,
    icon: '',
    name: 'Lexus RX 350',
    description: 'Кроссовер',
    lastPrice: '4 200 000 ₽',
    newPrice: '3 600 000 ₽'
  },
  {
    id: 16,
    icon: '',
    name: 'BMW X3',
    description: 'Кроссовер',
    lastPrice: '3 800 000 ₽',
    newPrice: '3 100 000 ₽'
  },
  {
    id: 17,
    icon: '',
    name: 'Audi Q5',
    description: 'Кроссовер',
    lastPrice: '3 750 000 ₽',
    newPrice: '3 050 000 ₽'
  },
  {
    id: 18,
    icon: '',
    name: 'Mercedes-Benz GLC',
    description: 'Кроссовер',
    lastPrice: '4 100 000 ₽',
    newPrice: '3 400 000 ₽'
  },
  {
    id: 19,
    icon: '',
    name: 'Honda CR-V',
    description: 'Кроссовер',
    lastPrice: '2 550 000 ₽',
    newPrice: '1 950 000 ₽'
  },
  {
    id: 20,
    icon: '',
    name: 'Subaru Forester',
    description: 'Кроссовер',
    lastPrice: '2 700 000 ₽',
    newPrice: '2 100 000 ₽'
  },
  {
    id: 21,
    icon: '',
    name: 'Volvo XC60',
    description: 'Кроссовер',
    lastPrice: '4 300 000 ₽',
    newPrice: '3 700 000 ₽'
  },
  {
    id: 22,
    icon: '',
    name: 'Infiniti QX50',
    description: 'Кроссовер',
    lastPrice: '3 200 000 ₽',
    newPrice: '2 600 000 ₽'
  },
  {
    id: 23,
    icon: '',
    name: 'Porsche Macan',
    description: 'Кроссовер',
    lastPrice: '5 800 000 ₽',
    newPrice: '5 100 000 ₽'
  },
  {
    id: 24,
    icon: '',
    name: 'Jeep Grand Cherokee',
    description: 'Внедорожник',
    lastPrice: '5 200 000 ₽',
    newPrice: '4 500 000 ₽'
  },
  {
    id: 25,
    icon: '',
    name: 'Tesla Model 3',
    description: 'Седан',
    lastPrice: '4 000 000 ₽',
    newPrice: '3 400 000 ₽'
  },
  {
    id: 26,
    icon: '',
    name: 'BYD Tang',
    description: 'Кроссовер',
    lastPrice: '3 900 000 ₽',
    newPrice: '3 300 000 ₽'
  },
  {
    id: 27,
    icon: '',
    name: 'Toyota RAV4',
    description: 'Кроссовер',
    lastPrice: '2 900 000 ₽',
    newPrice: '2 200 000 ₽'
  },
  {
    id: 28,
    icon: '',
    name: 'Kia Seltos',
    description: 'Кроссовер',
    lastPrice: '2 100 000 ₽',
    newPrice: '1 480 000 ₽'
  },
  {
    id: 29,
    icon: '',
    name: 'Lada Niva Travel',
    description: 'Внедорожник',
    lastPrice: '1 599 900 ₽',
    newPrice: '1 420 000 ₽'
  },
  {
    id: 30,
    icon: '',
    name: 'Genesis GV70',
    description: 'Кроссовер',
    lastPrice: '4 600 000 ₽',
    newPrice: '3 900 000 ₽'
  }
];
function showAllCards() {
    productsArr.forEach(product => {
        const card = document.createElement('div')
        card.innerHTML = `
        <a href="./taxiCard.html">
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