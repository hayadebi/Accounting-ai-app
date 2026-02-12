class ExecutionRateLimiter {
    constructor() {
        this.executionHistory = [];
        this.maxExecutionsPerMinute = 3;
        this.maxExecutionsPerHour = 20;
        this.cooldownPeriod = 2000;
        this.lastExecutionTime = 0;
    }

    canExecute() {
        const now = Date.now();
        
        if (now - this.lastExecutionTime < this.cooldownPeriod) {
            return {
                allowed: false,
                reason: `連続実行を防ぐため、${Math.ceil((this.cooldownPeriod - (now - this.lastExecutionTime)) / 1000)}秒お待ちください。`
            };
        }

        this.executionHistory = this.executionHistory.filter(
            timestamp => now - timestamp < 3600000
        );

        const recentExecutions = this.executionHistory.filter(
            timestamp => now - timestamp < 60000
        );

        if (recentExecutions.length >= this.maxExecutionsPerMinute) {
            return {
                allowed: false,
                reason: '1分間の実行回数制限に達しました。しばらく時間をおいてから再度お試しください。'
            };
        }

        if (this.executionHistory.length >= this.maxExecutionsPerHour) {
            return {
                allowed: false,
                reason: '1時間の実行回数制限に達しました。しばらく時間をおいてから再度お試しください。'
            };
        }

        return { allowed: true };
    }

    recordExecution() {
        const now = Date.now();
        this.executionHistory.push(now);
        this.lastExecutionTime = now;
    }
}

const rateLimiter = new ExecutionRateLimiter();

function validateApiKey(apiKey) {
    if (!apiKey || apiKey.trim().length === 0) {
        return {
            valid: false,
            message: 'APIキーを入力してください。'
        };
    }

    if (apiKey.length < 30) {
        return {
            valid: false,
            message: 'APIキーの形式が正しくありません。'
        };
    }

    return { valid: true };
}

function sanitizeUserInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .replace(/[<>]/g, '')
        .substring(0, 5000);
}

document.addEventListener('keydown', function(event) {

    // F12キーが押された場合

    if (event.key === 'F12') {

        event.preventDefault(); // デフォルトの動作（開発者ツール）を防止

        window.open('','_self').close();// タブを閉じる

    }

    

    // Ctrl + U が押された場合

    if (event.ctrlKey && event.key === 'u') {

        event.preventDefault(); // デフォルトの動作（ソース表示）を防止

        window.open('','_self').close(); // タブを閉じる

    }

});