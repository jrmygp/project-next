const MyComponent = () => {
    const mapList = () => {
        someArray.map((element) => <p>{element}</p>)
    }
    return (
        <div>
            {mapList()}
        </div>
    )
}

export default MyComponent