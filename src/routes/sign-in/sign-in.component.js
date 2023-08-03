import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
return(
    <div>
        SignIn
        <button onClick={logGoogleUser}>
            Sign in with With Google
        </button>
        <SignUpForm/>
    </div>
)
}

export default SignIn