import React, {useState} from "react";

const generateNumber = ({min, max}) => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

const generateGrille = async ({min, max, count}) => {
    if ((Math.abs(max) - Math.abs(min)) + 1 < count) {
        throw new Error("Incorrect numbers");
    }
    const numbers = [];
    while (numbers.length <= count) {
        const nb = generateNumber({min, max});
        if (!numbers.includes(nb)) {
            numbers.push(nb);
        }
        if (numbers.length === count) {
            return numbers;
        }
    }
}

const tableStyle = {
}

const IndexPage = () => {
    const [grilles, setGrilles] = useState([]);
    return (
        <main>
            <button onClick={() => {
                Promise.all([generateGrille({min: 1, max: 50, count: 5}), generateGrille({min: 1, max: 12, count: 2})])
                .then(numbers => {
                    setGrilles(prevGrilles => [...prevGrilles, [...numbers[0], ...numbers[1]]]);
                });
            }}>Générer une grille</button>

            <h2>Liste des grilles : </h2>
            <table style={tableStyle}>
            {grilles.map((grille, key) => {
                const parentKey = `grille_${key}`;
                return (
                    <tr key={parentKey}>
                        <GrilleRowCols numbers={grille} parentKey={parentKey} />
                    </tr>
                )
            })}
            </table>
        </main>
    )
}

const GrilleRowCols = ({numbers, parentKey}) => {
    return numbers.map((nb, key) => <td key={`${parentKey}_${key}`}>{nb}</td>)
}

export default IndexPage

export const Head = () => <title>Générateur de grilles</title>
