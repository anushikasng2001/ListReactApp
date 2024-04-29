import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { Component } from 'react'
import './List.css'

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
      <Grid>
        <Grid margin-bottom='5px'>
            <TextField variant='filled' type='text' value={this.state.input} onChange={this.handleItemChange} ref={this.inputRef}/>
            <Button variant='filled' className='addButton' onClick={() => {this.state.isEditing ? this.saveItem() : this.addItem()}}>
                {this.state.isEditing ? 'Save Changes' : 'Add Item'}
            </Button>
        </Grid>
        <Grid className='table' item xs={12} md={6}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Serial No.</TableCell>
                            <TableCell align='center'>Item name</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.items.map(
                            (item, index) => {
                                return (                               
                                    <TableRow key={index}>
                                        <TableCell align='center'>{index}</TableCell>
                                        <TableCell align='center'>{item}</TableCell>
                                        <TableCell className='actions' align='center'>
                                            <Button variant='filled' className='editButton' onClick={() => {this.editItem(item, index)}}>Edit</Button>
                                            <Button variant='filled' className='delButton' onClick={() => {this.deleteItem(index)}}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Grid>
    )
  }
}

export default ListComponent
