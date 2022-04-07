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

    function addRecent(username: string) {
        fetch(`http://localhost:4000/search`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ search: username })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {

                    const recentCopy: User[] = JSON.parse(JSON.stringify(recentSearches))
                    for (const acc of recentSearches) {
                        const alreadySearched = data.searching.filter((d: any) => d.id === acc.id)
                        if (alreadySearched) return
                    }

                    recentCopy.push(data)
                    setRecentSearches(recentCopy)


                }
            })
    }

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
                    {searchResults.map(recentSearch => <SearchedAccount key={recentSearch.id} recentSearch={recentSearch} addRecent={addRecent} />)}

                </ul>
                    :
                    <ul>
                        {recentSearches.map(recentSearch => <SearchedAccount key={recentSearch.id} recentSearch={recentSearch} addRecent={addRecent} />)}

                    </ul>
                }


            </div> : null}
        </>


    )
}
