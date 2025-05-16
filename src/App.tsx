import {useEffect, useState} from 'react'
import './App.css'
import {ArcElement, Chart as ChartJS, Legend, Tooltip,} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {Tooltip as Tooltip1} from 'react-tooltip';

function App() {
    const maxBudget = 372;
    const notClassifiedText = 'Nog te besteden'
    const baseColors = [
        '#7E78B8',
        '#F06793',
        '#FCBA63',
        '#51BF9D',
        '#44C8F5',
    ];

    function initializeCategories() {
        const initialCategories = [
            {
                title: 'Sociale Zekerheid',
                amount: 0,
                percentage: 0,
                amountLastYear: 115,
                description: 'Sociale zekerheid beschermt mensen tegen verlies van inkomen door bijvoorbeeld werkloosheid, ziekte, arbeidsongeschiktheid of ouderdom (zoals: AOW, WW, WIA).',
                color: ''
            },
            {
                title: 'Zorg',
                amount: 0,
                percentage: 0,
                amountLastYear: 115,
                description: 'Alles rondom de gezondheidszorg, denk aan:  ziekenhuizen, huisartsen, verpleging, medicijnen en langdurige zorg.',
                color: ''
            },
            {
                title: 'Onderwijs',
                // title: 'Onderwijs, cultuur en wetenschap',
                amount: 0,
                percentage: 0,
                amountLastYear: 53,
                description: 'Alles rondom het borgen van onderwijskwaliteit, zoals: lesmateriaal, lerarenlonen en onderwijshuisvesting.',
                color: ''
            },
            {
                title: 'Defensie',
                amount: 0,
                percentage: 0,
                amountLastYear: 19,
                description: 'De uitgaven van de overheid aan de krijgsmacht: landmacht, luchtmacht, marine en marechaussee.',
                color: ''
            },
            {
                title: 'Justitie en veiligheid',
                amount: 0,
                percentage: 0,
                amountLastYear: 17,
                description: 'De overheidsuitgaven voor het waarborgen van de rechtsstaat, openbare orde en veiligheid.',
                color: ''
            },
            {
                title: 'Infrastructuur',
                // title: 'Infrastructuur en Waterstaat',
                amount: 0,
                percentage: 0,
                amountLastYear: 14,
                description: 'Aanleg van wegen, het onderhouden en de verbetering van fysieke netwerken die essentieel zijn voor vervoer en mobiliteit. En ook: zorgen voor schoon drinkwater en het beheer van rivieren en kanalen.',
                color: ''
            },
            {
                title: 'Buitenlandse Zaken',
                amount: 0,
                percentage: 0,
                amountLastYear: 11,
                description: 'Onderhouden van internationale relaties en het bevorderen van Nederlandse belangen in het buitenland.',
                color: ''
            },
            {
                title: 'Volkshuisvesting',
                amount: 0,
                percentage: 0,
                amountLastYear: 9,
                description: 'Zorgen voor voldoende, betaalbare en passende woningen voor alle inwoners van Nederland.',
                color: ''
            },
            {
                title: 'Asiel en migratie',
                amount: 0,
                percentage: 0,
                amountLastYear: 6,
                description: 'Het toelaten, opvangen, begeleiden en terugsturen van migranten en asielzoekers.',
                color: ''
            },
            {
                title: 'Landbouw en natuur',
                // title: 'Landbouw, visserij, Voedselzekerheid en natuur',
                amount: 0,
                percentage: 0,
                amountLastYear: 5,
                description: 'Milieuvriendelijk werken en steun aan boeren en vissers. Bescherming van natuur en dieren en zorgen dat er voldoende voedsel is voor iedereen.',
                color: ''
            },
            {
                title: 'Binnenlandse Zaken',
                amount: 0,
                percentage: 0,
                amountLastYear: 4,
                description: 'Het goed functioneren van de democratie, de overheid zelf en de leefomgeving van burgers.',
                color: ''
            },
            {
                title: 'Klimaat',
                // title: 'Klimaat en groene groei',
                amount: 0,
                percentage: 0,
                amountLastYear: 4,
                description: 'Alle uitgave om  klimaatverandering tegen te gaan, denk aan: verminderen van CO2-uitstoot, overstappen van gas naar duurzame bronnen, investeren in elektrisch rijden en recycling.',
                color: ''
            },
            {
                title: notClassifiedText,
                amount: maxBudget,
                percentage: 100,
                amountLastYear: 0,
                description: '',
                color: ''
            },
        ];

        const availableColors = [];
        for (const baseColor of baseColors) {
            availableColors.push(baseColor);
            availableColors.push(baseColor + '80');
        }

        let colorList;
        const length = initialCategories.length;
        if (length <= availableColors.length) {
            // const shuffled = [...availableColors].sort(() => 0.5 - Math.random());
            const shuffled = [...availableColors];
            colorList = shuffled.slice(0, length);

        } else {
            const result = [];
            while (result.length < length) {
                result.push(...availableColors);
            }
            // colorList = result.slice(0, length).sort(() => 0.5 - Math.random());
            colorList = result.slice(0, length);
        }


        for (const i in initialCategories) {
            initialCategories[i].color = initialCategories[i].title !== notClassifiedText
                ? colorList[i]
                : '#F4F4F4';
        }

        const initialCategoriesObject = {};
        for (const i in initialCategories) {
            const initialCategory = initialCategories[i];
            initialCategoriesObject[initialCategory.title] = initialCategory;
        }

        return initialCategoriesObject;
    }

    function populateChartData() {
        const labels = [];
        const data = [];
        const colors = [];

        for (const categoryTitle in categories) {
            const category = categories[categoryTitle];

            labels.push(category.title);
            data.push(category.percentage);
            colors.push(category.color);
        }

        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors
                }
            ]
        };
    }

    const categoriesCollection = initializeCategories();

    const [categories, setCategories] = useState(categoriesCollection);
    const [chartData, setChartData] = useState(populateChartData());
    const [remainingPercentage, setRemainingPercentage] = useState(100);
    const [showResults, setShowResults] = useState(false);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.label || ''}: ${context.parsed || 0}%`;
                    }
                }
            }
        }
    };

    const handleSliderChange = (e) => {
        const currentCategoryTitle = e.target.dataset.title;
        if (currentCategoryTitle === notClassifiedText) {
            return;
        }

        let totalPercentage = 0;
        for (const categoryTitle in categories) {
            if (categoryTitle === notClassifiedText) {
                continue;
            }

            totalPercentage += categories[categoryTitle].percentage;
        }

        const newPercentage = parseInt(e.target.value);
        const isIncreasing = newPercentage > parseInt(categories[currentCategoryTitle].percentage);

        let currentRemainingPercentage = parseInt(100 - totalPercentage);

        const currentCategories = {...categories};

        if (currentRemainingPercentage < 0 && isIncreasing) {
            currentRemainingPercentage = 0;

            setRemainingPercentage(currentRemainingPercentage);

            currentCategories[notClassifiedText].percentage = currentRemainingPercentage;
            currentCategories[notClassifiedText].amount = currentRemainingPercentage !== 0
                ? maxBudget / (100 / currentRemainingPercentage)
                : 0;

            setCategories(currentCategories);
            setChartData(populateChartData());
            return;
        }

        setRemainingPercentage(currentRemainingPercentage);

        currentCategories[currentCategoryTitle].percentage = newPercentage;
        currentCategories[currentCategoryTitle].amount = newPercentage !== 0
            ? maxBudget / (100 / newPercentage)
            : 0;

        currentCategories[notClassifiedText].percentage = currentRemainingPercentage;
        currentCategories[notClassifiedText].amount = currentRemainingPercentage !== 0
            ? maxBudget / (100 / currentRemainingPercentage)
            : 0;

        setCategories(currentCategories);
        setChartData(populateChartData());
    };

    function resetSliders() {
        const currentCategories = {...categories};
        for (const categoryTitle in currentCategories) {
            if (categoryTitle === notClassifiedText) {

                currentCategories[categoryTitle].percentage = 100;
                currentCategories[categoryTitle].amount = maxBudget;
                continue;
            }

            currentCategories[categoryTitle].percentage = 0;
            currentCategories[categoryTitle].amount = 0;
        }

        setCategories(currentCategories);
        setChartData(populateChartData());
        setShowResults(false);
    }

    function confirmChoice() {
        if (remainingPercentage > 0) {
            return;
        }

        setShowResults(true);
        setTimeout(function () {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 500);
    }

    return (
        <>
            <h1 className="title">Maak je eigen rijksbegroting!</h1>
            <p className="sub-title">Waar zou jij het geld van Nederland aan uitgeven? Kies zelf hoeveel je besteedt aan zorg, onderwijs, defensie en meer. Verschuif de sliders en zie direct het effect van jouw keuzes. Klaar? Vergelijk jouw begroting met die van de echte overheid!</p>
            <div className="slider-container">
                <div className="sliders">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3 className="card-title">Kies per categorie het budget!</h3>
                        <i className="fa fa-refresh" style={{margin: '5px', cursor: 'pointer'}}
                           onClick={resetSliders}></i>
                    </div>


                    <p className="card-sub-title">Je hebt een maximum budget van 2025 is €{maxBudget} miljard...</p>
                    {Object.keys(categories).map((categoryTitle) => {
                        if (categoryTitle === notClassifiedText) {
                            return;
                        }

                        return <>
                            <div className="slider">
                                <div className="slider-label">
                                    <span className="slider-color"
                                          style={{backgroundColor: categories[categoryTitle].color}}></span>
                                    {categories[categoryTitle].title}
                                    <a
                                        data-tooltip-id={`category-description-tooltip`}
                                        data-tooltip-content={categories[categoryTitle].description}>
                                        <i className="fa fa-circle-info"
                                           style={{color: 'black', fontSize: '85%', cursor: 'pointer'}}></i>
                                    </a>
                                    <Tooltip1
                                        className="category-description-tooltip"
                                        id={`category-description-tooltip`}
                                        openOnClick={true}
                                        place={`top`}/>
                                </div>
                                <input type="range" className="slider-input" min="0" max="100"
                                       value={categories[categoryTitle].percentage} onChange={handleSliderChange}
                                       data-title={categories[categoryTitle].title}/>
                                <div
                                    className={`slider-value ${categoryTitle === notClassifiedText ? 'slider-total' : ''}`}>€{parseInt(categories[categoryTitle].amount)} mld.
                                </div>
                                {/*<div className="slider-value">{categories[categoryTitle].percentage}%</div>*/}
                            </div>
                        </>
                    })}
                    <div className="slider not-classified-slider">
                        <div className="slider-label">
                            <span className="slider-color"
                                  style={{backgroundColor: categories[notClassifiedText].color}}></span>
                            {categories[notClassifiedText].title}
                        </div>
                        <input type="range" className="slider-input" min="0" max="100"
                               value={categories[notClassifiedText].percentage} onChange={handleSliderChange}
                               data-title={categories[notClassifiedText].title}/>
                        <div
                            className="slider-value slider-total">€{parseInt(categories[notClassifiedText].amount)} mld.
                        </div>
                        {/*<div className="slider-value">{categories[categoryTitle].percentage}%</div>*/}
                    </div>
                    <button type="button"
                            className={`confirm-btn ${remainingPercentage <= 0 ? 'active' : ''}`}
                            onClick={confirmChoice}>Bevestig keuze
                    </button>
                </div>
                <div className="chart">
                    <Pie data={chartData} options={options}/>
                </div>
            </div>
            {showResults ? <>
                <div className="results">
                    <h2>Jouw resultaten</h2>
                    <table className="slider-results">
                        <thead>
                        <tr>
                            <th>Categorie</th>
                            <th>Wat heeft de regering gekozen</th>
                            <th>Wat heb jij gekozen gekozen</th>
                            <th>Resultaat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(categories).map((categoryTitle) => {
                            if (categoryTitle === notClassifiedText) {
                                return;
                            }

                            const amount = parseInt(categories[categoryTitle].amount);
                            const amountLastYear = parseInt(categories[categoryTitle].amountLastYear);
                            let difference = amount - amountLastYear;

                            let resultText;
                            if (difference > 0) {
                                resultText = '<span class="positive">+€' + difference + ' mld.</span>';
                            } else if (difference < 0) {
                                resultText = '<span class="negative">-€' + difference + ' mld.</span>';
                            } else {
                                resultText = '<span>€' + difference + '> mld.</span>';
                            }

                            return <>
                                <tr>
                                    <td>{categories[categoryTitle].title}</td>
                                    <td>€{amountLastYear} mld.</td>
                                    <td>€{amount} mld.</td>
                                    <td><span dangerouslySetInnerHTML={{__html: resultText}}></span></td>
                                </tr>
                            </>
                        })}
                        </tbody>
                    </table>
                </div>
            </> : ''}
        </>
    )
}

export default App
