import "./Zoom.scss";

import * as React from "react";
import { SyntheticEvent } from "react";

interface IZoomState {
    isLoading: boolean;
    hasError: boolean;
    username: string;
    url: string;
}

export default class Zoom extends React.Component<{}, IZoomState> {

    public componentWillMount() {
        this.setState({
            isLoading: false,
            hasError: false,
            username: null,
            url: null
        });
    }

    public render() {
        return (
            <div className="zoom container">
                <div className="title has-text-centered">
                    Instagram Profilbild vergrößern
                </div>

                <div className="zoom__inner">
                    <form>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="zoom__username input"
                                    placeholder="Benutzername eingeben ..."
                                    onChange={this.handleInputChange}
                                    required
                                    autoFocus={true}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fab fa-instagram"></i>
                                </span>
                            </p>
                        </div>

                        <button
                            className={`button is-primary is-fullwidth ${this.state.isLoading ? "is-loading" : ""}`}
                            onClick={this.handleButtonClick}
                        >
                            Profilbild vergrößern
                        </button>
                    </form>
                </div>

                {this.renderModal()}
            </div>
        );
    }

    private renderModal() {
        return (
            <div className={`modal ${this.state.url ? "is-active" : ""}`}>
                <div
                    className="modal-background"
                    onClick={this.handleCloseClick}>
                </div>

                <div className="zoom__modal modal-content has-text-centered">
                    <div className="has-text-black">Profilbild</div>
                    <img className="zoom__image" src={this.state.url} />
                    <a href={this.state.url} className="button is-primary is-fullwidth">Herunterladen</a>
                </div>

                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={this.handleCloseClick}>
                </button>
            </div>
        );
    }

    private handleInputChange = (event) => {
        this.setState({ username: event.target.value })
    }

    private handleButtonClick = (event: SyntheticEvent) => {
        event.preventDefault();

        if (this.state.username) {
            try {
                fetch(`http://insta.test/public/api.php?name=${this.state.username}`)
                    .then(response => response.json())
                    .then((response) => {
                        if (response.status === 'success') {
                            this.setState({
                                isLoading: false,
                                url: response.url
                            });
                        } else {
                            this.setState({
                                isLoading: false,
                                hasError: true
                            });
                        }
                    });
            } catch (e) {
                this.setState({
                    isLoading: false,
                    hasError: true
                });
            }
        }
    }

    private handleCloseClick = (event: SyntheticEvent) => {
        event.preventDefault();

        this.setState({
            username: null,
            url: null
        })
    }
}