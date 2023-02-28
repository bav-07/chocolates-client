import { useEffect, useState } from "react";
import ChocolateForm from "../components/ChocolateForm";
import ChocolateList from "../components/ChocolateList";

const SERVER_URL = "http://localhost:8080";

const ChocolateContainer = () => {

    const [chocolates, setChocolates] = useState([]);
    const [estates, setEstates] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${SERVER_URL}/chocolates`)
        .then(response => response.json())
        .then(response => setChocolates(response))
        .catch(error => setError(error.message));

        fetch(`${SERVER_URL}/estates`)
        .then(response => response.json())
        .then(response => setEstates(response))
        .catch(error => setError(error.message));
    
    }, [])

    const postChocolate = (newChocolate) => {

        // create in database
        fetch(`${SERVER_URL}/chocolates`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newChocolate)
        })
        .then(response => response.json())
        .then(response => {
            setChocolates([...chocolates, response])
        });

    }

    const deleteChocolate = (id) => {

        // delete from the database
        fetch(`${SERVER_URL}/chocolates/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        });

        // delete locally
        const newChocolates = chocolates.filter(chocolate => chocolate.id !== id);
        setChocolates(newChocolates);

    }

    if (error !== "") return <p>Error! </p>

    return (
        <>
            <ChocolateForm estates={estates} postChocolate={postChocolate}/>
            <ChocolateList 
                chocolates={chocolates} 
                deleteChocolate={deleteChocolate}
            />   
        </>

    )

}

export default ChocolateContainer;