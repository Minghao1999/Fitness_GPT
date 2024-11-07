import React, {useEffect, useState} from "react";
import {fetchExercises} from "../Services/exercises.tsx";
import ExerciseCard from "../Components/ExerciseCard.tsx";
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";
import "./Styles/UserExercises.css"

const UserExercisesPage: React.FC = () => {
    const [exercises, setExercises] = useState([])


    useEffect(() => {
        const getExercises = async () => {
            const data = await fetchExercises()
            setExercises(data)
        }
        getExercises()
    },[])

    return (
        <div>
            <BoardNavbar/>
            <div>
                {exercises
                    .map((exercise: any) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))
                }
            </div>
            <Footer/>
        </div>
    )
}

export default UserExercisesPage