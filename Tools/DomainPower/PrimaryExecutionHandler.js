document.addEventListener('DOMContentLoaded', function() {
    const executeBtn = document.getElementById('executeBtn');
    const userInput = document.getElementById('userInput');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const outputArea = document.getElementById('outputArea');

    executeBtn.addEventListener('click', async () => {
        const input = userInput.value.trim();
        const apiKey = apiKeyInput.value.trim();
        
        if (input.length < 5) {
            return;
        }

        const keyValidation = validateApiKey(apiKey);
        if (!keyValidation.valid) {
            errorMessage.textContent = keyValidation.message;
            errorMessage.style.display = 'block';
            return;
        }

        const rateLimitCheck = rateLimiter.canExecute();
        if (!rateLimitCheck.allowed) {
            errorMessage.textContent = rateLimitCheck.reason;
            errorMessage.style.display = 'block';
            return;
        }

        const sanitizedInput = sanitizeUserInput(input);
        
        userInput.value = '';
        executeBtn.disabled = true;
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        outputArea.innerHTML = '';

        rateLimiter.recordExecution();
        
        await executeWithRetry(apiKey, sanitizedInput);
    });

    async function executeWithRetry(apiKey, userPrompt, retryCount = 0) {
        try {
            const fullText = await executeGeminiAPI(apiKey, userPrompt, retryCount);
            displayOutput(fullText);
        } catch (error) {
            if (error.retryable) {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
                
                await new Promise(resolve => setTimeout(resolve, error.delay));
                return await executeWithRetry(apiKey, userPrompt, error.count + 1);
            } else {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            }
        } finally {
            loadingMessage.style.display = 'none';
            executeBtn.disabled = false;
        }
    }

    function displayOutput(text) {
        outputArea.innerHTML = '';

        const first140 = text.substring(0, 140);
        const next10 = text.substring(140, 150);
        
        const normalText = document.createTextNode(first140);
        outputArea.appendChild(normalText);
        
        if (next10.length > 0) {
            for (let i = 0; i < next10.length; i++) {
                const span = document.createElement('span');
                span.textContent = next10[i];
                span.className = 'fade-text';
                const opacity = 1 - ((i + 1) / 10);
                span.style.opacity = opacity;
                outputArea.appendChild(span);
            }
        }
        
        const continueLink = document.createElement('a');
        continueLink.href = 'https://note.com/hayadebi_ai/n/nd7234ba28c72';
        continueLink.className = 'continue-btn';
        continueLink.textContent = '続きの生成はこちら👈';
        continueLink.target = '_blank';
        const continueLink2 = document.createElement('a');
        continueLink2.href = CONTINUE_LINK;
        continueLink2.className = 'continue-btn';
        continueLink2.textContent = '【お名前.com】で0円からドメイン取得！👈';
        continueLink2.rel = 'nofollow';
        outputArea.appendChild(document.createElement('br'));
        outputArea.appendChild(continueLink);
        outputArea.appendChild(continueLink2);
        const continueImage = document.createElement('img');
        continueImage.src = 'https://www16.a8.net/0.gif?a8mat=4AXKC8+3B2PRM+50+2HFY7M';
        continueImage.width = '1';
        continueImage.height = '1';
        continueImage.alt = '';
        continueImage.style.cssText = 'border: none;';
        outputArea.appendChild(continueImage);
    }
});