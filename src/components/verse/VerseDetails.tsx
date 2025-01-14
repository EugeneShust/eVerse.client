import React from 'react';
import { Link } from 'react-router-dom';

export const VerseDetails = ({ verse }) => {
    return (
        <div className="card bg-base-100 w-11/12 max-w-3xl shadow-xl mb-6">
            <div className="card-body">
                <h2 className="card-title">{verse.Name}</h2>
                <div className="avatar mb-4">
                    <div className="w-24 rounded">
                        <img src={verse.Logo} alt="Cover" />
                    </div>
                </div>
                <Link
                    to={`/verse/${verse.Id}`}
                    className="link link-hover text-blue-600"
                ></Link>
            </div>
        </div>
    );
};
