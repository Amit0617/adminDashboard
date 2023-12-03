import React from 'react';

function DataSearch({data, setSearchResults}) {
    const [searchTerm, setSearchTerm] = React.useState('')
    const handleSearch = (searchTerm) => {
        const results = data?.filter((item) => {
            return Object.values(item).some((value) => {
                return value.toLowerCase().includes(searchTerm.toLowerCase())
            })
        })
        console.log(results)
        setSearchResults(results)
    }
  return (
    <div className="data-search" style={{float: "left"}}>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
      <button onClick={() => handleSearch(searchTerm)} className='search-icon'>Search</button>
    </div>
  );
}
export default DataSearch;