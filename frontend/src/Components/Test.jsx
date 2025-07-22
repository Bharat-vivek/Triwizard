import React, { Component } from "react";
import Question from "./Question";
import qBank from "./QuestionBank";

import "./Test.css";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: qBank,
            currentQuestion: 0,
            selectedOption: "",
            score: 0,
            quizEnd: false,
            selectedOptions: [], 
        };
    }

    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.checkAnswer();
        this.saveSelectedOption(); 
        this.handleNextQuestion();
    };

    checkAnswer = () => {
        const { questionBank, currentQuestion, selectedOption, score } = this.state;
        const correctAnswer = questionBank[currentQuestion].answer;

        if (selectedOption === correctAnswer) {
            this.setState((prevState) => ({ score: prevState.score + 3 }));
        } else {
            this.setState((prevState) => ({ score: prevState.score - 1 }));
        }
    };

    saveSelectedOption = () => {
        const { currentQuestion, selectedOption, selectedOptions } = this.state;
        this.setState({
            selectedOptions: [
                ...selectedOptions,
                { questionId: currentQuestion + 1, selectedOption },
            ],
        });
        console.log(selectedOptions);
    };

    handleNextQuestion = () => {
        const { questionBank, currentQuestion } = this.state;
        if (currentQuestion + 1 < questionBank.length) {
            this.setState((prevState) => ({
                currentQuestion: prevState.currentQuestion + 1,
                selectedOption: "", 
            }));
        } else {
            this.setState({
                quizEnd: true,
            });
        }
    };

    render() {
        const { questionBank, currentQuestion, selectedOption, score, quizEnd } =
            this.state;
        return (
            <div className="App d-flex flex-column align-items-center justify-content-center">
                <h1 className="app-title"></h1>
                {!quizEnd ? (
                    <Question
                        question={questionBank[currentQuestion]}
                        selectedOption={selectedOption}
                        onOptionChange={this.handleOptionChange}
                        onSubmit={this.handleFormSubmit}
                    />
                ) : (
                    <div className="quiz-end-message">
                        <h2>Thank you for completing the test!</h2>
                        <p>Your responses have been submitted.</p>
                        {/* Optional: Add a button to return to the home page or instructions page */}
                        <a href="/" className="btn btn-primary">Return to Home</a>
                    </div>
                )}
            </div>
        );
    }
}

export default Test;
