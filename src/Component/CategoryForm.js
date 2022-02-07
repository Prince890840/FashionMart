import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../Category/Controls'
import { useForm, Form } from '../Category/useForm';

const initialFValues = {
    id: 0,
    categoryTitle: '',
    categoryDescription: '',
}

export default function CategoryForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('categoryTitle' in fieldValues)
            temp.categoryTitle = fieldValues.categoryTitle ? "" : "This field is required."
        if('categoryDescription' in fieldValues)
            temp.categoryDescription = fieldValues.categoryDescription ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="categoryTitle"
                        label="Category Title"
                        value={values.categoryTitle}
                        onChange={handleInputChange}
                        error={errors.categoryTitle}
                    />
                    <Controls.TextareaAutosize
                        label="Category Description"
                        name="categoryDescription"
                        value={values.categoryDescription}
                        onChange={handleInputChange}
                        error={errors.categoryDescription}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}