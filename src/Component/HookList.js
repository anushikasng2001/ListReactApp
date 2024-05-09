import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import './List.css'

function HookList() {

    const [input, setInput] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [items, setItems] = useState([])
    const [num, setNum] = useState(0)

    const addItem = () => {
        const updatedItems = [...items]
        if(input === ''){
            return null
        }
        updatedItems.push(input)
        setItems(updatedItems)
        setInput('')
    }

    const editItem = (item, index) => {
        setInput(item)
        setIsEditing(true)
        setNum(index)
    }

    const saveItem = () => {
        setItems(prevItems => {
            const updatedItems = [...prevItems]
            if(input === ''){
                return updatedItems
            }else{
                updatedItems[num] = input
            }
            return updatedItems
        })
        setInput('')
        setIsEditing(false)
        setNum(0)
    }

    const deleteItem = (index) => {
        const updatedItems = [...items]
        updatedItems.splice(index, 1)
        setItems(updatedItems)
        setInput('')
    }

  return (
    <Grid>
        <Grid margin-bottom='5px'>
            <TextField variant='filled' type='text' value={input} onChange={(event) => setInput(event.target.value)}/>
            <Button variant='filled' className='addButton' onClick={() => {isEditing ? saveItem() : addItem()}}>
                {isEditing ? 'Save Changes' : 'Add Item'}
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
                        {items.map(
                            (item, index) => {
                                return (                               
                                    <TableRow key={index}>
                                        <TableCell align='center'>{index}</TableCell>
                                        <TableCell align='center'>{item}</TableCell>
                                        <TableCell className='actions' align='center'>
                                            <Button variant='filled' className='editButton' onClick={() => editItem(item, index)}>Edit</Button>
                                            <Button variant='filled' className='delButton' onClick={() => deleteItem(index)}>Delete</Button>
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

export default HookList
