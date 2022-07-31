const Error = ({ message }) => {
    const style = {
        color: 'green',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 4,
        padding: 8,
        marginBottom: 10,
        marginTop: 10
    }
    if (message[0] !== null) {
        return (
            <div style={{ ...style, color: 'green' }}>
                <h2 >{message[0]} </h2>
            </div>
        )
    }
    if (message[1] !== null) {
        return (
            <div style={{ ...style, color: 'red' }}>
                <h2 >{message[1]} </h2>
            </div>
        )
    }
}
export default Error