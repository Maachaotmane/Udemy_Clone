import styled from "styled-components";
import Navbar from '../components/Navbar'
import Announce from '../components/Announce'
import Footer from "../components/Footer";
import AddIcon from '@mui/icons-material/Add';
import { mobile } from "../responsive";
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import ReactPayPal from './ReactPaypal';





const KEY = 'pk_test_51Klo3aICzJTzARWAGQGR0wguewl3XBVqF9thTRuRzF0WSwSkqVf05URmpRcQdZvbZqyjPWBq0GvFHvmGo3Kk1OBj00RQBRsOCa';

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}

`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
${mobile({ display: "none" })}

`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}

`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}

`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px 0px;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  // const navigate = useNavigate();

  console.log(KEY);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:3030/api/stripe/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        // navigate("/success", {
        //   stripeData: res.data,
        //   products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, []);


  return (

    <Container>
        <Navbar/>
        <Announce/>
        <Wrapper>
            <Title>Your Cart</Title>
            <Top>
                <TopButton>Continue Shopping</TopButton>
                <TopTexts>
                    <TopText>Shopping Bagg (2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="field">Checkout Now</TopButton>
            </Top>
            <Bottom>
                <Info>
                {cart.products.map((product) => (
                    <Product>
                        <ProductDetail>
                            <Image src={product.photo} alt="product" ></Image>
                            <Details>
                                <ProductName><b>Product:</b> {product.title}</ProductName>
                                <ProductId><b>ID:</b> {product._id}</ProductId>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <AddIcon />
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <RemoveIcon />
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
              ))}
                    <Hr/>
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Fees</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Fees Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
                      name="Mega Store"
                      image="https://avatars.githubusercontent.com/u/63611548?v=4"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.total}`}
                      amount={cart.total * 100}
                      token={onToken}
                      stripeKey={KEY}
                    ></StripeCheckout>
        
                      <ReactPayPal amount={cart.total} />
                       
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart