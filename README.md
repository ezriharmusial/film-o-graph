# Film-O-Graph

## Doel

Maak een web app waarin je films met acteurs kunt bijhouden.

## Technisch

De keuze in toegepaste talen en frameworks is vrij te kiezen, maar het is een vereiste dat de frontend middels Graphql met de backend communiceert en dat de data in een database wordt opgeslagen.

Een voorbeeld stack is een Vue.js frontend met een Node.js Apollo server en SQLite database. Maar als je snel een Serverless Graphql backend obv API Gateway en DynamoDB gekoppeld aan een React frontend op S3 hebt staan is dat ook leuk.

## Requirements

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

## Overig

Werk de applicatie op een agile manier uit. Dwz zorg dat je in kleine stappen werkt, waarbij elke stap eindigt met werkende code. Het is veel belangrijker dat er een aantal features volledig werken, dan dat er 10 features bijna werken.

Stuur binnen 48 uur na dit mailtje een Github/lab repo op met daarin alles om de code op te kunnen starten. Maak gebruik van git en registreer zo je voortgang middels verschillende commits.

# Install

The instructions assume that you have already installed [Docker](https://docs.docker.com/installation/) and [Docker Compose](https://docs.docker.com/compose/install/).

In order to get started be sure to clone this project onto your host and enter the Directory.

    ```
    git clone https://github.com/ezri-harmusial/film-o-graph.git
    cd film-o-graph
    ```

Bring up the Dgraph Backend with Docker-compose, add the graphQl schema and fill it with initial data.

    ```
    sudo docker-compose up -d
    curl -X POST localhost:8080/admin/schema --data-binary '@./dgraph/schema'
    curl 'http://localhost:8080/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'Origin: altair://-' --data-binary '{"query":"mutation addMovies($data:[AddMovieInput!]!){addMovie(input:$data){numUids movie{id title length actors{name nationality}}}}","variables":{"data":[{"title":"Lord of the Grins","length":"7320","actors":[{"name":"Elinoh Steel","nationality":"Irish"},{"name":"Borlando Gloom","nationality":"American"},{"name":"Tiv Wyler","nationality":"French"}]},{"title":"The Fandelorian","length":"5580","actors":[{"name":"Jancarlo Despasito","nationality":"Mexican"},{"name":"Jan Knoll","nationality":"Nederlands"}]}]}}' --compressed
    ```

Enter the webapp directory, install dependencies with yarn or npm and start the webapp

    ```
    cd webapp
    yarn
    yarn start
    ```

That's it. Film-O-Graph is up and Running. Enjoy!
