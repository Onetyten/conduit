'use client'
import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setkeyWord } from '@/state/keywordSlice/keywordSlice'



const SearchForm = () => {

    const [searchQuery,setSearchQuery]= useState("")
    const dispatch = useDispatch()

    function Search(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (searchQuery && searchQuery.trim().length>0){
        dispatch(setkeyWord(searchQuery))
      }
    }
  return (
    <>
      <form 
        onSubmit={Search}
        onReset={() => {
          setSearchQuery("");
          dispatch(setkeyWord("All services")); 
        }} 
        className='h-full w-full '>
        <div className='relative w-full text-'>

          <input name='query' autoComplete='off' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Discover skilled professionals...' className='w-full border-4 focus:select-none border-gray-400 rounded-full h-13 px-12'/>

          <button type='submit' className='absolute left-4 top-1/2 -translate-y-1/2'>
            <FaSearch className='font-light text-xl '/>
          </button>
          
          {searchQuery&&(
            <button type='submit' className='bg-conduit absolute cursor-pointer shadow-conduit/40 transition-all duration-200 hover:shadow-conduit/30 px-10 rounded-full shadow-lg hover:shadow-xl  right-0 top-1/2 -translate-y-1/2 font-semibold text-white flex w-fit justify-center items-center h-full'>
                  Search
            </button>
          )}
        </div>
        
      </form>
    </> 

    
  )
}

export default SearchForm