import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageHeader from '../Category/PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../Category/useTable';
import Controls from '../Category/Controls';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from '../Category/Notification';
import ConfirmDialog from '../Category/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import '../Category/icon.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))

const headCells = [
  { id: 'categorId', label: 'Id' },
  { id: 'categoryTitle', label: 'Category Title' },
  { id: 'categoryDescription', label: 'Category Description' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CategoryList() {

  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  const FETCH_CATEGORYLIST_URL = 'http://localhost:8080/api/category';
  let history = useHistory();

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(FETCH_CATEGORYLIST_URL)
        .then((response) => {
          setCategory(response.data);
          console.log(response.data);
        })
    } catch (e) {
      console.log(e);
    }
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(category, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          return items.filter(x => x.categoryTitle.toLowerCase().includes(target.value))
      }
    })
  }

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    console.log("CategoryId Which You want to delete ->", id);
    const response = await axios.delete(`http://localhost:8080/api/category/${id}`)
      .then((response) => {
        console.log("response", response);
        setCategory(category.filter((category) => category.id !== id));
      })
      .catch((error) => console.log(error));
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'success'
    })
  }

  const AddNewCategory = () =>{
    history.push("/admin/addcategory");
  }

  return (
    <>
      <PageHeader
        title="New Category"
        subTitle="Category-List"
        icon={<FormatListBulletedOutlinedIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>

        <Toolbar>
          <Controls.Input
            label="Search Categories"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Search />
              </InputAdornment>)
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={AddNewCategory}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map((item,index) =>
              (<TableRow key={item.categorId}>
                <TableCell>{item.categorId}</TableCell>
                <TableCell>{item.categoryTitle}</TableCell>
                <TableCell>{item.categoryDescription}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                  >
                    <Link to={`/admin/category/update/${item.categorId}`}>
                      <EditOutlinedIcon fontSize="small" className='iconcolor' />
                    </Link>
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { onDelete(item.categorId) }
                      })
                    }}>
                    <DeleteIcon fontSize="small" className='iconcolor' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>)
              )
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}