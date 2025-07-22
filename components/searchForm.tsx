import React from 'react'
import Form from 'next/form'
import {FaSearch} from 'react-icons/fa'
import { MdClose} from 'react-icons/md'



const SearchForm = () => {
  const query = false
  return (
    <>
      {/* //whatever the input of this form is is appended to the end of the route */}
      <Form action="/" scroll={false} className='mt-10 w-full '>
        <div className='relative w-full text-sm'>

          {/* query is set as the default value and henforth if the input of thre searchbox is changed that is logged into query you're welcome */}
          <input name='query' placeholder='Discover skilled professionals...' className='w-full border-[1px] border-gray-400 rounded-3xl py-2 px-12'/>
          <button type='submit' className='absolute left-4 top-1/2 -translate-y-1/2'>
            <FaSearch className='font-light text-xl '/>
          </button>
          {/* reset button is renderd conditionally based on query */}
          {query &&(
            <button  type='reset' className='absolute  right-4 top-1/2 -translate-y-1/2'>
              <MdClose className='font-light text-conduit text-xl '/>
            </button> 
          )}
        </div>
        
      </Form>
    </> 

    
  )
}

export default SearchForm