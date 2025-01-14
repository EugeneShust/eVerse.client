import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerseCreateForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            name: name,
            logo: logo,
            start: new Date(start),
            end: new Date(end),
        });
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Create a New Verse</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter verse name"
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Logo
                        </label>
                        <textarea
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            placeholder="Enter verse logo"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            End Date
                        </label>
                        <input
                            type="datetime-local"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Verse
                    </button>
                </form>
            </div>
        </>
    );
};
