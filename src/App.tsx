import { useState, useEffect, useRef } from "react";
import MathJax from "react-mathjax";
import "./App.css";


function App() {
	const [formula, setFormula] = useState('');
	const [disabled, setDisabled] = useState(false);
	const ref = useRef(null)

	useEffect(() => {
		console.log(window.isDisabled);
		// Setup with initial value and disabled state
		setFormula(window.inputValue);
		setDisabled(window.isDisabled);
		window.CustomElement.setHeight(Math.max(200, ref.current.clientHeight));
	}, [])

	return (
		<MathJax.Provider>
			<div ref={ref} className="App">
				<header className="App-header">
					<label>
						Input:
						<textarea disabled={disabled} placeholder="input Latex formula here" value={formula}
							onChange={(e) => {
								setFormula(e.target.value)
								window.CustomElement.setValue(e.target.value);
							}}
						/>
					</label>

					<div style={{ marginTop: 8 }}>
						<strong>Formula:</strong>
						<MathJax.Node formula={formula}></MathJax.Node>
					</div>
				</header>
			</div>
		</MathJax.Provider>
	);
}

export default App;
