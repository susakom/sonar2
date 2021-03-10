﻿import React, { Component } from "react";
import { connect } from 'react-redux';
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from '@material-ui/core';
import { renderErrorMessage } from '../helpers/helpers';
import StatusHistory from '../helpers/EventStatusEnum';

class EventCancelModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cancelationReason: '',
        }
    }

    handleChange = (event) => {
        this.setState({ cancelationReason: event.target.value })
    }

    handleClickOpen = () => {
        this.props.setStatus(true);
    }

    handleClose = () => {
        this.props.setStatus(false);
        this.setState({ cancelationReason: '' })
    }

    submit = () => {
        this.props.submitCallback(this.state.cancelationReason, this.props.eventStatus);
    }

    render() {
        const text = this.props.eventStatus === StatusHistory.Canceled ? "Cancel" : "Undo cancel";

        return (
            <>
                <button onClick={this.handleClickOpen} className="btn btn-edit">{text}</button>
                <Dialog
                    open={this.props.status}
                    onClose={this.handleClose}
                >
                    <div className="eventCancel">
                        <DialogContent>
                            {this.props.eventStatus === StatusHistory.Canceled && 
                                <div>
                                    <h4>Enter the reason of cancelation</h4>
                                </div>
                            }
                            {this.props.eventStatus !== StatusHistory.Canceled && 
                                <div>
                                    <h4>Enter the reason of undo cancelation</h4>
                                </div>
                            }
                            <div>
                                <input size="50" type='text' onChange={this.handleChange} />
                            </div>
                            {this.props.cancelationStatus.errorMessage &&
                                renderErrorMessage(this.props.cancelationStatus.errorMessage, 'reason')
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button
                                fullWidth={true}
                                type="button"
                                color="primary"
                                onClick={this.handleClose}
                            >
                                Discard
                            </Button>
                            <Button
                                fullWidth={true}
                                type="button"
                                value="Login"
                                color="primary"
                                onClick={this.submit}
                            >
                                Confirm action
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.event.cancelationModalStatus
});

const mapDispatchToProps = (dispatch) => ({
    setStatus: (data) => dispatch(setEventCanelationModalStatus(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventCancelModal);
