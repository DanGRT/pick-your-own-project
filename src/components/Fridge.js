import React from "react"
import FridgeItem from "./FridgeItem.js"

import '../styles/components/Fridge.scss';

class Fridge extends React.Component{
  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(event){
    this.props.fetchRecipes()
    this.props.changeDisplay('recipes')
  }

  render(){
    return(
    <div className="fridge">
      <ul className='fridge__item-container'>
        {this.props.stock.map(item => {
          const isSelected = this.props.activeIngredients.find(ingredient => ingredient.key === item.key);
          return (
            <FridgeItem key={item.key}
                        item={item}
                        isSelected={isSelected}
                        retrieveIngredients={this.props.retrieveIngredients}
                        removeIngredients={this.props.removeIngredients}/>
          )
        })}
        <button onClick={this.handleClick}>Find me recipes with selected</button>


      </ul>
    </div>
    )
  }

}

export default Fridge;
