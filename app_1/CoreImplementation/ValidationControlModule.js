document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const executeBtn = document.getElementById('executeBtn');

    function updateExecuteButtonState() {
        const hasValidInput = userInput.value.trim().length >= 5;
        const hasApiKey = apiKeyInput.value.trim().length > 0;
        
        executeBtn.disabled = !(hasValidInput && hasApiKey);
    }

    userInput.addEventListener('input', updateExecuteButtonState);
    apiKeyInput.addEventListener('input', updateExecuteButtonState);
});