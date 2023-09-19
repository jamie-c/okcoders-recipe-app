import RecipeForm from '@/components/RecipeForm'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AddMenuItem() {
    const router = useRouter()
    const { id } = router.query
    const [formData, setFormData] = useState({})
    const [originalFormData, setOriginalFormData] = useState({})
    const [loading, setLoading] = useState(false)

    const getRecipe = async () => {
        setLoading(true)
        const response = await fetch(`/api/recipes/${id}`)
        const data = await response.json()
        setOriginalFormData(data.recipe)
        setFormData(data.recipe)
        setLoading(false)
        return
    }

    useEffect(() => {
        if (!id) return
        getRecipe()
    }, [id])

    return (
        <>
            {loading && <h1>Loading...</h1>}
            {!formData?._id && !loading && (
                <Typography>Listing not found</Typography>
            )}
            {formData?._id && <RecipeForm recipe={formData} edit={true} />}
        </>
    )
}
