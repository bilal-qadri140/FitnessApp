const baseURL = 'https://exercisedb.p.rapidapi.com'

const apiCall = async (url: string) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8dad6d0c59msh4284bccf0694c95p12927cjsneb10bffb90a9',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return response.json()
    } catch (error) {
        console.log('hi');
        console.error(error);
    }
}

export const fetchData = async (name: string) => {
    const data = await apiCall(baseURL + `/exercises/bodyPart/${name}?limit=10`)
    return data
}