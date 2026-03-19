(function(){
 
function parseMarkdown(src){
  var lines=src.split('\n'), blocks=[], i=0;
  while(i<lines.length){
    var line=lines[i];
    if(line.startsWith('```')){
      var lang=line.slice(3).trim(), code=[];
      i++;
      while(i<lines.length&&!lines[i].startsWith('```')){code.push(lines[i]);i++;}
      i++;
      blocks.push({t:'code',lang:lang,text:code.join('\n')});
      continue;
    }
    var hm=line.match(/^(#{1,6})\s+(.*)/);
    if(hm){blocks.push({t:'h',level:hm[1].length,text:hm[2]});i++;continue;}
    if(line.match(/^([-*_]\s*){3,}$/)&&line.trim().length>=3){blocks.push({t:'hr'});i++;continue;}
    if(line.match(/^[-*+] /)){
      var items=[];
      while(i<lines.length&&lines[i].match(/^[-*+] /)){items.push(lines[i].replace(/^[-*+] /,''));i++;}
      blocks.push({t:'ul',items:items});continue;
    }
    if(line.match(/^\d+\. /)){
      var items=[];
      while(i<lines.length&&lines[i].match(/^\d+\. /)){items.push(lines[i].replace(/^\d+\. /,''));i++;}
      blocks.push({t:'ol',items:items});continue;
    }
    if(line.trim()===''){i++;continue;}
    var pl=[];
    while(i<lines.length){
      var l=lines[i];
      if(l.trim()==='')break;
      if(l.startsWith('```'))break;
      if(l.match(/^#{1,6}\s/))break;
      if(l.match(/^[-*+] /))break;
      if(l.match(/^\d+\. /))break;
      if(l.match(/^([-*_]\s*){3,}$/)&&l.trim().length>=3)break;
      pl.push(l);i++;
    }
    if(pl.length>0)blocks.push({t:'p',text:pl.join('\n')});
  }
  return blocks;
}
 
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
 
function inline(txt){
  var h=esc(txt);
  h=h.replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>');
  h=h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h=h.replace(/\*([^\*\n]+?)\*/g,'<em>$1</em>');
  h=h.replace(/`([^`\n]+?)`/g,'<code style="background:#fef2f2;color:#c53030;padding:2px 6px;border-radius:4px;font-family:\'SFMono-Regular\',Consolas,monospace;font-size:0.87em;">$1</code>');
  h=h.replace(/\[([^\]\n]+?)\]\(([^\)\n]+?)\)/g,'<a href="$2" style="color:#667eea;text-decoration:underline;">$1</a>');
  return h;
}
 
function renderHtml(blocks){
  var hFz=['2em','1.6em','1.3em','1.1em','1em','0.9em'];
  var hCl=['#1a1a2e','#2d3748','#2d3748','#4a5568','#4a5568','#718096'];
  return blocks.map(function(b){
    if(b.t==='h'){
      var lv=Math.min(b.level,6)-1;
      var bdr=b.level<=2?'border-bottom:'+(b.level===1?'3':'2')+'px solid '+(b.level===1?'#667eea':'#a0aec0')+';padding-bottom:8px;':'';
      var mt=b.level===1?'24px':b.level===2?'20px':'16px';
      var st='font-size:'+hFz[lv]+';font-weight:700;margin:'+mt+' 0 10px;color:'+hCl[lv]+';'+bdr+'-webkit-text-fill-color:'+hCl[lv]+';background:none;text-shadow:none;letter-spacing:normal;';
      return '<h'+b.level+' style="'+st+'">'+inline(b.text)+'</h'+b.level+'>';
    }
    if(b.t==='p'){
      var lines=b.text.split('\n').map(function(l){return inline(l);}).join('<br>');
      return '<p style="margin:0 0 14px;color:#2d3748;line-height:1.9;white-space:normal;">'+lines+'</p>';
    }
    if(b.t==='code'){
      return '<pre style="background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px;overflow-x:auto;margin:0 0 16px;line-height:1.6;"><code style="font-family:\'SFMono-Regular\',Consolas,monospace;font-size:0.88em;color:#2d3748;white-space:pre;">'+esc(b.text)+'</code></pre>';
    }
    if(b.t==='ul'){
      var its=b.items.map(function(item){return '<li style="margin:5px 0;line-height:1.8;color:#2d3748;">'+inline(item)+'</li>';}).join('');
      return '<ul style="margin:0 0 14px;padding-left:28px;color:#2d3748;">'+its+'</ul>';
    }
    if(b.t==='ol'){
      var its=b.items.map(function(item){return '<li style="margin:5px 0;line-height:1.8;color:#2d3748;">'+inline(item)+'</li>';}).join('');
      return '<ol style="margin:0 0 14px;padding-left:28px;color:#2d3748;">'+its+'</ol>';
    }
    if(b.t==='hr')return '<hr style="border:none;border-top:2px solid #e2e8f0;margin:20px 0;">';
    return '';
  }).join('');
}
 
function stripInline(t){
  return t.replace(/\*\*\*(.+?)\*\*\*/g,'$1')
    .replace(/\*\*(.+?)\*\*/g,'$1')
    .replace(/\*([^\*\n]+?)\*/g,'$1')
    .replace(/`([^`\n]+?)`/g,'$1')
    .replace(/\[([^\]\n]+?)\]\([^\)\n]+?\)/g,'$1');
}
 
function renderCanvases(blocks){
  var PW=794,PH=1123,ML=70,MT=75,MR=70,MB=75;
  var CW=PW-ML-MR,MAXY=PH-MB;
  var FF='"Hiragino Sans","Yu Gothic","Meiryo",sans-serif';
  var MFF='"Courier New",Courier,monospace';
  var canvases=[],canvas,ctx,y;
 
  function newPage(){
    canvas=document.createElement('canvas');
    canvas.width=PW;canvas.height=PH;
    ctx=canvas.getContext('2d');
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,PW,PH);
    ctx.textBaseline='top';
    y=MT;
    canvases.push(canvas);
  }
 
  function wrap(text,maxW){
    if(!text)return[''];
    var res=[],line='';
    for(var ci=0;ci<text.length;ci++){
      var ch=text[ci];
      var test=line+ch;
      if(ctx.measureText(test).width>maxW&&line!==''){res.push(line);line=ch;}
      else{line=test;}
    }
    if(line!=='')res.push(line);
    return res.length?res:[''];
  }
 
  function ensureSpace(needed){
    if(y+needed>MAXY)newPage();
  }
 
  newPage();
 
  for(var bi=0;bi<blocks.length;bi++){
    var b=blocks[bi];
    if(b.t==='h'){
      var fz=[28,22,18,16,14,13][b.level-1]||13;
      var fontStr='bold '+fz+'px '+FF;
      ctx.font=fontStr;
      var txt=stripInline(b.text);
      var wrLines=wrap(txt,CW);
      var lh=fz*1.55;
      var extra=b.level<=2?14:6;
      ensureSpace(lh*wrLines.length+extra+14);
      ctx.font=fontStr;
      ctx.fillStyle=b.level===1?'#1a1a2e':b.level===2?'#2d3748':'#4a5568';
      for(var li=0;li<wrLines.length;li++){
        if(y>MAXY){newPage();ctx.font=fontStr;ctx.fillStyle=b.level===1?'#1a1a2e':b.level===2?'#2d3748':'#4a5568';}
        ctx.fillText(wrLines[li],ML,y);y+=lh;
      }
      if(b.level<=2){
        ctx.strokeStyle=b.level===1?'#667eea':'#a0aec0';
        ctx.lineWidth=b.level===1?2:1;
        ctx.beginPath();ctx.moveTo(ML,y+3);ctx.lineTo(PW-MR,y+3);ctx.stroke();
        y+=9;
      }
      y+=14;
    } else if(b.t==='p'){
      var fStr='16px '+FF;
      ctx.font=fStr;
      var ptxt=stripInline(b.text.replace(/\n/g,' '));
      var pLines=wrap(ptxt,CW);
      var plh=16*1.85;
      ensureSpace(plh*Math.min(pLines.length,4)+12);
      ctx.font=fStr;ctx.fillStyle='#111111';
      for(var pi=0;pi<pLines.length;pi++){
        if(y>MAXY){newPage();ctx.font=fStr;ctx.fillStyle='#111111';}
        ctx.fillText(pLines[pi],ML,y);y+=plh;
      }
      y+=12;
    } else if(b.t==='code'){
      var cfStr='13px '+MFF;
      ctx.font=cfStr;
      var codeLines=b.text.split('\n');
      var clh=13*1.6;
      var bgH=clh*codeLines.length+24;
      ensureSpace(Math.min(bgH+16,MAXY-MT-20));
      ctx.font=cfStr;
      var bgY=y-6;
      var availH=Math.min(bgH,MAXY-bgY+6);
      ctx.fillStyle='#f5f7fa';ctx.fillRect(ML,bgY,CW,availH);
      ctx.strokeStyle='#d1d9e6';ctx.lineWidth=1;ctx.strokeRect(ML,bgY,CW,availH);
      ctx.fillStyle='#2d3748';
      for(var ki=0;ki<codeLines.length;ki++){
        if(y>MAXY){
          newPage();
          ctx.font=cfStr;
          ctx.fillStyle='#f5f7fa';ctx.fillRect(ML,y-6,CW,MAXY-(y-6));
          ctx.strokeStyle='#d1d9e6';ctx.lineWidth=1;ctx.strokeRect(ML,y-6,CW,MAXY-(y-6));
          ctx.fillStyle='#2d3748';
        }
        var cwLines=wrap(codeLines[ki]||' ',CW-22);
        for(var cwi=0;cwi<cwLines.length;cwi++){
          ctx.fillText(cwLines[cwi],ML+11,y);y+=clh;
        }
      }
      y+=18;
    } else if(b.t==='ul'){
      var ufStr='16px '+FF;
      ctx.font=ufStr;var ulh=16*1.85;
      for(var ui=0;ui<b.items.length;ui++){
        var utxt=stripInline(b.items[ui]);
        var uLines=wrap(utxt,CW-24);
        ensureSpace(ulh*uLines.length);
        ctx.font=ufStr;ctx.fillStyle='#111111';
        if(y>MAXY){newPage();ctx.font=ufStr;ctx.fillStyle='#111111';}
        ctx.fillText('\u2022',ML+4,y);
        for(var uli=0;uli<uLines.length;uli++){
          if(uli>0&&y>MAXY){newPage();ctx.font=ufStr;ctx.fillStyle='#111111';}
          ctx.fillText(uLines[uli],ML+24,y);y+=ulh;
        }
      }
      y+=10;
    } else if(b.t==='ol'){
      var ofStr='16px '+FF;
      ctx.font=ofStr;var olh=16*1.85;
      for(var oi=0;oi<b.items.length;oi++){
        var otxt=stripInline(b.items[oi]);
        var oLines=wrap(otxt,CW-28);
        ensureSpace(olh*oLines.length);
        ctx.font=ofStr;ctx.fillStyle='#111111';
        if(y>MAXY){newPage();ctx.font=ofStr;ctx.fillStyle='#111111';}
        ctx.fillText((oi+1)+'.',ML,y);
        for(var oli=0;oli<oLines.length;oli++){
          if(oli>0&&y>MAXY){newPage();ctx.font=ofStr;ctx.fillStyle='#111111';}
          ctx.fillText(oLines[oli],ML+28,y);y+=olh;
        }
      }
      y+=10;
    } else if(b.t==='hr'){
      ensureSpace(26);
      ctx.strokeStyle='#cccccc';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(ML,y+10);ctx.lineTo(PW-MR,y+10);ctx.stroke();
      y+=26;
    }
  }
  return canvases;
}
 
function buildPDF(canvases){
  var PW=595,PH=842,N=canvases.length;
  var parts=[],off=0,offs=[0];
 
  function addStr(s){
    var a=new Uint8Array(s.length);
    for(var i=0;i<s.length;i++)a[i]=s.charCodeAt(i)&0xFF;
    parts.push(a);off+=s.length;
  }
  function addBytes(b){parts.push(b);off+=b.length;}
 
  addStr('%PDF-1.4\n');
  offs[1]=off;
  addStr('1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n');
  offs[2]=off;
  var kids=Array.from({length:N},function(_,i){return (3+i*3)+' 0 R';}).join(' ');
  addStr('2 0 obj\n<</Type/Pages/Kids ['+kids+']/Count '+N+'>>\nendobj\n');
 
  var jpegs=canvases.map(function(c){
    var d=c.toDataURL('image/jpeg',0.95);
    var raw=atob(d.split(',')[1]);
    var a=new Uint8Array(raw.length);
    for(var k=0;k<raw.length;k++)a[k]=raw.charCodeAt(k);
    return a;
  });
 
  for(var i=0;i<N;i++){
    var pn=3+i*3,imgn=4+i*3,cn=5+i*3;
    var W=canvases[i].width,H=canvases[i].height;
    offs[pn]=off;
    addStr(pn+' 0 obj\n<</Type/Page/Parent 2 0 R/MediaBox[0 0 '+PW+' '+PH+']/Resources<</XObject<</Im'+(i+1)+' '+imgn+' 0 R>>>>/Contents '+cn+' 0 R>>\nendobj\n');
    offs[imgn]=off;
    addStr(imgn+' 0 obj\n<</Type/XObject/Subtype/Image/Width '+W+'/Height '+H+'/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length '+jpegs[i].length+'>>\nstream\n');
    addBytes(jpegs[i]);
    addStr('\nendstream\nendobj\n');
    var cs='q '+PW+' 0 0 '+PH+' 0 0 cm /Im'+(i+1)+' Do Q';
    offs[cn]=off;
    addStr(cn+' 0 obj\n<</Length '+cs.length+'>>\nstream\n'+cs+'\nendstream\nendobj\n');
  }
 
  var xrefOff=off;
  var total=2+N*3;
  addStr('xref\n0 '+(total+1)+'\n');
  addStr('0000000000 65535 f \n');
  for(var k=1;k<=total;k++){
    var entry=offs[k].toString();
    while(entry.length<10)entry='0'+entry;
    addStr(entry+' 00000 n \n');
  }
  addStr('trailer\n<</Size '+(total+1)+'/Root 1 0 R>>\nstartxref\n'+xrefOff+'\n%%EOF');
 
  var sz=parts.reduce(function(a,c){return a+c.length;},0);
  var out=new Uint8Array(sz);
  var p=0;
  for(var j=0;j<parts.length;j++){out.set(parts[j],p);p+=parts[j].length;}
  return out;
}
 
var currentBlocks=null;
 
function showEl(id){document.getElementById(id).style.display='block';}
function hideEl(id){document.getElementById(id).style.display='none';}
function setErr(id,msg){var e=document.getElementById(id);e.textContent=msg;e.style.display='block';}
function clearErr(id){document.getElementById(id).style.display='none';}
 
document.getElementById('fileInput').addEventListener('change',function(e){
  var file=e.target.files[0];
  clearErr('errorMsg');hideEl('previewSection');
  currentBlocks=null;
  document.getElementById('fileNameDisplay').textContent='';
  if(!file)return;
 
  if(!file.name.toLowerCase().endsWith('.md')){
    setErr('errorMsg','エラー: .mdファイルのみ対応しています。正しいMarkdownファイルを選択してください。');
    this.value='';return;
  }
  if(file.size===0){
    setErr('errorMsg','エラー: ファイルが空です。内容のあるMarkdownファイルを選択してください。');
    this.value='';return;
  }
 
  document.getElementById('fileNameDisplay').textContent='選択中: '+file.name+' ('+Math.ceil(file.size/1024)+'KB)';
  showEl('loadingMsg');
 
  var reader=new FileReader();
  reader.onload=function(ev){
    hideEl('loadingMsg');
    var text=ev.target.result;
    if(!text||!text.trim()){
      setErr('errorMsg','エラー: ファイルの内容が空または読み取れませんでした。');
      return;
    }
    try{
      currentBlocks=parseMarkdown(text);
      if(!currentBlocks||currentBlocks.length===0){
        setErr('errorMsg','エラー: Markdownの解析結果が空です。有効なMarkdown形式か確認してください。');
        return;
      }
      var html=renderHtml(currentBlocks);
      document.getElementById('preview').innerHTML=html;
      clearErr('pdfErrorMsg');
      showEl('previewSection');
    }catch(err){
      setErr('errorMsg','エラー: Markdown解析中に問題が発生しました: '+err.message);
    }
  };
  reader.onerror=function(){
    hideEl('loadingMsg');
    setErr('errorMsg','エラー: ファイルの読み込みに失敗しました。ファイルが正常に保存されているか確認してください。');
  };
  reader.readAsText(file,'UTF-8');
  adDisplayed = true;
  showAd();
});
 
document.getElementById('downloadBtn').addEventListener('click',function(){
  if(!currentBlocks){
    setErr('pdfErrorMsg','エラー: 先にMarkdownファイルを読み込んでください。');
    return;
  }
  clearErr('pdfErrorMsg');
  this.disabled=true;
  showEl('pdfLoadingMsg');
  var btn=this;
  setTimeout(function(){
    try{
      var canvases=renderCanvases(currentBlocks);
      if(!canvases||canvases.length===0)throw new Error('ページの生成に失敗しました');
      var pdfData=buildPDF(canvases);
      var blob=new Blob([pdfData],{type:'application/pdf'});
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a');
      a.href=url;a.download='document.pdf';
      document.body.appendChild(a);a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }catch(err){
      setErr('pdfErrorMsg','エラー: PDF生成に失敗しました: '+err.message);
    }finally{
      hideEl('pdfLoadingMsg');
      btn.disabled=false;
    }
  },50);
});
 
})();