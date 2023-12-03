import { useState } from 'react'
import DataLoader from "./components/DataLoader"
import DataRenderer from './components/DataRenderer'
import DataSearch from './components/DataSearch'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchResults, setSearchResults] = useState(null)
  const itemsPerPage = 10

  let indexOfLastItem = currentPage * itemsPerPage
  let indexOfFirstItem = indexOfLastItem - itemsPerPage
  let currentItems = searchResults ? searchResults.slice(indexOfFirstItem, indexOfLastItem): data && data.slice(indexOfFirstItem, indexOfLastItem)

  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const incrementPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <>
      <DataLoader setData={setData} />
      {data && <DataSearch data={data} setSearchResults={setSearchResults} />}
      {data && <DataRenderer data={currentItems} />}
      <div className="pagination">
        <button className='first-page' onClick={() => setCurrentPage(1)}>&lt;&lt;</button>
        <button className='previous-page' onClick={decrementPage}>&lt;</button>
        {searchResults ? Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentPage(i + 1)
            }}
          >
            {i + 1}
          </button>
        )) : data && Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentPage(i + 1)
            }}
          >
            {i + 1}
          </button>
        ))}
        <button className='next-page' onClick={incrementPage}>&gt;</button>
        <button className='last-page' onClick={() => setCurrentPage(Math.ceil(data.length / itemsPerPage))}>&gt;&gt;</button>
      </div>
    </>
  )
}

export default App
