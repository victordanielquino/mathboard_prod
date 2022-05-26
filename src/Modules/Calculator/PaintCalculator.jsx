import React, {useContext, useEffect} from 'react';

// CONTEXT
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextCalculator from "../../context/AppContextCalculator";

import draw               from '../Draw/Draw';
import {u_canvasAutoSize} from "../../utils/utils";

const PaintCalculator = (id_canvas) => {
    // CONTEXT:
    const { state, h_deleteIndexH } = useContext(AppContext);
    const { stateGrid } = useContext(AppContextGrid);
    const { stateCalculator, h_calculatorSetCanvas } = useContext(AppContextCalculator);

    // LOGICA:
    const paint = async () => {
        if (stateCalculator.active){
            canvas = document.getElementById(id_canvas);
            context = canvas.getContext('2d');
            try {
                await draw(context, state.historia, state.canvas, stateGrid);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log('PaintCalculator.jsx no active');
        }
    }
    let canvas = '';
    let context = '';
    // 4:
    const keyDown = (e) => {
        if (state.historia.length > 0){
            // console.log(e);
            // console.log(e.key);
            // console.log(e.keyCode);
            let key = e.key;
            let keyV = e.which || e.keyCode;
            let ctrl = e.ctrlKey
                ? e.ctrlKey
                : (key === 17) ? true : false;
            if (keyV === 90 && ctrl) {
                //console.log("Ctrl+Z is pressed.");
                let indexdDelete = -1;
                state.historia.forEach((elm, index) => elm.canvas === stateCalculator.canvas ? indexdDelete = index:'');
                indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
            }
        }
    }

    // EFFECT:
    useEffect(() => {
        if (stateCalculator.active) {
            paint();

            document.addEventListener('keydown', keyDown);
            return () => {
                document.removeEventListener('keydown', keyDown);
            };
        }
    }, [stateCalculator, state.historia]);

    useEffect(() => {
        h_calculatorSetCanvas(state.canvas);
        if (stateCalculator.active) {
            paint();
        }
    }, [state.canvas]);
}

export default PaintCalculator;