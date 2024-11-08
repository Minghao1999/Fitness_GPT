import {Component, useEffect, useState} from "react";
import {fetchExercises} from "../Services/exercises.tsx";
import {useParams} from "react-router-dom";
import "./Styles/UserExerciseDetail.css"
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";

const UserExerciseDetail: Component = () => {
    const {id} = useParams()
    const [exercise, setExercise] = useState<any>(null)

    useEffect(() => {
        const getExerciseDetail = async () =>{
            const data = await fetchExercises()
            const selectedExercise = data.find((exercise: any) => exercise.id === id)
            setExercise(selectedExercise)
        }

        if (id){
            getExerciseDetail()
        }
    }, [id]);

    if (!exercise){
        return <div>Loading...</div>
    }

    return(
        <div>
            <BoardNavbar/>
            <div className="exercise-detail">
                <img src={exercise.gifUrl} alt={exercise.name}/>
                <h1>{exercise.name}</h1>
                <p><strong>Target:</strong>{exercise.target}</p>
                <p><strong>Body Part:</strong>{exercise.bodyPart}</p>
                <p><strong>Secondary Muscles:</strong>{exercise.secondaryMuscles}</p>
                <p><strong>Equipment:</strong>{exercise.equipment}</p>
                <p><strong>Description:</strong>{exercise.instructions}</p>
            </div>
            <Footer/>
        </div>
    )
}

export default UserExerciseDetail;