// ===== グローバル変数 =====
let currentHTML = null;
let currentDOM = null;
let customTags = [];
let history = [];
let historyIndex = -1;
let isUpdatingFromCode = false;
let currentTargetElement = null;
let insertPosition = 'after'; // 'after' or 'append'
let elementMap = new Map(); // 要素の参照を保持

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupDropZone();
    setupModeToggle();
    setupSectionToggle();
    setupButtons();
    setupResizer();
    setupAddElementPopup();
    loadCustomTags();
    checkDraft();
    
    // コードモードエリアクリックでポップアップを閉じる
    const codeMode = document.getElementById('codeMode');
    if (codeMode) {
        codeMode.addEventListener('click', () => {
            document.getElementById('addElementPopup').style.display = 'none';
        });
    }
}

// ===== ドロップゾーン設定 =====
function setupDropZone() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.html')) {
            loadHTMLFile(file);
        } else {
            showNotification('HTMLファイルを選択してください', 'error');
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            loadHTMLFile(file);
        }
    });
}

// ===== HTMLファイル読み込み =====
function loadHTMLFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        currentHTML = e.target.result;
        processHTML(currentHTML);
        showEditor();
        saveToHistory();
        showNotification('HTMLファイルを読み込みました', 'success');
    };
    reader.onerror = () => {
        showNotification('ファイルの読み込みに失敗しました', 'error');
    };
    reader.readAsText(file);
}

// ===== HTML処理 =====
function processHTML(html) {
    const parser = new DOMParser();
    currentDOM = parser.parseFromString(html, 'text/html');

    // noindex削除
    const noindexMeta = currentDOM.querySelector('meta[name="robots"][content*="noindex"]');
    if (noindexMeta) {
        noindexMeta.remove();
    }

    renderVisualEditor();
    updateCodeEditor();
}

// ===== エディタ表示 =====
function showEditor() {
    document.getElementById('dropZone').classList.add('loaded');
    document.getElementById('editorArea').classList.add('active');
    document.getElementById('saveDraftBtn').style.display = 'inline-flex';
    document.getElementById('loadDraftBtn').style.display = 'inline-flex';
    document.getElementById('undoBtn').style.display = 'inline-flex';
    document.getElementById('redoBtn').style.display = 'inline-flex';
    document.getElementById('exportBtn').style.display = 'inline-flex';
}

// ===== ビジュアルエディタ描画 =====
function renderVisualEditor() {
    renderMetaEditor();
    renderLinkEditor();
    renderJsonLdEditor();
    renderBodyEditor();
}

// ===== Meta編集 =====
function renderMetaEditor() {
    const container = document.getElementById('metaEditor');
    container.innerHTML = '<h3 style="margin-bottom: 1rem; color: var(--text-primary);">Meta タグ</h3>';

    const metas = currentDOM.querySelectorAll('meta[content]');
    metas.forEach((meta, index) => {
        const name = meta.getAttribute('name') || meta.getAttribute('property') || `meta-${index}`;
        const content = meta.getAttribute('content') || '';

        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
            <label>${escapeHtml(name)}</label>
            <input type="text" class="form-input" value="${escapeHtml(content)}" data-meta-index="${index}">
        `;

        const input = group.querySelector('input');
        input.addEventListener('change', (e) => {
            meta.setAttribute('content', e.target.value);
            updateCodeEditor();
            saveToHistory();
            checkForAutoSync(meta, e.target.value);
        });

        container.appendChild(group);
    });
}

// ===== Link編集 =====
function renderLinkEditor() {
    const container = document.getElementById('linkEditor');
    const links = currentDOM.querySelectorAll('link[rel="prev"], link[rel="next"]');

    if (links.length === 0) return;

    container.innerHTML = '<h3 style="margin: 2rem 0 1rem; color: var(--text-primary);">Link タグ</h3>';

    links.forEach((link, index) => {
        const rel = link.getAttribute('rel');
        const href = link.getAttribute('href') || '';

        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
            <label>rel="${rel}" href</label>
            <input type="text" class="form-input" value="${escapeHtml(href)}" data-link-index="${index}">
        `;

        const input = group.querySelector('input');
        input.addEventListener('change', (e) => {
            link.setAttribute('href', e.target.value);
            updateCodeEditor();
            saveToHistory();
        });

        container.appendChild(group);
    });
}

