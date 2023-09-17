import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

function UserLoginDialog({ open, onClose }) {
    const handleLogin = () => {
        // Implement your login logic here
        // Close the dialog when the login is successful
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>User Login</DialogTitle>
            <DialogContent>
                {/* Your login and password input fields */}
                <TextField label="Username" fullWidth />
                <TextField label="Password" type="password" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserLoginDialog
