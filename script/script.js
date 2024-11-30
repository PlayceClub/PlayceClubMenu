document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const totalCostDisplay = document.getElementById("total-cost");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");

    let cart = {};
    let totalCost = 0;

    // Обновление отображения корзины
    function updateCart() {
        cartList.innerHTML = ""; // Очищаем список
        for (let itemName in cart) {
            const item = cart[itemName];
            const li = document.createElement("li");
            li.textContent = `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.`;
            cartList.appendChild(li);
        }
        totalCostDisplay.textContent = totalCost; // Обновляем общую стоимость
    }

    // Добавление товара в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            // Добавляем товар в корзину или увеличиваем его количество
            if (cart[itemName]) {
                cart[itemName].quantity++;
            } else {
                cart[itemName] = { price: itemPrice, quantity: 1 };
            }
            totalCost += itemPrice; // Увеличиваем общую стоимость
            updateCart();
        });
    });

    function showOrderModal() {
        orderDetails.innerHTML = "";
        for (let itemName in cart) {
            const item = cart[itemName];
            const p = document.createElement("p");
            p.textContent = `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.`;
            orderDetails.appendChild(p);
        }
        modalTotalCost.textContent = totalCost;
        orderModal.classList.remove("hidden");
    }

    // Удаление товара из корзины
    removeFromCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            // Уменьшаем количество или удаляем товар
            if (cart[itemName]) {
                cart[itemName].quantity--;
                totalCost -= itemPrice;

                if (cart[itemName].quantity === 0) {
                    delete cart[itemName];
                }
            }
            updateCart();
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const toggleCartButton = document.getElementById("toggle-cart");

    // Переключение состояния корзины
    toggleCartButton.addEventListener("click", () => {
        cartContainer.classList.toggle("open");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const totalCostDisplay = document.getElementById("total-cost");
    const submitButton = document.getElementById("submit-order");
    const orderModal = document.getElementById("order-modal");
    const orderDetails = document.getElementById("order-details");
    const modalTotalCost = document.getElementById("modal-total-cost");
    const confirmOrderButton = document.getElementById("confirm-order");
    const cancelOrderButton = document.getElementById("cancel-order");

    let cart = {};
    let totalCost = 0;

    // Функция обновления корзины
    function updateCart() {
        cartList.innerHTML = "";
        for (let itemName in cart) {
            const item = cart[itemName];
            const li = document.createElement("li");
            li.textContent = `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.`;
            cartList.appendChild(li);
        }
        totalCostDisplay.textContent = totalCost;
    }

    // Отображение чека
    function showOrderModal() {
        orderDetails.innerHTML = "";
        for (let itemName in cart) {
            const item = cart[itemName];
            const p = document.createElement("p");
            p.textContent = `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.`;
            orderDetails.appendChild(p);
        }
        modalTotalCost.textContent = totalCost;
        orderModal.classList.remove("hidden");
    }

    // Скрытие чека
    function hideOrderModal() {
        orderModal.classList.add("hidden");
    }

    // Подтверждение заказа
    confirmOrderButton.addEventListener("", function () {
        alert("Пожалуйста, не закрывайте окно до прихода официанта.");
        cart = {};
        totalCost = 0;
        updateCart();
        hideOrderModal();
    });

    // Отмена заказа
    cancelOrderButton.addEventListener("click", function () {
        hideOrderModal();
    });

    // Кнопка "Оформить заказ"
    submitButton.addEventListener("click", function () {
        if (Object.keys(cart).length > 0) {
            showOrderModal();
        } else {
            alert("Ваша корзина пуста.");
        }
    });

    // Пример добавления товара в корзину
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            if (cart[itemName]) {
                cart[itemName].quantity++;
            } else {
                cart[itemName] = { price: itemPrice, quantity: 1 };
            }
            totalCost += itemPrice;

            updateCart();
        });
    });

    // Пример удаления товара из корзины
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", function () {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            if (cart[itemName]) {
                cart[itemName].quantity--;
                totalCost -= itemPrice;

                if (cart[itemName].quantity === 0) {
                    delete cart[itemName];
                }
            }
            updateCart();
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll("#category-filter .filter");
    const categories = document.querySelectorAll(".category");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            categories.forEach(cat => {
                if (category === "all" || cat.querySelector("h3").textContent === category) {
                    cat.style.display = "block";
                } else {
                    cat.style.display = "none";
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const confirmOrderButton = document.getElementById("confirm-order");
    const orderModal = document.getElementById("order-modal");

    confirmOrderButton.addEventListener("click", function () {
        // Элемент, который мы хотим захватить
        const targetElement = orderModal;
        // Здесь захватывается вся страница, можно указать другой элемент, например, `orderModal`

        html2canvas(targetElement).then(canvas => {
            // Преобразуем canvas в изображение
            const imgData = canvas.toDataURL("image/png");

            // Скачиваем скриншот
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "PlayceCheck.png";
            link.click();


            alert("Скриншот заказа сохранён!");
        }).catch(error => {
            console.error("Ошибка при создании скриншота:", error);
            alert("Не удалось сделать скриншот заказа.");
        });

        // Здесь можно очистить корзину или закрыть модальное окно
        orderModal.classList.add("hidden");
    });
});
const imgData = canvas.toDataURL("image/png");
const link = document.createElement("a");
link.href = imgData;
link.target = "_blank"; // Открываем в новой вкладке
link.click();

