document.addEventListener('DOMContentLoaded', function () {
    const contentContainer = document.getElementById('kennisbank-content');
    const searchInput = document.getElementById('searchInput'); // Behoud voor toekomstig gebruik
    const noResultsMessage = document.getElementById('noResults'); // Behoud voor toekomstig gebruik

    // Functie om de blauwdruk-data te laden en de HTML op te bouwen
    async function laadBlauwdruk() {
        try {
            const response = await fetch('kennisbank.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            let html = '<div class="grid-container">';
            data.pijlers.forEach(pijler => {
                html += `
                    <div class="content-pillar">
                        <h2><i class="${pijler.icoon}"></i> ${pijler.titel}</h2>
                        <ul>
                `;
                pijler.links.forEach(link => {
                    html += `
                        <li>
                            <a href="${link.url}">
                                <i class="${link.icoon}"></i> ${link.tekst}
                            </a>
                        </li>
                    `;
                });
                html += `
                        </ul>
                    </div>
                `;
            });
            html += '</div>';
            contentContainer.innerHTML = html;

        } catch (error) {
            contentContainer.innerHTML = `<p class="loading-message">Fout bij het laden van de kennisbank structuur. Probeer het later opnieuw.</p>`;
            console.error("Fetch error:", error);
        }
    }

    // De zoekfunctie is nu niet actief, omdat we links tonen ipv content.
    // Deze kan later worden aangepast om de links te filteren.
    searchInput.style.display = 'none'; // We verbergen de zoekbalk tijdelijk

    // Start het proces
    laadBlauwdruk();
});
