import Exercise from "../Types/Exercises.ts";
import React from "react";
import "./styles/ExerciseCard.css"
import {Link} from "react-router-dom";

const ExerciseCard: React.FC<{exercise: Exercise}> = ({ exercise }) => (
    <div className="card">
        <Link to={`/exercise-detail/${exercise.id}`} style={{textDecoration: 'none'}}>
        <img src={exercise.gifUrl} alt={exercise.name}/>
        <div className="tags">
            {exercise.target && <span>{exercise.target}</span>}
            {exercise.bodyPart && <span>{exercise.bodyPart}</span>}
            {exercise.equipment && <span>{exercise.equipment}</span>}
        </div>
        <h3>{exercise.name}</h3>
        </Link>
    </div>
)

export default ExerciseCard;