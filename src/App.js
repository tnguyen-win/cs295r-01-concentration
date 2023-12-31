import { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.imagePath = 'Cards/';

        const images = this.fillImages();

        this.shuffleImages(images);
        this.state = {
            images,
            firstPick: -1,
            secondPick: -1,
            matches: 0,
            tries: 0
        };

        this.handleClick = this.handleClick.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.isMatch = this.isMatch.bind(this);
    }

    fillImages() {
        const images = Array(20).fill(null);
        const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        const suits = ['h', 's'];
        let index = 0;

        for (const value in values) {
            for (const suit in suits) {
                images[index] = `card${values[value]}${suits[suit]}.jpg`;

                index++;
            }
        }

        return images;
    }

    shuffleImages(images) {
        for (const i in images) {
            const rnd = Math.floor(Math.random() * images.length);

            [images[i], images[rnd]] = [images[rnd], images[i]];
        }
    }

    renderCard(i) {
        const enabled = (this.state.images[i] !== null && (i !== this.state.firstPick && i !== this.state.secondPick) && (this.state.firstPick === -1 || this.state.secondPick === -1) && (this.state.matches < 10));
        const image = this.state.images[i] === null ? 'none' : this.state.firstPick === i || this.state.secondPick === i ? `${this.imagePath}${this.state.images[i]}` : `${this.imagePath}black_back.jpg`;
        /* Hack - Show All */
        // const image = `${this.imagePath}${this.state.images[i]}`;
        const cursor = enabled ? 'pointer' : 'none';
        const style = {
            backgroundImage: `url(${image})`,
            cursor
        };
        const eventHandler = enabled ? this.handleClick : () => { };
        const output = <div id={i} key={i} name='card' className='col-sm-2 card' style={style} onClick={eventHandler}>&nbsp;</div>;

        return output;
    }

    render() {
        const status = this.state.matches < 10 ? `Matches: ${this.state.matches} Tries: ${this.state.tries}` : `Congratulations! You found all 10 matches in ${this.state.tries} tries!`;
        const output = (
            <div className='container mt-5 text-info' id='board'>
                <h1 className='pb-3 text-center fw-bold' id='status'>{status}</h1>
                <div className='row'>
                    <div className='col-sm-1'></div>
                    {this.renderCard(0)}
                    {this.renderCard(1)}
                    {this.renderCard(2)}
                    {this.renderCard(3)}
                    {this.renderCard(4)}
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-1'></div>
                    {this.renderCard(5)}
                    {this.renderCard(6)}
                    {this.renderCard(7)}
                    {this.renderCard(8)}
                    {this.renderCard(9)}
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-1'></div>
                    {this.renderCard(10)}
                    {this.renderCard(11)}
                    {this.renderCard(12)}
                    {this.renderCard(13)}
                    {this.renderCard(14)}
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-1'></div>
                    {this.renderCard(15)}
                    {this.renderCard(16)}
                    {this.renderCard(17)}
                    {this.renderCard(18)}
                    {this.renderCard(19)}
                    <div className='col-1'></div>
                </div>
            </div>
        );

        return output;
    }

    handleClick(event) {
        const index = parseInt(event.target.id);

        if (this.state.firstPick === -1) this.setState({ firstPick: index });
        else {
            this.setState({ secondPick: index });

            setTimeout(this.checkCards, 2000);
            /* Hack - Remove check match delay */
            // setTimeout(this.checkCards, null);
        }
    }

    isMatch = () => this.state.images[this.state.firstPick].substr(4, 1) === this.state.images[this.state.secondPick].substr(4, 1);

    checkCards() {
        const result = { ...this.state };

        result.tries++;

        /* Hack - Game Over */
        // result.matches = 10;

        if (this.isMatch()) {
            result.matches++;
            result.images[result.firstPick] = null;
            result.images[result.secondPick] = null;
        }

        result.firstPick = -1;
        result.secondPick = -1;

        this.setState({
            images: result.images,
            firstPick: result.firstPick,
            secondPick: result.secondPick,
            matches: result.matches,
            tries: result.tries
        });
    }
}

export default App;
