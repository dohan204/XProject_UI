// import { useState } from 'react';/
import type { props } from '../../../model/props/Practice';
import DialogOut from '../../generic/DialogOut';
import DialogIn from '../../generic/DialogIn';
export default function StartPractice({ open, handleClose}: props) {
    const tokenUser = localStorage.getItem('tokenUser')
    return (
        <>
            {tokenUser ? (
                <DialogIn open={open} handleClose={handleClose} />
            ) : (
                <DialogOut open={open} handleClose={handleClose}  />
            )}
        </>
    )
}
