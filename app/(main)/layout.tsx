import React from 'react'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="">
            {children}
        </main>
    )
}

export default AppLayout