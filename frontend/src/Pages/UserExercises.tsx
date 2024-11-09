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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12

    useEffect(() => {
        const getExercises = async () => {
            const data = await fetchExercises()
            setExercises(data)
        }
        getExercises()
    }, [])

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    const handleFilterCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(e.target.value)
        setFilterVale("")
        setCurrentPage(1)
    }

    const handleFilterValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterVale(e.target.value)
        setCurrentPage(1)
    }

    const filteredExercises = exercises.filter((exercise: any) => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter =
            filterCategory && filterValue
                ? exercise[filterCategory]?.toLowerCase() === filterValue.toLowerCase()
                : true
        return matchesSearch && matchesFilter
    })

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredExercises.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);


    const filterOptions: { [key: string]: string[] } = {
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
            <div className="card-container">
                {currentItems.length > 0 ? (
                    currentItems.map((exercise: any) => (
                        <ExerciseCard key={exercise.id} exercise={exercise}/>
                    ))
                ) : (
                    <p>No exercises found</p>
                )
                }
            </div>
            <div className="pagination">
                {Array.from({length: totalPages}, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
                    >
                        {pageNumber}
                    </button>
                    ))}
            </div>
            <Footer/>
        </div>
    )
}

export default UserExercisesPage