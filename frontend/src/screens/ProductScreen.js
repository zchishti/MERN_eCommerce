import React ,{ useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';


const ProductScreen = ({history}) => {

  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const params =  useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  },[ dispatch, params])
  
  const addTocartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return <div>
    <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
      <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={3}>
        <Card>
        <ListGroup varient='flush'>
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Price: {`$${product.price}`}
          </ListGroup.Item>
          <ListGroup.Item>
            Description:  {product.description}
          </ListGroup.Item>
        </ListGroup>
        </Card>
      </Col>
      <Col md={3}>
        <ListGroup varient='flush'>
          <ListGroup.Item>
            <Row>
              <Col>
                Price:
              </Col>
              <Col>
                <strong>{product.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                Status:
              </Col>
              <Col>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            
          {product.countInStock > 0 && (
            <Row>
              <Col>Qty</Col>
              <Col>
                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                  {
                    [...Array(product.countInStock).keys()].map(i => {
                      return <option key={i + 1} value={i+1}>{i +1}</option>
                    })
                  }
                </Form.Control>
              </Col>
            </Row>
          )}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button onClick={addTocartHandler} type='button' className='btn-block d-grid' disabled={product.countInStock === 0}>
              Add to Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
    )}
    
  </div>;
  
};

export default ProductScreen;
