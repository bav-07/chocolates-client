import { useState } from "react"

const ChocolateForm = ({estates, postChocolate}) => {

    // METHOD 1
    // const [stateChocolate, setStateChocolate] = useState({
    //     name: "",
    //     cocoaPercentage: 0,
    //     estate: null
    // })

    // METHOD 2
    const [name, setName] = useState('');
    const [cocoaPercentage, setCocoaPercentage] = useState(0);
    const [estate, setEstate] = useState(null);

    const [error, setError] = useState("");

    const estateOptions = estates.map(estate => {
        return (
            <option key={estate.id} value={estate.id}>
                {estate.name}
            </option>
        )
    })

    const handleEstateChange = (event) => {
        const estateId = parseInt(event.target.value);
        const selectedEstate = estates.find(estate => estate.id === estateId);
        setEstate(selectedEstate);
    };

    const handleValidation = () => {
        if (name === "") {
            setError("Please enter a name");
            return false;
        }

        if (estate === null) {
            setError("Please select an estate");
            return false;
        }

        return true;
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const postBody = {
                name, 
                cocoaPercentage, 
                estate
            };
            postChocolate(postBody);
            setName("");
            setCocoaPercentage(0);
            setEstate(null);
        }
        
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                placeholder="Chocolate name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Cocoa Percentage"
                value={cocoaPercentage} 
                onChange={(e) => setCocoaPercentage(e.target.value)}
            />
            <select
                onChange={handleEstateChange}
                defaultValue="select-estate"
            >
                <option disabled-value="select-estate">Select an Estate</option>
                {estateOptions}
            </select>

            <button type="submit">Ok</button>
            <p>{error}</p>

        </form>
        
    )

}

export default ChocolateForm;