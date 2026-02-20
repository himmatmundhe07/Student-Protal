import React, { useState } from 'react';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'Male',
    });

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [recentlyAdded, setRecentlyAdded] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name cannot be empty';
        if (!formData.email.includes('@')) newErrors.email = 'Email must contain "@"';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be exactly 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
            const newStudent = { ...formData, id: Date.now() };
            const updatedStudents = [...storedStudents, newStudent];

            localStorage.setItem('students', JSON.stringify(updatedStudents));
            setSuccessMsg('Student added successfully!');
            setRecentlyAdded(newStudent);
            setFormData({ name: '', email: '', phone: '', gender: 'Male' });
            setErrors({});

            setTimeout(() => setSuccessMsg(''), 3000);
        }
    };

    return (
        <div className="page-container">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    Add Student
                </button>
            </form>

            {successMsg && <p className="success-msg">{successMsg}</p>}

            {recentlyAdded && (
                <div className="recently-added">
                    <h3>Recently Added Student:</h3>
                    <p>
                        <strong>Name:</strong> {recentlyAdded.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {recentlyAdded.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {recentlyAdded.phone}
                    </p>
                    <p>
                        <strong>Gender:</strong> {recentlyAdded.gender}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AddStudent;
