import { useAuth } from "@clerk/nextjs";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { Box, Button, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RecipeForm({ recipe, edit }) {
    const router = useRouter()
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [formData, setFormData] = useState(
        recipe || {
            name: '',
            description: '',
            ingredients: [{ id: '', name: '', amount: '', unit: '' }],
            instructions: [''],
            prepTime: { hours: '', minutes: '' },
            cookTime: { hours: '', minutes: '' },
            servings: { amount: '', unit: '' },
            imageUrl: '',
            tags: [],
            createdBy: '',
        }
    )
    const [dbIngredients, setDbIngredients] = useState([])
    const [fdcIngredients, setFdcIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([[]])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(edit || false)
    const [ingPickerIsVisible, setIngPickerIsVisible] = useState([false])
    const [message, setMessage] = useState('')
    const [addIngBtnDisabled, setAddIngBtnDisabled] = useState(true)

    useEffect(() => {
        console.log(formData)
        handleAddIngButtonState()
    }, [formData])

    const closeIngredientPicker = (index) => {
        setFilteredIngredients((prevFilteredIngredients) => {
            const filtered = [...prevFilteredIngredients]
            filtered[index] = []
            return filtered
        })
        setIngPickerIsVisible((prevData) => {
            prevData[index] = false
            return prevData
        })
    }

    const handleAddIngButtonState = () => {
        const lastIng = formData.ingredients[formData.ingredients.length - 1]
        if (lastIng.name.length > 0) {
            setAddIngBtnDisabled(false)
        } else {
            setAddIngBtnDisabled(true)
        }
    }

    // Function to add a new step
    const addStep = () => {
        const prevInstructions = formData.instructions
        prevInstructions.push('')
        setFormData((prevFormData) => ({
            ...prevFormData,
            instructions: prevInstructions,
        }))
    }

    // Function to remove a step
    const removeStep = (index) => {
        const newSteps = formData.instructions
        newSteps.splice(index, 1)
        if (newSteps.length === 0) newSteps.push('')
        setFormData((prevFormData) => ({
            ...prevFormData,
            instructions: newSteps,
        }))
    }

    // Function to update a step's text
    const updateStep = (index, text) => {
        const newSteps = formData.instructions
        newSteps[index] = text
        setFormData((prevFormData) => ({
            ...prevFormData,
            instructions: newSteps,
        }))
    }

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
                router.push(`/recipes/${data._id}`)
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

    // HANDLE TYPING INTO INGREDIENT INPUT
    const handleIngredientChange = (event, index) => {
        const { name, value } = event.target
        if (name === 'name') {
            if (value.length > 0) {
                setIngPickerIsVisible((prevData) => {
                    prevData[index] = true
                    return prevData
                })
            } else if (value.length === 0) {
                setIngPickerIsVisible((prevData) => {
                    prevData[index] = false
                    return prevData
                })
            }
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

    // HANDLE ADDING AND REMOVING INGREDIENTS INPUT BOXES
    const handleAddIngredient = (event, index) => {
        // prevent form submission
        event.preventDefault()
        // if the last ingredient has a name, add a new ingredient
        if (formData.ingredients[formData.ingredients.length - 1].name) {
            // change cursor focus to the next item
            const nextInput = document.getElementById(
                `ingredient-name-${index + 1}`
            )
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
            setIngPickerIsVisible((prevData) => [...prevData, false])
        }
    }

    // HANDLE CLICKING THE REMOVE INGREDIENT BUTTON
    const handleRemoveIngredient = (ingredient, index) => {
        setFormData((prevFormData) => {
            const ingredients = [...prevFormData.ingredients]
            ingredients.splice(index, 1)
            if (ingredients.length === 0) {
                ingredients.push({ id: '', name: '', amount: '', unit: '' })
                setIngPickerIsVisible([false])
            }
            return {
                ...prevFormData,
                ingredients,
            }
        })
        setFilteredIngredients((prevData) => {
            const newData = [...prevData].splice(index, 1)
            if (newData.length === 0) newData.push([])
            return newData
        })
    }

    // GET INGREDIENTS FROM DB
    const getIngredients = async (searchTerm) => {
        setLoading(true)
        const response = await fetch('/api/ingredients', {
            method: 'GET',
            headers: {
                name: searchTerm,
            },
        })
        const data = await response.json()
        setDbIngredients(data.ingredients)
        setLoading(false)
        return
    }

    // SEARCH FDC API FOR INGREDIENTS
    const searchIngredients = async (ing, index) => {
        const filteredIng = filteredIngredients[index]
        if (filteredIng && filteredIng.length === 0) {
            setLoading(true)
            try {
                const response = await fetch(
                    'http://localhost:3000/api/ingredients/fdc-search',
                    {
                        method: 'GET',
                        headers: {
                            name: ing,
                        },
                    }
                )
                const data = await response.json()
                const foundIngredients = data.ingredients.foods.map((food) => {
                    return {
                        name: food.description,
                        fdcId: food.fdcId.toString(),
                        _id: '',
                    }
                })
                if (foundIngredients.length === 0) {
                    setLoading(false)
                    setFdcIngredients([])
                    setMessage('No ingredients found')
                    return
                }
                setFdcIngredients(foundIngredients)
                setFilteredIngredients((prevFilteredIngredients) => {
                    const filtered = [...prevFilteredIngredients]
                    filtered[index] = foundIngredients
                    return filtered
                })
            } catch (error) {
                setLoading(false)
                console.error(error)
            }
            setLoading(false)
        }
        return
    }

    // GET INGREDIENTS FROM DB ON PAGE LOAD
    useEffect(() => {
        getIngredients('')
    }, [])

    // FILTER INGREDIENTS BASED ON USER INPUT
    const filterIngredients = (ing, index) => {
        if (ing.length === 0) {
            const prevIngredients = [...filteredIngredients]
            prevIngredients[index] = []
            return setFilteredIngredients(prevIngredients)
        } else {
            // replace the list at index with the filtered list
            const prevIngredients = [...filteredIngredients]
            const dbFiltered = dbIngredients.filter((ingredient) => {
                return ingredient.name.toLowerCase().includes(ing.toLowerCase())
            })
            const fdcFiltered = fdcIngredients.filter((ingredient) => {
                return ingredient.name.toLowerCase().includes(ing.toLowerCase())
            })
            // combine dbFiltered and fdcFiltered but remove duplicates from fdcFiltered
            const filtered = [...dbFiltered, ...fdcFiltered].reduce(
                (acc, cur) => {
                    const found = acc.find((item) => item.name === cur.name)
                    if (!found) {
                        return acc.concat([cur])
                    } else {
                        return acc
                    }
                },
                []
            )

            prevIngredients[index] = filtered

            setFilteredIngredients(prevIngredients)

            if (filtered.length === 0 && !loading) {
                return searchIngredients(ing, index)
            }
        }
        return
    }

    // HANDLE SELECTING AN INGREDIENT FROM THE LIST
    const handleSelectIngredient = (ing, index) => {
        const name = ing.name
        if (ing._id === '') {
            // if the ingredient is not in the database, add it
            const newIng = fetch('/api/ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, fdcId: ing.fdcId }),
            })
            const newIngId = newIng._id
            setFormData((prevFormData) => {
                const ingredients = [...prevFormData.ingredients]
                ingredients[index] = {
                    ...ingredients[index],
                    name: name,
                    id: newIngId,
                }
                return {
                    ...prevFormData,
                    ingredients,
                }
            })
        }

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
        closeIngredientPicker(index)
    }

    const IngredientPicker = ({ index }) => {
        const filteredIng = filteredIngredients[index]

        return (
            <Stack
                alignItems="flex-start"
                justifyContent="left"
                key={`searchList-${index}`}
                px={1}
                pt={1}
                position="absolute"
                top="100%"
                left={0}
                width="100%"
                minHeight="210px"
                textAlign="left"
                sx={{
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    zIndex: '900',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
            >
                <Box
                    position="absolute"
                    top="0"
                    right="0"
                    px={1}
                    py={0.5}
                    sx={{
                        borderRadius: '0 6px 0 0',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'red',
                            bgcolor: 'rgba(255,255,255,0.5)',
                        },
                    }}
                    onClick={() => closeIngredientPicker(index)}
                >X</Box>
                or select an ingredient from the list:
                {loading && (
                    <>
                        <Skeleton
                            sx={{
                                margin: '0 0 4px 0',
                            }}
                            variant="rounded"
                            width="50%"
                            height="37px"
                        />
                        <Skeleton
                            sx={{
                                margin: '0 0 4px 0',
                            }}
                            variant="rounded"
                            width="50%"
                            height="37px"
                        />
                        <Skeleton
                            sx={{
                                margin: '0 0 4px 0',
                            }}
                            variant="rounded"
                            width="50%"
                            height="37px"
                        />
                    </>
                )}
                {filteredIng &&
                    filteredIng.map((ingredient, i) => {
                        return (
                            <Button
                                key={i + '-db-' + ingredient._id}
                                onClick={() =>
                                    handleSelectIngredient(ingredient, index)
                                }
                            >
                                {ingredient.name}
                            </Button>
                        )
                    })}
                {filteredIng?.length === 0 && !loading && (
                    <Typography>{message}</Typography>
                )}
            </Stack>
        )
    }

    const handleRecipeTime = (event) => {
        let { name, value } = event.target
        let key = ''

        if (value < 0) {
            value = 0
        }

        if (name === 'prepTimeHours') {
            key = 'prepTime'
            name = 'hours'
        } else if (name === 'prepTimeMinutes') {
            key = 'prepTime'
            name = 'minutes'
        } else if (name === 'cookTimeHours') {
            key = 'cookTime'
            name = 'hours'
        } else if (name === 'cookTimeMinutes') {
            key = 'cookTime'
            name = 'minutes'
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: {
                ...prevFormData[key],
                [name]: Number(value),
            },
        }))
    }

    const handleServings = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            servings: {
                ...prevFormData.servings,
                [name]: value,
            },
        }))
    }

    const handleTags = (event) => {
        console.log(formData.tags)
        const { name, value } = event.target
        const tags = value.split(',').map((tag) => tag.trim())
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: tags,
        }))
    }

    const maxButtonWidth = '250px'

    return (
        <>
            <h1 style={{ margin: '10px', textAlign: 'center' }}>
                {edit ? 'Edit' : 'Add'} Recipe
            </h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                        <Stack
                            sx={{ position: 'relative' }}
                            key={`ingredients-${index}`}
                        >
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
                            >
                                <TextField
                                    id={`ingredient-name-${index}`}
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
                                    onKeyDown={(event) => {
                                            if (
                                                event.key === 'Enter' ||
                                                event.key === 'Tab'
                                            ) {
                                                closeIngredientPicker(index)
                                            }
                                        }}
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
                                        handleRemoveIngredient(
                                            ingredient,
                                            index
                                        )
                                    }
                                >
                                    <ClearSharpIcon />
                                </Button>
                            </Stack>
                            {ingPickerIsVisible[index] && (
                                <IngredientPicker index={index} />
                            )}
                        </Stack>
                    ))}
                    <Button
                        sx={{
                            maxWidth: { xs: '100%', sm: maxButtonWidth },
                            px: 4,
                            py: 2,
                        }}
                        disabled={addIngBtnDisabled}
                        variant="contained"
                        type="button"
                        onClick={handleAddIngredient}
                        startIcon={<AddSharpIcon />}
                    >
                        Add Ingredient
                    </Button>
                    <div>
                        <h2>Instructions</h2>
                        {formData.instructions.map((step, index) => (
                            <div key={`instructions-${index}`}>
                                <TextField
                                    label={`Step ${index + 1}`}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    value={step}
                                    sx={{ background: 'white' }}
                                    onChange={(e) =>
                                        updateStep(index, e.target.value)
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => removeStep(index)}
                                >
                                    Remove Step
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={addStep}
                        >
                            Add Step
                        </Button>
                    </div>
                    <Typography variant="h6">Prep & Cook Time</Typography>
                    {/* [x] TODO: form accepts hours and minutes and stores value in minutes in db */}
                    <Stack flex flexDirection="row" gap="8px">
                        <TextField
                            label="Prep Time Hours"
                            name="prepTimeHours"
                            value={formData.prepTime.hours}
                            onChange={handleRecipeTime}
                            required
                            type="number"
                        />
                        <TextField
                            label="Prep Time Minutes"
                            name="prepTimeMinutes"
                            value={formData.prepTime.minutes}
                            onChange={handleRecipeTime}
                            required
                            type="number"
                        />
                        <TextField
                            label="Cook Time Hours"
                            name="cookTimeHours"
                            value={formData.cookTime.hours}
                            onChange={handleRecipeTime}
                            required
                            type="number"
                        />
                        <TextField
                            label="Cook Time Minutes"
                            name="cookTimeMinutes"
                            value={formData.cookTime.minutes}
                            onChange={handleRecipeTime}
                            required
                            type="number"
                        />
                    </Stack>
                    <Typography variant="h6">Serving Info</Typography>
                    <Stack flex flexDirection="row" gap="8px">
                        <TextField
                            label="Servings Amount"
                            name="amount"
                            value={formData.servings.amount}
                            onChange={handleServings}
                            required
                        />
                        <TextField
                            label="Servings Unit"
                            name="unit"
                            value={formData.servings.unit}
                            onChange={handleServings}
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
                        value={formData.tags.join(', ')}
                        onChange={handleTags}
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
                        {edit ? 'Update' : 'Submit'}
                    </Button>
                </Stack>
            </form>
        </>
    )
}
