// import React, { useState } from 'react'
// import IconButton from '@mui/material/IconButton'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import UserLoginDialog from './UserLoginDialog'

// function UserIcon() {
//     const [openDialog, setOpenDialog] = useState(false)

//     const handleUserIconClick = () => {
//         setOpenDialog(true)
//     }

//     return (
//         <>
//             <IconButton
//                 edge="end"
//                 color="inherit"
//                 aria-label="user"
//                 onClick={handleUserIconClick}
//             >
//                 <AccountCircleIcon />
//             </IconButton>
//             <UserLoginDialog
//                 open={openDialog}
//                 onClose={() => setOpenDialog(false)}
//             />
//         </>
//     )
// }

// export default UserIcon

import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function UserIcon() {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        // Add your logic for handling the login here
        // You can access the 'username' and 'password' states to get user input
        // Optionally, you can close the dialog after handling the login
        setOpen(false)
    }

    const userIconStyles = {
        fontSize: '2.75rem',
        cursor: 'pointer',
    }

    return (
        <>
            <AccountCircleIcon
                style={userIconStyles}
                onClick={handleClickOpen}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Login</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginTop: '16px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: '16px' }}
                    >
                        Log In
                    </Button>
                    <Typography
                        variant="body2"
                        color="primary"
                        style={{ marginTop: '16px', cursor: 'pointer' }}
                        onClick={() => {
                            // Add your logic for account creation here
                        }}
                    >
                        Create an Account
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UserIcon
