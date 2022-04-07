import React, { useEffect, useState } from 'react'
import { User } from '../Types'
import SearchedAccount from './SearchedAccount'

type Props = {
    recentMenu: boolean
    setRecentMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Search({ setRecentMenu, recentMenu }: Props) {
    const [inputValue, setInputValue] = useState('')
    const [recentSearches, setRecentSearches] = useState<User[]>([])
    const [searchResults, setSearchResults] = useState<User[]>([])

    useEffect(() => {
        fetch(`http://localhost:4000/recents`, {
            headers: {
                Authorization: localStorage.token
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setRecentSearches(data)
                }
            })
    }, [])

    useEffect(() => {
        if (inputValue) {
            fetch(`http://localhost:4000/accountsBySearch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchInput: inputValue })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        setSearchResults(data)
                    }
                })
        } else {
            setSearchResults([])
        }

    }, [inputValue])

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

                {inputValue ? <ul>
                    {searchResults.map(recentSearch => <SearchedAccount key={recentSearch.id} recentSearch={recentSearch} />)}

                </ul>
                    :
                    <ul>
                        {recentSearches.map(recentSearch => <SearchedAccount key={recentSearch.id} recentSearch={recentSearch} />)}

                    </ul>
                }


            </div> : null}
        </>


    )
}
