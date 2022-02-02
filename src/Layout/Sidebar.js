import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const Sidebar = [
    {
        title: 'Home',
        path: '/admin/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'AddProduct',
        path: '/admin/uploadproduct',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'ProductList',
        path: '/admin/productlist',
        icon: <FaIcons.FaList />,
        cName: 'nav-text'
    },
    {
        title: 'Add Category',
        path: '/admin/addcategory',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'List Category',
        path: '/admin/listcategory',
        icon: <FaIcons.FaList />,
        cName: 'nav-text'
    },
    {
        title: 'Message',
        path: '/admin/message',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Support',
        path: '/admin/support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
]