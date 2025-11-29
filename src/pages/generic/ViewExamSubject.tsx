import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogOut from './DialogOut'
import type { props } from '../../model/props/Practice'

export default function ViewExamSubject({ open, handleClose, code }: props) {
    return <DialogOut open={open} handleClose={handleClose} />
}

