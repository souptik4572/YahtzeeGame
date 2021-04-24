import React, { Component } from 'react';
import './Score.css';

class Score extends Component {
    constructor(props) {
        super(props);
        this.handleScore = this.handleScore.bind(this);
    }
    handleScore() {
        this.props.assignScore(this.props.id);
    }
    render() {
        const cls = "Score" + (typeof(this.props.scoreValue)==="number" ? " Score-assigned" : "");
        return(
            <div className={cls} onClick={this.handleScore}>
                <span className="Score-name"> {this.props.scoreName} </span>
                <span> {this.props.scoreValue} </span>
            </div>
        )
    }
}

export default Score;