import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
    
    const mins = Math.floor(secondsRemaining / 60)
    const secs = secondsRemaining % 60
    
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({type:"timer"})
        }, 1000);
        return () => {
            clearInterval(interval)
        }
        
    }, [dispatch])
    
    return (
        <div className="timer">
            {mins < 10 && "0"}{mins}:
            {secs < 10 &&"0"}{secs}
        </div>
    )
}

export default Timer
