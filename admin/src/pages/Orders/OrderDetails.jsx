import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./OrderDetails.css";
function OrderDetails() {
  const [details, setDetails] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.item) {
      setDetails(location.state.item);
    }
  }, [location]);

  return (
    <div className="main">
      <div className="order-details">
        <div>
          <h2>Order Details</h2>
          <p>
            <strong>Order ID:</strong> {details.id}
          </p>
          <p>
            <strong>Ordered At:</strong> {details.ordered_at}
          </p>
          <p>
            <strong>Full Name:</strong> {details.full_name}
          </p>
          <p>
            <strong>Email:</strong> {details.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {details.phone_number}
          </p>
          <p>
            <strong>Address:</strong> {details.address}
          </p>
          <p>
            <strong>City:</strong> {details.city}
          </p>
          <p>
            <strong>Total Amount:</strong> ${details.total_amount}
          </p>
        </div>
      </div>
      <div className="product-list">
        <div>
          <h2>Products:</h2>
          <div>
            <ul>
              {details.products_data &&
                JSON.parse(details.products_data).map((product, index) => (
                  <li key={index}>
                    <img src={product.image} alt={product.book_name} />
                    <p>
                      <strong>Book Name:</strong> {product.book_name}
                    </p>
                    <p>
                      <strong>Author:</strong> {product.author_name}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
