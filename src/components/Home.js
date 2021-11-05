import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { toast } from "react-toastify";
import { addQuantity,subtractQuantity} from './actions/cartActions'
import "react-toastify/dist/ReactToastify.css";



 class Home extends Component{
    
    handleClick = (id, title)=>{
        this.props.addToCart(id); 
        toast.success(`${title} added to the cart`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true
          });
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

    render(){
        let items = [...this.props.items];
        let itemList = items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id,item.title)}}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price: {item.price}$</b></p>
                        </div>
                        <div className="action-buttons">
                        <i className="material-icons" onClick={()=>{this.handleClick(item.id, item.title)}}>add</i>
                        <div className="card__quantity">{item.quantity}</div>
                        <i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>remove</i>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const {items} = state;
    return {
      items: items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)