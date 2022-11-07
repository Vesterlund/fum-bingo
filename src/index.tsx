import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './fumsquares.json';


interface SquareState {
    toggled: boolean,
    text: string
}

interface SquareProps {
    btnText: string;
}

interface CoutnerProps {
    
}

interface CounterState {
    count: number;
}

interface GenerateBoardButtonProps {
}
interface GenerateBoardButtonState {   
}

class Counter extends React.Component<CoutnerProps,CounterState> {
    constructor(props: CoutnerProps) {
        super(props);

        this.state = {
            count: 0,
        }
    }

    handleClick() : void {
        let c = this.state.count + 1;
        this.setState({count: c}); 
    }
    lowerCount() : void {
        let c = this.state.count - 1;
        this.setState({count: c}); 
    }

    render() {
        return (
            <>
            <button className='btn-counter' onClick={() => this.handleClick()}>
                +
            </button>
            <h2>Ordningsfrågor: {this.state.count}</h2>
            <button className='btn-counter' onClick={() => this.lowerCount()}>
                -
            </button>
            </>
        );
    }
}

class GenerateBoardButton extends React.Component<GenerateBoardButtonProps,GenerateBoardButtonState> {
    constructor(props: CoutnerProps) {
        super(props);
    }

    handleClick() : void {
        localStorage.removeItem('squares');
        window.location.reload();
    }

    render() {
        return (
            <>
            <button className='btn-counter' onClick={() => this.handleClick()}>
                Generera nytt bräde
            </button>
            </>
        );
    }
}


class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
        super(props);
        this.state = {
            toggled: false,
            text: this.props.btnText,
        };
    }

    handleClick(): void {
        let b = this.state.toggled;
        this.setState({ toggled: !b, });
    }

    buttonStyle(): string {
        let classname = 'square';

        if (this.state.toggled) {
            let i = Math.floor(Math.random() * 40);

            let back = "back-chs";
            switch(i) {
                case 0:
                    back = "back-for"
                    break;
                case 1:
                    back = "back-caps"
                    break;
                case 2:
                    back = "back-ccp"
                    break;
                case 3:
                    back = "back-def"
                    break;
                case 4:
                    back = "back-kap"
                    break;
                case 5:
                    back = "back-kpi"
                    break;
                case 6:
                    back = "back-pt"
                    break;
                case 7:
                    back = "back-sak"
                    break;
            }


            classname += ' btn-active ' + back;
        }
        return classname;
    }

    render() {
        return (
            <Col className={this.buttonStyle()}>
                <button onClick={() => this.handleClick()}>
                    {this.state.text}
                </button>
            </Col>
        );
    }
}

function getBoardSquares(): string[][] {
    let out: string[][] = [[], []];


    data.forEach((d) => {
        if (d.type === 0) {
            out[0].push(d.text);
        } else {
            out[1].push(d.text);
        }
    })

    return out;
}

class Board extends React.Component {

    generateBoard(): { [key: number]: string } {
        var out: { [key: number]: string } = {};
        let squares: string[][] = getBoardSquares();
        let freeSquare: string[] = squares[0];
        let boardSquares: string[] = squares[1];

        let i = [];

        let n = 0;

        while (i.length < 24) {
            let r = Math.floor(Math.random() * boardSquares.length);
            if (i.indexOf(r) === -1) {
                i.push(r);

                if (n === 12) {
                    n++;
                }

                out[n] = boardSquares[r];
                n++
            }
        }

        let freeI = Math.floor(Math.random() * freeSquare.length);

        out[12] = freeSquare[freeI];


        return out;
    }

    render() {
        let boardState = localStorage.getItem('squares');
        let squares: { [key: number]: string } = (boardState != null) ? JSON.parse(boardState) : this.generateBoard();
        localStorage.setItem('squares', JSON.stringify(squares));
        return (
            <>
                <Row>
                    <Square btnText={squares[0]} />
                    <Square btnText={squares[1]} />
                    <Square btnText={squares[2]} />
                    <Square btnText={squares[3]} />
                    <Square btnText={squares[4]} />
                </Row>
                <Row>
                    <Square btnText={squares[5]} />
                    <Square btnText={squares[6]} />
                    <Square btnText={squares[7]} />
                    <Square btnText={squares[8]} />
                    <Square btnText={squares[9]} />
                </Row>
                <Row>
                    <Square btnText={squares[10]} />
                    <Square btnText={squares[11]} />
                    <Square btnText={squares[12]} />
                    <Square btnText={squares[13]} />
                    <Square btnText={squares[14]} />
                </Row>
                <Row>
                    <Square btnText={squares[15]} />
                    <Square btnText={squares[16]} />
                    <Square btnText={squares[17]} />
                    <Square btnText={squares[18]} />
                    <Square btnText={squares[19]} />
                </Row>
                <Row>
                    <Square btnText={squares[20]} />
                    <Square btnText={squares[21]} />
                    <Square btnText={squares[22]} />
                    <Square btnText={squares[23]} />
                    <Square btnText={squares[24]} />
                </Row>
            </>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <h1>FuMbingo😎</h1>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <h2>Ordningfrågecounter</h2>
                            <Counter />
                        </Col>
                        <Col md={1}></Col>
                        <Col md={7}>
                            <Board />
                        </Col>
                        <Col md={2}>
                        <GenerateBoardButton />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
