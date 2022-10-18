import { useState, useEffect, useRef } from "react";
import MathJax from "react-mathjax";
import "./App.css";


function App() {
	const [formula, setFormula] = useState('');
	const [disabled, setDisabled] = useState(false);
	const ref = useRef(null)
	const [config, setConfig] = useState<any>(null);

	useEffect(() => {
		// Setup with initial value and disabled state
		function initCustomElement() {
			console.log("init");
			try {
				CustomElement.init((element, context) => {
					// Setup with initial value and disabled state
					setFormula(element.value);

					if(element.config) {
						setConfig(element.config)
					}
				});

				// React on disabled changed (e.g. when publishing the item)
				CustomElement.onDisabledChanged((_disabled) => {
					setDisabled(_disabled);
				});

				window.CustomElement.setHeight(
					Math.max(200, ref.current.clientHeight)
				);
			} catch (err) {
				// Initialization with Kentico Custom element API failed (page displayed outside of the Kentico UI)
				console.error(err);
			}
		}

		initCustomElement();

	}, [])

	return (
		<MathJax.Provider script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
			<div ref={ref} className="App">
				<header className="App-header">
					<label>
						Input:
						<textarea
							disabled={disabled}
							placeholder={config?.placeholder || 'Input Latex/MathML formula here'}
							value={formula}
							onChange={(e) => {
								setFormula(e.target.value);
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
