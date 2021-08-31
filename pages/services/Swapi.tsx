const BASEURL = 'https://swapi.dev/api/';

export function getCharacters(next?: string): Promise<any> {
    return fetch(next ? next : BASEURL + 'people').then(response => response.json());
}

export function getCharacter(name: string | string[]): Promise<any> {
    return fetch(`${BASEURL}people/?search=${name}`).then(response => response.json());
}
