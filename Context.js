import React, { createContext, useState } from "react";

const FitnessItems = createContext();

export const FitnessContext = ({ Children }) => {

    const [completed, setCompleted] = useState([])
    const [index, setIndex] = useState(0)
    return (
        <FitnessItems.Provider value={{
            completed,
            setCompleted,
            index,
            setIndex
        }}>
            {Children}
        </FitnessItems.Provider>
    )
}