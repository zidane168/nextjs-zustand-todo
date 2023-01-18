import * as React from 'react'

interface ITitleProps {
    children: React.ReactNode
}

export default function TDTitle( { children }: ITitleProps ) {
    return (
        <div className="bg-sky-500 shadow-lg p-2 rounded-md text-white uppercase text-center mt-4 container mx-auto">
            { children }
        </div>
    )
}