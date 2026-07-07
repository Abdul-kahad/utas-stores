
const SearchBar = ({ searchTerm, onSearch }) => {
    const handleInputChange = (event) => { 
        // onSearch(event.target.value)
    }
    return (
        <div className="search-bar w-[50%]">
            <input
                className="bg-white text-gray-900 text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100%]"
                type="text"
                placeholder=" Search items, suppliers, requests..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    )
  }


export default SearchBar