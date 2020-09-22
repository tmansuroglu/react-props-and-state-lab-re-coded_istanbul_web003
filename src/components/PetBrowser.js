import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return (<div className="ui cards">
      {this.props.pets.map((eachPet, index) => <Pet onAdoptPet={this.props.onAdoptPet} key={index} pet={eachPet} />)}
    </div>)
  }
}

export default PetBrowser
