const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    // acc is cumulative sum so far, part.exercises is current value to add to cumulative
    // 0 is the initial value
    const sum = parts.reduce((acc, part) =>  acc + part.exercises, 0)
    return (
        <p>
            <b>total of {sum} exercises</b>
        </p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
        <Part key={part.id} part={part} />
    )}     
  </>

const Course = ({course}) => 
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>

export default Course