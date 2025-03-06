import React, { useState } from 'react'

const MovieSort = ({ sortItemList, setSortItemList }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const getSortLabel = (sortOption) => {
    switch (sortOption) {
      case 'popularity.desc':
        return 'Most Popular'
      case 'popularity.asc':
        return 'Least Popular'
      case 'release_date.desc':
        return 'Newest First'
      case 'release_date.asc':
        return 'Oldest First'
      default:
        return sortOption
    }
  }

  return (
    <div className="flex items-center">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-gray-100"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {getSortLabel(sortItemList[0])}
            <svg
              className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-dark-100 ring-1 shadow-2xl ring-light-100/20 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {sortItemList.map((item, index) => (
                <button
                  key={index}
                  className={`block px-4 py-2 text-sm w-full text-left ${sortItemList[0] === item ? 'text-light-100 font-medium' : 'text-light-200'} hover:bg-dark-100/80 hover:text-light-100`}
                  onClick={() => {
                    const newSortList = [...sortItemList];
                    newSortList.splice(index, 1);
                    newSortList.unshift(item);
                    setSortItemList(newSortList);
                    setIsOpen(false);
                  }}
                >
                  {getSortLabel(item)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieSort
