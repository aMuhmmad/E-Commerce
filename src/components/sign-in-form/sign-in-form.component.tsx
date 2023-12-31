import { ChangeEvent, FormEvent, useState } from "react";

import FormInput from "../form-input/form-input.components";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormFeilds = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            dispatch(emailSignInStart(email, password));

            resetFormFeilds();

        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('incorrect password for email');
                    break;
                case AuthErrorCodes.NULL_USER:
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>


                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <ButtonsContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.base} type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    )

}

export default SignInForm;