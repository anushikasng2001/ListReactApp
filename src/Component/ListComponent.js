import React, { Component } from 'react'

class ListComponent extends Component {
    constructor(props) {
      super(props)
    
      this.inputRef = React.createRef()

      this.state = {
         input: '',
         items: [],
         num: 0,
         isEditing: false
      }
    }

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleItemChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }
    addItem = () => {
        console.log(this.state.items)
        const updatedItems = [...this.state.items]
        if (this.state.input === ''){
            return null
        }
        updatedItems.push(this.state.input)
        return this.setState({
            items: updatedItems,
            input: ''
        })
    }
    editItem = (item, index) => {
        this.setState({
            input: item,
            num: index, 
            isEditing: true
        })
        console.log(this.state.num)
    }
    saveItem = () => {
        this.setState( (prevState) => {
            const updatedList = [...prevState.items]
            updatedList[this.state.num] = this.state.input
            return {
                items: updatedList,
                input: '',
                num: 0, 
                isEditing: false
            }
        })
    }
    deleteItem = (index) => {
        const updatedList = [...this.state.items]
        updatedList.splice(index, 1)
        this.setState({
            items: updatedList, 
            input: '',
            isEditing: false
        })
    }
    
    
  render() {
    return (
      <div>
        <div margin-bottom='5px'>
            <input type='text' value={this.state.input} onChange={this.handleItemChange} ref={this.inputRef}/>
            <button onClick={() => {this.state.isEditing ? this.saveItem() : this.addItem()}}>
                {this.state.isEditing ? 'Save Changes' : 'Add Item'}
            </button>
        </div>
        <table align='center' width='60%' border='2px' cellPadding='2px'>
            <thead>
                <tr>
                    <td>Serial No.</td>
                    <td>Item name</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {this.state.items.map(
                    (item, index) => {
                        return (                               
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item}</td>
                                <td>
                                    <button onClick={() => {this.editItem(item, index)}}>Edit</button>
                                    <button onClick={() => {this.deleteItem(index)}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                )}
            </tbody>
        </table>
      </div>
    )
  }
}

export default ListComponent
