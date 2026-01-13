import DialogOut from './DialogOut'

import type { props } from '../../model/props/Practice'

export default function ViewExamSubject({ open, handleClose }: props) {
    return <DialogOut open={open} handleClose={handleClose} />
}

