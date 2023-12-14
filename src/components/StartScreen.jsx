function StartScreen({quan,onStartHandler}) {
    return (
        <div className="start">
            <h2>Welcome To The React Quiz</h2>
            <h3>{quan} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={onStartHandler}>Let's Get Started</button>
        </div>
    )
}

export default StartScreen
