import styled from 'styled-components'
import { Table, Button } from '@mui/material'

export const ListTable = styled(Table)`
        align-content: center; 
        width: '60%';
        border-width: 2px;
        padding: 2px;`

export const Buttons = styled(Button)`
        background-color: ${props => props.addButton ? 'aquamarine' : props.editButton ? '#B988E7' : '#F54B4B'} !important;
        color: black;
        align-items: center;`
