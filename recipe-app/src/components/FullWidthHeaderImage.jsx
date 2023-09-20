import { Skeleton } from '@mui/material'
import Image from 'next/image'

const FullWidthHeaderImage = ({ recipe, children }) => (
    <div style={{ position: 'relative', width: '50vw', height: '35vh' }}>
        {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
            <Image
                style={{ objectFit: 'cover', borderRadius: 6 }}
                src={recipe.imageUrl}
                alt={recipe.name}
                fill
            />
        )}
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    </div>
)

export default FullWidthHeaderImage
