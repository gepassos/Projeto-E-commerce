import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../layouCSS/actionPage.css"

const ActionPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '' || price.trim() === '' || image.trim() === '') {
            console.error('All fields are required');
            return;
        }
        const newProduct = {
            id: Date.now().toString(),
            name: name,
            price: parseFloat(price),
            image: image,
        };

        try {
            const response = await axios.post('http://localhost:8080/produtos/', newProduct);
            console.log('Produto foi adicionado com sucesso:', response.data);
            setName('');
            setPrice('');
            setImage('');
            window.alert('O Produto foi adicionado na lista.')
        } catch (error) {
            console.error('Produto não foi adicionado:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="produto-title">Adicionar Produto</h1>
            <form className="product-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Preço:</label>
                    <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Imagem:</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Adicionar</button>
            </form>
            <br></br>
            <Link to="/">Voltar</Link>
        </div>

    );
};

export default ActionPage;