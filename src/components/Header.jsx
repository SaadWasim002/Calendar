import React from 'react'

const Header = ({search , setSearch ,setFilter , filter}) => {
  return (
<header>
          <h1>Event Calendar</h1>
          <div className="controls">
            <select onChange={e => setFilter(e.target.value)} value={filter}>
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
          </div>
        </header>
  )
}

export default Header