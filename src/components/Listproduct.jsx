import { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts, removeProduct, getCategories } from '../config/api';

function Listproduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const res1 = await getProducts();
      setProducts(res1.data);
      const res2 = await getCategories();
      setCategories(res2.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === Number(categoryId));
    return category ? category.Category_Name : 'NoName';
  };

  const handlerDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? ID: ' + id)) {
      try {
        await removeProduct(id);
        loadData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Xóa sản phẩm thất bại!');
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter products by name (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.Name && product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h1 className="mb-4">List Of Products ({filteredProducts.length})</h1>
      
      <Row className="align-items-center mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <Link to="/add">
            <Button variant="primary" className="fw-bold">Add New Product</Button>
          </Link>
        </Col>
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text id="search-addon" className="bg-primary text-white fw-bold">Search</InputGroup.Text>
            <Form.Control
              placeholder="Search by product name..."
              aria-label="Search by product name"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table bordered striped responsive className="shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th style={{ width: '180px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="text-center align-middle">{product.id}</td>
                <td className="text-center align-middle">
                  <img 
                    src={product.Images} 
                    alt={product.Name} 
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/80x80?text=No+Image';
                    }}
                  />
                </td>
                <td className="align-middle fw-semibold">{product.Name}</td>
                <td className="align-middle text-end">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.Price))}
                </td>
                <td className="align-middle text-center">{getCategoryName(product.Category_ID)}</td>
                <td className="align-middle text-center">
                  <Link to={`/edit/${product.id}`}>
                    <Button variant="warning" className="me-2 text-white fw-bold">Edit</Button>
                  </Link>
                  <Button variant="danger" className="fw-bold" onClick={() => handlerDeleteProduct(product.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted fw-bold">
                Không tìm thấy sản phẩm nào phù hợp!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Listproduct;