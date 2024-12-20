import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpForm } from '../components';
import { register } from '../services';

export const SignUpPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setError('');
        try {
            const token = await register(data.email, data.password);

            console.log("OAuth token", token);
            navigate('/');          
        } catch (err) {
            console.error(err);
            setError('Connection error. Please try again.');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {error && (
                            <div className="alert alert-error">
                                <span>{error}</span>
                            </div>
                        )}
                        <SignUpForm onSubmit={handleSubmit} />
                        <div className="text-center mt-4">
                            <Link to="/" className="link link-hover">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
