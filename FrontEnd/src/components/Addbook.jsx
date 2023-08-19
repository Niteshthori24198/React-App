
import React, { useState } from 'react'

export default function Addbook({handleRefresh}) {

    const initialFormData = {
        Title: "",
        Author: "",
        Genre: "",
        Description: "",
        Price: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    const [isLoading, setIsloading] = useState(false)

    const { Title, Author, Genre, Description, Price } = formData;

    function handleChange(e) {

        const { name, value } = e.target

        setFormData((prev) => {
            return { ...prev, [name]: value }
        })

    }

    function handleAddBook(e) {
        e.preventDefault()

        setIsloading(true)

        console.log(formData);

        fetch(`https://long-blue-worm-gear.cyclic.app/api/book/add`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.msg)
                handleRefresh()
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setFormData(initialFormData)
                setIsloading(false)
            })

    }


    return <>
        <h1>Add Book</h1>
        <div className='addbook_container'>
            {
                isLoading ? <h1>Loading...</h1> :
                    <form onSubmit={handleAddBook}>

                        <input type="text" placeholder='Title' name="Title" value={Title} onChange={handleChange} required />

                        <input type="text" placeholder='Author' name="Author" value={Author} onChange={handleChange} required />

                        <select name="Genre" value={Genre} onChange={handleChange} required >
                            <option value="">Select Genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Science">Science</option>
                            <option value="Comic">Comic</option>
                        </select>

                        <textarea name="Description" value={Description} onChange={handleChange} placeholder='Description' required ></textarea>

                        <input type="number" placeholder='Price' name="Price" value={Price} onChange={handleChange} required />

                        <input type='submit' value={"Add Book"} />

                    </form>
            }
        </div>

    </>
}