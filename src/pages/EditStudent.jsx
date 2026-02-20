import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'Male',
    });

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const studentToEdit = storedStudents.find(student => student.id === parseInt(id));

        if (studentToEdit) {
            setFormData(studentToEdit);
        } else {
            navigate('/'); // Redirect to home if student is not found
        }
    }, [id, navigate]);

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
            const updatedStudents = storedStudents.map(student =>
                student.id === parseInt(id) ? { ...formData } : student
            );

            localStorage.setItem('students', JSON.stringify(updatedStudents));
            setSuccessMsg('Student updated successfully!');

            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    };

    return (
        <div className="page-container">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Edit Student</h2>
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

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="submit-btn" style={{ margin: 0, flex: 1 }}>
                        Save Changes
                    </button>
                    <button type="button" className="btn reset" style={{ flex: 1 }} onClick={() => navigate('/')}>
                        Cancel
                    </button>
                </div>
            </form>

            {successMsg && <p className="success-msg">{successMsg}</p>}
        </div>
    );
};

export default EditStudent;
