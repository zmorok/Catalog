// ConfirmedOrders.jsx
import React from 'react'
import { connect } from 'react-redux'
import './ConfirmedOrders.css'

const ConfirmedOrders = ({ orders = [] }) => {
	const calculateTotalPrice = cart => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0)
	}

	return (
		<div className='orders-component'>
			<h2>Подтвержденные заказы</h2>
			<div className='orders'>
				{orders.map((order, index) => (
					<div className='ordered-product' key={index}>
						<h3>Заказ #{index + 1}</h3>
						<p>
							<strong>Способ доставки:</strong>{' '}
							{order.deliveryMethod === 'courier'
								? 'Курьер'
								: order.deliveryMethod === 'mail'
								? 'Почта'
								: 'Самовывоз'}
						</p>
						<p>
							<strong>Способ оплаты:</strong>{' '}
							{order.paymentMethod === 'cash'
								? 'Наличными'
								: order.paymentMethod === 'card'
								? 'Банковская карта'
								: 'Банковский перевод'}
						</p>
						{order.deliveryMethod === 'pickup' ? null : (
							<p>
								<strong>Адрес доставки:</strong> {order.deliveryAddress}
							</p>
						)}
						<div className='ordered-products'>
							{order.cart.map(item =>
								item.selected === true ? (
									<div className='ordered-product'>
										<div className='description' key={item.id}>
											<span>{item.name}</span>
											<div>
												<img src={item.image} alt={item.name} />
											</div>
										</div>
									</div>
								) : null
							)}
						</div>
						<p>
							<strong>Общая стоимость заказа:</strong>{' '}
							{calculateTotalPrice(order.cart)} руб.
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	orders: state.orders,
})

export default connect(mapStateToProps)(ConfirmedOrders)
