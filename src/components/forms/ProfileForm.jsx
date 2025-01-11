import { useState } from 'react';

export const ProfileForm = ({ data, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: '',
    });

    //setFormData(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formData:", formData);
        if (!formData.firstName || !formData.email || !formData.password) {
            throw new Error('Please fill in all fields');
        }

        onSubmit({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    value={formData.firstName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            firstName: e.target.value,
                        })
                    }
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    type="text"
                    placeholder="last name"
                    className="input input-bordered"
                    value={formData.lastName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            lastName: e.target.value,
                        })
                    }
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value,
                        })
                    }
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Save</button>
            </div>
        </form>
    );
};
