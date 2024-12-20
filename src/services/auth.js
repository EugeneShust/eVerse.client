import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from './firebase';

export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const user = userCredential.user;
        console.log(userCredential, user);

        const token = await user.getIdToken();
        return token;
    } catch (error) {
        console.error('Error register in:', error);
        throw new Error('Register failed');
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const user = userCredential.user;

        const token = await user.getIdToken();
        return token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Login failed');
    }
};
