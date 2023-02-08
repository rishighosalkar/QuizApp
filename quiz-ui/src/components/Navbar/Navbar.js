import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import useStateContext from '../../hooks/useStateContext'

export default function Navbar() {
    //const navigate = useNavigate()

    const postQuestion = () => {
        //navigate("/question")
    }
    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ width: 640, m: 'auto' }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ flexGrow: 1 }}>
                        Quiz App
                    </Typography>
                    <Button onClick={postQuestion}>Post A Question</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
