
import React, { useEffect, useState } from 'react'

export default function Mybook({ refresh }) {

    const [books, setBooks] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const [Genre, setGenre] = useState("")
    const [Price, setPrice] = useState("")

    useEffect(() => {
        fetchBooks()
    }, [refresh])

    function fetchBooks(url = "https://long-blue-worm-gear.cyclic.app/api/book") {

        console.log(url);

        setIsloading(true)

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.isError) {
                    alert('Somthing Went Wrong In Fetching Books')
                } else {
                    setBooks(data.book)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsloading(false)
            })

    }

    function handleDeleteBook(id) {

        setIsloading(true)

        fetch(`https://long-blue-worm-gear.cyclic.app/api/book/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.msg)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                fetchBooks()
            })


    }

    function handleFilter(e) {

        let v = e.target.value

        setGenre(v)

        if (!v && !Price) {
            fetchBooks()
            return
        }

        let url = `https://long-blue-worm-gear.cyclic.app/api/book?Genre=${v}`

        if (Price) {
            url += `&Price=${Price}`
        }

        fetchBooks(url)
    }

    function handleSort(e) {

        let v = e.target.value

        setPrice(v)

        if (!v && !Genre) {
            fetchBooks()
            return
        }

        let url = `https://long-blue-worm-gear.cyclic.app/api/book?Genre=${Genre}`

        if (v) {
            url += `&Price=${v}`
        }

        fetchBooks(url)
    }


    return <>
        <h1>Find Book</h1>
        <div className='bookSection'>
            <div>
                <select value={Genre} name="Genre" onChange={handleFilter} >
                    <option value="">Filter By Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Comic">Comic</option>
                </select>
                <select value={Price} name="Price" onChange={handleSort} >
                    <option value="">Sort By Price</option>
                    <option value="asc">Low To High</option>
                    <option value="desc">High To Low</option>
                </select>
            </div>
            <div>
                {
                    books.map(({ Title, Author, Price, Description, Genre, _id }) => {
                        return <div key={_id}>
                            <p>Title : {Title}</p>
                            <p>Author : {Author}</p>
                            <p>Genre : {Genre}</p>
                            <p>Description : {Description}</p>
                            <p>Price : Rs.{Price}</p>
                            <button onClick={() => handleDeleteBook(_id)} className='deleteBtn'>Delete</button>
                        </div>
                    })
                }
            </div>

        </div>
    </>
}