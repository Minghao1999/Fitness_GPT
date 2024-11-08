import React, {useEffect, useState} from "react";
import {fetchExercises} from "../Services/exercises.tsx";
import ExerciseCard from "../Components/ExerciseCard.tsx";
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";
import "./Styles/UserExercises.css"

const UserExercisesPage: React.FC = () => {
    const [exercises, setExercises] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getExercises = async () => {
            const data = await fetchExercises()
            setExercises(data)
        }
        getExercises()
    },[])

    const filteredExercises = exercises.filter((exercise: any)=>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSearchChange = (e: React.ChangeEvent<HTMLElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div>
            <BoardNavbar/>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Exercise by Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="header">
                {filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise: any) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))
                ):(
                    <p>No exercises found</p>
                )
                }
            </div>
            <Footer/>
        </div>
    )
}

export default UserExercisesPage