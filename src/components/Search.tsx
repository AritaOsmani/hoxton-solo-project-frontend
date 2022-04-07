import React, { useState } from 'react'
import SearchedAccount from './SearchedAccount'

type Props = {
    recentMenu: boolean
    setRecentMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Search({ setRecentMenu, recentMenu }: Props) {
    const [inputValue, setInputValue] = useState('')
    return (
        <>
            <input onChange={(e) => {
                setInputValue(e.target.value)
            }}
                onClick={() => {
                    if (recentMenu) {
                        setRecentMenu(false)
                    } else {
                        setRecentMenu(true)
                    }

                }}
                type="text" name="search-field" placeholder='Search' className='search-input' />
            {recentMenu ? <div className='recents'>
                <h3>Recents</h3>
                <ul>
                    <SearchedAccount />
                    <SearchedAccount />
                </ul>

            </div> : null}
        </>


    )
}
