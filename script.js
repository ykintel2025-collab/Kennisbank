document.addEventListener('DOMContentLoaded', function () {
    const contentContainer = document.getElementById('kennisbank-content');
    const searchInput = document.getElementById('searchInput');
    const noResultsMessage = document.getElementById('noResults');

    // Functie om de kennisbank-data te laden en de HTML op te bouwen
    async function laadKennisbank() {
        try {
            const response = await fetch('kennisbank.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            let html = '';
            data.forEach(sectie => {
                html += `<div class="kennisbank-section">`;
                html += `<h2>${sectie.sectie_titel}</h2>`;
                sectie.vragen.forEach(item => {
                    html += `
                        <details class="accordion-item">
                            <summary>${item.vraag}</summary>
                            <div class="accordion-content">${item.antwoord}</div>
                        </details>
                    `;
                });
                html += `</div>`;
            });
            contentContainer.innerHTML = html;
            
            // Activeer de zoekfunctie nadat de content geladen is
            activeerZoekfunctie();

        } catch (error) {
            contentContainer.innerHTML = `<p class="loading-message">Fout bij het laden van de kennisbank. Probeer het later opnieuw.</p>`;
            console.error("Fetch error:", error);
        }
    }

    // Functie voor de zoekbalk
    function activeerZoekfunctie() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        const sections = document.querySelectorAll('.kennisbank-section');

        searchInput.addEventListener('keyup', function (e) {
            const query = e.target.value.toLowerCase().trim();
            let hasResults = false;

            accordionItems.forEach(item => {
                const question = item.querySelector('summary').textContent.toLowerCase();
                const answer = item.querySelector('.accordion-content').textContent.toLowerCase();
                const isMatch = question.includes(query) || answer.includes(query);
                item.classList.toggle('hidden', !isMatch);
                if(isMatch) hasResults = true;
            });

            sections.forEach(section => {
                const visibleItems = section.querySelectorAll('.accordion-item:not(.hidden)');
                section.style.display = visibleItems.length > 0 ? '' : 'none';
            });
            
            noResultsMessage.style.display = hasResults ? 'none' : 'block';
        });
    }

    // Start het proces
    laadKennisbank();
});
