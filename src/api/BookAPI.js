import axios from 'axios'

const url_get_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book?key=" + import.meta.env.VITE_API_KEY

export function getBooksAPI(){

    try{

        return axios.get(url_get_books)
        .then(function(response){
            let booksFirebase = response.data.documents
            let books = []
            console.log(booksFirebase)
            for(let bk of booksFirebase){
                let book = {
                    id: bk.name.split('/book/')[1],
                    title: bk.fields.title?.stringValue,
                    category: bk.fields.category?.stringValue,
                    description: bk.fields.description?.stringValue,
                }
                books.push(book)
            }
            return books
        })

    } catch(e){
        console.error(e)
    }

}

const url_add_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book?key=" + import.meta.env.VITE_API_KEY;

export function addBooksAPI(title, category, description) {

  try {
    return axios.post(
        url_add_books,
      {
        "fields": {
          "title": {
            "stringValue": title
          },
          "category": {
            "stringValue": category
          },
          "description": {
            "stringValue": description
          }
        }
      }
    )
    .then(function(response) {
      return response.data.name.split("/book/")[1];
    });
  } catch(e) {
    console.error(e);
  }
}


export function deleteBooksAPI(id){

  const url_delete_book = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book/" + id + "?key=" + import.meta.env.VITE_API_KEY

  try{

      return axios.delete(
        url_delete_book
      )
      .then(function(response){
          console.log(response)
      })

  } catch(e){
      console.error(e)
  }

}


export function updateBookAPI(id, title, category, description){

  const url_update_book = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book/" + id + "?key=" + import.meta.env.VITE_API_KEY

  try{

      return axios.patch(
        url_update_book,
          {
              "fields": {
                "title": {
                  "stringValue": title
                },
                "category": {
                  "stringValue": category
                },
                "description": {
                  "stringValue": description
                }
              }
            }
      )
      .then(function(response){
          console.log(response)
      })

  } catch(e){
      console.error(e)
  }

}