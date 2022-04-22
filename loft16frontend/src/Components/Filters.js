import React from 'react'

function Filters() {
    return (
        <div>
            <div className="flex justify-between ">
                <p className="text-xl font-semibold text-black"> 
                    Filters
                </p>
                <button className="bg-teal-500 px-2 py-1 rounded-md text-white">
                    Apply
                </button>
            </div>
            <div className="my-4">
                <p className="text-lg text-black">
                    Availability
                </p>
            </div>
            <div>
                <p className="text-lg text-black">
                    Sort By Price
                </p>
            </div>
        </div>
    )
}

export default Filters
