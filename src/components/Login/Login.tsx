import {FormikHelpers, useFormik} from "formik";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import * as yup from 'yup';
import {AppRootStateType, useAppDispatch} from "redux/store";
import {LoginParamsType} from "api/api";
import {logIn} from "redux/authReducer";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import s from './Login.module.css'

const validationSchema = yup.object().shape({
    email: yup.string().trim().required('Required').email('Invalid email address'),
    password: yup.string().trim().required('Required').min(4, 'Password must has more then 4 symbols')
})


export const Login = () => {
    const auth = useSelector((state: AppRootStateType) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuth) {
            navigate('/profile')
        }
    }, [])

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            logIn(values)(dispatch, formikHelpers)
        }
    })
    if (auth.isAuth) {
        return <Navigate to='/'/>
    }

    const handleFillForm = () => {
        formik.setFieldValue('email', 'free@samuraijs.com');
        formik.setFieldValue('password', 'free');
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit} className={s.loginForm}>
                <FormControl>
                    <FormLabel>
                        {/*<p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>*/}
                        <p>Для авторизации введите следующие данные</p>
                        {/*<p>or use common test account credentials:</p>*/}
                        <p>демонастрационного аккаунта:</p>
                        <p>Email: <span onClick={() => {
                            handleFillForm()
                        }}
                                        title="Нажмите, чтобы заполнить поля автоматически"
                                        style={{
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            color: 'darkblue'
                                        }}>free@samuraijs.com</span></p>
                        <p>Password: <span onClick={() => {
                            handleFillForm()
                        }}
                                           title="Нажмите, чтобы заполнить поля автоматически"
                                           style={{
                                               cursor: 'pointer',
                                               textDecoration: 'underline',
                                               color: 'darkblue'
                                           }}>free</span></p>
                    </FormLabel>
                    <FormGroup>
                        <TextField type='text'
                                   label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={
                                              <Checkbox checked={formik.values.rememberMe}
                                                        {...formik.getFieldProps('rememberMe')}
                                              />}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}