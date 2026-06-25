import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductById, updateProduct, getCategories } from '../config/api';

function Editproduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({
    Name: '',
    Category_ID: '',
    Price: '',
    Images: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load categories
        const resCate = await getCategories();
        setCategories(resCate.data);

        // Load current product data
        const resProd = await getProductById(id);
        if (resProd.data) {
          setProduct({
            Name: resProd.data.Name || '',
            Category_ID: resProd.data.Category_ID || '',
            Price: resProd.data.Price || '',
            Images: resProd.data.Images || ''
          });
        }
      } catch (error) {
        console.error('Error loading data for edit:', error);
        alert('Không thể tải thông tin sản phẩm hoặc danh mục!');
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.name === 'Category_ID' ? Number(e.target.value) : e.target.value
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        await updateProduct(id, product);
        alert('Cập nhật sản phẩm thành công!');
        navigate('/');
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Cập nhật sản phẩm thất bại!');
      }
    }
    setValidated(true);
  };

  return (
    <div className="mt-4 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '600px' }} className="shadow-sm">
        <Card.Header as="h3" className="bg-warning text-white text-center">
          Edit Product (ID: {id})
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Name:</Form.Label>
              <Form.Control
                required
                name="Name"
                type="text"
                value={product.Name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm.."
              />
              <Form.Control.Feedback type="invalid">
                Tên không được để trống!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Price:</Form.Label>
              <Form.Control
                required
                type="number"
                name="Price"
                value={product.Price}
                onChange={handleChange}
                placeholder="Nhập giá.."
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập giá hợp lệ (lớn hơn hoặc bằng 0)!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Image URL:</Form.Label>
              <Form.Control
                required
                type="text"
                name="Images"
                value={product.Images}
                onChange={handleChange}
                placeholder="Nhập URL hình ảnh.."
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập URL hình ảnh!
              </Form.Control.Feedback>
            </Form.Group>

            {product.Images && (
              <div className="text-center mb-3">
                <img
                  src={product.Images}
                  alt="Preview"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                  className="img-thumbnail"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Category:</Form.Label>
              <Form.Select
                required
                name="Category_ID"
                value={product.Category_ID}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.Category_Name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn danh mục!
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="warning" type="submit" className="text-white fw-bold px-4">
                Save Changes
              </Button>
              <Link to="/" className="btn btn-secondary px-4">
                Cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Editproduct;