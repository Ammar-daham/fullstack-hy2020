import Part from "./Part";

const Content = (props) => {
    return(
        <div>
           <Part partName={props.parts[0].name} partExercises={props.parts[0].exercises}/>
           <Part partName={props.parts[1].name} partExercises={props.parts[1].exercises}/>
           <Part partName={props.parts[2].name} partExercises={props.parts[2].exercises}/>
        </div>
    )
}

export default Content;