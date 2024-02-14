import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';


const EditBooks = () => {
  const {id} = useParams()
  const {bookTitle, authorName, category, imageURL, bookDescription, bookPDFURL} = useLoaderData()
  
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Biography",
    "Business",
    "Self-Help",
    "Health",
    "Fitness",
    "History",
    "Travel",
    "Cooking",
    "Art",
    "Photography",
    "Religion",
    "Philosophy",
    "Sports"
  ]

  const [selectedBookCategories, setSelectedBookCategories] = useState(bookCategories[0])

  const handleChangeSelectedValue = (event) => {
    // console.log(event.target.value)
    setSelectedBookCategories(event.target.value)
  }

  // handle book submission
  const handleUpdate = (event) => {
    event.preventDefault()
    const form = event.target

    const bookTitle = form.bookTitle.value
    const authorName = form.authorName.value
    const imageURL = form.imageURL.value
    const category = form.categoryName.value
    const bookDescription = form.bookDescription.value
    const bookPDFURL = form.bookPDFURL.value

    const updatedBookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL
    }

    // console.log(bookObj)
    // update data to the server
    fetch(`http://localhost:3000/book/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBookObj)
    }).then(res => res.json()).then(data => {
      // console.log(data)
      alert('Book Updated Successfully')
    })
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book data</h2>
      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First Row */}
        <div className='flex gap-8'>
          {/* bookTitle */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" type="text" placeholder="Book Name" name='bookTitle' defaultValue={bookTitle} required />
          </div>
          {/* authorName */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" type="text" placeholder="Author Name" name='authorName' defaultValue={authorName} required />
          </div>
        </div>

        {/* Second Row */}
        <div className='flex gap-8'>
          {/* imageURL */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" type="text" placeholder="Book Image URL" name='imageURL' defaultValue={imageURL} required />
          </div>
          {/* category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <Select id="inputState" name="categoryName" value={selectedBookCategories} onChange={handleChangeSelectedValue} className='w-full rounded'>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>
        </div>

        {/* bookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea id="bookDescription" type="text" placeholder="Book Description" name='bookDescription' defaultValue={bookDescription} rows={4} required className='w-full rounded' />
        </div>

        {/* book pdf url */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <Textarea id="bookPDFURL" type="text" placeholder="Book PDF URL" name='bookPDFURL' defaultValue={bookPDFURL} required className='w-full rounded' />
        </div>

        <Button type='submit' className='mt-5'>Update Book</Button>

      </form>
    </div>
  )
}

export default EditBooks