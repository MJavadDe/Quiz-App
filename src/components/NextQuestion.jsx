function NextQuestion({ dispatch, answer,index,question }) {
    if (answer === null) return
    if (index < question.length-1) {
        
        return( <button onClick={() => dispatch({type:"nextQuestion"})} className="btn btn-uo">
                     Next
                </button>)
    }
    if (index === question.length -1) {
        return (
            <button onClick={() => dispatch({type:"finish"})} className="btn btn-uo">
            Finish
             </button>
        )
    }
}

export default NextQuestion
