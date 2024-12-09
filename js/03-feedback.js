import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const storedData = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};
form.elements.email.value = storedData.email ?? '';
form.elements.message.value = storedData.message ?? '';

const updateLocalStorage = event => {
    const { name, value } = event.target;
    storedData[name] = value;
    localStorage.setItem(localStorageKey, JSON.stringify(storedData));
};

form.addEventListener('input', throttle(updateLocalStorage, 500));

form.addEventListener('submit', event => {
    event.preventDefault();

    console.log('Submitted Data:', {
        email: form.elements.email.value || 'N/A',
        message: form.elements.message.value || 'N/A',
    });

    localStorage.removeItem(localStorageKey);
    form.reset();
});
