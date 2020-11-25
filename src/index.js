

//******** DOM ELEMENTS ******** //

const quoteList = document.querySelector("#quote-list")
const newQuoteForm = document.querySelector("#new-quote-form")
const deleteBtn = document.querySelector(".btn-danger")
const likeBtn = document.querySelector(".btn-success")


//******** RENDER FUNCTIONS ******** //

const renderQuotes = (quotesArray) => {

    quotesArray.forEach(quoteObj => {
        const quoteDiv = document.createElement("div")
        quoteDiv.innerHTML = `
            <li class='quote-card' data-id=${quoteObj.id}>
                <blockquote class="blockquote">
                <p class="mb-0">${quoteObj.quote}</p>
                <footer class="blockquote-footer">${quoteObj.author}</footer>
                <br>
                <button class='btn-success'>Likes: <span data-id=${quoteObj.id}>0</span></button>
                <button class='btn-danger'>Delete</button>
                </blockquote>
            </li>
        ` 
        quoteList.append(quoteDiv)
    });
    
}

const renderDeleteQuote = (id) => {
    document.querySelector(`li[data-id="${id}"]`).remove()
}

//******** EVENT HANDLERS ******** //
newQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const newQuoteObj = {
        quote: newQuoteForm.quote.value,
        author: newQuoteForm.author.value
    }

    createQuote(newQuoteObj)
    getQuotes()
})

quoteList.addEventListener("click", (e) => {
    // console.log(e.target)


    if (e.target.textContent === "Delete") {
        
        deleteItem(e.target.closest("li").dataset.id)
        getQuotes()
    }
    

})

quoteList.addEventListener("click", (e) => {
    // console.log(e.target.textContent)
    
    if (e.target.matches(".btn-success")) {
        
        const id = (e.target.closest("li").dataset.id)
        
        newLikeObj = {
            quoteId: parseInt(id)
        }

        createLike(newLikeObj)
    }
    
})


//******** FETCH FUNCTIONS ******** //

const getQuotes = () => {
        fetch('http://localhost:3000/quotes?_embed=likes')
            .then(response => {
                return response.json()
            }).then((quotesArray) => {
                renderQuotes(quotesArray)
            })
    }

const createQuote = (newQuoteObj) => {
        fetch(`http://localhost:3000/quotes`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                quote: newQuoteObj.quote,
                author: newQuoteObj.author,
            })
        })
            .then(response => {
                return response.json()
            }).then(console.log)
    }

const deleteItem = (id) => {
        fetch(`http://localhost:3000/quotes/${id}`, {
            method: "DELETE",
        })
            .then(response => {
                return response.json()
            }).then(renderDeleteQuote(id))
    }

const createLike = (newLikeObj) => {
        fetch(`http://localhost:3000/likes`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLikeObj)
        })
            .then(response => {
                return response.json()
            }).then(console.log)
    }



getQuotes()