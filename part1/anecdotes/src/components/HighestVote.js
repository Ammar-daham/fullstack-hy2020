import NumOfVotes from "./NumOfVotes"

const HightestVote = ({votes, anecdotes}) => {
    const hightestVote = Math.max(...votes)
    const anecdoteWithHightestVote = anecdotes[votes.indexOf(hightestVote)]
    console.log(hightestVote)
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdoteWithHightestVote}</p>
            <NumOfVotes numOfVotes={hightestVote}/>
        </div>

    )
}

export default HightestVote