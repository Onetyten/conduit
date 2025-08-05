'use client'
import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { MdClose} from 'react-icons/md'
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
        className='mt-10 w-full '>
        <div className='relative w-full text-sm'>

          {/* query is set as the default value and henforth if the input of thre searchbox is changed that is logged into query you're welcome */}
          <input name='query' autoComplete='off' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Discover skilled professionals...' className='w-full border-[1px] border-gray-400 rounded-3xl py-2 px-12'/>

          <button type='submit' className='absolute left-4 top-1/2 -translate-y-1/2'>
            <FaSearch className='font-light text-xl '/>
          </button>
          
          {searchQuery&&(
            <button  type='reset' className='absolute  right-4 top-1/2 -translate-y-1/2'>
              <MdClose className='font-light text-conduit text-xl '/>
            </button> 
          )}
        </div>
        
      </form>
    </> 

    
  )
}

export default SearchForm