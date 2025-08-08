// -------- TYPO & UTIL --------
document.getElementById('year').textContent = new Date().getFullYear();

// -------- BÀI VIẾT (có category) --------
const categories = ["Tất cả", "Du lịch", "Triết lý & Nhân sinh", "Hài hước – Tự trào", "Ký ức & Tình cảm", "Phản biện"];

const posts = [
  { title: "PHỤNG DƯỠNG", tag: "Tản văn", category: "Ký ức & Tình cảm",
    excerpt: "Jou đã trưởng thành và muốn phụng dưỡng bậc sinh thành...", date: "2025-08-08" },
  { title: "CÁC CHÀNG TRAI CHỊU VỀ NHÀ", tag: "Hoài niệm", category: "Ký ức & Tình cảm",
    excerpt: "Thời gian trôi, từng đứa lớn lên, đi xa, khác múi giờ...", date: "2025-08-08" },
  { title: "NHÌN NHÂN DIỆN THẤY NHÂN SINH", tag: "Hài hước", category: "Hài hước – Tự trào",
    excerpt: "Từ vô thần đến Huyền Hân Hân mê huyền học...", date: "2025-08-08" }
];

function renderCategoryFilter() {
  const container = document.getElementById('categoryFilter');
  container.innerHTML = categories.map(cat => `
    <button class="px-3 py-1 rounded-full border text-sm transition-all hover:-translate-y-0.5"
      style="border-color:#d1d5db" onclick="filterPosts('${cat}')">${cat}</button>
  `).join('');
}
function filterPosts(category) {
  const list = category === "Tất cả" ? posts : posts.filter(p => p.category === category);
  renderPosts(list);
}
function renderPosts(list) {
  const grid = document.getElementById('postGrid');
  grid.innerHTML = list.map(p => `
    <article class="rounded-2xl border bg-white overflow-hidden transition-shadow hover:shadow-md">
      <div class="p-5">
        <div class="flex items-center justify-between">
          <span class="inline-block text-xs px-2 py-1 rounded-full bg-neutral-100">${p.tag}</span>
          <span class="text-xs text-neutral-500">${p.date}</span>
        </div>
        <h3 class="mt-3 text-xl font-semibold h-serif leading-snug">${p.title}</h3>
        <p class="text-[15px] leading-7 text-neutral-700 mt-2">${p.excerpt}</p>
        <a class="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-xl border text-sm"
           href="#" style="border-color:#d1d5db">Đọc bài <span>→</span></a>
        <div class="mt-3 text-xs text-neutral-500">Chuyên mục: ${p.category}</div>
      </div>
    </article>
  `).join('');
}
renderCategoryFilter();
renderPosts(posts);

// -------- DU KÝ (Filter 3 cấp + breadcrumb) --------
const travelMap = {
  "Lào":        { type: "country", places: ["Vientiane", "Luang Prabang"] },
  "Thái Lan":   { type: "country", places: ["Bangkok", "Chiang Mai", "Phuket"] },
  "Trung Quốc": { type: "country", places: ["Bắc Kinh", "Thượng Hải", "Tô Châu"] },
  "Mông Cổ":    { type: "country", places: ["Ulaanbaatar", "Terelj", "Turtle Rock", "Hustai"] },
  "Maldives": { type: "country", places: ["Male", "Maafushi", "Addu City"] },
  "Philippines":{ type: "country", places: ["Manila", "Cebu", "Palawan"] },
  "Myanmar":    { type: "country", places: ["Yangon", "Mandalay", "Bagan"] },
  "Châu Âu":    { type: "country", places: ["Paris", "Rome", "Prague"] },
  "Mỹ":         { type: "country", places: ["California", "New York", "Seattle"] },
  "Đài Loan":   { type: "country", places: ["Taipei", "Taichung", "Tainan"] },
  "Việt Nam": {
    type: "vietnam",
    regions: {
      "Miền Bắc":   ["Hà Nội", "Hạ Long", "Ninh Bình", "Sapa", "Hà Giang", "Cao Bằng"],
      "Miền Trung": ["Huế", "Hội An", "Quảng Bình", "Đà Nẵng", "Nha Trang", "Quy Nhơn", "Quảng Ngãi"],
      "Miền Nam":   ["TP.HCM", "Cần Thơ", "Trà Vinh"]
    }
  }
};

