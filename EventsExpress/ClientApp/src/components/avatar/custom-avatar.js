﻿import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import { userImage } from "../../constants/userImage";
export default class CustomAvatar extends Component {


    render() {

        const { userId, name } = this.props;

        let size = `${this.props.size}Avatar`;

        let firstLetterSize = (this.props.size === 'big')
            ? 'display-1'
            : (this.props.size === 'little')
                ? 'display-4'
                : '';

        return (
            <>
                <Avatar
                    alt={name.charAt(0).toUpperCase()}
                    src={`api/photo/GetUserPhoto?id=${userId}`}
                    className={size}
                    imgProps={{ onError: (e) => { e.target.onerror = null; e.target.src = `${userImage}` } }}/>
            </>
        );
    }
}