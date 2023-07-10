import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "../layouCSS/editPage.css"
const EditPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    useEffect(() => {
        // Fetch the product with the given ID
        axios.get(`http://localhost:8080/produtos/${productId}`)
            .then(response => {
                setProduct(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
                setImage(response.data.image);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '' || price === 0 || image.trim() === '') {
            window.alert('Preencha todos os campos corretamente');
            return;
        }
        const updatedProduct = {
            id: product.id,
            name: name,
            price: parseFloat(price),
            image: image,
        };


        axios.put(`http://localhost:8080/produtos/${productId}`, updatedProduct)
            .then(response => {
                console.log('Produto atualizado:', response.data);
                window.alert('Produto atualizado com sucesso.')

            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="container">
            <h1>Editar Produto</h1>
            <form className='product-form' onSubmit={handleSubmit}>
                <label className="form-field">
                    Nome:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label className="form-field">
                    Preço:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </label>
                <label className="form-field">
                    Nome da Imagem:
                    <input type="text" value={image} onChange={e => setImage(e.target.value)} />
                </label>
                <button type="submit">Update</button>
            </form>
            <br></br>
            <Link to="/">Voltar</Link>
        </div>
    );
};

export default EditPage;