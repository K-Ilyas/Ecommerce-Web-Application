import React from 'react'
import Rating from './Rating';
import {
    UncontrolledTooltip, Button,
    Card,
    CardImg,
    CardBody,
    CardTitle,

} from 'reactstrap';
import { Link } from 'react-router-dom';


export default function Product(props) {

    const { product } = props;

    return (

        <div key={product.id} className='ol col col-md col-md-4 col-6 product_card' style={{ width: "200px" }}>

            <Card className="mb-3 productShow">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Link to={`/info/product/${product.id}`} style={{ paddingLeft: "0", paddingRight: "0", backgroundColor: "white" }}>


                        <CardImg style={{ width: "200px", height: "190px" }} alt={product.name} src={product.image} top ></CardImg>

                    </Link></div>
                <CardBody>
                    <Link style={{ fontSize: "12px", paddingLeft: "0", paddingRight: "0", textDecoration: "underline", textAlign: "center" }} to={`/info/product/${product.id}`}> <CardTitle tag="h4" style={{ textDcoration: "underline" }}>{product.name.substring(0, 20) + '...'}</CardTitle></Link>
                    <div className="review-box">
                        <p>Évaluation génerale du produit</p>
                        <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                        ></Rating>
                        <p>Prix public : <strong> {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD</strong></p>
                        <Button className=" avisBtn-card" color="primary" id={`Acheter_${product.id}`} style={{ padding: "8px", marginRight: "12px" }} >
                            <i className="now-ui-icons shopping_cart-simple"></i></Button>
                        <UncontrolledTooltip placement="bottom" target={`Acheter_${product.id}`} delay={0}>
                            Acheter
                        </UncontrolledTooltip>
                        <Link to={`/info/product/${product.id}`}><Button type="button" className="avisBtn-card" color="primary" id={`Voir_${product.id}`} style={{ padding: "8px" }} >
                            <i className="fa fa-eye"></i></Button></Link>
                        <UncontrolledTooltip placement="bottom" target={`Voir_${product.id}`} delay={0}>
                            Voir
                        </UncontrolledTooltip>
                    </div>
                </CardBody>
            </Card>
        </div>

    )
}
