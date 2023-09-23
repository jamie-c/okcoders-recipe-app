import { Chip, Stack, Typography } from '@mui/material'

// { tags } type is an array of strings

const RecipeTags = ({ tags }) => {
    console.log(tags)
    return (
        <Stack
            direction="row"
            alignItems="center"
            textTransform="uppercase"
            gap={1}
        >
            <Typography>Tags:</Typography>
            <Stack direction="row" gap={1}>
                {tags.map((tag) => (
                    <Chip key={tag} label={tag} color="secondary" />
                ))}
            </Stack>
        </Stack>
    )
}

export default RecipeTags
