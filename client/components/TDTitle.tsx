import * as React from 'react'

export default function TDTitle( { children }: React.ReactNode ) {
    return (
        <div className="bg-sky-500 shadow-lg p-2 rounded-md text-white uppercase text-center mt-4 container mx-auto">
            { children }
        </div>
    )
}