// ===== JSON-LD編集 =====
function renderJsonLdEditor() {
    const container = document.getElementById('jsonldEditor');
    const jsonldScript = currentDOM.querySelector('script[type="application/ld+json"]');

    if (!jsonldScript) return;

    container.innerHTML = '<h3 style="margin: 2rem 0 1rem; color: var(--text-primary);">JSON-LD</h3>';

    try {
        const jsonld = JSON.parse(jsonldScript.textContent);

        // headline
        if (jsonld.headline !== undefined) {
            const group = createFormGroup('headline', jsonld.headline, (value) => {
                jsonld.headline = value;
                updateJsonLd(jsonldScript, jsonld);
            });
            container.appendChild(group);
        }

        // image
        if (jsonld.image !== undefined) {
            const imageValue = Array.isArray(jsonld.image) ? jsonld.image[0] : jsonld.image;
            const group = createFormGroup('image', imageValue, (value) => {
                if (Array.isArray(jsonld.image)) {
                    jsonld.image[0] = value;
                } else {
                    jsonld.image = value;
                }
                updateJsonLd(jsonldScript, jsonld);
            });
            container.appendChild(group);
        }

        // datePublished
        if (jsonld.datePublished !== undefined) {
            const group = createFormGroup('datePublished', jsonld.datePublished, (value) => {
                jsonld.datePublished = value;
                updateJsonLd(jsonldScript, jsonld);
            });
            container.appendChild(group);
        }

        // dateModified
        if (jsonld.dateModified !== undefined) {
            const group = createFormGroup('dateModified', jsonld.dateModified, (value) => {
                jsonld.dateModified = value;
                updateJsonLd(jsonldScript, jsonld);
            });
            container.appendChild(group);
        }

        // mainEntityOfPage @id
        if (jsonld.mainEntityOfPage && jsonld.mainEntityOfPage['@id']) {
            const group = createFormGroup('mainEntityOfPage @id', jsonld.mainEntityOfPage['@id'], (value) => {
                jsonld.mainEntityOfPage['@id'] = value;
                updateJsonLd(jsonldScript, jsonld);
            });
            container.appendChild(group);
        }

    } catch (e) {
        container.innerHTML += '<p style="color: var(--error);">JSON-LDの解析に失敗しました</p>';
    }
}

function createFormGroup(label, value, onChange) {
    const group = document.createElement('div');
    group.className = 'form-group';
    group.innerHTML = `
        <label>${escapeHtml(label)}</label>
        <input type="text" class="form-input" value="${escapeHtml(value)}">
    `;

    const input = group.querySelector('input');
    input.addEventListener('change', (e) => {
        onChange(e.target.value);
    });

    return group;
}

function updateJsonLd(script, jsonld) {
    try {
        script.textContent = JSON.stringify(jsonld, null, 2);
        updateCodeEditor();
        saveToHistory();
    } catch (e) {
        showNotification('JSON-LDの更新に失敗しました', 'error');
    }
}

// ===== Body編集 =====
function renderBodyEditor() {
    const container = document.getElementById('bodyEditor');
    container.innerHTML = '';
    elementMap.clear(); // マップをクリア

    const main = currentDOM.querySelector('body');
    if (!main) {
        container.innerHTML = '<p style="color: var(--error);">bodyタグが見つかりません</p>';
        return;
    }

    renderElement(main, container);
}

