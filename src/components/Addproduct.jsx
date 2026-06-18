import { useState, useEffect } from "react";
import { getCategories, addProduct } from "../config/api";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [product, setProduct] = useState({
    Name: "",
    Category_ID: "",
    Price: "",
    Images: "",
});
const [categories, setCategories] = useState([]);
const [validated, setValidated] = useState(false);
const navigate = useNavigate();
const loadCates = async () => {
    const resCate = await getCategories();
    setCategories(resCate.data);
};
useEffect(() => {
    loadCates();
}, []);
const handleChange = (e) => {
    setProduct({
        ...product,
        [e.target.name]:
            e.target.name === "Category_ID"
                ? Number(e.target.value)
                : e.target.value,
    });
};
const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        await addProduct(product);
        alert('them moi thanh cong!');
        navigate("/");
    }
    setValidated(true);
};
  return (
    <div className="mt-4">
    <h2>Add a new Product</h2>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div style={{ maxWidth: 600 }}>
        
        <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
                required 
                name="Name" 
                type="text" 
                value={product.Name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm.."
            />
            <Form.Control.Feedback type="invalid">
               Tên không để trống!
            </Form.Control.Feedback>
        </Form.Group>

      
        <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
                required
                pattern="^[0-9.,]+$"
                type="number"
                name="Price"
                value={product.Price}
                onChange={handleChange}
                placeholder="Nhập giá.."
            />
            <Form.Control.Feedback type="invalid">
                Giá phải là số!
            </Form.Control.Feedback>
        </Form.Group>

       
        <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
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

       
        <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
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
        </div>

      
        <Button style={{ width: 200 }} className="mt-4" variant="success" type="submit">
            ADD
        </Button>
    </Form>
</div>
  )
}

export default AddProduct