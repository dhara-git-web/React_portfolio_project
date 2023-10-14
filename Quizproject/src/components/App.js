 import React, { useEffect, useReducer  } from "react";
import Header from "./Header";
 import Main from "./Main";
 import Loader from "./Loader";
 import Error from "./Error";
import Startscreen from "./startscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./footer";



 const SECS_PER_QUESTION = 15;
const initialstate={questions:[],
//loading,error,ready,active,finished
status:"Loading",
index: 0,
answer:null,
points:0,
highscore: 0,
secondsRemaining :null,
}
function reducer(state,action){
switch(action.type){
    case"dataReceived":
    return{
        ...state,
        questions:action.payload,
        status:"Ready",
    };
    case "dataFailed":
return{
    ...state,status:"error"
};
case "start":
return{ ...state, status: "active" ,secondsRemaining : state.questions.length * SECS_PER_QUESTION};
case "newAnswer":
     const question = state.questions.at(state.index);
return{
    ...state,
    answer:action.payload,
    points:action.payload ===question.correctOption 
 ? state.points+ question.points : state.points, };
 case "nextQuestion":
    return {...state,index:state.index+1 , answer :null};
case "finish":
    return {...state,status:"finished", highscore :state.points>state.highscore ?state.points:state.highscore};
    case "restart":
        return{...initialstate,questions:state.questions,status:"Ready" };
        case "Tick":
            return{...state,secondsRemaining:state.secondsRemaining-1, status:state.secondsRemaining=== 0 ? "finished": state.status,}

    default:
        throw new Error("Action Unknown");
}
}
export default function App() {
    const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch]= useReducer(reducer,initialstate);
    const numQuestions=questions.length;
    const maxPossiblePoints = questions.reduce((prev,cur)=>prev+cur.points,0)


useEffect(function(){fetch("http://localhost:9000/questions")
.then((res)=> res.json())
.then((data) => dispatch({type:"dataReceived",payload:data}))
.catch((err)=> dispatch({type:"dataFailed"}));
},[]);
    return (
        <div className="app">
            <Header></Header>
            <Main>
                {status === "Loading" &&<Loader></Loader>}
                {status === "error" &&<Error></Error>}
                {status === "Ready" &&<Startscreen numQuestions={numQuestions} dispatch={dispatch}> </Startscreen>}
                {status === "active" && (
                <>
                <Progress numQuestions ={numQuestions}  index={index} answer={answer} points={points} maxPossiblePoints={maxPossiblePoints}> </Progress>
                <Question question={questions[index]} dispatch={dispatch}  answer={answer}></Question> 
                
                <Footer>
                    <Timer dispatch = {dispatch} secondsRemaining={secondsRemaining}></Timer>
                <NextButton dispatch ={dispatch} answer={answer}  numQuestions ={numQuestions}  index={index}></NextButton>
                </Footer>
                </>
                )}
               {status ==="finished" && <FinishScreen points ={points} maxPossiblePoints ={maxPossiblePoints } highscore ={highscore} dispatch={dispatch} ></FinishScreen >}

             
            </Main>
        </div>
    )
}










