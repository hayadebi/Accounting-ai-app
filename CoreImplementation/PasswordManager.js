/**
 * PasswordManager - C#版暗号化コードのJavaScript移植版 (修正版)
 * 文字列をBase64化し、特定のひらがなテーブルに基づいて置換を行います。
 */
class PasswordManager {
    constructor() {
        // 変換テーブルの定義
        this.convertTable = [
            ["A", "あ"], ["B", "い"], ["C", "う"], ["D", "え"], ["E", "お"],
            ["F", "か"], ["G", "き"], ["H", "く"], ["I", "け"], ["J", "こ"],
            ["K", "さ"], ["L", "し"], ["M", "す"], ["N", "せ"], ["O", "そ"],
            ["P", "た"], ["Q", "ち"], ["R", "つ"], ["S", "て"], ["T", "と"],
            ["U", "な"], ["V", "に"], ["W", "ぬ"], ["X", "ね"], ["Y", "の"],
            ["Z", "は"], ["a", "ひ"], ["b", "ふ"], ["c", "へ"], ["d", "ほ"],
            ["e", "ま"], ["f", "み"], ["g", "む"], ["h", "め"], ["i", "も"],
            ["j", "や"], ["k", "ゆ"], ["l", "よ"], ["m", "ら"], ["n", "り"],
            ["o", "る"], ["p", "れ"], ["q", "ろ"], ["r", "わ"], ["s", "が"],
            ["t", "ぎ"], ["u", "ぐ"], ["v", "げ"], ["w", "ご"], ["x", "ざ"],
            ["y", "じ"], ["z", "ず"], ["0", "ぜ"], ["1", "ぞ"], ["2", "だ"],
            ["3", "ぢ"], ["4", "づ"], ["5", "で"], ["6", "ど"], ["7", "ば"],
            ["8", "び"], ["9", "ぶ"], ["+", "べ"], ["/", "ぼ"], ["=", "ん"]
        ];

        // 高速化のためのマップ作成
        this.encodeMap = new Map(this.convertTable);
        this.decodeMap = new Map(this.convertTable.map(([k, v]) => [v, k]));
    }

    /**
     * UTF-8文字列をBase64に変換 (ブラウザ/Node.js両対応)
     */
    toBase64(str) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(str, 'utf8').toString('base64');
        } else {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode('0x' + p1);
            }));
        }
    }

    /**
     * Base64をUTF-8文字列に変換 (ブラウザ/Node.js両対応)
     */
    fromBase64(str) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(str, 'base64').toString('utf8');
        } else {
            return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    }

    /**
     * オブジェクトをひらがな暗号化文字列に変換します。
     * @param {any} data 変換対象のオブジェクト
     * @returns {string} 暗号化されたひらがな文字列
     */
    toSpellRestoration(data) {
        try {
            const json = JSON.stringify(data);
            const base64 = this.toBase64(json);
            let spellRestoration = "";
            for (let char of base64) {
                spellRestoration += this.encodeMap.get(char) || char;
            }
            return spellRestoration;
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    }

    /**
     * ひらがな暗号化文字列を元のオブジェクトに復元します。
     * @param {string} spellRestoration 暗号化されたひらがな文字列
     * @returns {any|null} 復元されたオブジェクト。失敗時はnull。
     */
    fromSpellRestoration(spellRestoration) {
        if (!spellRestoration) return null;
        try {
            let base64 = "";
            const chars = Array.from(spellRestoration.trim());
            for (let char of chars) {
                const originalChar = this.decodeMap.get(char);
                if (originalChar !== undefined) {
                    base64 += originalChar;
                } else {
                    base64 += char;
                }
            }
            const json = this.fromBase64(base64);
            return JSON.parse(json);
        } catch (error) {
            console.error("Decryption error:", error);
            return null;
        }
    }
}

// 実行環境に応じたエクスポート処理
if (typeof module !== 'undefined' && module.exports) {
    // Node.js (CommonJS)
    module.exports = PasswordManager;
} else if (typeof window !== 'undefined') {
    // ブラウザ (グローバル変数として公開)
    window.PasswordManager = PasswordManager;
}
