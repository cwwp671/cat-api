import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const CatForm = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleFileChange = files => {
        setFile(files[0]);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('catImage', file);

        try {
            await axios.post('http://localhost:3000/cats', formData);
            alert('Cat added successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div>
                <label>Image:</label>
                <Dropzone onDrop={handleFileChange}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {file ? <p>{file.name}</p> : <p>Drag and drop an image here, or click to select an image</p>}
                        </div>
                    )}
                </Dropzone>
            </div>
            <button type="submit">Add Cat</button>
        </form>
    );
};

export default CatForm;
