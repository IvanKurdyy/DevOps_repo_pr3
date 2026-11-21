document.addEventListener('DOMContentLoaded', () => {
    const listElement = document.getElementById('items-list');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    // Делаем запрос к нашему API
    fetch('/api/items')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети или сервера');
            }
            return response.json();
        })
        .then(data => {
            // Скрываем загрузку
            loadingElement.classList.add('hidden');
            
            // Если база пуста
            if (data.length === 0) {
                listElement.innerHTML = '<li>База данных пуста</li>';
                return;
            }

            // Выводим элементы
            data.forEach(item => {
                const li = document.createElement('li');
                // Используем textContent для безопасности (защита от XSS)
                li.textContent = `${item.id}: ${item.name}`;
                listElement.appendChild(li);
            });
        })
        .catch(error => {
            // Показываем ошибку, если что-то пошло не так
            loadingElement.classList.add('hidden');
            errorElement.textContent = `Ошибка: ${error.message}. Проверьте, запущен ли Docker и API.`;
            errorElement.classList.remove('hidden');
            console.error('Fetch error:', error);
        });
});