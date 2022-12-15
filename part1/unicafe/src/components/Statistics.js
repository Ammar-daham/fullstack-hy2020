import StatisticLine from "./StatisticLine"

const Statistics = ({good, neutral, bad}) => {
    if(good === 0 && neutral === 0 && bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    let sum = good + bad + neutral
    return (
        <div>
            <h1>Statistics</h1>
            <StatisticLine text="Good" value={good}></StatisticLine>
            <StatisticLine text="Neutral" value={neutral}></StatisticLine>
            <StatisticLine text="Bad" value={bad}></StatisticLine>
            <StatisticLine text="All" value={sum}></StatisticLine>
            <StatisticLine text="Average" value={sum/3}></StatisticLine>
            <StatisticLine text="Positive" value={good/sum*100}></StatisticLine>
            <StatisticLine text="Negative" value={bad/sum*100}></StatisticLine>
        </div>

    )
}

export default Statistics