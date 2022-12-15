

const Part = (props) => {
    console.log(props)
    return (
        <div>
            <p>{props.partName} {props.partExercises}</p>
        </div>
    )
}

export default Part;