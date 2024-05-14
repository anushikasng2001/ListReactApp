import { Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Buttons, ListTable } from './StyledComp'

function HookList() {

    const [input, setInput] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [items, setItems] = useState([])
    const [num, setNum] = useState(0)

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        console.log('component mounted')
    }, [])

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
            <TextField ref={inputRef} variant='filled' type='text' value={input} onChange={(event) => setInput(event.target.value)}/>
            <Buttons variant='filled' addButton onClick={() => {isEditing ? saveItem() : addItem()}}>
                {isEditing ? 'Save Changes' : 'Add Item'}
            </Buttons>
        </Grid>
        <Grid className='table' item xs={12} md={6}>
            <TableContainer component={Paper}>
                <ListTable>
                    <caption>List of items </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' scope='col'>Serial No.</TableCell>
                            <TableCell align='center' scope='col'>Item name</TableCell>
                            <TableCell align='center' scope='col'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(
                            (item, index) => {
                                return (                               
                                    <TableRow key={index}>
                                        <TableCell align='center' >{index}</TableCell>
                                        <TableCell align='center' scope='row'>{item}</TableCell>
                                        <TableCell className='actions' align='center'>
                                            <Buttons variant='filled' editButton onClick={() => editItem(item, index)}>Edit</Buttons>
                                            <Buttons variant='filled' delButton onClick={() => deleteItem(index)} >Delete</Buttons>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </ListTable>
            </TableContainer>
        </Grid>
      </Grid>
  )
}

export default HookList
