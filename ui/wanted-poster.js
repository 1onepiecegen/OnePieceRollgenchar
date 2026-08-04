/* V5.4 local-only Wanted Poster Studio. No uploads leave the browser. */
(function (V4, global) {
  'use strict';
  const poster = V4.ui.wantedPoster = V4.ui.wantedPoster || {};
  const KEY = 'op-v54-wanted-poster-config';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const defaults = () => ({ source:'current', name:'', bounty:'', epithet:'', status:'DEAD OR ALIVE', style:'classic', footer:'MARINE HQ • GRAND LINE', issue:`WG-${String(Date.now()).slice(-6)}`, zoom:1, x:0, y:0, rotation:0, sepia:68, weather:18, image:'' });
  const read = () => { try { return { ...defaults(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (_) { return defaults(); } };
  const write = state => localStorage.setItem(KEY, JSON.stringify(state));
  poster.state = read();
  const selectedCharacter = () => global.getCurrentCharacter?.() || null;
  const sources = () => [{ id:'current', label:'Current character', character:selectedCharacter() }, ...((global.getSavedCharacters?.() || []).map(character => ({id:`saved:${character.id}`,label:`Saved: ${character.name || character.id}`,character}))), ...(V4.database.combatProfiles || []).map(profile => ({id:`profile:${profile.id}`,label:`Preset: ${profile.name || profile.characterId}`,profile}))];
  const resolve = id => { const source = sources().find(item => item.id === id); if (!source) return null; if (source.character) return source.character; return source.profile ? V4.engines.presetBuilder.build(source.profile.id, 540000001) : null; };
  const syncCharacter = state => {
    const character = resolve(state.source); if (!character) return state;
    state.name = character.name || character.displayName || character.id || state.name;
    state.bounty = character.bounty?.displayedAmount ?? character.bounty?.amount ?? state.bounty;
    state.epithet = character.reputation?.name || character.tier?.name || state.epithet;
    return state;
  };
  const getInput = id => document.getElementById(`poster-${id}`);
  const stateFromInputs = () => {
    const state = poster.state;
    for (const id of ['source','name','bounty','epithet','status','style','footer','issue','zoom','x','y','rotation','sepia','weather']) { const input=getInput(id); if(input) state[id]=input.value; }
    return state;
  };
  const paint = () => {
    const canvas = document.getElementById('poster-canvas'); if (!canvas) return;
    const state = stateFromInputs(), ctx = canvas.getContext('2d'), w=1080,h=1620;
    canvas.width=w; canvas.height=h; const styles={classic:['#ead49c','#3e2a17'],weathered:['#c8ad71','#2d2116'],marine:['#d3c7a5','#0b2943'],emergency:['#dcb480','#641c1c'],emperor:['#c19b55','#28120f'],classified:['#b9b18d','#121b2b'],minimal:['#f1e7c7','#28221a']}; const [paper,ink]=styles[state.style]||styles.classic;
    ctx.fillStyle=paper;ctx.fillRect(0,0,w,h); ctx.fillStyle=`rgba(77,49,22,${Math.min(.45,Number(state.sepia)/180)})`;ctx.fillRect(0,0,w,h);
    for(let index=0;index<Number(state.weather||0)*3;index++){ctx.fillStyle=`rgba(50,30,14,${.02+(index%5)*.006})`;ctx.fillRect((index*113)%w,(index*197)%h,40+(index%17)*7,2+(index%4));}
    ctx.strokeStyle=ink;ctx.lineWidth=16;ctx.strokeRect(35,35,w-70,h-70);ctx.lineWidth=3;ctx.strokeRect(60,60,w-120,h-120);
    ctx.textAlign='center';ctx.fillStyle=ink;ctx.font='900 142px Georgia';ctx.fillText('WANTED',w/2,205);ctx.font='bold 48px Arial';ctx.fillText(String(state.status||'DEAD OR ALIVE'),w/2,268);
    ctx.save();ctx.translate(w/2+Number(state.x||0),700+Number(state.y||0));ctx.rotate(Number(state.rotation||0)*Math.PI/180); const size=520*Number(state.zoom||1);
    if(state.image){const image=new Image();image.onload=()=>{ctx.drawImage(image,-size/2,-size/2,size,size);ctx.restore();finish(ctx,state,w,h,ink);};image.src=state.image;return;} ctx.fillStyle='#4c3927';ctx.fillRect(-size/2,-size/2,size,size);ctx.fillStyle='#d8c497';ctx.font='bold 44px Arial';ctx.fillText('PORTRAIT',0,15);ctx.restore();finish(ctx,state,w,h,ink);
  };
  const finish=(ctx,state,w,h,ink)=>{ctx.fillStyle=ink;ctx.textAlign='center';ctx.font='900 76px Georgia';ctx.fillText(String(state.name||'UNKNOWN').toUpperCase(),w/2,1080);ctx.font='italic 38px Georgia';ctx.fillText(`“${String(state.epithet||'UNKNOWN').toUpperCase()}”`,w/2,1140);ctx.font='900 96px Georgia';ctx.fillText(`\u0E3F${Number(state.bounty||0).toLocaleString()}`,w/2,1295);ctx.font='bold 30px Arial';ctx.fillText(String(state.issue||''),w/2,1390);ctx.font='28px Arial';ctx.fillText(String(state.footer||''),w/2,1465);};
  poster.render = function () {
    const host=document.getElementById('wanted-poster-studio');if(!host)return; poster.state=syncCharacter(poster.state);
    const state=poster.state, sourceOptions=sources().map(item=>`<option value="${escape(item.id)}"${item.id===state.source?' selected':''}>${escape(item.label)}</option>`).join('');
    host.innerHTML=`<div class="poster-studio"><div class="poster-controls"><label>Poster source<select id="poster-source" onchange="posterSourceChanged()">${sourceOptions}<option value="blank">Blank custom poster</option></select></label><label>Name<input id="poster-name" maxlength="60" value="${escape(state.name)}" oninput="updatePosterPreview()"></label><label>Bounty<input id="poster-bounty" type="number" min="0" value="${escape(state.bounty)}" oninput="updatePosterPreview()"></label><label>Epithet<input id="poster-epithet" maxlength="70" value="${escape(state.epithet)}" oninput="updatePosterPreview()"></label><label>Status<select id="poster-status" onchange="updatePosterPreview()"><option>DEAD OR ALIVE</option><option>DEAD ONLY</option><option>ALIVE ONLY</option></select></label><label>Style<select id="poster-style" onchange="updatePosterPreview()">${['classic','weathered','marine','emergency','emperor','classified','minimal'].map(value=>`<option value="${value}"${state.style===value?' selected':''}>${value.replace(/\b\w/g,c=>c.toUpperCase())}</option>`).join('')}</select></label><label>Image upload<input id="poster-image" type="file" accept="image/*" onchange="posterImageSelected(event)"></label><label>Zoom<input id="poster-zoom" type="range" min=".5" max="2.5" step=".01" value="${state.zoom}" oninput="updatePosterPreview()"></label><label>Position X<input id="poster-x" type="range" min="-320" max="320" value="${state.x}" oninput="updatePosterPreview()"></label><label>Position Y<input id="poster-y" type="range" min="-320" max="320" value="${state.y}" oninput="updatePosterPreview()"></label><label>Rotation<input id="poster-rotation" type="range" min="-25" max="25" value="${state.rotation}" oninput="updatePosterPreview()"></label><label>Paper weathering<input id="poster-weather" type="range" min="0" max="55" value="${state.weather}" oninput="updatePosterPreview()"></label><label>Sepia intensity<input id="poster-sepia" type="range" min="0" max="100" value="${state.sepia}" oninput="updatePosterPreview()"></label><label>Issue number<input id="poster-issue" maxlength="30" value="${escape(state.issue)}" oninput="updatePosterPreview()"></label><label>Footer<input id="poster-footer" maxlength="90" value="${escape(state.footer)}" oninput="updatePosterPreview()"></label></div><div class="poster-preview-wrap"><div class="poster-preview"><canvas id="poster-canvas" aria-label="Wanted poster preview"></canvas></div><div class="poster-actions"><button class="btn-small" onclick="resetPosterImage()">Reset image</button><button class="btn-small" onclick="savePosterConfig()">Save configuration</button><button class="btn" onclick="downloadPosterPng()">Download PNG</button><button class="btn-small" onclick="printPoster()">Print</button></div></div></div>`;
    getInput('status').value=state.status; paint();
  };
  global.updatePosterPreview=()=>{stateFromInputs();paint();};
  global.posterSourceChanged=()=>{stateFromInputs();poster.state=syncCharacter(poster.state);poster.render();};
  global.posterImageSelected=event=>{const file=event.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{poster.state.image=reader.result;paint();};reader.readAsDataURL(file);};
  global.resetPosterImage=()=>{poster.state.image='';poster.state.zoom=1;poster.state.x=0;poster.state.y=0;poster.state.rotation=0;poster.render();};
  global.savePosterConfig=()=>{stateFromInputs();write(poster.state);alert('Poster configuration saved locally in this browser.');};
  global.downloadPosterPng=()=>{paint();const canvas=document.getElementById('poster-canvas');const link=document.createElement('a');link.download=`wanted-${(poster.state.name||'poster').replace(/[^a-z0-9]+/gi,'-').toLowerCase()}.png`;link.href=canvas.toDataURL('image/png');link.click();};
  global.printPoster=()=>{paint();const data=document.getElementById('poster-canvas').toDataURL('image/png');const popup=global.open('','wanted-poster-print');if(!popup)return;popup.document.write(`<img src="${data}" style="width:100%;max-width:800px">`);popup.document.close();popup.focus();popup.print();};
}(window.OnePieceRollV4, window));



