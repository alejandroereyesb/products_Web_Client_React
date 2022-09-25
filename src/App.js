import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import  './App.css'

function App() {

  const [message, setMessage] = useState({});
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP
        const res = await axios.get("http://localhost:3000/api/products");
        const products = res.data;

        // Guarda en el array de posts el resultado. Procesa los datos
        setProducts(products);
      } catch (e) {
        setProducts([]) // No pintes nada 
      }
    }

    fetchData();
  }, [message]); // componentDidUpdate



  const sendForm = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const price = event.target.price.value;
    const description = event.target.description.value;
    const image = event.target.image.value;


    const product = { title, price, description, image }; //datos de producto
    // Enviar POST
    addProduct(product);
  }

  const addProduct = async (product) => {
    // POST con mis datos
    const res = await axios.post('http://localhost:3000/api/products', product);
    const message = res.data.message;

    setMessage(message);// actualizar estado
    console.log(message)
    alert(`Info: ${message}`);
  }

  const paintProducts = () => {

    return <>
        {products.map(product => (
          <article key={uuidv4()}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price} $</p>
            <img src={product.image} alt={product.title} className="product_img"/>
          </article>
        ))}
      </>
  }

  return (
    <div className="App">
      <h1>Añadir producto</h1>
      <form onSubmit={sendForm}>
        <label htmlFor="title">Título:</label><br />
        <input type="text" id="title" name="title" /><br />
        <label htmlFor="price">Precio:</label><br />
        <input type="number" id="price" name="price" /><br />
        <label htmlFor="description">Descripción:</label><br />
        <input type="text" id="description" name="description" /><br />
        <label htmlFor="image">URL imágen:</label><br />
        <input type="url" id="image" name="image" /><br />
        <input type="submit" value="Enviar" /><br />
      </form>

      <h2>Productos</h2>
      {paintProducts()}
     
    </div>
  );
}

export default App;
