import axios from 'axios';

const baseURL = 'https://exercisedb.p.rapidapi.com'

const apiCall = async (url: string) => {
    try {
        const options = {
            method: 'GET',
            url,
            params: { limit: '6' },
            headers: {
                'X-RapidAPI-Key': '8dad6d0c59msh4284bccf0694c95p12927cjsneb10bffb90a9',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }


}


export const fetchData = async (name: string) => {
    const data = await apiCall(baseURL + `/exercises/bodyPart/${name}`)
    return data
}