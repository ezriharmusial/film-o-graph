# Doel

Maak een web app waarin je films met acteurs kunt bijhouden.

# Technisch

De keuze in toegepaste talen en frameworks is vrij te kiezen, maar het is een vereiste dat de frontend middels Graphql met de backend communiceert en dat de data in een database wordt opgeslagen.

Een voorbeeld stack is een Vue.js frontend met een Node.js Apollo server en SQLite database. Maar als je snel een Serverless Graphql backend obv API Gateway en DynamoDB gekoppeld aan een React frontend op S3 hebt staan is dat ook leuk.

# Requirements

Om wat richting te geven over welke dingen we graag willen zien hebben we een lijstje met requirements op volgorde van prioriteit:

1. Als user kun je een film met titel en speeltijd toevoegen
2. Als user kun je een acteur met naam en nationaliteit toevoegen
3. Als user kun je bij het toevoegen van een film in 1 formulier bestaande acteurs koppelen of nieuwe acteurs aanmaken (de mutation voor het maken van een film kan dus genest acteurs aanmaken)
4. Als user kun je een lijst van films raadplegen
5. Als user wil ik dat de applicatie in een aantrekkelijke vormgeving getoond wordt (gebruik hiervoor bijv. een bestaande grote UI-library zoals vuetify of element-ui)
6. Als user kun je een bestaande film updaten en verwijderen
7. Als developer kan ik de applicatie makkelijk opstarten met bijv. Docker
8. Als user kun je een lijst van acteurs raadplegen
9. Als user kun je een bestaande acteurs updaten en verwijderen

# Overig

Werk de applicatie op een agile manier uit. Dwz zorg dat je in kleine stappen werkt, waarbij elke stap eindigt met werkende code. Het is veel belangrijker dat er een aantal features volledig werken, dan dat er 10 features bijna werken.

Stuur binnen 48 uur na dit mailtje een Github/lab repo op met daarin alles om de code op te kunnen starten. Maak gebruik van git en registreer zo je voortgang middels verschillende commits.
