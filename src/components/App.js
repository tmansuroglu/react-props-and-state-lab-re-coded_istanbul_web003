import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchData = () => {
    const URL = this.state.filters.type === "all" ? "/api/pets" : `/api/pets?type=${this.state.filters.type}`

    fetch(URL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          ...this.state,
          pets: data
        })

      })
  }

  componentDidMount() {
    this.fetchData()
  }

  handleChange = async (event) => {

    this.setState({
      ...this.state,
      filters: { type: event.target.value }
    })

  }

  handleAdoptPet = (id) => {
    const pet = this.state.pets.find(x => x.id === id)
    const petIndex = this.state.pets.indexOf(pet)
    this.state.pets[petIndex] = { ...this.state.pets[petIndex], isAdopted: true }
    this.setState({
      ...this.state
    })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.fetchData} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
