import Exercise from "../Types/Exercises.ts";
import React from "react";
import "./styles/ExerciseCard.css"

const ExerciseCard: React.FC<{exercise: Exercise}> = ({ exercise }) => (
    <div className="card">
        <img src={exercise.gifUrl} alt={exercise.name}/>
        <div className="tags">
            {exercise.target && <span>{exercise.target}</span>}
            {exercise.bodyPart && <span>{exercise.bodyPart}</span>}
        </div>
        <h3>{exercise.name}</h3>
    </div>
)

export default ExerciseCard;