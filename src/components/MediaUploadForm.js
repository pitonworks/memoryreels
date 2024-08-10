import React, { useState } from 'react';
import axios from 'axios';
import './MediaUploadForm.css'; // Stil dosyasını ithal edin

const MediaUploadForm = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!['image/jpeg', 'image/png', 'video/mp4'].includes(selectedFile.type)) {
                setError("Unsupported file type. Please select a JPEG, PNG, or MP4 file.");
                setFile(null);
                setPreview(null);
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            if (!['image/jpeg', 'image/png', 'video/mp4'].includes(droppedFile.type)) {
                setError("Unsupported file type. Please select a JPEG, PNG, or MP4 file.");
                setFile(null);
                setPreview(null);
                return;
            }
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !name) {
            setError("Please provide both name and file.");
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Upload successful!');
            setFile(null);
            setName('');
            setPreview(null);
        } catch (error) {
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div 
            className="upload-container" 
            onDrop={handleDrop} 
            onDragOver={(e) => e.preventDefault()}
        >
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="upload-area">
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png, video/mp4"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file" className="upload-label">
                        {preview ? (
                            <img src={preview} alt="Preview" className="preview-image" />
                        ) : (
                            <div className="upload-message">
                                <i className="upload-icon" role="img" aria-label="upload">📁</i>
                                <p>Drag & drop your media here or click to select</p>
                            </div>
                        )}
                    </label>
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <div className="name-input">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter a name for the file"
                    />
                </div>
                <button type="submit" disabled={!file || uploading}>
                    {uploading ? (
                        <div className="spinner"></div>
                    ) : (
                        'Upload'
                    )}
                </button>
            </form>
        </div>
    );
};

export default MediaUploadForm;
