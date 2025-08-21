  document.addEventListener("click", async function (e) {
    const printButton = e.target.closest("img[src*='print.svg']");
    if (!printButton) return;

    e.preventDefault();

    const { jsPDF } = window.jspdf;

    const h1 = document.querySelector("h1");
    const carName = h1 ? h1.textContent.trim() : "Kaiyi X3 Pro";

    const carTypeEl = document.querySelector("p.inline-block.rounded-\\[32px\\]");
    const carType = carTypeEl ? carTypeEl.textContent.trim() : "Внедорожник";

    const priceEl = document.querySelector(".text-\\[96px\\]");
    const price = priceEl ? priceEl.textContent.trim() : "960 000 ₽";

    // Характеристики
    const speedEl = document.querySelector("p:has(> .w-\\[60px\\] svg[src*='1.svg']) > p:nth-of-type(1)");
    const speed = speedEl ? speedEl.textContent.trim() : "210 км/ч";

    const accelEl = document.querySelector("p:has(> .w-\\[60px\\] svg[src*='--------------']) > p:nth-of-type(1)");
    const accel = accelEl ? accelEl.textContent.trim() : "7.9 сек.";

    const powerEl = document.querySelector("p:has(> .w-\\[60px\\] svg[src*='------------------']) > p:nth-of-type(1)");
    const power = powerEl ? powerEl.textContent.trim() : "249 л.с.";

    const fuelEl = document.querySelector("p:has(> .w-\\[60px\\] svg[src*='-------']) > p:nth-of-type(1)");
    const fuel = fuelEl ? fuelEl.textContent.trim() : "9.9 л/100 км";

    const carImageElement = document.getElementById("carImage");
    if (!carImageElement) {
      console.error("Элемент #carImage не найден");
      alert("Ошибка: не удалось загрузить изображение автомобиля.");
      return;
    }

    const canvas = await html2canvas(carImageElement, {
      scale: 2,
      backgroundColor: "#131417",
      useCORS: true,
      logging: false
    });
    const carImageDataUrl = canvas.toDataURL("image/png");

    let template = document.getElementById("pdf-template");
    if (!template) {
      template = document.createElement("div");
      template.id = "pdf-template";
      template.style.cssText = "position: absolute; left: -9999px; top: -9999px; width: 210mm; height: 297mm;";
      template.innerHTML = `
        <div style="font-family: Arial, sans-serif; background: white; color: black; width: 210mm; height: 297mm; padding: 20mm; position: relative;">
          <!-- Заголовок -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <div>
              <h1 style="color: #19BC8D; font-size: 24px; margin: 0;">Автоцентр</h1>
              <p style="margin: 5px 0;">+7 (495) 116-82-60</p>
              <p style="margin: 0;">г. Москва, ул. Кулакова, вл. 24к3</p>
            </div>
            <div>
              <img src="../assets/logo.png" alt="Логотип" style="height: 50px;">
            </div>
          </div>

          <hr style="border: 1px solid #19BC8D; margin: 20px 0;">

          <!-- Название и тип -->
          <h2 id="pdf-car-name" style="font-size: 28px; margin: 10px 0;"></h2>
          <p id="pdf-car-type" style="color: #19BC8D; font-weight: bold; margin: 0;"></p>

          <!-- Изображение -->
          <div style="margin: 30px 0; text-align: center;">
            <img id="pdf-car-image" src="" alt="Фото автомобиля" style="max-width: 100%; max-height: 200px; object-fit: contain;">
          </div>

          <!-- Характеристики -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div>
              <p><strong>Мощность:</strong> <span id="pdf-power"></span></p>
              <p><strong>Разгон:</strong> <span id="pdf-accel"></span></p>
            </div>
            <div>
              <p><strong>Скорость:</strong> <span id="pdf-speed"></span></p>
              <p><strong>Расход:</strong> <span id="pdf-fuel"></span></p>
            </div>
          </div>

          <!-- Цена -->
          <div style="margin: 30px 0; font-size: 24px; font-weight: bold; color: #19BC8D;">
            Цена: <span id="pdf-price"></span>
          </div>

          <!-- Условия (как в tiggo-3x.pdf) -->
          <div style="margin: 30px 0; padding: 15px; background: #f0f9f7; border-radius: 10px; font-size: 14px;">
            <p><strong>АВТОКРЕДИТ 4.9%</strong> — можно без первоначального взноса.</p>
            <p><strong>КАСКО И КОМЛЕКТ РЕЗИНЫ В ПОДАРОК</strong> при оформлении кредита.</p>
            <p><strong>ГАРАНТИЯ 3 ГОДА ИЛИ 100 000 КМ</strong></p>
            <p><strong>ПО 2 ДОКУМЕНТАМ</strong> — паспорт и водительское удостоверение.</p>
          </div>

          <!-- Подпись -->
          <div style="position: absolute; bottom: 30px; width: calc(100% - 40mm);">
            <p style="color: #888; font-size: 12px;">
              Предложение действует до конца месяца. Не является публичной офертой.
            </p>
            <p style="margin-top: 10px;">С уважением,<br>Руководитель отдела продаж</p>
          </div>
        </div>
      `;
      document.body.appendChild(template);
    }

    document.getElementById("pdf-car-name").textContent = carName;
    document.getElementById("pdf-car-type").textContent = carType;
    document.getElementById("pdf-price").textContent = price;
    document.getElementById("pdf-speed").textContent = speed;
    document.getElementById("pdf-accel").textContent = accel;
    document.getElementById("pdf-power").textContent = power;
    document.getElementById("pdf-fuel").textContent = fuel;
    document.getElementById("pdf-car-image").src = carImageDataUrl;

    const pdfContent = template.querySelector("div");
    const canvas2 = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false
    });

    const imgWidth = 210;
    const imgHeight = (canvas2.height * imgWidth) / canvas2.width;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    doc.addImage(canvas2.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);

    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const newWindow = window.open(blobUrl, '_blank');

    if (!newWindow) {
      alert("Браузер заблокировал всплывающее окно. Разрешите открытие вкладок для этого сайта.");
    }
  });