function renderElement(element, container, depth = 0) {
    Array.from(element.children).forEach((child, index) => {
        const item = document.createElement('div');
        item.className = 'editable-item';
        item.style.marginLeft = `${depth * 20}px`;
        
        // 一意のIDを生成
        const uniqueId = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        item.dataset.elementId = uniqueId;
        
        // 要素への参照を保存
        elementMap.set(uniqueId, child);

        const header = document.createElement('div');
        header.className = 'editable-item-header';

        const tag = document.createElement('div');
        tag.className = 'editable-item-tag';
        tag.textContent = `<${child.tagName.toLowerCase()}>`;

        const actions = document.createElement('div');
        actions.className = 'item-actions';

        // 要素追加ボタン
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-icon btn-add-element-trigger';
        addBtn.textContent = '➕';
        addBtn.title = '要素を追加';
        addBtn.dataset.uniqueId = uniqueId;

        // コードで編集ボタン（旧削除ボタン）
        const editCodeBtn = document.createElement('button');
        editCodeBtn.className = 'btn-icon btn-edit-code';
        editCodeBtn.textContent = '📝';
        editCodeBtn.title = 'コードで編集';
        editCodeBtn.dataset.uniqueId = uniqueId;

        actions.appendChild(addBtn);
        actions.appendChild(editCodeBtn);
        header.appendChild(tag);
        header.appendChild(actions);
        item.appendChild(header);

        // テキスト編集
        if (child.childNodes.length > 0 && child.childNodes[0].nodeType === Node.TEXT_NODE) {
            const textContent = child.childNodes[0].textContent.trim();
            if (textContent) {
                const group = document.createElement('div');
                group.className = 'form-group';
                group.innerHTML = `
                    <label>テキスト</label>
                    <textarea class="form-textarea">${escapeHtml(textContent)}</textarea>
                `;

                const textarea = group.querySelector('textarea');
                textarea.addEventListener('change', (e) => {
                    child.childNodes[0].textContent = e.target.value;
                    updateCodeEditor();
                    saveToHistory();
                    checkForH1Sync(child, e.target.value);
                });

                item.appendChild(group);
            }
        }

        // img編集
        if (child.tagName.toLowerCase() === 'img') {
            const group = document.createElement('div');
            group.className = 'form-group';
            group.innerHTML = `
                <label>src</label>
                <input type="text" class="form-input" value="${escapeHtml(child.getAttribute('src') || '')}">
            `;

            const input = group.querySelector('input');
            input.addEventListener('change', (e) => {
                child.setAttribute('src', e.target.value);
                updateCodeEditor();
                saveToHistory();
                checkForThumbnailSync(child, e.target.value);
            });

            item.appendChild(group);
        }

        // iframe編集
        if (child.tagName.toLowerCase() === 'iframe') {
            const group = document.createElement('div');
            group.className = 'form-group';
            group.innerHTML = `
                <label>src</label>
                <input type="text" class="form-input" value="${escapeHtml(child.getAttribute('src') || '')}">
            `;

            const input = group.querySelector('input');
            input.addEventListener('change', (e) => {
                child.setAttribute('src', e.target.value);
                updateCodeEditor();
                saveToHistory();
                checkForThumbnailSync(child, e.target.value);
            });

            item.appendChild(group);
        }

        // a編集
        if (child.tagName.toLowerCase() === 'a') {
            const group = document.createElement('div');
            group.className = 'form-group';
            group.innerHTML = `
                <label>href</label>
                <input type="text" class="form-input" value="${escapeHtml(child.getAttribute('href') || '')}">
            `;

            const input = group.querySelector('input');
            input.addEventListener('change', (e) => {
                child.setAttribute('href', e.target.value);
                updateCodeEditor();
                saveToHistory();
            });

            item.appendChild(group);
        }

        container.appendChild(item);

        // 子要素を再帰的に描画
        if (child.children.length > 0) {
            renderElement(child, container, depth + 1);
        }
    });
}

// ===== 自動同期 =====
function checkForH1Sync(element, newValue) {
    // hero内のh1の場合
    const hero = element.closest('.hero');
    if (hero && element.tagName.toLowerCase() === 'h1') {
        // titleを更新
        const title = currentDOM.querySelector('title');
        if (title) {
            title.textContent = newValue;
        }

        // JSON-LD headlineを更新
        const jsonldScript = currentDOM.querySelector('script[type="application/ld+json"]');
        if (jsonldScript) {
            try {
                const jsonld = JSON.parse(jsonldScript.textContent);
                if (jsonld.headline !== undefined) {
                    jsonld.headline = newValue;
                    jsonldScript.textContent = JSON.stringify(jsonld, null, 2);
                }
            } catch (e) {}
        }

        updateCodeEditor();
        renderVisualEditor();
        showNotification('タイトルとheadlineを自動同期しました', 'success');
    }
}

function checkForThumbnailSync(element, newValue) {
    // alt="記事サムネイル"の場合
    if (element.getAttribute('alt') === '記事サムネイル') {
        // og:imageを更新
        const ogImage = currentDOM.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', newValue);
        }

        // JSON-LD imageを更新
        const jsonldScript = currentDOM.querySelector('script[type="application/ld+json"]');
        if (jsonldScript) {
            try {
                const jsonld = JSON.parse(jsonldScript.textContent);
                if (jsonld.image !== undefined) {
                    if (Array.isArray(jsonld.image)) {
                        jsonld.image[0] = newValue;
                    } else {
                        jsonld.image = newValue;
                    }
                    jsonldScript.textContent = JSON.stringify(jsonld, null, 2);
                }
            } catch (e) {}
        }

        updateCodeEditor();
        renderVisualEditor();
        showNotification('サムネイル画像を自動同期しました', 'success');
    }
}

function checkForAutoSync(meta, newValue) {
    // 必要に応じて他のmetaタグの自動同期を実装
}

