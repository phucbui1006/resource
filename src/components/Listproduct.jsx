import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts, removeProduct, getCategories } from '../config/api'
function Listproduct() {
      const [products, setProducts] = useState([]);
      const [categories, setCategories] = useState([]);

      const loadData = async () => {
            const res1 = await getProducts();
            setProducts(res1.data);
            const res2 = await getCategories();
            setCategories(res2.data);
      }

      const getCategoryName = (categoryId) => {
            const category = categories.find((c) => c.id === categoryId);
            return category ? category.name : 'NoName';
      }
      const handlerDeleteProduct = async (id) => {
            if (window.confirm('Are you sure you want to delete this product?' + id)) {
                  await removeProduct(id);
                  loadData();
            }
      }

      useEffect(() => {
            loadData();
      }, []);
      console.log(products);
      return (
            <div >
                  <h1 className='mt-4'>List Of Products({products.length})</h1>
                  <Link to='/add'>
                        <Button variant='primary' className='mt-3 mb-3'>Add New Product</Button>
                  </Link>
                  <Table bordered striped>
                        <thead>
                              <tr>
                                    <th>
                                          ID
                                    </th>
                                    <th>
                                          Image
                                    </th>
                                    <th>
                                          Name
                                    </th>
                                    <th>
                                          Price
                                    </th>
                                    <th>
                                          Category
                                    </th>
                                    <th>
                                          Action
                                    </th>
                              </tr>

                        </thead>
                        <tbody>
                              {
                                    products?.map((product) => (
                                          <tr>
                                                <td>{product.id}</td>
                                                <td><img src={product.Images} style={{ width: '100px' }} /></td>
                                                <td>{product.Name}</td>
                                                <td>{product.Price}</td>
                                                <td>{getCategoryName(product.categoryId)}</td>
                                                <td>
                                                      <Link to={`/update/${product.id}`}>
                                                            <Button variant='warning' className='mr-2'>Edit</Button>
                                                      </Link>
                                                      <Button variant='danger' onClick={() => handlerDeleteProduct(product.id)}>Delete</Button>
                                                </td>
                                          </tr>
                                    )) 
                              }
                        </tbody>
                  </Table>
            </div>
      )
}

export default Listproduct