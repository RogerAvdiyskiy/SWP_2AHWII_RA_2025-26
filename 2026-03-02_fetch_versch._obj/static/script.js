let cachedData = [];
let sortDirection = { 0: true, 1: true };

async function holeEssen() {
    const loadBtn = document.getElementById('loadBtn');
    const status = document.getElementById('status');
    const errorMsg = document.getElementById('errorMessage');
    const stats = document.getElementById('stats');
    
    loadBtn.disabled = true;
    loadBtn.textContent = 'Lädt...';
    status.textContent = 'Daten werden geladen...';
    status.className = 'status loading';
    errorMsg.textContent = '';

    try {
        const response = await fetch('/essen');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Antwort ist kein JSON');
        }

        const daten = await response.json();
        cachedData = daten;
        
        zeigeDaten(daten);
        
        status.textContent = `${daten.length} Einträge geladen`;
        status.className = 'status success';
        updateStats(daten);
        
    } catch (error) {
        status.textContent = 'Fehler beim Laden';
        status.className = 'status error';
        errorMsg.textContent = `Fehler: ${error.message}`;
        console.error('Fetch-Fehler:', error);
    } finally {
        loadBtn.disabled = false;
        loadBtn.textContent = 'Hole Essen';
    }
}

function zeigeDaten(daten) {
    const tabelle = document.getElementById('tabelle');
    
    if (!daten || daten.length === 0) {
        tabelle.innerHTML = '<tr><td colspan="2">Keine Daten vorhanden</td></tr>';
        return;
    }

    tabelle.innerHTML = daten.map((eintrag, index) => `
        <tr class="${index % 2 === 0 ? 'even' : 'odd'}" data-name="${eintrag.name.toLowerCase()}" data-essen="${eintrag.essen.toLowerCase()}">
            <td>${escapeHtml(eintrag.name)}</td>
            <td>${escapeHtml(eintrag.essen)}</td>
        </tr>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function loescheEssen() {
    const tabelle = document.getElementById('tabelle');
    const status = document.getElementById('status');
    const stats = document.getElementById('stats');
    
    tabelle.innerHTML = '';
    status.textContent = 'Liste gelöscht';
    status.className = 'status';
    stats.innerHTML = '';
    cachedData = [];
}

function filterTable() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#tabelle tr');
    let visibleCount = 0;

    rows.forEach(row => {
        const name = row.getAttribute('data-name') || '';
        const essen = row.getAttribute('data-essen') || '';
        const matches = name.includes(filter) || essen.includes(filter);
        
        row.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
    });

    const stats = document.getElementById('stats');
    if (cachedData.length > 0) {
        stats.innerHTML = `Zeige ${visibleCount} von ${cachedData.length} Einträgen`;
    }
}

function sortTable(columnIndex) {
    const direction = sortDirection[columnIndex];
    sortDirection[columnIndex] = !direction;
    
    const sortedData = [...cachedData].sort((a, b) => {
        const key = columnIndex === 0 ? 'name' : 'essen';
        const valA = a[key].toLowerCase();
        const valB = b[key].toLowerCase();
        
        if (valA < valB) return direction ? -1 : 1;
        if (valA > valB) return direction ? 1 : -1;
        return 0;
    });

    zeigeDaten(sortedData);
}

function updateStats(daten) {
    const stats = document.getElementById('stats');
    const essenCounts = {};
    
    daten.forEach(eintrag => {
        essenCounts[eintrag.essen] = (essenCounts[eintrag.essen] || 0) + 1;
    });

    const mostPopular = Object.entries(essenCounts)
        .sort((a, b) => b[1] - a[1])[0];

    stats.innerHTML = `
        <div class="stat-item">📊 ${daten.length} Personen</div>
        <div class="stat-item">🍕 ${Object.keys(essenCounts).length} verschiedene Gerichte</div>
        <div class="stat-item">⭐ Beliebtestes: ${mostPopular ? mostPopular[0] + ` (${mostPopular[1]}x)` : 'N/A'}</div>
    `;
}

window.addEventListener('error', (event) => {
    console.error('Globaler Fehler:', event.error);
});
