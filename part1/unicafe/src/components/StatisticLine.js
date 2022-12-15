

const StatisticLine = ({ text, value, percentage }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>{text}</td>
                    <td>{value} {percentage}</td>
                </tr>
            </tbody>
        </table>

    )
}

export default StatisticLine