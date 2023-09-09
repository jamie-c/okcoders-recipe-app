import { inter, theme } from '@/lib/theme'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import {
    Button,
    CssBaseline,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AddMenuItem() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [{ id: '', name: '', amount: '', unit: '' }],
        instructions: [],
        prepTime: 0,
        cookTime: 0,
        servings: { amount: 0, unit: '' },
        imageUrl: '',
        tags: [],
        createdBy: '',
    })
    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([[]])
    const [ingredientsListIsOpen, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const loading = ingredientsListIsOpen && options.length === 0

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                router.push('/')
                console.log(data)
            })
            .catch((error) => console.error(error))
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleIngredientChange = (event, index) => {
        const { name, value } = event.target
        if (name === 'name') {
            filterIngredients(value, index)
        }

        setFormData((prevFormData) => {
            const ingredients = [...prevFormData.ingredients]
            ingredients[index] = {
                ...ingredients[index],
                [name]: value,
            }
            return {
                ...prevFormData,
                ingredients,
            }
        })
    }

    const handleAddIngredient = (event, index) => {
        // prevent form submission
        event.preventDefault()
        // change cursor focus to the next item
        const nextInput = document.getElementById(`remove-button-${index}`)
        if (nextInput) {
            nextInput.focus()
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: [
                ...prevFormData.ingredients,
                { name: '', amount: '', unit: '' },
            ],
        }))
    }

    const handleRemoveIngredient = (ingredient) => {
        const index = formData.ingredients.indexOf(ingredient)
        setFormData((prevFormData) => {
            const ingredients = [...prevFormData.ingredients]
            ingredients.splice(index, 1)
            return {
                ...prevFormData,
                ingredients,
            }
        })
    }

    const searchIngredients = async (searchTerm) => {
        const response = await fetch('/api/ingredients', {
            method: 'GET',
            headers: {
                name: searchTerm,
            },
        })
        const data = await response.json()
        setIngredients(data.ingredients)
        return data
    }

    const getIngredients = async () => {
        const response = await fetch('/api/ingredients')
        const data = await response.json()
        setIngredients(data.ingredients)
        return
    }

    useEffect(() => {
        getIngredients()
    }, [])

    useEffect(() => {
        if (!ingredientsListIsOpen) {
            setOptions([])
        }
    }, [ingredientsListIsOpen])

    const filterIngredients = (ing, index) => {
        if (ing.length === 0) {
            const prevIngredients = [...filteredIngredients]
            prevIngredients[index] = []
            setFilteredIngredients(prevIngredients)
        } else {
            // replace the list at index with the filtered list
            const prevIngredients = [...filteredIngredients]
            const filtered = ingredients.filter((ingredient) => {
                return ingredient.name.toLowerCase().includes(ing.toLowerCase())
            })
            prevIngredients[index] = filtered

            setFilteredIngredients(prevIngredients)
        }
    }

    const handleSelectIngredient = (ing, index) => {
        const name = ing.name
        setFormData((prevFormData) => {
            const ingredients = [...prevFormData.ingredients]
            ingredients[index] = {
                ...ingredients[index],
                name: name,
                id: ing._id,
            }
            return {
                ...prevFormData,
                ingredients,
            }
        })
        setFilteredIngredients((prevFilteredIngredients) => {
            const filtered = [...prevFilteredIngredients]
            filtered[index] = []
            return filtered
        })
    }

    const maxButtonWidth = '250px'

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <h1
                className={`${inter.className}`}
                style={{ margin: '10px', textAlign: 'center' }}
            >
                Add Menu Item
            </h1>
            <form
                className={`${inter.className}`}
                onSubmit={handleSubmit}
                style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '10px',
                    padding: '0 10px 50px 10px',
                }}
            >
                <Stack
                    sx={{
                        maxWidth: '800px',
                    }}
                    spacing={2}
                >
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <Typography variant="h6">Ingredients</Typography>
                    {formData.ingredients.map((ingredient, index) => (
                        <Stack key={index}>
                            <Stack
                                sx={{
                                    position: 'relative',
                                    flexDirection: { xs: 'col', sm: 'row' },
                                    borderRadius: '6px',
                                    height: { sm: '48px' },
                                    padding: '10px',
                                    paddingRight: '48px',
                                    bgcolor: 'rgba(0,0,0,0.1)',
                                }}
                                alignItems={{ xs: 'flex-start', sm: 'center' }}
                                flex
                                gap="8px"
                                key={`${index}-input`}
                            >
                                <TextField
                                    sx={{
                                        minWidth: { xs: '100%', sm: '300px' },
                                    }}
                                    variant="standard"
                                    type="text"
                                    label="Ingredient Name"
                                    name="name"
                                    value={ingredient.name}
                                    onChange={(event) =>
                                        handleIngredientChange(event, index)
                                    }
                                    required
                                />
                                <Stack
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '8px',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <TextField
                                        sx={{
                                            maxWidth: {
                                                xs: '48%',
                                                sm: '100px',
                                            },
                                        }}
                                        variant="standard"
                                        type="number"
                                        label="Amount"
                                        name="amount"
                                        value={ingredient.amount}
                                        onChange={(event) =>
                                            handleIngredientChange(event, index)
                                        }
                                        required
                                    />
                                    <TextField
                                        sx={{
                                            maxWidth: {
                                                xs: '48%',
                                                sm: '100px',
                                            },
                                        }}
                                        variant="standard"
                                        label="Unit"
                                        name="unit"
                                        value={ingredient.unit}
                                        onChange={(event) =>
                                            handleIngredientChange(event, index)
                                        }
                                        required
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === 'Enter' ||
                                                event.key === 'Tab'
                                            ) {
                                                handleAddIngredient(
                                                    event,
                                                    index
                                                )
                                            }
                                        }}
                                    />
                                </Stack>
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '0',
                                        minWidth: '36px',
                                        width: '36px',
                                        maxWidth: '36px',
                                        height: '100%',
                                        borderRadius: '0 6px 6px 0',
                                        opacity: '0.5',
                                        '&:hover': {
                                            opacity: '1',
                                            bgcolor: {},
                                        },
                                    }}
                                    id={'remove-button-' + index}
                                    variant="contained"
                                    color="info"
                                    onClick={() =>
                                        handleRemoveIngredient(ingredient)
                                    }
                                >
                                    <ClearSharpIcon />
                                </Button>
                            </Stack>
                            <Stack
                                alignItems="flex-start"
                                key={`${index}-list`}
                            >
                                {filteredIngredients[index] &&
                                    filteredIngredients[index].map(
                                        (ingredient) => {
                                            return (
                                                <Button
                                                    key={
                                                        index +
                                                        '-' +
                                                        ingredient._id
                                                    }
                                                    onClick={() =>
                                                        handleSelectIngredient(
                                                            ingredient,
                                                            index
                                                        )
                                                    }
                                                >
                                                    {ingredient.name}
                                                </Button>
                                            )
                                        }
                                    )}
                            </Stack>
                        </Stack>
                    ))}
                    <Button
                        sx={{
                            maxWidth: { xs: '100%', sm: maxButtonWidth },
                            px: 4,
                            py: 2,
                        }}
                        variant="contained"
                        type="button"
                        onClick={handleAddIngredient}
                        startIcon={<AddSharpIcon />}
                    >
                        Add Ingredient
                    </Button>
                    <Typography variant="h6">Instructions</Typography>
                    <TextField
                        label="Instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        required
                    />
                    <Typography variant="h6">Prep & Cook Time</Typography>
                    {/* [ ] TODO: form accepts hours and minutes and stores value in minutes in db */}
                    <Stack flex flexDirection="row" gap="8px">
                        <TextField
                            label="Prep Time"
                            name="prepTime"
                            value={formData.prepTime}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Cook Time"
                            name="cookTime"
                            value={formData.cookTime}
                            onChange={handleChange}
                            required
                        />
                    </Stack>
                    <Typography variant="h6">Serving Info</Typography>
                    <Stack flex flexDirection="row" gap="8px">
                        <TextField
                            label="Servings Amount"
                            name="servingsAmount"
                            value={formData.servings.amount}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Servings Unit"
                            name="servingsUnit"
                            value={formData.servings.unit}
                            onChange={handleChange}
                            required
                        />
                    </Stack>
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Created By"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        sx={{
                            maxWidth: { xs: '100%', sm: maxButtonWidth },
                            px: 4,
                            py: 2,
                        }}
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </ThemeProvider>
    )
}
