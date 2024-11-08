import React, { useEffect, useState } from "react";
import { fetchExercises } from "../Services/exercises.tsx";
import ExerciseCard from "../Components/ExerciseCard.tsx";
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";
import "./Styles/UserExercises.css";

const UserExercisesPage: React.FC = () => {
    const [exercises, setExercises] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const getExercises = async () => {
            const data = await fetchExercises();
            setExercises(data);
        };
        getExercises();
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = exercises.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(exercises.length / itemsPerPage);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="user-exercises-page">
            <BoardNavbar /> {/* Keep the navigation bar fixed at the top */}
            <div className="content-container">
                <div className="search-container">
                    <input type="text" placeholder="Search exercises..." />
                    <button>Search</button>
                </div>
                <div className="exercise-grid">
                    {currentItems.map((exercise: any) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>

                <ul className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default UserExercisesPage;
