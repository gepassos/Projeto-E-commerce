import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../layouCSS/productPage.css';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/produtos/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [products]);

    const handleDelete = (productId) => {
        console.log(productId);
        axios
            .delete(`http://localhost:8080/produtos/${productId}`)
            .then(response => {
                window.alert('O Produto foi deletado:', productId);

            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    return (
        <div className="container">

            <div className='flex-column'>
                <h1 className="produto-title">Produtos</h1>
                <Link to="/add">
                    <button>Adicionar Produtos</button>
                </Link>
            </div>
            <ul className="product-list">
                {products.map(product => (
                    <li className="product-card" key={product.id}>
                        <section className="product-info">
                            <img
                                className="product-image"
                                src={`/${product.image}.png`}
                                alt={product.name}
                            />
                            <h3>{product.name}</h3>
                            <p className="preco">R$ {product.price.toFixed(2)}</p>
                        </section>
                        <section className="product-update">
                            <Link to={`/edit/${product.id}`}>
                                <img className="icons" src="/edit.png" alt="Edit" />
                            </Link>
                            <img
                                className="icons"
                                src="/delete.png"
                                alt="Delete"
                                onClick={() => handleDelete(product.id)}
                            />
                        </section>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;