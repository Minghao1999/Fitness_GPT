import axios from 'axios';

const fetchExercises = async () => {
    // @ts-ignore
    const {VITE_API_KEY} = import.meta.env;
    const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '300', offset: '0'},
        headers: {
            'x-rapidapi-key': VITE_API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    }

    try{
        const response = await axios.request(options)
        return  response.data
    }catch(error){
        console.error(error);
        return []
    }
}

export {fetchExercises}