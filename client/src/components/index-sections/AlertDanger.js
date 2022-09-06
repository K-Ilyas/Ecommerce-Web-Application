import React, { Component } from "react";
import { Alert, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Animated } from "react-animated-css";

class AlertDanger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.value,
            popoverOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }


    onDismiss() {
        this.setState({
            visible: !this.state.visible
        });
        this.props.action();
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });

    }


    /* componentDidUpdate(oldProps) {
          if (oldProps.value !== this.props.value) {
              this.setState({
                  visible: true
              });
          }
  
      }
      */
    render() {
        return (
            <>
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>

                    <Alert color="danger" isOpen={this.state.visible} className="btn-user" id={this.props.id || "Provers1"} onClick={this.toggle}>
                        <div className="container" >
                            <div className="alert-icon">
                                <i className="now-ui-icons objects_support-17 "></i>
                            </div>
                            <strong >OH SNAP!</strong> {this.props.message}
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={this.onDismiss}
                            >
                                <span aria-hidden="true" >
                                    <i className="now-ui-icons ui-1_simple-remove"></i>
                                </span>
                            </button>
                        </div><Popover
                            placement="right"
                            isOpen={this.state.popoverOpen}
                            target={this.props.id || "Provers1"}
                            toggle={this.toggle}
                            className="popover-danger"
                        >
                            <PopoverHeader>Error détails:</PopoverHeader>
                            <PopoverBody>
                                {this.props.error}
                            </PopoverBody>
                        </Popover>
                    </Alert>
                </Animated>
            </>);
    }

}

export default AlertDanger;