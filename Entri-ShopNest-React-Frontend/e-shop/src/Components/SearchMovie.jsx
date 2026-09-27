import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import inputGroup from "react-bootstrap/InputGroup";
import Altert from "react-bootstrap/Alert";

function SearchMovie({handleMovieSearch,searchResults}) {
    const[search ,setSearch] = useState("");

    const handleSearch=(value)=>{
        setSearch(value);
        handleMovieSearch(value);
    };

    return(

        <>
        <inputGroup className="mb-3 mt-3">
        <button
            variant="warning" id="button-addon1"><Search></Search></button>
            <Form.Control value={search} onChange={(e)=>handleSearch(e.target.value)} placeholder="Search for a movie" aria-label="Search for a movie" aria-describedby="button-addon1" />
            </inputGroup>
            {search !=="" && searchResults !==0?(
                <Altert variant="info">Found {searchResults} results for "{search}"</Altert>
            ):(<span></span>)}
            </>

    );
}
