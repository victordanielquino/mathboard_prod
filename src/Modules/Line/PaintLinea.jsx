import { useContext, useEffect } from 'react';

// CONTEXT:
import AppContext from "../../context/AppContext";
import AppContextGrid from '../../context/AppContextGrid';
import AppContextLinea from '../../context/AppContextLinea';

// utils:
import { u_lineaVector, u_lineDraw } from './UtilsLinea';

import draw               from '../Draw/Draw'
import {u_canvasAutoSize} from "../../utils/utils";

const PaintLinea = (id_canvas) => {
	// useContext:
	const { state, h_addH, h_deleteIndexH } = useContext(AppContext);
	const { stateGrid } = useContext(AppContextGrid);
	const { stateLinea, h_lineSetCanvas } = useContext(AppContextLinea);

	// LOGICA:
	const paint = async () => {
		if (stateLinea.active){
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			try {
				await draw(context, state.historia, state.canvas, stateGrid);
			} catch (e) {
				console.log('error: PaintLinea.jsx',e.message);
			}
		}
	}
	let canvas = '';
	let context = '';
	const mouse = {
		click: false,
		move: false,
		pos: { x: 0, y: 0 },
		pos_prev: { x: 0, y: 0 },
	};
	const mouseReinicia = () => {
		mouse.click = false;
		mouse.move = false;
		mouse.pos.x = 0;
		mouse.pos_prev.x = 0;
		mouse.pos.y = 0;
		mouse.pos_prev.y = 0;
	};
	const Linea = {
		id: stateLinea.id,
		visible: true,
		edit: true,
		grosor: stateLinea.grosor,
		color: stateLinea.color,
		type: stateLinea.type,
		segment: stateLinea.segment,
		x_ini: 0,
		y_ini: 0,
		x_fin: 0,
		y_fin: 0,
		x_1:0,
		y_1: 0,
		x_2:0,
		y_2: 0,

		cdc_xmin: 0,
		cdc_ymin: 0,
		cdc_xmax: 0,
		cdc_ymax: 0,
		cdc_pto_x1: 0,
		cdc_pto_y1: 0,
		cdc_pto_x2: 0,
		cdc_pto_y2: 0,

		vtr_pto_x1:0,
		vtr_pto_y1:0,
		vtr_pto_x2:0,
		vtr_pto_y2:0,

		canvas: stateLinea.canvas,
		types: 'line',
	};
	let canvasLineaDatos = {top: 0, left: 0, width: 0, height: 0,};
	const captura_Pos_Posprev = (e) => {
		const x = e.clientX;
		const y = e.clientY;
		const x_real = x - canvasLineaDatos.left;
		const y_real = y - canvasLineaDatos.top;
		mouse.pos_prev.x = mouse.pos.x;
		mouse.pos_prev.y = mouse.pos.y;
		mouse.pos.x = x_real;
		mouse.pos.y = y_real;
	};
	const isCuadratic = (cuadratic) => {
		let horizontal = Math.abs(cuadratic.x_fin - cuadratic.x_ini); // -------
		let vertical = Math.abs(cuadratic.y_fin - cuadratic.y_ini); //  ||||||
		if (horizontal > vertical){
			cuadratic.x_1 = cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini) / 2;
			cuadratic.y_1 = (cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini) / 2 )+ (cuadratic.x_fin - cuadratic.x_ini) / 2;
		} else {
			cuadratic.x_1 = (cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini) / 2) + (cuadratic.y_fin - cuadratic.y_ini) / 2;
			cuadratic.y_1 = cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini) / 2;
		}
	}
	const isBezier = (bezier) => {
		let horizontal = Math.abs(bezier.x_fin - bezier.x_ini); // -------
		let vertical = Math.abs(bezier.y_fin - bezier.y_ini); //  ||||||

		if (horizontal > vertical){
			bezier.x_1 = bezier.x_ini + (bezier.x_fin - bezier.x_ini) / 3;
			bezier.y_1 = (bezier.y_ini + (bezier.y_fin - bezier.y_ini) / 3 ) + (bezier.x_fin - bezier.x_ini) / 2;

			bezier.x_2 = bezier.x_1 + (bezier.x_fin - bezier.x_ini) / 3;
			bezier.y_2 = (bezier.y_ini + (bezier.y_fin - bezier.y_ini) / 3 ) - (bezier.x_fin - bezier.x_ini) / 2;
		} else {
			bezier.x_1 = (bezier.x_ini + (bezier.x_fin - bezier.x_ini) / 3) + (bezier.y_fin - bezier.y_ini) / 2;
			bezier.y_1 = bezier.y_ini + (bezier.y_fin - bezier.y_ini) / 3;

			bezier.x_2 = (bezier.x_ini + (bezier.x_fin - bezier.x_ini) / 3) - (bezier.y_fin - bezier.y_ini) / 2;
			bezier.y_2 = bezier.y_1 + (bezier.y_fin - bezier.y_ini) / 3;
		}
	}
	const cuadratic_cdc_pto = (cuadratic) => {
		cuadratic.cdc_pto_x1 = cuadratic.x_ini + (cuadratic.x_fin - cuadratic.x_ini)/2;
		cuadratic.cdc_pto_y1 = cuadratic.y_ini + (cuadratic.y_fin - cuadratic.y_ini)/2;

		cuadratic.cdc_pto_x2 = cuadratic.cdc_pto_x1 + (cuadratic.x_1 - cuadratic.cdc_pto_x1)/2;
		cuadratic.cdc_pto_y2 = cuadratic.cdc_pto_y1 + (cuadratic.y_1 - cuadratic.cdc_pto_y1)/2;

		cuadratic.cdc_xmin = Math.min(cuadratic.x_ini, cuadratic.x_fin, cuadratic.cdc_pto_x2);
		cuadratic.cdc_ymin = Math.min(cuadratic.y_ini, cuadratic.y_fin, cuadratic.cdc_pto_y2);

		cuadratic.cdc_xmax = Math.max(cuadratic.x_ini, cuadratic.x_fin, cuadratic.cdc_pto_x2);
		cuadratic.cdc_ymax = Math.max(cuadratic.y_ini, cuadratic.y_fin, cuadratic.cdc_pto_y2);
	}
	const isVector = (vector) => {
		u_lineaVector(vector);
	}
	// 1
	const mouseDownLinea = (e) => {
		mouse.click = true;
		captura_Pos_Posprev(e);
		Linea.x_ini = mouse.pos.x;
		Linea.y_ini = mouse.pos.y;
	};
	// 2
	const mouseMoveLinea = async (e) => {
		if (mouse.click) {
			mouse.move = true;
			captura_Pos_Posprev(e);

			Linea.x_fin = mouse.pos.x;
			Linea.y_fin = mouse.pos.y;

			switch (Linea.type){
				case 'cuadratic':
					isCuadratic(Linea);
					break;
				case 'bezier':
					isBezier(Linea);
					break;
				case 'vector':
					isVector(Linea);
					break;
				default:
					break;
			}
			await paint();
			u_lineDraw(context, Linea); // utilsPaint_graficaLinea
		}
	};
	// 3
	const mouseUpLinea = () => {
		if (mouse.click && mouse.pos_prev.x !== 0 && mouse.pos_prev.y !== 0) {
			switch (Linea.type){
				case 'cuadratic':
					cuadratic_cdc_pto(Linea);
					break;
				case 'bezier':
					//isBezier(Linea);
					break;
				case 'vector':
					//isVector(Linea);
					break;
				default:
					break;
			}
			//s_lineaAddHId(Linea, stateLinea.id + 1);
			Linea.id = state.id;
			h_addH(Linea);
			//rectaCircunferencia(0, 7, 7, 0, 0, 0, 13);
		}
		mouseReinicia();
	};
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
				state.historia.forEach((elm, index) => elm.canvas === stateLinea.canvas ? indexdDelete = index:'');
				indexdDelete > -1 ? h_deleteIndexH(indexdDelete) :'';
			}
		}
	}

	// useEffect:
	useEffect(() => {
		if (stateLinea.active){
			canvas = document.getElementById(id_canvas);
			context = canvas.getContext('2d');
			canvasLineaDatos = u_canvasAutoSize(canvas, canvasLineaDatos);
			paint();
			canvas.addEventListener('mousedown', mouseDownLinea);
			canvas.addEventListener('mousemove', mouseMoveLinea);
			canvas.addEventListener('mouseup', mouseUpLinea);
			document.addEventListener('keydown', keyDown);
			return () => {
				canvas.removeEventListener('mousedown', mouseDownLinea);
				canvas.removeEventListener('mousemove', mouseMoveLinea);
				canvas.removeEventListener('mouseup', mouseUpLinea);
				document.removeEventListener('keydown', keyDown);
			};
		}
	}, [stateLinea, state.historia]);

	useEffect(() => {
		h_lineSetCanvas(state.canvas);
		if (stateLinea.active) {
			paint();
		}
	}, [state.canvas]);
};

export default PaintLinea;
