import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import {ProductContext} from './contexts/ProductContext';
import {CartContext} from './contexts/CartContext';


function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		const newCartItem = products.filter(thing => thing.id === item.id );
		setCart([...cart, ...newCartItem])
		
	};

	const removeItem = itemID => {
		const newCartArr = cart.filter(thing => thing.id !== itemID );
		console.log('newCartArr', newCartArr)
		setCart([...newCartArr])
	};

	useEffect(()=> {console.log(cart)}, [cart])

	return (
		<ProductContext.Provider value={{products, addItem}}>
			<CartContext.Provider value={{cart, removeItem}}>
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
