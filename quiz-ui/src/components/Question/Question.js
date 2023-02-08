import { Button, Card, CardContent, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Center from '../Center';
import useForm from '../../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import useStateContext from '../../hooks/useStateContext'
import { useNavigate } from 'react-router'
import { useState } from 'react';

const getFreshModel = () => ({
    qnInWords: '',
    imageName: '',
    option1: '',
    option2: '',
    options3: '',
    option4: '',
    answer: 0
})

export default function Question () {

    const [showAlert, setShowAlert] = useState(false)
    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState(context.participantRole);
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const onRequestAdminHandler = () => {
        
        createAPIEndpoint(ENDPOINTS.updateUserRole)
        .put(context.participantId, {
            participantId: context.participantId,
            role: 'admin'
        })
        .then(res => {
            //setUserRole('admin');
            setShowAlert(true)
            setTimeout(() => {
            setShowAlert(false);
            setUserRole('admin');
            }, 4000);
            //window.location.reload(true)
        })
        .catch(err => { console.log(err) })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        values.imageName = 'mouse.png';
        createAPIEndpoint(ENDPOINTS.addQuestion)
            .post(values)
            .then(res => {
                //setContext({ participantId: res.data.participantId })
                //navigate('/quiz')
                values.qnInWords= '';
                values.imageName= '';
                values.option1= '';
                values.option2= '';
                values.options3= '';
                values.option4= '';
                values.answer= 0;
                window.location.reload(true)
            })
            .catch(err => console.log(err))
    }

    return(
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Quiz App
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        {userRole === 'admin' ? <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
                            <TextField
                                label="Question"
                                name="qnInWords"
                                value={values.qnInWords}
                                onChange={handleInputChange}
                                variant="outlined"
                                //{...(errors.email && { error: true, helperText: errors.email })} 
                                />
                            <TextField
                                label="Option 1"
                                name="option1"
                                value={values.option1}
                                onChange={handleInputChange}
                                variant="outlined"
                                //{...(errors.name && { error: true, helperText: errors.name })} 
                            />
                            <TextField
                                label="Option 2"
                                name="option2"
                                value={values.option2}
                                onChange={handleInputChange}
                                variant="outlined"
                                //{...(errors.name && { error: true, helperText: errors.name })} 
                            />
                            <TextField
                                label="Option 3"
                                name="option3"
                                value={values.options3}
                                onChange={handleInputChange}
                                variant="outlined"
                                //{...(errors.name && { error: true, helperText: errors.name })} 
                            />
                            <TextField
                                label="Option 4"
                                name="option4"
                                value={values.option4}
                                onChange={handleInputChange}
                                variant="outlined"
                                //{...(errors.name && { error: true, helperText: errors.name })} 
                            />
                            <TextField
                                type="number"
                                label="Answer"
                                name="answer"
                                value={values.answer}
                                onChange={handleInputChange}
                                variant="outlined"
                                //{...(errors.name && { error: true, helperText: errors.name })} 
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>Submit</Button>
                        </form> : 
                        <Button onClick={onRequestAdminHandler}
                                sx={{
                                    visibility: !showAlert ? 'visible' : 'hidden'
                                }}
                        >Click Here To Request Admin</Button>}
                        <CircularProgress 
                            severity="success"
                            color="success"
                            sx={{
                                width: '60%',
                                m: 'auto',
                                visibility: showAlert ? 'visible' : 'hidden'}}
                        />
                        {/* <Alert
                            severity="success"
                            variant="string"
                            sx={{
                            width: '60%',
                            m: 'auto',
                            visibility: showAlert ? 'visible' : 'hidden'
                            }}>
                            Score Updated.
                        </Alert> */}
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}