// ===== 要素追加ポップアップ =====
function setupAddElementPopup() {
    // 位置選択ボタン
    const positionBtns = document.querySelectorAll('.btn-position');
    positionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            positionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            insertPosition = btn.dataset.position;
        });
    });

    // ポップアップ外クリックで閉じる
    document.addEventListener('click', (e) => {
        const popup = document.getElementById('addElementPopup');
        const isClickInsidePopup = popup.contains(e.target);
        const isClickOnElementButton = e.target.classList.contains('btn-add-element') || 
                                        e.target.closest('.btn-add-element');
        const isAddTriggerButton = e.target.classList.contains('btn-add-element-trigger');
        
        // コードモードの場合は常にポップアップを閉じる
        const codeMode = document.getElementById('codeMode');
        const isCodeModeVisible = codeMode && codeMode.style.display !== 'none';
        
        if (isCodeModeVisible || (!isClickInsidePopup && !isClickOnElementButton && !isAddTriggerButton)) {
            popup.style.display = 'none';
        }
    });

    // イベント委譲: Body編集エリアのボタンイベント
    document.addEventListener('click', (e) => {
        // コードで編集ボタン
        if (e.target.classList.contains('btn-edit-code')) {
            e.stopPropagation();
            
            // ポップアップを閉じる
            document.getElementById('addElementPopup').style.display = 'none';
            
            const uniqueId = e.target.dataset.uniqueId;
            const element = elementMap.get(uniqueId);
            
            if (element) {
                jumpToCodeEditor(element);
            }
        }

        // 要素追加ボタン
        if (e.target.classList.contains('btn-add-element-trigger')) {
            e.stopPropagation();
            
            // 既存のポップアップを一旦閉じる
            const popup = document.getElementById('addElementPopup');
            popup.style.display = 'none';
            
            const uniqueId = e.target.dataset.uniqueId;
            const element = elementMap.get(uniqueId);
            
            if (element) {
                currentTargetElement = element;
                // 少し遅延させてから新しいポップアップを表示
                setTimeout(() => {
                    showAddElementPopup(e);
                }, 10);
            }
        }
    });

    // 要素追加ボタンのイベント
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-element')) {
            const tag = e.target.dataset.tag;
            const isCustom = e.target.dataset.custom === 'true';
            if (isCustom) {
                const customIndex = parseInt(e.target.dataset.index);
                addCustomElement(customTags[customIndex].code);
            } else {
                addElement(tag);
            }
            document.getElementById('addElementPopup').style.display = 'none';
        }
    });
}

// ===== コードエディタにジャンプ =====
function jumpToCodeEditor(element) {
    // コードモードに切り替え
    const codeModeBtn = document.querySelector('.mode-btn[data-mode="code"]');
    if (codeModeBtn) {
        codeModeBtn.click();
    }
    
    // コードエディタを更新
    updateCodeEditor();
    
    // 該当要素のHTMLを取得
    const serializer = new XMLSerializer();
    const elementHTML = serializer.serializeToString(element);
    
    // コードエディタから該当箇所を検索
    setTimeout(() => {
        const codeEditor = document.getElementById('codeEditor');
        const code = codeEditor.value;
        
        // 要素のタグ名と属性から検索パターンを作成
        const tagName = element.tagName.toLowerCase();
        const searchPattern = `<${tagName}`;
        
        // 該当箇所を検索
        let searchIndex = -1;
        const allElements = currentDOM.querySelectorAll(tagName);
        let elementIndex = 0;
        
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i] === element) {
                elementIndex = i;
                break;
            }
        }
        
        // コード内で該当箇所を見つける
        let currentIndex = 0;
        for (let i = 0; i <= elementIndex; i++) {
            searchIndex = code.indexOf(searchPattern, currentIndex);
            if (searchIndex === -1) break;
            currentIndex = searchIndex + 1;
        }
        
        if (searchIndex !== -1) {
            // テキストエリアにフォーカス
            codeEditor.focus();
            
            // 該当箇所を選択
            codeEditor.setSelectionRange(searchIndex, searchIndex + searchPattern.length);
            
            // スクロール位置を調整
            const lines = code.substring(0, searchIndex).split('\n');
            const lineNumber = lines.length;
            const lineHeight = 24; // 行の高さ（概算）
            const scrollPosition = (lineNumber - 5) * lineHeight; // 5行前から表示
            
            codeEditor.scrollTop = Math.max(0, scrollPosition);
            
            showNotification('該当箇所にジャンプしました。手動で編集してください。', 'success');
        } else {
            showNotification('該当箇所が見つかりませんでした', 'warning');
        }
    }, 100);
}

