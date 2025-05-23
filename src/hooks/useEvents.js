import { useSelector } from "react-redux"

export const useEvents = () => {
    return useSelector(state => state.events);
} 