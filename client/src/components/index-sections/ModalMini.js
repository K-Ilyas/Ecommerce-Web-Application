import React, { Component } from "react";
import { Modal, ModalFooter, Button } from 'reactstrap';


class ModalMini extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModalMini: this.props.modalState
        };
    }
    handleChange = () => {
        this.setState({ setModalMini: false });
        this.props.action();
    }

    render() {
        return (
            <>

                <Modal
                    modalClassName={this.props.class}
                    isOpen={this.state.setModalMini}
                >
                    <div className="modal-header justify-content-center">
                        {/*    <button
                            className="close"
                            type="button"
                            onClick={this.handleChange.bind(this)}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button>
                    */}
                        <div className="modal-profile">
                            <i style={{ color: this.props.color }} className={this.props.className}></i>
                        </div>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.message}</p>
                    </div>
                    <ModalFooter>
                        <Button className="btn-neutral" color="link" type="button">
                            Back
                  </Button>
                        <Button

                            className="btn-link"
                            color="neutral"
                            onClick={this.handleChange.bind(this)}
                        >
                            Close
                  </Button>
                    </ModalFooter>
                </Modal>
            </>);
    }

}

export default ModalMini;