function showAddElementPopup(event) {
    const popup = document.getElementById('addElementPopup');
    
    // クリック位置を取得
    const clickX = event.clientX || event.pageX;
    const clickY = event.clientY || event.pageY;
    
    // ポップアップを一旦表示して高さを取得
    popup.style.display = 'block';
    popup.style.visibility = 'hidden';
    
    setTimeout(() => {
        const popupRect = popup.getBoundingClientRect();
        const popupWidth = popupRect.width;
        const popupHeight = popupRect.height;
        
        // 初期位置をクリック地点の右下に設定
        let left = clickX + 10;
        let top = clickY + 10;
        
        // 画面右端を超える場合は左側に表示
        if (left + popupWidth > window.innerWidth - 20) {
            left = clickX - popupWidth - 10;
        }
        
        // 画面下端を超える場合は上側に表示
        if (top + popupHeight > window.innerHeight - 20) {
            top = clickY - popupHeight - 10;
        }
        
        // 画面左端を超える場合は調整
        if (left < 20) {
            left = 20;
        }
        
        // 画面上端を超える場合は調整
        if (top < 20) {
            top = 20;
        }
        
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        popup.style.visibility = 'visible';
        popup.style.display = 'block';
        
        updateCustomTagButtons();
    }, 0);
}

function updateCustomTagButtons() {
    const container = document.getElementById('customTagButtons');
    container.innerHTML = '';
    
    // タグ名とコードが両方入力されているもののみ表示
    const validTags = customTags.filter(tag => tag.name.trim() && tag.code.trim());
    
    if (validTags.length > 0) {
        const divider = document.createElement('hr');
        divider.style.borderColor = 'var(--border)';
        divider.style.margin = '0.75rem 0';
        container.appendChild(divider);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'element-buttons';
        
        validTags.forEach((tag, index) => {
            // 元の配列のインデックスを取得
            const originalIndex = customTags.findIndex(t => t.name === tag.name && t.code === tag.code);
            
            const btn = document.createElement('button');
            btn.className = 'btn-add-element';
            btn.textContent = `${tag.name}`;
            btn.dataset.custom = 'true';
            btn.dataset.index = originalIndex;
            buttonsDiv.appendChild(btn);
        });
        
        container.appendChild(buttonsDiv);
    }
}

// ===== 要素追加 =====
function addElement(tag) {
    if (!currentTargetElement) {
        showNotification('追加先の要素を選択してください', 'error');
        return;
    }

    let newElement;
    switch (tag) {
        case 'p':
            newElement = currentDOM.createElement('p');
            newElement.textContent = '新しい段落';
            break;
        case 'h2':
            newElement = currentDOM.createElement('h2');
            newElement.textContent = '新しい見出し2';
            break;
        case 'h3':
            newElement = currentDOM.createElement('h3');
            newElement.textContent = '新しい見出し3';
            break;
        case 'img':
            newElement = currentDOM.createElement('img');
            newElement.setAttribute('src', 'https://via.placeholder.com/600x400');
            newElement.setAttribute('alt', '画像の説明');
            break;
        case 'iframe':
            newElement = currentDOM.createElement('iframe');
            newElement.setAttribute('src', 'https://via.placeholder.com/600x400');
            newElement.setAttribute('alt', 'Iframeの説明');
            break;
        case 'a':
            newElement = currentDOM.createElement('a');
            newElement.setAttribute('href', '#');
            newElement.textContent = 'リンクテキスト';
            break;
        case 'ul':
            newElement = currentDOM.createElement('ul');
            const li = currentDOM.createElement('li');
            li.textContent = 'リストアイテム';
            newElement.appendChild(li);
            break;
        case 'div':
            newElement = currentDOM.createElement('div');
            newElement.textContent = '新しいコンテナ';
            break;
        default:
            return;
    }

    if (insertPosition === 'after') {
        currentTargetElement.parentNode.insertBefore(newElement, currentTargetElement.nextSibling);
    } else {
        currentTargetElement.appendChild(newElement);
    }

    updateCodeEditor();
    saveToHistory();
    renderBodyEditor();
    showNotification(`${tag}要素を追加しました`, 'success');
}

function addCustomElement(code) {
    if (!currentTargetElement) {
        showNotification('追加先の要素を選択してください', 'error');
        return;
    }

    const temp = currentDOM.createElement('div');
    temp.innerHTML = code;

    Array.from(temp.children).forEach(child => {
        if (insertPosition === 'after') {
            currentTargetElement.parentNode.insertBefore(child.cloneNode(true), currentTargetElement.nextSibling);
        } else {
            currentTargetElement.appendChild(child.cloneNode(true));
        }
    });

    updateCodeEditor();
    saveToHistory();
    renderBodyEditor();
    showNotification('カスタムタグを挿入しました', 'success');
}

