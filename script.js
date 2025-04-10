// Objeto do carrinho para armazenar os itens e quantidades
const cart = {};
const budget = 200; // Orçamento total

// Função para atualizar a renderização do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    for (let product in cart) {
        const item = cart[product];
        const li = document.createElement('li');
        li.textContent = `${product} x${item.quantity} - R$${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    }

    // Atualiza o total no carrinho
    document.getElementById('cart-total').textContent = `R$${total.toFixed(2)}`;

    // Calcula e atualiza a porcentagem do orçamento gasto
    const percentage = ((total / budget) * 100).toFixed(2);
    document.getElementById('budget-percentage').textContent = `${percentage}%`;
}

// Adiciona evento de clique para cada produto
document.querySelectorAll('.produtos li').forEach(li => {
    li.addEventListener('click', () => {
        // Extrai o nome do produto (antes do traço) e o preço do atributo data-price
        const text = li.textContent.split(' - ')[0];
        const price = parseFloat(li.getAttribute('data-price'));
        
        if (cart[text]) {
            cart[text].quantity += 1;
        } else {
            cart[text] = { price: price, quantity: 1 };
        }
        updateCart();
    });
});

// Evento de checkout (apenas demonstração)
document.getElementById('checkout').addEventListener('click', () => {
    const total = document.getElementById('cart-total').textContent;
    alert(`Compra finalizada!\nTotal: ${total}`);
    // Limpa o carrinho após finalizar a compra
    for (let product in cart) {
        delete cart[product];
    }
    updateCart();
});