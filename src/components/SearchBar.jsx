import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

export default function Asynchronous() {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const loading = open && options.length === 0
    const [keyword, setKeyword] = useState('')

    const handleChange = (event) => {
        setKeyword(event.target.value)
        // check if value is in options
        const found = options.find((element) =>
            element?.name.toLowerCase().includes(event.target.value)
        )
        if (found) {
            return
        } else {
            setOpen(false)
            setOptions([])
            handleSearch()
            setOpen(true)
        }
    }

    const handleSearch = async () => {
        const data = await fetch('/api/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                keyword: keyword,
            },
        })
        const json = await data.json()
        setOptions([...json])
    }

    useEffect(() => {
        let active = true
        if (!loading) {
            return undefined
        }
        handleSearch()

        return () => {
            active = false
        }
    }, [loading, keyword])

    useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '100%' }}
            open={open}
            onInputChange={handleChange}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}
