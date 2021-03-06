import React from "react"
import '../styles/components/IndividualRecipe.scss'
import RecipeIngredientDisplay from './RecipeIngredientDisplay.js'


class IndividualRecipe extends React.Component{
  constructor(){
    super()

    this.checkAvailableIngredients = this.checkAvailableIngredients.bind(this)
    this.displayIngredients = this.displayIngredients.bind(this)
    this.handleFave = this.handleFave.bind(this)
    this.removeFave = this.removeFave.bind(this)

    this.state = {
      matchingIngredients: [],
      displayIngredients: false


    }


  }

  componentDidMount(){
    this.checkAvailableIngredients()
  }

//may not work when I put proper ingredients in
  checkAvailableIngredients(){
    const recipeIngredients = this.props.recipe.ingredients
    const ingredientsInStock = this.props.stock
    const matchingIngredients = recipeIngredients.filter(item => {
      return ingredientsInStock.some(stockItem => {
        return item.text.toLowerCase().includes(stockItem.ingredient.toLowerCase())
      })
    })
    this.setState({
      matchingIngredients
    })
  }

  displayIngredients(){
    this.setState({
      displayIngredients: !this.state.displayIngredients
    })
  }

  handleFave(event){
    event.preventDefault()
    this.props.retrieveItem(this.props.entireRecipe, "favourites")
  }

  removeFave(event){
    event.preventDefault()
    this.props.removeItem(this.props.entireRecipe, "favourites")
  }

  render(){
    return (
    <div className="individual-recipe">
      <img className="individual-recipe__image" src={this.props.recipe.image}/>
        <div className="individual-recipe__info">
        <h6>{this.props.recipe.label}</h6>
        <span className="individual-recipe__recipe-bar">
        <a href={this.props.recipe.url}>See Recipe</a>
        {this.props.favourites.some(fave => fave.recipe.label === this.props.recipe.label)
          ? <a onClick={this.removeFave} href=""><i className="fas fa-star faved"></i></a>
          : <a onClick={this.handleFave} href=""><i className="far fa-star"></i></a>
      }
      </span>
        <span onClick={this.displayIngredients}>{this.state.matchingIngredients.length} out of {this.props.recipe.ingredients.length} ingredients</span>
        {this.state.displayIngredients ? <RecipeIngredientDisplay
                                              recipeIngredients={this.props.recipe.ingredients}
                                              matchingIngredients={this.state.matchingIngredients}
                                            /> : null}
      </div>

    </div>
  )
  }
}

export default IndividualRecipe
