import React, {useContext, useEffect, useState} from 'react';

import AppContextMover from "../../../context/AppContextMover";
import AppContext from '../../../context/AppContext';
import ModalUI from "../../../components/ModalUI/ModalUI_";

import GppGoodIcon          from '@mui/icons-material/GppGood';
import GppBadIcon                                                       from '@mui/icons-material/GppBad';
import {Button, ButtonGroup, FormControl, MenuItem, Select, Typography} from "@mui/material";
import MoveDownIcon                                                     from '@mui/icons-material/MoveDown';
import MoveUpIcon           from '@mui/icons-material/MoveUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {isObjectEmpty} from "../../../utils/utils";
import {
	u_moveDownElement,
	u_moveUpElement,
	u_moveDuplicatePencil,
	u_moveDuplicateText,
	u_moveDuplicateLine,
	u_moveDuplicateSquare,
	u_moveDuplicateCircle,
	u_moveDuplicateTriangle,
	u_moveDuplicateGeometric,
	u_moveDuplicateImage, u_moveDuplicatePlano
}                         from "../UtilsMove";
import useStylesMenuMove  from "./MenuMoveStyle";
import AddDrawGeoAna      from "../../Plano/AddDrawGeoAna/AddDrawGeoAna";
import AppContextPlano    from "../../../context/AppContextPlano";
import Keyboard           from "../../Function/Keyboard/Keyboard";
import AppContextFunction from "../../../context/AppContextFunction";

