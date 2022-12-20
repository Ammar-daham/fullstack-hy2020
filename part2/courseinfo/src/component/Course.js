import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const Course = ({ course }) => {
    console.log("Course: " , course)
    let sum = 0;
    course.parts.map( part  => sum = sum + part.exercises)
    return (
        <>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total sum={sum}/>
        </>

    )
} 

export default Course