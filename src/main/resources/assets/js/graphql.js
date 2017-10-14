class GraphQlService extends RcdObject {
    static fetch(query, variables) {
        return fetch(config.baseUrl + '/_/service/com.enonic.app.officeleague/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }).then(response => response.json());
        //TODO Handle errors
    }
}