import React, { Component } from "react";
import { Modal } from 'reactstrap';
import ScaleLoader from "react-spinners/ScaleLoader";


class ModalSpinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setModalMini: false
        };
    }
    handleChange = () => {
        this.setState({ setModalMini: false });
    }

    render() {
        return (
            <>

                <Modal
                    modalClassName="modal-mini modal-info"
                    isOpen={this.props.value}
                >
                    <div className="modal-header justify-content-center">
                        <div className="modal-profile">

                            <div className="sweet-loading" style={{ display: "inline" }}>
                                <ScaleLoader
                                    color={"#2ca8ff"}
                                    margin="2"
                                    height="25"
                                    width="4"
                                    loading={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <p>Attendre l'envoi de message ...</p>
                    </div>

                </Modal>
            </>);
    }

}

export default ModalSpinner;