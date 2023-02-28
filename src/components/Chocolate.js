

const Chocolate = ({chocolate, deleteChocolate}) => {
    return (
        <div className="chocolate">
            <h3>{chocolate.name}</h3>
            <p>Estate: {chocolate.estate.name}</p>    
            <p>Cocoa % {chocolate.cocoaPercentage}</p>
            <div className="chocolate-buttons">
                <button>Show</button>
                <button onClick={() => deleteChocolate(chocolate.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Chocolate;