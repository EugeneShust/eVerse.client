import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, ProfileForm } from '../components';
import { signIn } from '../services';
import { useProfile } from '../hooks';

export const LoginPage = () => {
    const { login } = useProfile();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        setError('');
        try {
            // TODO refactor required!!! add ProfileDto
            const userProfile = await signIn(data);
            login(userProfile);

            navigate('/profile');
        } catch (err) {
            console.error(err.message);
            setError(`Connection error. Error code${err.message}`);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {error && (
                            <div className="alert alert-error">
                                <span>{error}</span>
                            </div>
                        )}
                        <LoginForm onSubmit={handleLogin} />
                        <div className="text-center mt-4">
                            <Link to="/signup" className="link link-hover">
                                Need an account? Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