const MenuMove = () => {
	// CONTEXT:
	const { state, h_updateH, h_addH, s_setActiveActivePrev } = useContext(AppContext);
	const { stateMover, h_moveSetRefresh } = useContext(AppContextMover);
	const { h_functionSetTextPositionCursor } = useContext(AppContextFunction);

	// STATE:
	const [variantEditNot, setVariantEditNot] = useState('outlined');
	const [variantEditYes, setVariantEditYes] = useState('outlined');
	const [disabledAll, setDisabledAll] = useState(true);
	const [disabledEdit, setDisabledEdit] = useState(true);
	// STATE MODAL:
	const [open, setOpen] = useState(false);
	// STATE KEYBOARD:
	const [openKeyboard, setOpenKeyboard] = useState(false);
	const [successClick, setSuccessClick] = useState(0);

	// LOGICA:
	const props = {
		/*fontSize: '1em',
        height: 30,
        width: 30,*/
	}
	const classes = useStylesMenuMove(props);
	const handleEdit = (boolean) => {
		if(stateMover.selectElm) {
			switch (boolean) {
				case false:
					setVariantEditNot('contained');
					setVariantEditYes('outlined');
					stateMover.obj.edit = false;
					setDisabledAll(true);
					break;
				case true:
					setVariantEditNot('outlined');
					setVariantEditYes('contained');
					stateMover.obj.edit = true;
					setDisabledAll(false);
					break;
				default:
					setVariantEditNot('outlined');
					setVariantEditYes('outlined');
					break;
			}
		} else {
			setVariantEditNot('outlined');
			setVariantEditYes('outlined');
		}
	}
	const handleUpDown = (value) => {
		let arrayNew = [];
		let sw = false;
		state.historia.forEach( elm => arrayNew.push(elm));
		if (value === 'up') {
			sw = u_moveUpElement(arrayNew, stateMover.obj.id);
		} else {
			if (value === 'down') {
				sw = u_moveDownElement(arrayNew, stateMover.obj.id);
			}
		}
		sw ? h_updateH(arrayNew):'';
	}
	const handleDuplicate = () => {
		switch (stateMover.obj.types) {
			case 'pencil':
				let pencil = {};
				pencil = u_moveDuplicatePencil(stateMover.obj, 20, 20);
				pencil.id = state.id;
				h_addH(pencil);
				break;
			case 'text':
				let text = {};
				text = u_moveDuplicateText(stateMover.obj, 20, 20);
				text.id = state.id;
				h_addH(text);
				break;
			case 'line':
				let line = {};
				line = u_moveDuplicateLine(stateMover.obj, 20, 20);
				line.id = state.id;
				h_addH(line);
				break;
			case 'square':
				let square = u_moveDuplicateSquare(stateMover.obj, 20, 20);
				square.id = state.id;
				h_addH(square);
				break;
			case 'circle':
				let circle = u_moveDuplicateCircle(stateMover.obj, 20, 20);
				circle.id = state.id;
				h_addH(circle);
				break;
			case 'triangle':
				let triangle = u_moveDuplicateTriangle(stateMover.obj, 20, 20);
				triangle.id = state.id;
				h_addH(triangle);
				break;
			case 'geometric':
				let geometric = u_moveDuplicateGeometric(stateMover.obj, 20, 20);
				geometric.id = state.id;
				h_addH(geometric);
				break;
			case 'image':
				let image = u_moveDuplicateImage(stateMover.obj, 20, 20);
				image.id = state.id;
				h_addH(image);
				break;
			case 'plano':
				let plano = u_moveDuplicatePlano(stateMover.obj, 20, 20);
				plano.id = state.id;
				h_addH(plano);
				break;
			default:
				break;
		}
	}
	const handleEditable = () => {
		stateMover.obj.select = true;
	}
	const handleDraw = () => {
		setOpen(true);
	}
	const updatePaletaEdit = () => {
		if(stateMover.selectElm) {
			switch (stateMover.obj.edit) {
				case false:
					setVariantEditNot('contained');
					setVariantEditYes('outlined');
					stateMover.obj.edit = false;
					break;
				case true:
					setVariantEditNot('outlined');
					setVariantEditYes('contained');
					stateMover.obj.edit = true;
					break;
				default:
					setVariantEditNot('outlined');
					setVariantEditYes('outlined');
					break;
			}
		} else {
			setVariantEditNot('outlined');
			setVariantEditYes('outlined');
		}
	}
	const updateDisabledEdit = () => {
		if (!isObjectEmpty(stateMover.obj)) {
			setDisabledEdit(false);
		} else {
			setDisabledEdit(true);
		}
	}

	const handleChangeMathboard = (event) => {
		let selectTitle = event.target.value
		let mathBoardUse = state.mathBoards[state.mathBoardsIndexSelec];
		if (selectTitle !== mathBoardUse.title) {
			const copyRows = [...state.mathBoards];
			let k = -1;
			for (let i = 0; i < copyRows.length; i++) {
				if (copyRows[i].title === selectTitle) {
					k = i;
					break;
				}
			}
			if (k !== -1) {
				let sw = false;
				const copyRows2 = [...state.historia];
				for (let i = 0; i < copyRows2.length; i++) {
					if (copyRows2[i].id === stateMover.obj.id) {
						copyRows2[i].canvas = copyRows[k].canvas;
						sw = true;
						break;
					}
				}
				sw ? h_updateH(copyRows2):'';
			}
		} else {
			console.log('iguales');
		}

		//h_textSetTypografia(event.target.value);
	};
	const handleSuccess = () => {
		setOpen(false);
		h_moveSetRefresh(!stateMover.refresh);
	}
	const handleImageFunctionEdit = () => {
		h_functionSetTextPositionCursor(stateMover.obj.description, stateMover.obj.description.length);
		setOpenKeyboard(true);
	}

	const handleSuccessKeyboard = () => {
		setSuccessClick(successClick + 1);
		setOpenKeyboard(false);
	}

	// EFECT:
	useEffect(() => {
		updatePaletaEdit();
		updateDisabledEdit();
		if (!isObjectEmpty(stateMover.obj) && stateMover.obj.edit) {
			setDisabledAll(false);
		} else {
			setDisabledAll(true);
		}
	}, [stateMover.obj]);

	/*useEffect(() => {
		if (!isObjectEmpty(stateMover.obj) && stateMover.obj.edit) {
			setDisabledAll(false);
		} else {
			setDisabledAll(true);
		}
	}, [disabledEdit]);*/

	return (
		<>
			<div className={classes.container}>
				<Button
					variant={variantEditNot}
					onClick={() => handleEdit(false)}
					color='error' size='small'
					startIcon={<GppBadIcon/>}
					style={{marginRight: '5px'}}
					disabled={disabledEdit}
				>
					EDITAR
				</Button>
				<Button
					variant={variantEditYes}
					onClick={() => handleEdit(true)}
					color='success'
					size='small'
					startIcon={<GppGoodIcon/>}
					disabled={disabledEdit}
					style={{marginRight: '25px'}}
				>
					EDITAR
				</Button>
				<Button
					variant='outlined'
					onClick={() => handleUpDown('down')}
					disabled={disabledAll}
					size='small'
					startIcon={<MoveDownIcon fontSize='small'/>}
					style={{marginRight:'5px'}}
				>
					BAJAR
				</Button>
				<Button
					variant='outlined'
					onClick={() => handleUpDown('up')}
					disabled={disabledAll}
					size='small'
					startIcon={<MoveUpIcon/>}
					style={{marginRight:'25px'}}
				>
					SUBIR
				</Button>
				<ButtonGroup>
					<Button
						variant='outlined'
						onClick={() => handleDuplicate()}
						disabled={disabledAll}
						size='small'
						startIcon={<ContentCopyIcon/>}
						style={{marginRight:'25px'}}
					>
						DUPLICAR
					</Button>
				</ButtonGroup>
				<Typography color={disabledAll ? '#bdbdbd': 'primary'} style={{marginRight:'5px', userSelect:'none', fontSize:'0.9em'}}>
					MOVER:
				</Typography>
				<FormControl sx={{ m: 0, minWidth: 150 }} size='small' color='primary' disabled={disabledAll}>
					{
						<Select
							value={state.mathBoards[state.mathBoardsIndexSelec].title}
							onChange={handleChangeMathboard}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							size='small'
							id="demo-simple-select-error"
							style={{ height: '1.8em', color:'#1976d2'}}
							//color='primary'
						>
							{state.mathBoards.map(elm => (<MenuItem key={elm.title} value={elm.title} style={{color:'#1976d2'}}>{elm.title}</MenuItem>))}
						</Select>
					}
				</FormControl>
				{
					(stateMover.obj.types === 'text') &&
					<Button
						variant='outlined'
						onClick={() => handleEditable()}
						disabled={disabledAll}
						size='small'
						startIcon={<BorderColorIcon/>}
						style={{marginLeft:'25px'}}
					>
						EDITAR TEXTO
					</Button>
				}
				{
					(stateMover.obj.types === 'plano') &&
					<Button
						variant='outlined'
						onClick={() => handleDraw()}
						disabled={disabledAll}
						size='small'
						startIcon={<TrendingUpIcon/>}
						style={{marginLeft:'25px'}}
					>
						GEO-ANALITICA
					</Button>
				}
				{
					(stateMover.obj.types === 'image' && stateMover.obj.description.length > 0) &&
					<Button
						variant='outlined'
						onClick={() => handleImageFunctionEdit()}
						disabled={disabledAll}
						size='small'
						startIcon={<TrendingUpIcon/>}
						style={{marginLeft:'25px'}}
					>
						EDITAR FUNCION
					</Button>
				}
			</div>
			<ModalUI open={open} setOpen={setOpen} handleSuccess={handleSuccess} maxWidth={'md'} title={'Geometria Análitica:'} booleanFooter={true} >
				<AddDrawGeoAna/>
			</ModalUI>

			<ModalUI open={openKeyboard} setOpen={setOpenKeyboard} handleSuccess={handleSuccessKeyboard} maxWidth={'md'} title={'Editar Funcion:'} booleanFooter={true} >
				<Keyboard successClick={successClick} objFunction={stateMover.obj}/>
			</ModalUI>
		</>

	)
};

export default MenuMove;
