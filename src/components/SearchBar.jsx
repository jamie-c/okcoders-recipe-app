import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton, InputAdornment, Skeleton, Stack, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SearchBar() {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const loading = open && options.length === 0
    const [keyword, setKeyword] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        setKeyword(event.target.value)
        if (event.target.value === '') {
            setOptions([])
            setOpen(false)
            return
        }
        setOpen(true)
        // check if value is in options
        const found = options.find((element) =>
            element?.name.toLowerCase().includes(event.target.value)
        )
        if (found) {
            return
        } else {
            handleSearch()
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

    const RecipePicker = () => {

        return (
            <Stack
                alignItems="flex-start"
                justifyContent="left"
                position="absolute"
                top="100%"
                left={0}
                width="100%"
                minHeight="content-fit"
                textAlign="left"
                sx={{
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    zIndex: '900',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                }}
            >
                {loading ? (
                    <>
                        <Skeleton
                            sx={{
                                margin: '0 0 4px 0',
                            }}
                            variant="rounded"
                            width="100%"
                            height="37px"
                        />
                        <Skeleton
                            sx={{
                                margin: '0 0 4px 0',
                            }}
                            variant="rounded"
                            width="100%"
                            height="37px"
                        />
                        <Skeleton
                            sx={{
                                margin: '0 0 4px 0',
                            }}
                            variant="rounded"
                            width="100%"
                            height="37px"
                        />
                    </>
                ) : (
                    options.map((recipe, i) => {
                        return (
                            <Link
                                style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
                                href={`/recipes/${recipe._id}`}
                                key={i + '-db-' + recipe._id}
                            >
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    ":hover": {
                                        backgroundColor: 'secondary.main',
                                    },

                                }}
                            >
                                <Typography variant='p'>
                                    {recipe.name}
                                </Typography>
                            </Box>
                            </Link>
                        )
                    })
                )}
            </Stack>
        )
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
        <Stack
            sx={{
                position: 'relative',
                width: '100%',
            }}
        >
        <TextField
                fullWidth
                placeholder="Search for a Recipe"
                InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress
                                    color="inherit"
                                    size={20}
                                    />
                                    ) : null}
                            </>
                        ),
                    }}
                variant="outlined"
                size="large"
                style={{ marginBottom: '16px' }}
                sx={{
                    position: 'relative',
                }}
                onChange={handleChange}
            />
            {open && <RecipePicker />}
        </Stack>
    )
}
