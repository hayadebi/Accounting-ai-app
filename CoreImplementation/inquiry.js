/**
 * GAS Storage Client for HTML
 * Google Apps Scriptスプレッドシートと連携するクライアントライブラリ
 * HTML環境での使用に最適化
 */

(function(window) {
  'use strict';

  // ========================================
  // メインクライアントクラス
  // ========================================
  class GASStorageClient {
    constructor(gasUrl) {
      if (!gasUrl) {
        throw new Error('e');
      }
      this.gasUrl = gasUrl;
      this.cache = new Map();
      this.cacheEnabled = false;
      this.cacheExpiry = 60000; // 1分
    }

    /**
     * キャッシュを有効化
     */
    enableCache(expiryMs = 60000) {
      this.cacheEnabled = true;
      this.cacheExpiry = expiryMs;
    }

    /**
     * キャッシュを無効化
     */
    disableCache() {
      this.cacheEnabled = false;
      this.cache.clear();
    }

    /**
     * キャッシュをクリア
     */
    clearCache() {
      this.cache.clear();
    }

    /**
     * GASにリクエストを送信
     */
    async request(params) {
      try {
        const formData = new URLSearchParams(params);
        const response = await fetch(this.gasUrl, {
          method: 'POST',
          body: formData,
          redirect: 'follow'
        });
        
        if (!response.ok) {
          throw new Error(`e: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status === 'error') {
          throw new Error(result.message || 'u');
        }
        
        return result;
      } catch (error) {
        console.error('e:', error);
        throw error;
      }
    }

    /**
     * データを取得
     */
    async get(parentKey, childKey) {
      const cacheKey = `${parentKey}:${childKey}`;
      
      // キャッシュチェック
      if (this.cacheEnabled && this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < this.cacheExpiry) {
          return cached.data;
        }
        this.cache.delete(cacheKey);
      }
      
      const result = await this.request({
        action: 'get',
        parentKey: parentKey,
        childKey: childKey
      });
      
      // キャッシュに保存
      if (this.cacheEnabled) {
        this.cache.set(cacheKey, {
          data: result.data,
          timestamp: Date.now()
        });
      }
      
      return result.data;
    }

    /**
     * 全データを取得
     */
    async getAll(parentKey) {
      const result = await this.request({
        action: 'getAll',
        parentKey: parentKey
      });
      return JSON.parse(result.data);
    }

    /**
     * データを保存
     */
    async set(parentKey, childKey, data) {
      const result = await this.request({
        action: 'set',
        parentKey: parentKey,
        childKey: childKey,
        data: typeof data === 'object' ? JSON.stringify(data) : data
      });
      
      // キャッシュを更新
      if (this.cacheEnabled) {
        const cacheKey = `${parentKey}:${childKey}`;
        this.cache.set(cacheKey, {
          data: typeof data === 'object' ? JSON.stringify(data) : data,
          timestamp: Date.now()
        });
      }
      
      return result.data;
    }

    /**
     * データを削除
     */
    async delete(parentKey, childKey) {
      const result = await this.request({
        action: 'delete',
        parentKey: parentKey,
        childKey: childKey
      });
      
      // キャッシュから削除
      if (this.cacheEnabled) {
        const cacheKey = `${parentKey}:${childKey}`;
        this.cache.delete(cacheKey);
      }
      
      return result.data;
    }
  }

  // ========================================
  // 操作タイプ定義
  // ========================================
  const OperationType = {
    GET: 'get',
    GET_ALL: 'getAll',
    SET: 'set',
    DELETE: 'delete'
  };

  // ========================================
  // 汎用実行関数
  // ========================================
  async function executeOperation(client, operationType, params) {
    const operations = {
      [OperationType.GET]: () => client.get(params.parentKey, params.childKey),
      [OperationType.GET_ALL]: () => client.getAll(params.parentKey),
      [OperationType.SET]: () => client.set(params.parentKey, params.childKey, params.data),
      [OperationType.DELETE]: () => client.delete(params.parentKey, params.childKey)
    };

    const operation = operations[operationType];
    if (!operation) {
      throw new Error(`u: ${operationType}`);
    }

    return await operation();
  }

  /**
   * バッチ操作を実行
   */
  async function executeBatch(client, operations) {
    const promises = operations.map(op => 
      executeOperation(client, op.type, op.params)
        .then(result => ({ success: true, result }))
        .catch(error => ({ success: false, error: error.message }))
    );
    
    return await Promise.all(promises);
  }

  /**
   * 条件付き操作を実行
   */
  async function executeConditional(client, condition, operation) {
    if (await condition(client)) {
      return await operation(client);
    }
    return null;
  }

  /**
   * カスタム操作関数を作成
   */
  function createCustomOperation(operationType) {
    return (client, params) => executeOperation(client, operationType, params);
  }

  // ========================================
  // ユーティリティ関数
  // ========================================
  const StorageUtils = {
    /**
     * 複数のキーを一度に取得
     */
    async getMultiple(client, parentKey, childKeys) {
      const results = {};
      const promises = childKeys.map(async key => {
        try {
          results[key] = await client.get(parentKey, key);
        } catch (error) {
          results[key] = null;
        }
      });
      await Promise.all(promises);
      return results;
    },

    /**
     * 複数のデータを一度に保存
     */
    async setMultiple(client, parentKey, dataMap) {
      const results = [];
      const promises = Object.entries(dataMap).map(async ([key, value]) => {
        try {
          await client.set(parentKey, key, value);
          results.push({ key, success: true });
        } catch (error) {
          results.push({ key, success: false, error: error.message });
        }
      });
      await Promise.all(promises);
      return results;
    },

    /**
     * データの存在確認
     */
    async exists(client, parentKey, childKey) {
      try {
        await client.get(parentKey, childKey);
        return true;
      } catch {
        return false;
      }
    },

    /**
     * オブジェクトとして全データを取得
     */
    async getAllAsObject(client, parentKey) {
      const result = await client.getAll(parentKey);
      const obj = {};
      for (let i = 0; i < result.keys.length; i++) {
        obj[result.keys[i]] = result.values[i];
      }
      return obj;
    },

    /**
     * JSON形式で全データを取得
     */
    async getAllAsJSON(client, parentKey) {
      const result = await client.getAll(parentKey);
      const arr = [];
      for (let i = 0; i < result.keys.length; i++) {
        try {
          arr.push({
            key: result.keys[i],
            value: JSON.parse(result.values[i])
          });
        } catch {
          arr.push({
            key: result.keys[i],
            value: result.values[i]
          });
        }
      }
      return arr;
    }
  };

  // ========================================
  // ヘルパークラス群
  // ========================================

  /**
   * データストアラッパー
   */
  class DataStore {
    constructor(client, sheetName) {
      this.client = client;
      this.sheetName = sheetName;
    }

    async get(key) {
      return await this.client.get(this.sheetName, key);
    }

    async getJSON(key) {
      const data = await this.get(key);
      return JSON.parse(data);
    }

    async getAll() {
      return await this.client.getAll(this.sheetName);
    }

    async set(key, value) {
      return await this.client.set(this.sheetName, key, value);
    }

    async setJSON(key, obj) {
      return await this.set(key, JSON.stringify(obj));
    }

    async delete(key) {
      return await this.client.delete(this.sheetName, key);
    }

    async exists(key) {
      return await StorageUtils.exists(this.client, this.sheetName, key);
    }
  }

  /**
   * キューマネージャー
   */
  class QueueManager {
    constructor() {
      this.queue = [];
      this.processing = false;
    }

    add(operation) {
      this.queue.push(operation);
    }

    async process(client) {
      if (this.processing) return;
      this.processing = true;

      const results = [];
      while (this.queue.length > 0) {
        const op = this.queue.shift();
        try {
          const result = await executeOperation(client, op.type, op.params);
          results.push({ success: true, result, operation: op });
        } catch (error) {
          results.push({ success: false, error: error.message, operation: op });
        }
      }

      this.processing = false;
      return results;
    }

    clear() {
      this.queue = [];
    }

    size() {
      return this.queue.length;
    }
  }

  /**
   * ローディング状態管理
   */
  class LoadingManager {
    constructor() {
      this.loadingCount = 0;
      this.callbacks = [];
    }

    start() {
      this.loadingCount++;
      this.notify(true);
    }

    end() {
      this.loadingCount = Math.max(0, this.loadingCount - 1);
      if (this.loadingCount === 0) {
        this.notify(false);
      }
    }

    isLoading() {
      return this.loadingCount > 0;
    }

    onChange(callback) {
      this.callbacks.push(callback);
    }

    notify(isLoading) {
      this.callbacks.forEach(cb => cb(isLoading));
    }
  }

  /**
   * エラーハンドラー
   */
  class ErrorHandler {
    constructor() {
      this.handlers = [];
    }

    addHandler(handler) {
      this.handlers.push(handler);
    }

    async handle(error, context) {
      for (const handler of this.handlers) {
        try {
          await handler(error, context);
        } catch (e) {
          console.error('e:', e);
        }
      }
    }
  }

  // ========================================
  // ラッパー関数（簡易利用向け）
  // ========================================
  const apiKey='https://script.google.com/macros/s/AKfycbzrbvEgoOWCtw60aTCirNvs6pS1PmvWiBSuShLao_CsxJqnRrEYOtSTBVlPUR384_dL/exec';
  function createSimpleAPI(gasUrl) {
    const client = new GASStorageClient(apiKey);
    const loading = new LoadingManager();
    const errorHandler = new ErrorHandler();

    // デフォルトのエラーハンドラー
    errorHandler.addHandler((error, context) => {
      console.error(`[${context}] e:`, error.message);
    });

    async function wrapOperation(operation, context) {
      loading.start();
      try {
        return await operation();
      } catch (error) {
        await errorHandler.handle(error, context);
        throw error;
      } finally {
        loading.end();
      }
    }

    return {
      client,
      loading,
      errorHandler,

      async get(sheet, key) {
        return wrapOperation(() => client.get(sheet, key), 'GET');
      },

      async getAll(sheet) {
        return wrapOperation(() => client.getAll(sheet), 'GET_ALL');
      },

      async set(sheet, key, value) {
        return wrapOperation(() => client.set(sheet, key, value), 'SET');
      },

      async delete(sheet, key) {
        return wrapOperation(() => client.delete(sheet, key), 'DELETE');
      },

      store(sheetName) {
        return new DataStore(client, sheetName);
      }
    };
  }

  // ========================================
  // グローバルエクスポート
  // ========================================
  window.GASStorage = {
    // メインクラス
    Client: GASStorageClient,
    DataStore: DataStore,
    QueueManager: QueueManager,
    LoadingManager: LoadingManager,
    ErrorHandler: ErrorHandler,

    // 定数
    OperationType: OperationType,

    // 関数
    executeOperation: executeOperation,
    executeBatch: executeBatch,
    executeConditional: executeConditional,
    createCustomOperation: createCustomOperation,
    
    // ユーティリティ
    Utils: StorageUtils,

    // 簡易API
    createSimpleAPI: createSimpleAPI
  };

  // 旧形式との互換性
  window.GASStorageClient = GASStorageClient;
  window.OperationType = OperationType;
  window.StorageUtils = StorageUtils;

})(window);