// ===== カスタムタグ =====
function loadCustomTags() {
    const saved = localStorage.getItem('customTags');
    if (saved) {
        customTags = JSON.parse(saved);
        // 空のタグを除外
        customTags = customTags.filter(tag => tag.name.trim() && tag.code.trim());
        saveCustomTagsToStorage();
        renderCustomTags();
    }
}

function saveCustomTagsToStorage() {
    localStorage.setItem('customTags', JSON.stringify(customTags));
}

function renderCustomTags() {
    const container = document.getElementById('customTagList');
    container.innerHTML = '';

    // タグ名とコードが両方入力されているもののみ表示
    const validTags = customTags.filter(tag => tag.name.trim() && tag.code.trim());

    validTags.forEach((tag) => {
        // 元の配列のインデックスを取得
        const originalIndex = customTags.findIndex(t => t.name === tag.name && t.code === tag.code);
        
        const card = document.createElement('div');
        card.className = 'custom-tag-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="custom-tag-card-title">${escapeHtml(tag.name)}</div>
            <div class="custom-tag-card-preview">${escapeHtml(tag.code.substring(0, 50))}...</div>
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-secondary);">クリックで編集（空にして保存で削除）</div>
        `;
        
        // カードクリックで編集モーダルを開く
        card.addEventListener('click', () => {
            editCustomTag(originalIndex);
        });

        container.appendChild(card);
    });

    if (validTags.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">カスタムタグがありません</p>';
    }
}

// カスタムタグの編集
function editCustomTag(index) {
    const tag = customTags[index];
    document.getElementById('customTagName').value = tag.name;
    document.getElementById('customTagCode').value = tag.code;
    
    // モーダルタイトルを変更
    const modalTitle = document.querySelector('#customTagModal .modal-title');
    modalTitle.textContent = 'カスタムタグを編集';
    
    document.getElementById('customTagModal').classList.add('active');
    
    // 保存ボタンを更新モードに変更
    const saveBtn = document.getElementById('saveCustomTag');
    saveBtn.textContent = '更新';
    saveBtn.dataset.editIndex = index;
}

// ===== リサイザー =====
function setupResizer() {
    const resizer = document.getElementById('resizer');
    const bodySection = document.getElementById('bodySection');
    const customSection = document.getElementById('customSection');
    let isResizing = false;
    let startY = 0;
    let startHeight = 0;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        startY = e.clientY;
        startHeight = bodySection.offsetHeight;
        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const delta = e.clientY - startY;
        const newHeight = Math.max(200, Math.min(800, startHeight + delta));
        bodySection.style.maxHeight = `${newHeight}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
}

// ===== コードエディタ =====
function updateCodeEditor() {
    if (isUpdatingFromCode) return;

    const codeEditor = document.getElementById('codeEditor');
    const serializer = new XMLSerializer();
    const htmlString = '<!DOCTYPE html>\n' + serializer.serializeToString(currentDOM.documentElement);
    codeEditor.value = htmlString;
}

// コードエディタクリック時にポップアップを閉じる
document.getElementById('codeEditor').addEventListener('focus', () => {
    document.getElementById('addElementPopup').style.display = 'none';
});

document.getElementById('codeEditor').addEventListener('click', () => {
    document.getElementById('addElementPopup').style.display = 'none';
});

// コードエディタの変更をビジュアルエディタに反映
let codeEditorTimeout = null;
document.getElementById('codeEditor').addEventListener('input', (e) => {
    clearTimeout(codeEditorTimeout);
    codeEditorTimeout = setTimeout(() => {
        isUpdatingFromCode = true;
        try {
            const codeValue = e.target.value;
            const parser = new DOMParser();
            const newDOM = parser.parseFromString(codeValue, 'text/html');
            
            // パースエラーチェック
            const parserError = newDOM.querySelector('parsererror');
            if (parserError) {
                showNotification('HTMLの解析に失敗しました', 'error');
                isUpdatingFromCode = false;
                return;
            }
            
            currentDOM = newDOM;
            renderVisualEditor();
            saveToHistory();
        } catch (error) {
            console.error('Parse error:', error);
            showNotification('HTMLの解析に失敗しました', 'error');
        }
        isUpdatingFromCode = false;
    }, 800);
});

// ===== モード切替 =====
function setupModeToggle() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const previousMode = document.querySelector('.mode-btn.active').dataset.mode;
            const newMode = btn.dataset.mode;
            
            // 同じモードなら何もしない
            if (previousMode === newMode) return;
            
            // 要素追加ポップアップを閉じる
            document.getElementById('addElementPopup').style.display = 'none';
            
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (newMode === 'visual') {
                // コードモード → ビジュアルモード
                // コードエディタの最新内容をパースしてビジュアルエディタに反映
                const codeEditor = document.getElementById('codeEditor');
                const codeValue = codeEditor.value;
                
                try {
                    const parser = new DOMParser();
                    const newDOM = parser.parseFromString(codeValue, 'text/html');
                    
                    const parserError = newDOM.querySelector('parsererror');
                    if (!parserError) {
                        isUpdatingFromCode = true;
                        currentDOM = newDOM;
                        renderVisualEditor();
                        isUpdatingFromCode = false;
                    }
                } catch (error) {
                    console.error('Parse error:', error);
                }
                
                document.getElementById('visualMode').style.display = 'block';
                document.getElementById('codeMode').style.display = 'none';
            } else {
                // ビジュアルモード → コードモード
                // ビジュアルエディタの最新内容をコードエディタに反映
                document.getElementById('visualMode').style.display = 'none';
                document.getElementById('codeMode').style.display = 'block';
                updateCodeEditor();
            }
        });
    });
}

