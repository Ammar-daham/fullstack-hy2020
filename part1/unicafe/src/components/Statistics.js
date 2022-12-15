

const Statistics = ({good, neutral, bad}) => {
    if(good === 0 && neutral === 0 && bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    let sum = good + bad + neutral
    return (
        <>
            <h1>statistics</h1>
            <p>good: {good}</p>
            <p>neutral: {neutral}</p>
            <p>bad: {bad}</p>
            <p>all: {sum}</p>
            <p>average: {sum/3}</p>
            <p>positive: {good/sum*100} %</p>
            <p>negative: {bad/sum*100} %</p>
            <p>neutral: {neutral/sum*100} %</p>
        </>

    )
}

export default Statistics