const travelEntries = [
  { country: "Mông Cổ", place: "Ulaanbaatar",
    title: "Đi đến nơi rất khác: Mông Cổ (Lời tựa)",
    note: "Bước ra khỏi vùng an toàn để chạm vào nhịp sống du mục, gió – cát – thảo nguyên.",
    date: "2025-03", year: 2025 },

  { country: "Mông Cổ", place: "Ulaanbaatar",
    title: "Khác từ một cái tên (Bayarmaa)",
    note: "MIAT, chào tiếng Mông Cổ; Bayarmaa, Tselmeg & Shu hát Mother In Dream.",
    date: "2025-03", year: 2025 },

  { country: "Mông Cổ", place: "Turtle Rock",
    title: "Gió cát thảo nguyên & lưng ngựa non",
    note: "Hai trận gió cát; chú ngựa non bối rối; Bayarmaa nhớ ‘Help me’ quá chậm.",
    date: "2025-03", year: 2025 },

  { country: "Mông Cổ", place: "Terelj (river)",
    title: "Lao vun vút trên sông băng Terelj",
    note: "Dog sledding trên mặt băng lấp lánh – bản giao hưởng gió, chó kéo, nắng.",
    date: "2025-03", year: 2025 },

  { country: "Mông Cổ", place: "Terelj – Lkhamaa / Glory Resort",
    title: "“Tôi sinh ra trong lều ger”",
    note: "Thăm và ngủ lều ger; văn hóa du mục & phiên bản ‘quê hương’ của Bayarmaa.",
    date: "2025-03", year: 2025 }
];

const countrySelect = document.getElementById('countrySelect');
const regionSelect  = document.getElementById('regionSelect');
const placeSelect   = document.getElementById('placeSelect');
const breadcrumb    = document.getElementById('breadcrumb');

function initTravelSelectors() {
  countrySelect.innerHTML = `<option value="">— Chọn quốc gia —</option>` +
    Object.keys(travelMap).map(c => `<option value="${c}">${c}</option>`).join('');

  countrySelect.onchange = () => {
    const c = countrySelect.value;
    regionSelect.innerHTML = `<option value="">— Chọn miền (nếu là Việt Nam) —</option>`;
    placeSelect.innerHTML  = `<option value="">— Chọn địa danh —</option>`;
    regionSelect.disabled = true; placeSelect.disabled = true;
    setBreadcrumb({country:c});

    if (!c) { renderTravelList([]); return; }

    const node = travelMap[c];
    if (node && node.type === "country") {
      placeSelect.disabled = false;
      placeSelect.innerHTML += (node.places || []).map(p => `<option value="${p}">${p}</option>`).join('');
      renderByCountry(c);
    } else if (node && node.type === "vietnam") {
      regionSelect.disabled = false;
      regionSelect.innerHTML += Object.keys(node.regions).map(r => `<option value="${r}">${r}</option>`).join('');
      renderByCountry(c);
    } else {
      renderTravelList([]);
    }
  };

  regionSelect.onchange = () => {
    const c = countrySelect.value;
    const r = regionSelect.value;
    placeSelect.innerHTML = `<option value="">— Chọn địa danh —</option>`;
    placeSelect.disabled = true;
    setBreadcrumb({country:c, region:r});

    if (!c) return;
    const node = travelMap[c];
    if (node && node.type === "vietnam" && r) {
      placeSelect.disabled = false;
      placeSelect.innerHTML += node.regions[r].map(p => `<option value="${p}">${p}</option>`).join('');
      renderByCountryRegion(c, r);
    } else {
      renderByCountry(c);
    }
  };

  placeSelect.onchange = () => {
    const c = countrySelect.value;
    const r = regionSelect.value || null;
    const p = placeSelect.value;
    setBreadcrumb({country:c, region:r, place:p});
    renderBySelection(c, r, p);
  };

  renderTravelList([]);
}
initTravelSelectors();

function setBreadcrumb({country=null, region=null, place=null}) {
  const parts = [];
  if (country) parts.push(country);
  if (region)  parts.push(region);
  if (place)   parts.push(place);
  breadcrumb.innerHTML = parts.length ? parts.join(" › ") : "";
}

function renderByCountry(country) {
  const list = travelEntries.filter(e => e.country === country);
  renderTravelList(list);
}
function renderByCountryRegion(country, region) {
  const list = travelEntries.filter(e => e.country === country && e.region === region);
  renderTravelList(list);
}
function renderBySelection(country, region, place) {
  let list = travelEntries.filter(e => e.country === country);
  if (region) list = list.filter(e => e.region === region);
  if (place)  list = list.filter(e => e.place === place);
  renderTravelList(list);
}

function renderTravelList(list) {
  const wrap = document.getElementById('travelList');
  if (!list.length) {
    wrap.innerHTML = `<div class="col-span-full text-neutral-500">Chọn quốc gia/miền/địa danh để xem bài Du ký.</div>`;
    return;
  }
  wrap.innerHTML = list.map(t => `
    <article class="rounded-2xl border bg-white p-5 transition-shadow hover:shadow-md">
      <div class="flex items-center justify-between">
        <span class="inline-block text-xs px-2 py-1 rounded-full bg-neutral-100">${t.year || ""}</span>
        <span class="text-xs text-neutral-500">${t.country}${t.region ? " • " + t.region : ""}</span>
      </div>
      <h3 class="mt-3 text-lg h-serif font-semibold leading-snug">${t.title}</h3>
      <p class="text-[15px] leading-7 text-neutral-700 mt-2">${t.note || ""}</p>
      <div class="mt-2 text-xs text-neutral-500">Địa danh: ${t.place}${t.date ? " • " + t.date : ""}</div>
    </article>
  `).join('');
}