// ===== セクション折りたたみ =====
function setupSectionToggle() {
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.section-header');
        if (header) {
            const section = header.dataset.section;
            const content = header.nextElementSibling;
            const toggle = header.querySelector('.section-toggle');

            content.classList.toggle('collapsed');
            toggle.classList.toggle('collapsed');
        }
    });
}

// ===== ボタン設定 =====
function setupButtons() {
    // カスタムタグ追加
    document.getElementById('addCustomTagBtn').addEventListener('click', () => {
        // モーダルタイトルをリセット
        const modalTitle = document.querySelector('#customTagModal .modal-title');
        modalTitle.textContent = 'カスタムタグを追加';
        
        // 編集モードをリセット
        const saveBtn = document.getElementById('saveCustomTag');
        delete saveBtn.dataset.editIndex;
        saveBtn.textContent = '保存';
        
        document.getElementById('customTagModal').classList.add('active');
    });

    document.getElementById('closeCustomModal').addEventListener('click', closeCustomModal);
    document.getElementById('cancelCustomTag').addEventListener('click', closeCustomModal);

    document.getElementById('saveCustomTag').addEventListener('click', () => {
        const name = document.getElementById('customTagName').value.trim();
        const code = document.getElementById('customTagCode').value.trim();
        const saveBtn = document.getElementById('saveCustomTag');
        const editIndex = saveBtn.dataset.editIndex;

        // 更新モードの場合
        if (editIndex !== undefined) {
            const index = parseInt(editIndex);
            
            // 空の場合は削除
            if (!name || !code) {
                customTags.splice(index, 1);
                showNotification('カスタムタグを削除しました', 'success');
            } else {
                // 更新
                customTags[index] = { name, code };
                showNotification('カスタムタグを更新しました', 'success');
            }
            
            delete saveBtn.dataset.editIndex;
            saveBtn.textContent = '保存';
        } else {
            // 追加モード
            if (!name || !code) {
                showNotification('タグ名とコードを両方入力してください', 'error');
                return;
            }
            
            customTags.push({ name, code });
            showNotification('カスタムタグを追加しました', 'success');
        }
        
        // 空のタグを自動削除
        customTags = customTags.filter(tag => tag.name.trim() && tag.code.trim());
        
        saveCustomTagsToStorage();
        renderCustomTags();
        updateCustomTagButtons();
        closeCustomModal();
    });

    // エクスポート
    document.getElementById('exportBtn').addEventListener('click', () => {
        document.getElementById('exportModal').classList.add('active');
    });

    document.getElementById('closeExportModal').addEventListener('click', closeExportModal);
    document.getElementById('cancelExport').addEventListener('click', closeExportModal);

    document.getElementById('confirmExport').addEventListener('click', () => {
        const fileName = document.getElementById('exportFileName').value.trim() || 'output.html';
        exportHTML(fileName);
        closeExportModal();
    });

    // Undo/Redo
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);

    // 下書き保存/復帰
    document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);
    document.getElementById('loadDraftBtn').addEventListener('click', loadDraft);

    // コード整形
    document.getElementById('formatCodeBtn').addEventListener('click', formatCode);
}

function closeCustomModal() {
    document.getElementById('customTagModal').classList.remove('active');
    document.getElementById('customTagName').value = '';
    document.getElementById('customTagCode').value = '';
    
    // モーダルタイトルをリセット
    const modalTitle = document.querySelector('#customTagModal .modal-title');
    modalTitle.textContent = 'カスタムタグを追加';
    
    // 編集モードをリセット
    const saveBtn = document.getElementById('saveCustomTag');
    delete saveBtn.dataset.editIndex;
    saveBtn.textContent = '保存';
}

