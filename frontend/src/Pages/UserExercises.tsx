import React, {useEffect, useState} from "react";
import {fetchExercises} from "../Services/exercises.tsx";
import ExerciseCard from "../Components/ExerciseCard.tsx";
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";
import "./Styles/UserExercises.css"

const UserExercisesPage: React.FC = () => {
    const [exercises, setExercises] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterValue, setFilterVale] = useState("");

    useEffect(() => {
        const getExercises = async () => {
            const data = await fetchExercises()
            setExercises(data)
        }
        getExercises()
    },[])


    const handleSearchChange = (e: React.ChangeEvent<HTMLElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleFilterCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterCategory(e.target.value)
            setFilterVale("")
    }

    const handleFilterValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterVale(e.target.value)
    }

    const filteredExercises = exercises.filter((exercise:any)=>{
        const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter =
            filterCategory && filterValue
                ? exercise[filterCategory]?.toLowerCase() === filterValue.toLowerCase()
                : true
        return matchesSearch && matchesFilter
    })

    const filterOptions : {[key: string]: string[]} ={
        target: ["lats", "upper back", "traps", "spine"],
        bodyPart: ["back", "Lower Body", "Core"],
        equipment: ["Dumbbell", "Barbell", "Machine"],
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
                <select onChange={handleFilterCategoryChange} value={filterCategory} className="filter-category">
                    <option value="">Filter By</option>
                    <option value="target">Target</option>
                    <option value="bodyPart">Body Part</option>
                    <option value="equipment">Equipment</option>
                </select>
                {filterCategory && (
                    <select onChange={handleFilterValueChange} value={filterValue} className="filter-value">
                        <option value="">Select {filterCategory}</option>
                        {filterOptions[filterCategory].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
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