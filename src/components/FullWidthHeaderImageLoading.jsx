import { theme } from '@/lib/theme'
import { Skeleton } from '@mui/material'

const FullWidthHeaderImageLoading = ({ recipe, children }) => (
    <div style={{ position: 'relative', width: '100vw', height: '65vh' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
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
                background: `linear-gradient(to bottom, ${theme.palette.primary.main}, transparent)`,
            }}
        >
            {children}
        </div>
    </div>
)

export default FullWidthHeaderImageLoading
