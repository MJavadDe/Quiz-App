function Finished({ points, mostPoints,highscore,dispatch }) {

    const percentage = (points / mostPoints) * 100;
    let emojy
    if (percentage ===100) emojy = "🥇"
    if (percentage >= 80 && percentage < 100) emojy = "🎉"
    if (percentage >= 50 && percentage < 80) emojy = "😊"
    if (percentage >= 0 && percentage < 50) emojy = "😕"
    if (percentage ===0 ) emojy = "🤦‍♀️"

    return (
        <>
            <p className="result">
                <span>{ emojy}</span>You Scored <strong>{points }</strong> out of {mostPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">highscore : {highscore} points</p>
            <button className="btn btn-ui" onClick={() => dispatch({type:"restart"})}>
                Restart
            </button>
        </>
    )
}

export default Finished
