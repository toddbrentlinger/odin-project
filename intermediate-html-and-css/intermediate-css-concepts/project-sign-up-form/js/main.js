'use strict';

(function() {
    document.getElementById('sign-up-form').addEventListener('submit', e => {
        // Check if both password inputs match
        const password = e.target.password.value;
        const confirmPassword = e.target['confirm-password'].value;
        if (password !== confirmPassword) {
            e.preventDefault();
            console.error('Passwords do NOT match');
        }
    }, false);

    const passwordForm = ((passwordFieldsetElement) => {
        const passwordInputElement = passwordFieldsetElement.querySelector('#password');
        const confirmPasswordInputElement = passwordFieldsetElement.querySelector('#confirm-password');
        const errorMsgElement = passwordFieldsetElement.querySelector('#password-match-error-msg');

        // Getters
        const getPasswordValue = () => passwordInputElement.value;
        const getConfirmPasswordValue = () => confirmPasswordInputElement.value;

        // Private Methods
        const checkPasswordComparison = () => {
            if (getPasswordValue() !== getConfirmPasswordValue()) {
                passwordFieldsetElement.classList.add('display-error');
            } else {
                passwordFieldsetElement.classList.remove('display-error');
            }
        };

        // Add event listeners to password inputs
        passwordInputElement.addEventListener('input', checkPasswordComparison, false);
        confirmPasswordInputElement.addEventListener('input', checkPasswordComparison, false);

        return {};
    })(document.getElementById('password-fieldset'));
})();