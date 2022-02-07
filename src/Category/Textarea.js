import React from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function Textarea(props) {

    const { name, label, value, error = null, onChange, ...other } = props;
    return (
        <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            cols={20}
            placeholder="Enter Category Description"
            style={{ width: 200 }}
        />
    )
}