// Simple client-side lookup from local JSON database
let db = null;
async function loadDB(){
  if (db) return db;
  db = await fetch('database/data.json').then(r=>r.json());
  return db;
}

document.getElementById('searchBtn').addEventListener('click', async ()=>{
  const q = document.getElementById('icInput').value.trim().toUpperCase();
  if (!q) return alert('Enter IC code or phone model');
  const data = await loadDB();
  // search IC codes
  const ic = data.ic_data.find(x=>x.ic_code.toUpperCase()===q);
  if (ic){
    showIC(ic);
    return;
  }
  // search by partial match
  const icPartial = data.ic_data.find(x=>x.ic_code.toUpperCase().includes(q) || (x.used_in||[]).map(m=>m.toUpperCase()).includes(q));
  if (icPartial){
    showIC(icPartial);
    return;
  }
  // no ic => try phone model lookup
  const phone = data.phone_parts.find(p=>p.model.toUpperCase()===q);
  if (phone){
    showPhone(phone);
    return;
  }
  // not found
  document.getElementById('icResult').innerHTML = '<div class="card">❌ No result found in database.</div>';
});

document.getElementById('phoneBtn').addEventListener('click', async ()=>{
  const q = document.getElementById('phoneInput').value.trim().toUpperCase();
  if (!q) return alert('Enter phone model');
  const data = await loadDB();
  const phone = data.phone_parts.find(p=>p.model.toUpperCase()===q);
  if (phone){
    showPhone(phone);
    return;
  }
  document.getElementById('phoneResult').innerHTML = '<div class="card">❌ No result found in database.</div>';
});

function showIC(ic){
  const html = `
    <div class="card">
      <h3>${ic.ic_code}</h3>
      <p><b>Brand:</b> ${ic.brand} &nbsp; <b>Type:</b> ${ic.type} &nbsp; <b>Capacity:</b> ${ic.capacity}</p>
      <p><b>Used in:</b> ${(ic.used_in||[]).join(', ')}</p>
      <p><b>Network:</b> ${ic.network||'Unknown'}</p>
      <p><b>Board Capacity:</b> ${ic.capacity} (${ic.type})</p>
      <img src="${ic.image}" alt="${ic.ic_code}">
    </div>
  `;
  document.getElementById('icResult').innerHTML = html;
}

function showPhone(phone){
  const partsHtml = (phone.parts||[]).map(pt=>`
    <div class="card" style="margin-bottom:8px">
      <h4>${pt.part_name} — <small>${pt.market_name}</small></h4>
      <p>${pt.description}</p>
      <p><a href="${pt.buy_link_1}" target="_blank">Buy (source 1)</a> | <a href="${pt.buy_link_2}" target="_blank">Buy (source 2)</a></p>
      <img src="${pt.image}" alt="${pt.part_name}">
    </div>
  `).join('');
  const html = `
    <div class="card">
      <h3>${phone.model}</h3>
      <img src="${phone.phone_image}" alt="${phone.model}">
      <h4>Parts required</h4>
      ${partsHtml}
    </div>
  `;
  document.getElementById('phoneResult').innerHTML = html;
}

// preload DB
loadDB();