function closeExportModal() {
    document.getElementById('exportModal').classList.remove('active');
}

function decodeHtml(str) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

// ===== エクスポート =====
function exportHTML(fileName) {
    const serializer = new XMLSerializer();
    const htmlString = '<!DOCTYPE html>\n' + serializer.serializeToString(currentDOM.documentElement);
    const ampString = htmlString.replaceAll("amp;amp;amp;amp;","amp;").replaceAll("amp;amp;amp;","amp;").replaceAll("amp;amp;","amp;").replaceAll("amp;amp;","amp;").replaceAll("amp;amp;","amp;").replaceAll("gt;gt;","gt;").replaceAll("gt;gt;","gt;").replaceAll("lt;lt;","lt;").replaceAll("lt;lt;","lt;");
    const replaceString = decodeHtml(ampString);//htmlString.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const gtltString = replaceString.replaceAll("&gt;",">").replaceAll("&lt;","<");
    const adsString = gtltString.replace(`</body>`,`<div class="editorproof-widget"></div><script src="https://hayadebi.github.io/Accounting-ai-app/Ads/EditorProof.js" rel="preload"></script></body>`);
    const blob = new Blob([adsString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('HTMLファイルをダウンロードしました', 'success');
    toolCenterAdsReplaceCombination();
    adDisplayed = true;
    showAd();
}

// ===== 履歴管理 =====
function saveToHistory() {
    const serializer = new XMLSerializer();
    const state = serializer.serializeToString(currentDOM.documentElement);

    // 現在の位置以降を削除
    history = history.slice(0, historyIndex + 1);
    history.push(state);
    historyIndex++;

    // 履歴が100を超えたら古いものを削除
    if (history.length > 100) {
        history.shift();
        historyIndex--;
    }
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreFromHistory();
        showNotification('元に戻しました', 'success');
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreFromHistory();
        showNotification('やり直しました', 'success');
    }
}

function restoreFromHistory() {
    const parser = new DOMParser();
    const htmlString = '<!DOCTYPE html>\n' + history[historyIndex];
    currentDOM = parser.parseFromString(htmlString, 'text/html');
    renderVisualEditor();
    updateCodeEditor();
}

// ===== 下書き =====
function saveDraft() {
    const serializer = new XMLSerializer();
    const htmlString = serializer.serializeToString(currentDOM.documentElement);
    
    // 下書きデータをJSON形式で作成
    const draftData = {
        html: htmlString,
        customTags: customTags,
        timestamp: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(draftData, null, 2);
    const blob = new Blob([jsonString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // ファイル名に日時を含める
    const now = new Date();
    const dateStr = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const fileName = `draft_${dateStr}.txt`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('下書きをファイルとして保存しました', 'success');
    toolCenterAdsReplaceCombination();
    adDisplayed = true;
    showAd();
}

function loadDraft() {
    // ファイル選択ダイアログを表示
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const draftData = JSON.parse(e.target.result);
                
                // HTMLを復元
                const parser = new DOMParser();
                currentDOM = parser.parseFromString('<!DOCTYPE html>\n' + draftData.html, 'text/html');
                
                // カスタムタグを復元
                if (draftData.customTags && Array.isArray(draftData.customTags)) {
                    customTags = draftData.customTags;
                    saveCustomTagsToStorage();
                }
                
                renderVisualEditor();
                renderCustomTags();
                updateCodeEditor();
                saveToHistory();
                showEditor();
                showNotification('下書きを復帰しました', 'success');
            } catch (error) {
                console.error('Draft load error:', error);
                showNotification('下書きファイルの読み込みに失敗しました', 'error');
            }
        };
        reader.onerror = () => {
            showNotification('ファイルの読み込みに失敗しました', 'error');
        };
        reader.readAsText(file);
    });
    
    input.click();
}

function checkDraft() {
    // ファイルベースなので常に復帰ボタンを表示
    // 何もしない（ボタンは常に表示される）
}

// ===== コード整形 =====
function formatCode() {
    try {
        const codeEditor = document.getElementById('codeEditor');
        const parser = new DOMParser();
        const doc = parser.parseFromString(codeEditor.value, 'text/html');
        const serializer = new XMLSerializer();
        const formatted = '<!DOCTYPE html>\n' + serializer.serializeToString(doc.documentElement);
        codeEditor.value = formatted;
        showNotification('コードを整形しました', 'success');
    } catch (e) {
        showNotification('整形に失敗しました', 'error');
    }
}

// ===== 通知 =====
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} active`;

    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// ===== ユーティリティ =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}