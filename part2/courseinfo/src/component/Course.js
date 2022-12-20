import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
  let total = 0
  total = course.parts.reduce(
    (a, b) => {
      return {
        exercises: a.exercises + b.exercises,
      }
    },
    {
      exercises: 0,
    },
  )
  console.log(total)

  return (
    <>
      <Header course={ course } />
      <Content parts={ course.parts } />
      <Total sum={total.exercises} />
    </>
  )
}

export default Course
