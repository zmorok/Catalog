// ProductsPage.jsx
import React from 'react'
import { connect } from 'react-redux'
import { updateCartItem, removeCartItem } from '../redux/actions'
import { useState } from 'react'
import products from '../products'
import './ProductsPage.css'

const ProductsPage = ({ cart, updateCartItem, removeCartItem }) => {
	const [quantityValues, setQuantityValues] = useState({})

	const handleQuantityChange = (id, quantity) => {
		const itemProd = products.find(prod => prod.id === id)
		if (quantity >= 1 && quantity <= itemProd.quantity) {
			setQuantityValues(prevState => ({
				...prevState,
				[id]: quantity,
			}))
			updateCartItem(id, { quantity, selected: true })
		}
	}

	const handleCheckboxChange = (id, selected) => {
		updateCartItem(id, { selected })
	}

	return (
		<div className='order-first'>
			<h1>Список товаров в корзине</h1>
			<div className='order-products-page'>
				{cart.map(item => (
					<div className='ordered-product' key={item.id}>
						<input
							type='checkbox'
							checked={item.selected}
							onChange={() => handleCheckboxChange(item.id, !item.selected)}
						/>
						<span>{item.name}</span>
						<div>
							<img src={item.image} alt={item.name} />
						</div>
						<input
							type='number'
							value={quantityValues[item.id] || 1}
							onChange={e =>
								handleQuantityChange(item.id, parseInt(e.target.value))
							}
						/>
						<span>
							Доступное кол-во{' '}
							{products.find(prod => prod.id === item.id).quantity}
						</span>
						<button onClick={() => removeCartItem(item.id)}>Удалить</button>
					</div>
				))}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
	updateCartItem: (id, data) => dispatch(updateCartItem(id, data)),
	removeCartItem: id => dispatch(removeCartItem(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
