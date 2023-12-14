import { useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextQuestion from './components/nextQuestion'
import { useReducer } from 'react'
import Progress from './components/Progress'
import Finished from './components/Finished'
import Footer from './components/Footer'
import Timer from './components/Timer'

const SECS_PER_QUESTION = 30

function reducer(state, action) {
  
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active",secondsRemaining: state.questions.length * SECS_PER_QUESTION };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        scorePoints: action.payload === question.correctOption ? state.scorePoints + question.points : state.scorePoints,
      };
    case "nextQuestion" :
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state,status:"finished",highscore:state.scorePoints > state.highscore ? state.scorePoints : state.highscore}
    case "restart":
      return { ...state, status: "ready", scorePoints: 0, answer: null, index: 0 }
    case "timer":
      return{...state, secondsRemaining : state.secondsRemaining - 1,status: state.secondsRemaining === 0 ? "finished" : state.status}
      
  
    default:
      throw new Error("unknown action")
  }
  
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  scorePoints: 0,
  highscore: 0,
  secondsRemaining:null
}


function App() {

  const [{questions,status,index,answer,scorePoints,highscore,secondsRemaining}, dispatch] = useReducer(reducer,initialState)

  const maxPossiblePoints = questions.reduce((prev,curr) => prev +curr.points,0)

  useEffect(() => {

    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) {
         throw new Error("something went wrong") 
        }
        const data = await res.json()
        dispatch({type:"dataReceived",payload:data})

      }
      catch (error) {
        dispatch({type:"dataFailed"})
        
      }
    }
    
    getData()
   
    return () => {
    }
  }, [])
  
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen quan={questions.length} onStartHandler={() => dispatch({type:"start"})} />}
        {status === "active" && (
          <>
            <Progress index={index} numQuestion={questions.length} points={scorePoints} maxPoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
              <NextQuestion dispatch={dispatch} answer={answer} index={index} question={questions} />
            </Footer>
          </>
        )}
        {status === "finished" && <Finished points={scorePoints} mostPoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  )
}

export default App
